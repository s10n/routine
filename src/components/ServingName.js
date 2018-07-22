import React from 'react'
import { bool, number, string, arrayOf, object, shape } from 'prop-types'
import { oneOfType } from 'prop-types'
import Cell from './Cell'

const propTypes = {
  name: string.isRequired,
  categories: arrayOf(string),
  nutrition: shape({ unit: string }),
  size: oneOfType([bool, number]).isRequired,
  style: object
}

const defaultProps = {
  categories: [],
  nutrition: {},
  style: {}
}

const ServingName = ({ name, categories, nutrition, size, style: variant }) => {
  const serving =
    typeof size === 'number' && String(size) + (nutrition.unit || '개')

  return (
    <Cell sub={categories.join(' ')} style={variant}>
      {[name, serving].filter(Boolean).join(' ')}
    </Cell>
  )
}

ServingName.propTypes = propTypes
ServingName.defaultProps = defaultProps

export default ServingName
