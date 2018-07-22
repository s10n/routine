import React from 'react'
import { string, object } from 'prop-types'
import Serving from './Serving'
import sizes from '../constants/sizes'
import { Consumer } from './App'

const propTypes = {
  time: string.isRequired,
  name: string.isRequired,
  list: object.isRequired,
  db: object.isRequired
}

const Time = ({ time, name, list, db }) => (
  <article style={style}>
    <header style={style.header}>
      <h1 style={style.time}>{time}</h1>
      <p>{name}</p>
    </header>

    <section style={style.content}>
      <Consumer>
        {({ done, onTake }) =>
          Object.entries(list).map(([key, size], index) => {
            const isTaken = done[time] && done[time].includes(key)
            const props = {
              data: db[key],
              size: size,
              style: {
                borderTop: index && '1px solid silver',
                color: isTaken && 'silver'
              },
              onClick: () => onTake(time, key)
            }

            return <Serving {...props} key={key} />
          })
        }
      </Consumer>
    </section>
  </article>
)

Time.propTypes = propTypes

const border = '1px solid silver'
const style = {
  display: 'flex',
  alignItems: 'stretch',
  border,
  marginBottom: 10,
  time: { fontWeight: 'bold', padding: 10 },
  header: { display: 'flex', alignItems: 'center', width: sizes.row.header },
  content: { borderLeft: border }
}

export default Time
