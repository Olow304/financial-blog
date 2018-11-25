import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { userRegister } from '../../actions/loginRegAction'
import { connect } from 'react-redux'
import InputFieldGroup from '../../helper/InputFieldGroup'
import propTypes from 'prop-types'

class register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/dashboard")
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const vUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        this.props.userRegister(vUser, this.props.history)
    }

    render() {
        const { errors } = this.state
        return (
            <div className="register">
                <div className="container rale">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h2 className="display-4 text-left">Register</h2>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <InputFieldGroup 
                                    placeholder="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    error={errors.username} />
                                <InputFieldGroup 
                                    placeholder="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email} />

                                <InputFieldGroup 
                                    placeholder="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password} />
                                    
                                <InputFieldGroup 
                                    placeholder="confirmPassword"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    error={errors.confirmPassword} />

                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

register.propTypes = {
    userRegister: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, {userRegister})(withRouter(register));