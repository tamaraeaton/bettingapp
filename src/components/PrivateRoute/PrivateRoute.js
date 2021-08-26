import React, { Children } from 'react'
import {
    Route,
    Redirect,

} from 'react-router-dom'

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100) // fake async
    }
  }

function PrivateRoute ({ component: Component, ...rest }) {
    <Route {...rest} render={() => {
        return fakeAuth.isAuthenticated === true
        ? Children: <Redirect to='/login' />
    }

    }>
            
    </Route>
}