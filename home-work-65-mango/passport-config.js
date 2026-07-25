import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const users = [
    {
        id: 1,
        username: "admin",
        password: "12345",
    },
];

passport.use(
    new LocalStrategy((username, password, done) => {
        const user = users.find(
            (user) =>
                user.username === username &&
                user.password === password
        );

        if (!user) {
            return done(null, false, {
                message: "Невірний логін або пароль",
            });
        }

        return done(null, user);
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((user) => user.id === id);
    done(null, user);
});

export default passport;