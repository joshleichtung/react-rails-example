# react-rails step by step
## Environment setup
* Install yarn using `brew install yarn` on macOS. 
* `rails new -T --skip-coffee react-rails-example`
* `cd react-rails-example`
* add `gem 'webpacker'` and `gem 'react-rails'` to `Gemfile`
* `bundle install`
* `bin/rails webpacker:install`
* `bin/rails webpacker:install:react`
* `bin/rails g react:install`
## Set up a route and controller for frontend
* add `root 'frontend#index'` to `/config/routes.rb`. This can be any controller, but I'm doing a nonRESTful route because it isn't linked to a model.
* generate controller `rails g controller frontend index`
## Generate first component, call it from view, and set up layout so everything works
* generate App javascript component `bin/rails g react:component App` (this literally just makes a file in `/app/javascript/components` called App.js and has some react boilerplate)
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
