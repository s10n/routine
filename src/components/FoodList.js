import React from 'react'
import { object } from 'prop-types'
import FoodItem from './FoodItem'

const propTypes = { food: object }
const defaultProps = { food: {} }

const Food = ({ food }) =>
  Object.entries(food).map(([key, value]) => <FoodItem {...value} key={key} />)

Food.propTypes = propTypes
Food.defaultProps = defaultProps

export default Food
