const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/Users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Local Strategy
passport.use(new LocalStrategy(
    { 
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async(email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Utente non trovato' });
            }

            // Verifica se l'utente ha una password
            if (!user.password) {
                return done(null, false, { message: 'Metodo di autenticazione non valido' });
            }

            // Verifica se la password è già hashata (controlla se inizia con $2b$)
            const isMatch = user.password.startsWith('$2b$') 
                ? await bcrypt.compare(password, user.password) 
                : user.password === password; // Fallback per password non hashate

            if (!isMatch) {
                return done(null, false, { message: 'Password errata' });
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    }
));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5020/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Cerca l'utente prima per googleId
        let user = await User.findOne({ googleId: profile.id });
        
        // Se non trovato per googleId, cerca per email
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
                // Se l'utente esiste con l'email ma non ha googleId, aggiorna il suo profilo
                user.googleId = profile.id;
                if (profile.photos && profile.photos[0].value) {
                    user.profileImage = profile.photos[0].value;
                }
                await user.save();
            } else {
                // Se l'utente non esiste affatto, creane uno nuovo
                const randomPassword = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(randomPassword, 10);
                
                user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName || profile.displayName.split(' ')[0],
                    lastName: profile.name.familyName || profile.displayName.split(' ')[1] || '',
                    password: hashedPassword,
                    profileImage: profile.photos[0].value
                });
                await user.save();
            }
        } else {
            // Se l'utente esiste già con googleId, aggiorna comunque le sue informazioni
            if (profile.photos && profile.photos[0].value) {
                user.profileImage = profile.photos[0].value;
                await user.save();
            }
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport; 