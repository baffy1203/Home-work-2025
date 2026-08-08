import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "./models/User.js";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, {
                        message: "Користувача не знайдено",
                    });
                }

                if (user.password !== password) {
                    return done(null, false, {
                        message: "Невірний пароль",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;