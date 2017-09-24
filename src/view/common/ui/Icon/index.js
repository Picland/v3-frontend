import 'font-awesome/css/font-awesome.css'
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Icon = props => {
  const { className, type, ...other } = props
  return (
    <i className={classnames('cmui-icon fa', 'fa-' + type, className)} {...other} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  // 图标类型，http://fontawesome.io/icons/
  type: PropTypes.string.isRequired
}

export default Icon
