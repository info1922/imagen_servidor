import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import userModel from '../api/resources/user/user.model';

var GOOGLE_CONSUMER_KEY = '450526813040-e7unna6krd5802nsg72vkna2lnh08s28.apps.googleusercontent.com';
var GOOGLE_CONSUMER_SECRET = 'L_7NrjpzccvIY8J9gWTiRB3q';
var CALLBACK_URL = 'http://localhost:3000/api/auth/google/callback';
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
/* jshint ignore:start */
export const configureGoogleStrategy = () => {
    passport.use(new GoogleStrategy.OAuth2Strategy({
            clientID: GOOGLE_CONSUMER_KEY,
            clientSecret: GOOGLE_CONSUMER_SECRET,
            callbackURL: CALLBACK_URL
        },
        async(accesToken, refreshToken, profile, done) => {

            try {
                console.log('Access token: ', accesToken);
                console.log('Refresh token: ', refreshToken);
                console.log('Profile: ', profile);

                const user = await userModel.findOne({ 'google.id': profile.id });

                if (user) {
                    return done(null, user)
                }

                const newUser = new userModel({});

                newUser.google.id = profile.id;
                newUser.google.token = accesToken;
                newUser.google.photo = profile.photos[0].value;
                newUser.google.displayName = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                await newUser.save();

                done(null, newUser);
            } catch (error) {
                console.log(error);
                return done(error);
            }

            // User.findOrCreate({ googleId: profile.id }, function(err, user) {
            //     return done(err, user);
            // });
        }
    ));
};