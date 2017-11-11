# react-rails step by step
## Environment setup
* Install yarn using `brew install yarn` on macOS. 
* `rails new -T --skip-coffee react-rails-example`
* `cd react-rails-example`
* add `gem 'webpacker'` and `gem 'react-rails', '~>2.4'` to `Gemfile`
* `bundle install`
* `rails webpacker:install`
* `rails webpacker:install:react`
* `rails g react:install`
## Set up a route and controller for frontend
* add `root 'frontend#index'` to `/config/routes.rb`. This can be any controller, but I'm doing a nonRESTful route because it isn't linked to a model.
* generate controller `rails g controller frontend index`
## Generate first component, call it from view, and set up layout so everything works
* generate App javascript component `rails g react:component App` (this literally just makes a file in `/app/javascript/components` called App.js and has some react boilerplate)
* edit `/app/javascript/components/App.js` to have more than just an empty div. (Will provide instructions for setting up react router later)
```jsx
import React from "react"
import PropTypes from "prop-types"
class App extends React.Component {
  render () {
    return (
      <div>
        I am the App Component
      </div>
    )
  }
}
// Always remember to export your component
export default App
```
* add `<%= javascript_pack_tag 'application' %>` to `/app/views/layouts/application.html.erb`. This step is missing from the tutorial for some reason (or it should automatically happen)
* add `<%= react_component("App") %>` to `/app/views/frontend/index.html.erb`
## Running the server
* start the webpack-dev-server, which lets you get instant reloading of the page when you edit a component. It also compiles all your React/ES6 stuff. `.bin/webpack-dev-server`
* start the rails server `bin/rails s`
* Visit app at http://localhost:3000
## Make starting the server only one command (Optional)
* Install foreman, which let's you run two commands at once. It should not go in your `Gemfile`, so just install it using `gem install foreman` from the command line.
* Create a file that specifies the commands for foreman to run. In the root directory, make a file called Procfile.dev and include the following lines
```
web: bundle exec rails s -p 3000
webpacker: ./bin/webpack-dev-server
```
* Create a file `/bin/server` and add the lines
```
#!/bin/bash -i
foreman start -f Procfile.dev
```
* Now you can start both servers by running `bin/server` from the terminal
# Set up react-router
This is an example of how to set up an app that has a header, footer, and main
content area that you can change out with three separate routes.
* add react-router and react-router-dom to `package.json` by running `yarn add
  react-router react-router-dom`
* set up Header, Footer, AppRouter, and Main components
```
rails g react:component Header
rails g react:component Footer
rails g react:component AppRouter
rails g react:component Main
rails g react:component Home
rails g react:component Example
rails g react:component SomePage
```
* Make AppRouter the new parent component. This is necessary to make the router
  work. Edit your view file so it calls `<%= react_component("AppRouter") %>`
* Edit `/app/javascript/components/AppRouter.js`

```jsx
// /app/javascript/components/AppRouter.js
import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from 'react-router-dom'
import App from './App'

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
```
* Your app needs to live inside the BrowseRouter component. We will set up an App which will have an optional Header and Footer with a Main content component in the middle. This makes App essentially like your application layout file. The Main component will have the rest of the logic fo switching betwen frontend components 

```jsx
// /app/javascript/components/App.js
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
```
* The Main component has a child component called Switch that lets you define
  routes inside it. Using switch means it only use the first matching route. If
you only use Route components, all components that match the required setting
will be rendered in order. For this example, I'm using Switch.
* Route components need a path, which defines the url that will cause the
  specified component prop to render. Don't forget to import all the components
you are giving to your Routes.

```jsx
// /app/javascript/components/Main.js
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
```

* The Header component has navigation links to demonstrate how everything works
  together. The react router component `Link` has a `to` property that specifies
the new url. It can be given a style prop just like a normal anchor tag, and
generates an normal anchor tag in the html.

```jsx
// /app/javascript/components/Header.js
import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render () {
    return (
      <div className="header" style={{height: '200px', backgroundColor: 'honeydew'}}>
        <h2>I am the header</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/example">Example</Link></li>
          <li><Link to="/some_page">Some Page</Link></li>
        </ul>
      </div>
    )
  }
}

export default Header
```
* The rest of the files can be seen in the repo
  * [Header.js](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/Header.js)
  * [Footer.js](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/Footer.js)
  * [Home.js](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/Home.js)
  * [Example.js](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/Example.js)
  * [SomePage.js](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/SomePage.js)
  * [Main.js](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/Main.js)
  * [App](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/App.js)
  * [AppRouter](https://github.com/joshleichtung/react-rails-example/blob/master/app/javascript/components/AppRouter.js)
# Set up the Rails router to route any unmatched routes to the js frontend
While react router will let you click links to go to new pages and let you use
  the back and forward browser buttons, you will get a Rails routing error if
you go directly to one of the react route urls. Here is a way to fix this
behavior. The downside is that you will not get a routing error unless you
configure a catchall route in the react router Switch component. This is done in
the example above.
* In your `/config/routes.rb` file, make the very last line `get "*path", to: 'frontend#index'`. Replace the controller to match the controller you are using to render your react front end.
* TODO - Write how to do resourceful react routes like '/dogs/:id'
Visit [React Router](https://github.com/ReactTraining/react-router) to see more
info on how to use it.
