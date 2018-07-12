import React from 'react'
import { object } from 'prop-types'
import { cond, equals } from 'ramda'
import { facts, getBlock, getNutritionString, translate } from '../utils'
import Table from './Table'

const propTypes = { table: object, food: object, activity: object }
const defaultProps = { table: {}, food: {}, activity: {} }

const TimeTable = ({ table, food, activity }) => {
  const db = { ...food, ...activity }
  const sorted = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b)

  const _table = sorted.reduce(
    (acc, time) => [
      ...acc,
      ...Object.entries(table[time]).map((entry, index) =>
        columns.map(
          getContent(Object.assign({}, getBlock(db)(entry), !index && { time }))
        )
      )
    ],
    []
  )

  return <Table headings={translate(columns)} rows={_table} />
}

TimeTable.propTypes = propTypes
TimeTable.defaultProps = defaultProps

const columns = ['time', 'name', 'categories', ...facts]
const getContent = block => column => {
  const content = block[column]
  const { nutrition } = block

  return (
    cond([
      [equals('time'), () => getTimeString(content)],
      [equals('name'), () => content.join(' + ')],
      [equals('categories'), () => content.join(', ')],
      [isIn(facts), () => getNutritionString(nutrition[column], column)]
    ])(column) || content
  )
}

export default TimeTable

/* utils */
const isIn = array => item => array.includes(item)
const getTimeString = time =>
  time &&
  (time < 12 ? 'AM' : 'PM') + ' ' + (time > 12 ? time - 12 : time) + ':00'
