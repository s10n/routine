const dictionary = {
  time: '시간',
  name: '항목',
  categories: '분류',
  calories: '열량',
  protein: '단백질',
  carbohydrate: '탄수화물',
  fat: '지방'
}

const translate = english =>
  Array.isArray(english)
    ? english.map(translate)
    : dictionary[english] || english

export default translate
