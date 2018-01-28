import React, { Component } from 'react'
import WelcomeSection from '../WelcomeSection/WelcomeSection.presentational'
import Header from '../../layout/Header/Header.container'
import Footer from '../../layout/Footer/Footer.presentational'

class Welcome extends Component {
  constructor (props) {
    super(props)
    // only by this way, the EventListener can be removed
    this._handleScroll = this._handleScroll.bind(this)
    this.state = {
      scroll: false
    }
  }
  _handleScroll () {
    let bodyScrollTop = document.documentElement.scrollTop
    if (bodyScrollTop > 200) {
      this.setState({scroll: true})
    } else {
      this.setState({scroll: false})
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
        <Header buttonLink="/register" buttonName="注册" scroll={this.state.scroll} />
        <WelcomeSection />
        <Footer />
      </div>
    )
  }
}

export default Welcome
