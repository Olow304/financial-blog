import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

const PrivatePages = ({component: Component, auth, ...rest}) => (
    <Route 
        {...rest}
        render={props => 
            auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : ( <Redirect to="/login" />
            )
        }
    />
)

PrivatePages.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivatePages)