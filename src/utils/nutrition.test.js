import { calcNutrition, sumNutrition, getBlock } from './nutrition'

const time = {
  '67b13718-fd01-49b3-9e84-8b83a92a2d57': {
    size: 100,
    with: {
      'e48eeb06-4b1d-4adc-9f12-1be304f85a89': { size: 200 },
      '5140860a-eeb4-438d-83c0-8be304f52c77': true
    }
  },

  'fca7eb80-fe33-4cd9-95ea-27d0088fdf30': {
    size: 2
  }
}

const food = {
  '67b13718-fd01-49b3-9e84-8b83a92a2d57': {
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
  'e48eeb06-4b1d-4adc-9f12-1be304f85a89': {
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
  '5140860a-eeb4-438d-83c0-8be304f52c77': {
    categories: ['fruit'],
    name: '사과',
    nutrition: {
      calories: 70,
      carbohydrate: 20
    }
  },
  'fca7eb80-fe33-4cd9-95ea-27d0088fdf30': {
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
  '327a4627-a6a7-4ebc-bcd1-6f5e3956f6d9': {
    categories: ['fruit'],
    name: '바나나',
    nutrition: {
      calories: 70,
      carbohydrate: 20
    }
  }
}

test('영양소 계산', () => {
  const { nutrition: sample } = food['fca7eb80-fe33-4cd9-95ea-27d0088fdf30']
  const received = calcNutrition(sample, 2)
  const expected = {
    calories: 151,
    protein: 10.8,
    carbohydrate: 3.2,
    fat: 10.6
  }
  expect(received).toEqual(expected)
})

test('영양소 계산 (개수)', () => {
  const { nutrition: sample } = food['327a4627-a6a7-4ebc-bcd1-6f5e3956f6d9']
  const received = calcNutrition(sample, 2)
  const expected = { calories: 140, carbohydrate: 40 }
  expect(received).toEqual(expected)
})

test('영양소 합산', () => {
  const sampleA = { calories: 428, carbohydrate: 73.8, protein: 7, fat: 13 }
  const sampleB = { calories: 126, carbohydrate: 12, protein: 6, fat: 6.2 }
  const sampleC = { calories: 70, carbohydrate: 20 }
  const received = sumNutrition([sampleA, sampleB, sampleC])

  const expected = {
    calories: 624,
    carbohydrate: 105.8,
    protein: 13,
    fat: 19.2
  }

  expect(received).toEqual(expected)
})

test('블록 데이터', () => {
  const sample = '67b13718-fd01-49b3-9e84-8b83a92a2d57'
  const received = getBlock(food)([sample, time[sample]])
  const expected = {
    name: ['그래놀라 100g', '두유 200ml', '사과'],
    categories: ['nuts', 'fruit', 'starch', 'seeds'],
    nutrition: { calories: 624, carbohydrate: 105.8, protein: 13, fat: 19.2 }
  }

  expect(received).toEqual(expected)
})
