import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputNew from '../../InputNew'

const FormInput = (props, context) => {
  const { children, className, onChange, ...other } = props
  const { form, formItem } = context
  other.value = form.getItemValue(formItem)
  other.onChange = value => {
    form.setItemValue(formItem, value)
    onChange && onChange(value)
  }
  return <InputNew className={classnames('cmui-form-input', className)} {...other} />
}

FormInput.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

FormInput.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export default FormInput
