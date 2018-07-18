import React from 'react'
import { string, number } from 'prop-types'

const propTypes = { amount: string, block: number }
const defaultProps = { amount: '', block: NaN }

const Cell = ({ amount, block }) => (
  <div style={style}>
    {amount && <span style={style.amount}>{amount}</span>}
    {!!block && <small style={style.block}>{block}</small>}
  </div>
)

Cell.propTypes = propTypes
Cell.defaultProps = defaultProps

const style = {
  display: 'flex',
  alignItems: 'flex-end',
  amount: { flex: 1 },
  block: { flex: 'none', fontFamily: 'monospace', fontWeight: 'normal' }
}

export default Cell
