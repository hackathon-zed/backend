import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Inject, Service } from 'typedi';
import { enviroment } from '../../enviroment';
import { CustomerService } from '../../../module';
import { Customer, ICustomer } from '../../../core/model/customer';



@Service()
export class PassportConfig {
    constructor(
        @Inject("customer.service") private readonly customerService: CustomerService
    ) {
        this.initialize();

    }

    initialize() {
        passport.use(
            new GoogleStrategy({
                clientID: enviroment.oauth.clientId,
                clientSecret: enviroment.oauth.clientSecret,
                callbackURL: enviroment.oauth.callbackUrl
            }, async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log("Profile", profile);
                    const existingCustomer = await Customer.findOne({ "metadata.googleId": profile.id });
                    if (!existingCustomer) {
                        const newCustomer = await this.customerService.createCustomer({

                            name: profile.displayName,
                            email: profile.emails ? profile.emails[0].value : '',
                            metadata: {
                                googleId: profile.id,
                                provider: profile.provider,
                                emailVerified: profile.emails ? profile.emails[0].verified : false,
                                profileImageUrl: profile.photos ? profile.photos[0].value : '',
                                phoneVerified: false,
                                facebookId: "",
                            },
                        });

                        return done(null, newCustomer);
                    }


                    done(null, existingCustomer);
                } catch (error) {
                    done(error);
                }
            })
        )


        passport.serializeUser((user: any, done) => {
            done(null, user.id); // Serialize user by id
        });

        passport.deserializeUser((id, done) => {
            // Deserialize user by id
            done(null, { id: id });
        });
    }
};