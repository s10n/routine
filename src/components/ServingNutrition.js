import React from 'react'
import { number, object, shape } from 'prop-types'
import { facts, units, blocks } from '../utils'
import Cell from './Cell'
import sizes from '../constants/sizes'

const propTypes = {
  nutrition: shape({
    protein: number,
    carbohydrate: number,
    fat: number,
    calories: number
  }),
  style: object
}

const defaultProps = {
  nutrition: {},
  style: {}
}

const ServingNutrition = ({ nutrition, style: variant }) => (
  <section style={{ display: 'flex', ...variant }}>
    {facts.map(fact => {
      const n = nutrition[fact]
      const block = n / blocks[fact]
      const unit = units[fact]

      const style = {
        width: sizes.serving[fact] || sizes.serving.fact,
        borderLeft: fact === 'calories' && '1px solid silver'
      }

      return (
        <Cell sub={!!block && round(block, 10)} style={style} key={fact}>
          {!!n && round(n) + unit}
        </Cell>
      )
    })}
  </section>
)

ServingNutrition.propTypes = propTypes
ServingNutrition.defaultProps = defaultProps

export default ServingNutrition

/* utils */
const round = (number, n = 1) => Math.round(number * n) / n
