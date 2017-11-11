import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Your app needs to live inside the BrowseRouter component. We will set up
// an App which will have an optional Header and Footer with a Main content component in
// the middle. This makes App essentially like your application layout file. 
// The Main component will have the rest of the logic fo switching betwen frontend components
//
class AppRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }
}

export default AppRouter
