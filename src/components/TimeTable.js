import React, { Fragment } from 'react'
import { object, func, instanceOf } from 'prop-types'
import { cond, equals } from 'ramda'
import { units, facts, getNutritionString } from '../utils'
import { getTotalNutritionWith, getBlockWith } from '../utils'
import { translate } from '../utils'
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
  now: new Date(),
  onIntake: () => {},
  onReset: () => {}
}

const TimeTable = ({ table, done, food, activity, now, ...rest }) => {
  const reduceRows = (acc, time) => {
    const getRow = (entry, index) => {
      const [key] = entry
      const isDone = done[time] && done[time].includes(key)
      const isPast = time < hour
      const isNow = time === hour

      return {
        data: getRowData(
          Object.assign({}, getBlock(entry), !index && { time })
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

  const { onIntake, onReset } = rest
  const db = { ...food, ...activity }
  const hour = now.getHours()
  const getBlock = getBlockWith(db)
  const getTotalNutrition = getTotalNutritionWith(db)

  const sorted = sortByNumber(Object.keys(table).map(Number))
  const current = getTotalNutrition(convertDoneToTableWith(table)(done))
  const total = getTotalNutrition(table)

  const currentCalories = (
    <Fragment>
      <strong>{current['calories'] || 0}</strong>
      {units['calories']}
    </Fragment>
  )

  const rowTotal = {
    data: getRowData({ time: 'TOTAL', nutrition: total }),
    style: { fontWeight: 'bold' }
  }

  return (
    <Fragment>
      <header style={{ display: 'flex' }}>
        <p style={{ flex: 1 }}>오늘 섭취: {currentCalories}</p>
        <button style={{ flex: 'none' }} onClick={onReset}>
          reset
        </button>
      </header>
      <Table
        headings={translate(columns)}
        rows={[...sorted.reduce(reduceRows, []), rowTotal]}
      />
    </Fragment>
  )
}

TimeTable.propTypes = propTypes
TimeTable.defaultProps = defaultProps

const columns = ['time', 'name', 'categories', ...facts]
const getContent = block => column => {
  const joinWith = sep => Array.isArray(content) && content.join(sep)
  const content = block[column]
  const { nutrition } = block

  return (
    cond([
      [equals('time'), () => getTimeString(content)],
      [equals('name'), () => joinWith(' + ')],
      [equals('categories'), () => joinWith(', ')],
      [isIn(facts), () => getNutritionString(nutrition[column], column)]
    ])(column) || ''
  )
}

export default TimeTable

/* utils */
const isIn = array => item => array.includes(item)
const sortByNumber = array => array.sort((a, b) => a - b)
const getTimeString = time =>
  Number(time)
    ? (time < 12 ? 'AM' : 'PM') + ' ' + (time > 12 ? time - 12 : time) + ':00'
    : time

const getRowData = block => columns.map(getContent(block))
const convertDoneToTableWith = table => done =>
  Object.entries(done).reduce(
    (acc, [time, foodKeysList]) =>
      Object.assign(
        acc,
        Array.isArray(foodKeysList) && {
          [time]: foodKeysList.reduce(
            (acc, foodKey) => ({ ...acc, [foodKey]: table[time][foodKey] }),
            {}
          )
        }
      ),
    {}
  )
