import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
)

const KeyForm = (props) => {
  const { error, handleSubmit, submitting, submit } = props
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name='name' type='text' component={renderField} label='name' />
      <Field name='password' type='password' component={renderField} label='password' />
      {error && <strong>{error}</strong>}
      <div>
        <button className='button-primary' type='submit' disabled={submitting}>generate</button>
      </div>
    </form>
  )
}

const mapStateToProps = (store) => ({
})

const mapDispatchToProps = (dispatch) => ({
  submit: data => dispatch({type: 'create_key', data})
})

export default reduxForm({
  form: 'key'  // a unique identifier for this form
})(connect(mapStateToProps, mapDispatchToProps)(KeyForm))
