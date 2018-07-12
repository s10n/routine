import React, { Component } from 'react'
import { without, omit } from 'ramda'
import TimeTable from './TimeTable'
import FoodList from './FoodList'

class App extends Component {
  InitialData = { food: {}, table: {}, done: {}, weekly: {} }
  state = { idle: true, ...this.InitialData }

  componentDidMount() {
    this.props.auth.onAuthStateChanged(user =>
      this.setState({ user, idle: false }, this.subscribe)
    )
  }

  subscribe = () => {
    this.props.db.ref().on('value', snap => this.setState(snap.val() || {}))
  }

  intake = (time, key) => {
    const { done } = this.state
    const list = done[time] || []
    const updates = list.includes(key) ? without([key], list) : [...list, key]
    this.props.db.ref(`done/${time}`).set(updates)
  }

  reset = () => {
    const { done } = this.state
    const updates = omit(filterNumber(done), done)
    this.props.db.ref('done').set(updates)
  }

  renderMain = () => {
    const validate = object => !!Object.keys(object).length
    const { table, food } = this.state
    const props = { ...this.state, onIntake: this.intake, onReset: this.reset }
    return (
      <main style={{ padding: 20 }}>
        {validate(table) && <TimeTable {...props} />}
        {validate(food) && <FoodList food={sort(food)} />}
      </main>
    )
  }

  render() {
    const { idle } = this.state
    return (!idle && this.renderMain()) || null
  }
}

export default App

/* Helper */
const sort = param => param
const filterNumber = object =>
  Object.keys(object)
    .map(Number)
    .filter(Boolean)
