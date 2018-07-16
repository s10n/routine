import React, { Component, Fragment } from 'react'
import { without, omit } from 'ramda'
import TimeTable from './TimeTable'
import FoodList from './FoodList'
import Signin from './Signin'

class App extends Component {
  InitialData = { food: {}, table: {}, done: {}, weekly: {} }
  state = { idle: true, user: null, ...this.InitialData }

  componentDidMount() {
    this.props.auth.onAuthStateChanged(user =>
      this.setState({ user, idle: false }, this.subscribe)
    )
  }

  subscribe = () => {
    this.props.db.ref().on('value', snap => this.setState(snap.val() || {}))
  }

  /* Authentication */
  signin = ({ email, password }) => {
    this.props.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))
  }

  /* Database */
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

  /* render */
  renderMain = () => {
    const validate = object => !!Object.keys(object).length
    const { table, food } = this.state
    const props = { ...this.state, onIntake: this.intake, onReset: this.reset }
    return (
      <Fragment>
        {validate(table) && <TimeTable {...props} />}
        {validate(food) && <FoodList food={sort(food)} />}
      </Fragment>
    )
  }

  render() {
    const { idle, user } = this.state
    return idle ? null : user ? (
      <main style={{ padding: 20 }}>{this.renderMain()}</main>
    ) : (
      <Signin onSubmit={this.signin} />
    )
  }
}

export default App

/* Helper */
const sort = param => param
const filterNumber = object =>
  Object.keys(object)
    .map(Number)
    .filter(Boolean)
