import React from "react"
import PropTypes from "prop-types"
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

class App extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App
