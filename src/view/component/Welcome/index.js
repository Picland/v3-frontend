import React, { Component } from 'react'
// import CSSModules from 'react-css-modules'
// import styles from './index.less'
import WelcomeSection from '../WelcomeSection/'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer/'

// @CSSModules(styles)
class Welcome extends Component {
  constructor (props) {
    super(props)
    // only by this way, the EventListener can be removed
    this._handleScroll = this._handleScroll.bind(this)
    this.state = {
      shadow: false
    }
  }
  _handleScroll () {
    let bodyScrollTop = document.documentElement.scrollTop
    if (bodyScrollTop > 200) {
      this.setState({shadow: true})
    } else {
      this.setState({shadow: false})
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this._handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._handleScroll)
  }

  render () {
    return (
      <div>
        <Header logoName="木纹子印象派" buttonLink="/register" buttonName="注册" shadow={this.state.shadow} />
        <WelcomeSection />
        <Footer />
      </div>
    )
  }
}

export default Welcome
