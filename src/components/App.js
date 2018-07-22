import React, { Component, createContext } from 'react'
import { without, omit } from 'ramda'
import TimeTable from './TimeTable'
import FoodList from './FoodList'
import Signin from './Signin'

export const { Provider, Consumer } = createContext()
class App extends Component {
  InitialData = { food: {}, activity: {}, table: {}, done: {}, weekly: {} }
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
  take = (time, key) => {
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
    const { food, activity, table, done } = this.state
    const props = { table, db: { ...food, ...activity }, onReset: this.reset }

    return (
      <Provider value={{ done, onTake: this.take }}>
        {validate(table) && <TimeTable {...props} />}
        {validate(food) && <FoodList food={sort(food)} />}
      </Provider>
    )
  }

  render() {
    const { idle, user } = this.state
    return idle ? null : user ? (
      <main style={style.main}>{this.renderMain()}</main>
    ) : (
      <Signin onSubmit={this.signin} />
    )
  }
}

const style = {
  main: { padding: 20 }
}

export default App

/* Helper */
const sort = param => param
const filterNumber = object =>
  Object.keys(object)
    .map(Number)
    .filter(Boolean)
