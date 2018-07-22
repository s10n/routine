import { calcNutrition, sumNutrition, getTotalNutritionWith } from './nutrition'

const table = {
  '9': { name: '아침식사', list: { granola: 100, soymilk: 200 } },
  '11': { name: '간식', list: { apple: 1 } }
}

const food = {
  granola: {
    categories: ['nuts', 'fruit', 'starch'],
    name: '그래놀라',
    nutrition: {
      size: 100,
      unit: 'g',
      calories: 428,
      carbohydrate: 73.8,
      protein: 7,
      fat: 13
    }
  },
  soymilk: {
    categories: ['seeds'],
    name: '두유',
    nutrition: {
      size: 100,
      unit: 'ml',
      calories: 63,
      carbohydrate: 6,
      fat: 3.1,
      protein: 3
    }
  },
  apple: {
    categories: ['fruit'],
    name: '사과',
    nutrition: {
      calories: 70,
      carbohydrate: 20
    }
  },
  egg: {
    categories: ['meat'],
    name: '삶은 달걀',
    nutrition: {
      calories: 755,
      protein: 54,
      carbohydrate: 16,
      fat: 53,
      size: 10
    }
  },
  banana: {
    categories: ['fruit'],
    name: '바나나',
    nutrition: {
      calories: 70,
      carbohydrate: 20
    }
  }
}

describe('영양소 계산', () => {
  test('삶은 달걀 2개', () => {
    const sample = food['egg']
    const received = calcNutrition(sample, 2)
    const expected = {
      calories: 151,
      protein: 10.8,
      carbohydrate: 3.2,
      fat: 10.6
    }
    expect(received).toEqual(expected)
  })

  test('바나나 2개', () => {
    const sample = food['banana']
    const received = calcNutrition(sample, 2)
    const expected = { calories: 140, carbohydrate: 40 }
    expect(received).toEqual(expected)
  })
})

const ExpectedNutrition = {
  calories: 624,
  carbohydrate: 105.8,
  protein: 13,
  fat: 19.2
}

test('영양소 합산', () => {
  const sampleA = { calories: 428, carbohydrate: 73.8, protein: 7, fat: 13 }
  const sampleB = { calories: 126, carbohydrate: 12, protein: 6, fat: 6.2 }
  const sampleC = { calories: 70, carbohydrate: 20 }
  const received = sumNutrition([sampleA, sampleB, sampleC])
  expect(received).toEqual(ExpectedNutrition)
})

test('영양소 총합', () => {
  const received = getTotalNutritionWith(food)(table)
  expect(received).toEqual(ExpectedNutrition)
})
