import React from 'react'
import { number, string, arrayOf, shape } from 'prop-types'

const propTypes = {
  name: string.isRequired,
  categories: arrayOf(string),
  nutrition: shape({
    size: number,
    unit: string,
    calories: number,
    protein: number,
    carbohydrate: number,
    fat: number
  })
}

const defaultProps = {
  categories: [],
  nutrition: undefined
}

const FoodItem = ({ name, categories, nutrition }) =>
  null && (
    <article>
      <h1 style={{ display: 'inline', fontSize: 'inherit' }}>
        {name}
        <small>{categories}</small>
      </h1>
      <p style={{ display: 'inline' }}>{JSON.stringify(nutrition)}</p>
    </article>
  )

FoodItem.propTypes = propTypes
FoodItem.defaultProps = defaultProps

export default FoodItem
