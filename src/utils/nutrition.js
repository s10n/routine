import { uniq } from 'ramda'

export const facts = ['calories', 'protein', 'carbohydrate', 'fat']
export const units = {
  calories: 'kcal',
  protein: 'g',
  carbohydrate: 'g',
  fat: 'g'
}

const normalize = param =>
  typeof param === 'number' ? !!param && Math.round(param) : param

export const getNutritionString = (value, column) => {
  const unit = units[column]
  return value ? normalize(value) + unit : ''
}

export const calcNutrition = (nutrition, size) => {
  const fn = (acc, [key, value]) =>
    Object.assign(
      acc,
      facts.includes(key) && { [key]: (value * size) / (nutrition.size || 1) }
    )

  return size ? Object.entries(nutrition).reduce(fn, {}) : nutrition
}

export const sumNutrition = array => {
  const fn = (acc, cur) =>
    Object.assign(...facts.map(i => ({ [i]: sum(acc[i], cur[i]) })))
  return array.reduce(fn, {})
}

export const getTotalNutritionWith = db => table =>
  sumNutrition(
    Object.entries(table).reduce(
      (acc, [time, value]) => [
        ...acc,
        ...Object.entries(value).map(
          entry => getBlockWith(db)(entry)['nutrition']
        )
      ],
      []
    )
  )

export const getBlockWith = db => ([key, value]) => {
  const getInfo = key => db[key] || {}
  const { name, categories, nutrition = {} } = getInfo(key)
  const { size, with: w } = value
  const side = (w && mapEntries(w, getBlockWith(db))) || []
  const getMapSide = key => side.map(o => o[key])

  return {
    name: [].concat(
      [name, size && size + (nutrition.unit || '개')].filter(Boolean).join(' '),
      ...getMapSide('name')
    ),
    categories: uniq([].concat(categories, ...getMapSide('categories'))),
    nutrition: sumNutrition(
      [].concat(
        nutrition && calcNutrition(nutrition, size),
        ...getMapSide('nutrition')
      )
    )
  }
}

/* utils */
const sum = (a, b) => Number(a || 0) + Number(b || 0)
const mapEntries = (object, fn) => Object.entries(object).map(fn)
