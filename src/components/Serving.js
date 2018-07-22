import React from 'react'
import { bool, number, object, func, oneOfType } from 'prop-types'
import { calcNutrition } from '../utils'
import ServingName from './ServingName'
import ServingNutrition from './ServingNutrition'
import sizes from '../constants/sizes'
import Hover from './Hover'

const propTypes = {
  data: object.isRequired,
  size: oneOfType([bool, number]).isRequired,
  style: object,
  onClick: func.isRequired
}

const defaultProps = {
  style: {}
}

const Serving = ({ data, size, style: variant, onClick }) => (
  <Hover>
    {({ hover, getAttr }) => (
      <article
        {...getAttr({
          style: Object.assign({}, style, hover && style.hover, variant),
          onClick
        })}
      >
        <ServingName {...data} size={size} style={style.name} />
        <ServingNutrition nutrition={calcNutrition(data, size)} />
      </article>
    )}
  </Hover>
)

Serving.propTypes = propTypes
Serving.defaultProps = defaultProps

const style = {
  display: 'flex',
  cursor: 'pointer',
  userSelect: 'none',

  name: { width: sizes.serving.name, borderRight: '1px solid silver' },
  hover: { backgroundColor: 'hsla(0, 0%, 97%)' }
}

export default Serving
