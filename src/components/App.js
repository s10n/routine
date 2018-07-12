import React, { Component } from 'react'
import TimeTable from './TimeTable'
import FoodList from './FoodList'

class App extends Component {
  state = { idle: true }

  componentDidMount() {
    this.props.auth.onAuthStateChanged(user =>
      this.setState({ user, idle: false }, this.subscribe)
    )
  }

  subscribe = () =>
    this.props.db.ref().on('value', snap => this.setState(snap.val() || {}))

  renderMain = ({ table, food, activity }) => {
    const isValid = table && food && activity
    return (
      isValid && (
        <main style={{ padding: 20 }}>
          <TimeTable table={table} food={food} activity={activity} />
          <FoodList food={sort(food)} />
        </main>
      )
    )
  }

  render() {
    const { idle } = this.state
    return (!idle && this.renderMain(this.state)) || null
  }
}

export default App

/* Helper */
const sort = param => param
