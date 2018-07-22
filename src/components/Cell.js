import React from 'react'
import { object, node } from 'prop-types'

const propTypes = { sub: node, style: object }
const defaultProps = { sub: '', style: {} }

const Cell = ({ sub, style: variant, children }) => (
  <div style={{ ...style, ...variant }}>
    {children}
    {!!sub && <small style={style.sub}>{sub}</small>}
  </div>
)

Cell.propTypes = propTypes
Cell.defaultProps = defaultProps

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 5,
  sub: { fontFamily: 'monospace', marginTop: '.25rem' }
}

export default Cell
