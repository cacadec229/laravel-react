import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from '../pages/Layout'
import PrivateHeader from '../includes/navigation/PrivateHeader'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return <Route {...rest} render={props => (
    isAuthenticated ? (
      <Layout>
        <PrivateHeader />
          <Component {...props}/>
      </Layout>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>

}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: store.app.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrivateRoute)
