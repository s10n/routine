import React, { Fragment } from 'react'
import { object, func, instanceOf } from 'prop-types'
import { cond, equals } from 'ramda'
import { facts, getBlock, getNutritionString, translate } from '../utils'
import Table from './Table'

const propTypes = {
  table: object,
  done: object,
  food: object,
  activity: object,
  current: instanceOf(Date),
  onIntake: func,
  onReset: func
}

const defaultProps = {
  table: {},
  done: {},
  food: {},
  activity: {},
  current: new Date(),
  onIntake: () => {},
  onReset: () => {}
}

const TimeTable = ({ table, done, food, activity, current, ...rest }) => {
  const { onIntake, onReset } = rest
  const db = { ...food, ...activity }
  const sorted = sortByNumber(Object.keys(table).map(Number))
  const currentHours = current.getHours()

  const reduceRows = (acc, time) => {
    const getRow = (entry, index) => {
      const [key] = entry
      const isDone = done[time] && done[time].includes(key)
      const isPast = time < currentHours
      const isNow = time === currentHours

      return {
        data: columns.map(
          getContent(Object.assign({}, getBlock(db)(entry), !index && { time }))
        ),
        style: {
          color: isDone ? 'silver' : isPast && 'brown',
          fontWeight: isNow && 'bold'
        },
        onClick: () => onIntake(time, key)
      }
    }

    return [...acc, ...Object.entries(table[time]).map(getRow)]
  }

  return (
    <Fragment>
      <button onClick={onReset}>reset</button>
      <Table
        headings={translate(columns)}
        rows={sorted.reduce(reduceRows, [])}
      />
    </Fragment>
  )
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
const sortByNumber = array => array.sort((a, b) => a - b)
const getTimeString = time =>
  time &&
  (time < 12 ? 'AM' : 'PM') + ' ' + (time > 12 ? time - 12 : time) + ':00'
