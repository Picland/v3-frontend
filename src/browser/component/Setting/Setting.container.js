import { connect } from 'react-redux'
import Setting from './Setting.presentational'

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo
})

export default connect(mapStateToProps)(Setting)
