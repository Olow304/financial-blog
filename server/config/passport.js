import keys from './keys';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import User from '../models/User';

/*
    passport.js is Node.js middleware, 
    by default it stores the user objects in session
    ref: https://bit.ly/2r19rTN
*/

const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.ApiKey = keys.ApiKey;

export default passport => {
    passport.use(
        new Strategy(options, (jwt_payload, done) => {
            userInfo.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null, user)
                }
                else return done(null, false)
            }).catch(err)
        })
    )
}