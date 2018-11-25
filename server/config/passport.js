import keys from './keys';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as JwtStrat} from 'passport-jwt';
import User from '../models/User';

/*
    passport.js is Node.js middleware, 
    by default it stores the user objects in session
    ref: https://bit.ly/2r19rTN
*/

const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

export default passport => {
    passport.use(
        new JwtStrat(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null, user)
                }
                else return done(null, false)
            }).catch(err)
        })
    )
}