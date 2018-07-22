export const facts = ['protein', 'carbohydrate', 'fat', 'calories']
export const blocks = { protein: 7, carbohydrate: 9, fat: 3 }
export const units = {
  protein: 'g',
  carbohydrate: 'g',
  fat: 'g',
  calories: 'kcal'
}

export const calcNutrition = ({ nutrition = {} }, size) => {
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
        ...Object.entries(value.list).map(([key, value]) =>
          calcNutrition(db[key], value)
        )
      ],
      []
    )
  )

/* utils */
const sum = (a, b) => Number(a || 0) + Number(b || 0)
