import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputForm from '../../common/ui/InputForm'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    update: PropTypes.func
  }
  async _save (name, value) {
    console.log('Profile的save', value)
    console.log('name', name)
    console.log('value', value)
    const formData = {}
    formData[name] = value
    await this.props.update(formData)
  }
  _handleChange (name, value) {

  }
  render () {
    let { user } = this.props
    return (
      <div styleName="container">
        <div styleName="title">个人资料</div>
        <InputForm label="昵称"
                   name="name"
                   content={user.name}
                   save={(n, v) => this._save(n, v)}
                   onChange={(v) => this._handleChange(v)}
        />
      </div>
    )
  }
}

export default Profile
