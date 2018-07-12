import React from 'react'
import {} from 'prop-types'

const propTypes = {}
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
        <tr key={index}>
          {row.map((cell, index) => (
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
  th: { ...common },
  td: { ...common }
}

export default Table
