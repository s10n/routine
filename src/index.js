import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { auth, db } from './firebase'
import App from './components/App'

ReactDOM.render(<App auth={auth} db={db} />, document.getElementById('routine'))
