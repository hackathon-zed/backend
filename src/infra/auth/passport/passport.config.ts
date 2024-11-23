import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Service } from 'typedi';
import { enviroment } from '../../enviroment';


const users: any[] = [];

@Service()
export class PassportConfig {
    constructor() {
        this.initialize();
    }

    initialize() {
        passport.use(
            new GoogleStrategy({
                clientID: enviroment.oauth.clientId,
                clientSecret: enviroment.oauth.clientSecret,
                callbackURL: enviroment.oauth.callbackUrl
            }, (accessToken, refreshToken, profile, done) => {
                try {
                    let user = users.find((u) => u.googleId === profile.id);

                    if (!user) {
                        // Create a new user if not found
                        user = { id: users.length + 1, googleId: profile.id, profile };
                        users.push(user);
                    }
                    done(null, user);
                } catch (error) {
                    done(error);
                }
            })
        )


        passport.serializeUser((user: any, done) => {
            done(null, user.id);   // Serialize user by id
        });

        passport.deserializeUser((id, done) => {
            const user = users.find((u) => u.id === id);  // Find user by id
            done(null, user || null); // If user not found, return null
        });
    }
};