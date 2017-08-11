import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Profile.less'
import InputForm from '../../common/ui/InputForm'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  user: state.user.user
})

@connect(mapStateToProps)
@CSSModules(styles)
class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }
  _save () {
    console.log('Profile的save')
  }
  render () {
    let { user } = this.props
    return (
      <div styleName="container">
        <div styleName="title">个人资料</div>
        <InputForm label="昵称" content={user.name} save={() => this._save()} />
      </div>
    )
  }
}

export default Profile
