import React from 'react'
import { string, arrayOf, object, shape, func } from 'prop-types'

const propTypes = {
  headings: arrayOf(string),
  rows: arrayOf(shape({ data: arrayOf(string), style: object, onClick: func }))
}

const defaultProps = {}

const Table = ({ headings, rows }) => (
  <table>
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th style={style.th} key={index}>
            {heading}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {rows.map((row, index) => (
        <tr
          style={Object.assign(
            {},
            row.style,
            row.onClick && style.tr.clickable
          )}
          onClick={row.onClick}
          key={index}
        >
          {row.data.map((cell, index) => (
            <td style={style.td} key={index}>
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

Table.propTypes = propTypes
Table.defaultProps = defaultProps

const common = {
  border: '1px solid hsl(210, 14%, 89%)',
  padding: '0.5rem',
  textAlign: 'center'
}
const style = {
  tr: { clickable: { cursor: 'pointer', userSelect: 'none' } },
  th: { ...common },
  td: { ...common }
}

export default Table
