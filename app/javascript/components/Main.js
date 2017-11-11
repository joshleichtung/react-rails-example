import React from "react"
import PropTypes from "prop-types"
import { Switch, Route } from 'react-router-dom'
import Example from './Example'
import SomePage from './SomePage'
import Home from './Home'

class Main extends React.Component {
  render () {
    return (
      <div className="main-content" style={{height: '100%'}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/example" component={Example} />
          <Route exact path="/some_page" component={SomePage} />
          <Route path="/*" render = {() => <div><h1>404 Not Found</h1></div>} />
        </Switch>
      </div>
    )
  }
}

export default Main
