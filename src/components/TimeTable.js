import React from 'react'
import { object, func } from 'prop-types'
import Time from './Time'
import { facts, translate, getTotalNutritionWith } from '../utils'
import sizes from '../constants/sizes'
import ServingNutrition from './ServingNutrition'

const propTypes = {
  table: object.isRequired,
  db: object.isRequired,
  onReset: func.isRequired
}

const TimeTable = ({ table, db, onReset }) => (
  <main style={style}>
    <header style={style.header} onClick={onReset}>
      {facts.map(fact => (
        <small
          style={{ width: sizes.serving[fact] || sizes.serving.fact }}
          key={fact}
        >
          {translate(fact)}
        </small>
      ))}
    </header>

    {Object.entries(table).map(([key, value]) => (
      <Time time={key} {...value} db={db} key={key} />
    ))}

    <ServingNutrition
      nutrition={getTotalNutritionWith(db)(table)}
      style={style.total}
    />
  </main>
)

TimeTable.propTypes = propTypes

const marginLeft = sizes.row.header + sizes.serving.name
const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'center',

  header: {
    display: 'flex',
    fontWeight: 'bold',
    marginBottom: '.25rem',
    marginLeft: marginLeft + 2,
    cursor: 'pointer',
    userSelect: 'none'
  },

  total: { border: '1px solid silver', marginLeft: marginLeft + 1 }
}

export default TimeTable
