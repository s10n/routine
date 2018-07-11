import React, { Component } from 'react'
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

  render() {
    const { idle, food } = this.state
    return (!idle && food && <FoodList food={sort(food)} />) || null
  }
}

export default App

/* Helper */
const sort = param => param
