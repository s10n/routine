import React from 'react'
import { func } from 'prop-types'
import { Form, Field } from 'react-final-form'

const propTypes = { onSubmit: func }
const defaultProps = { onSubmit: param => console.log(param) }

const Signin = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <Field {...field.email} />
        <Field {...field.password} />
        <button type="submit" disabled={pristine || invalid} hidden />
      </form>
    )}
  </Form>
)

Signin.propTypes = propTypes
Signin.defaultProps = defaultProps

const field = {
  email: {
    component: 'input',
    name: 'email',
    autoComplete: 'email'
  },
  password: {
    component: 'input',
    type: 'password',
    name: 'password',
    autoComplete: 'password'
  }
}

export default Signin
