const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");


if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,

        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:3000/auth/google/callback"
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(
              new Error("Google account does not have an email address"),
              null
            );
          }


          let user = await User.findOne({
            email: email
          });


          if (!user) {
            user = await User.create({
              name: profile.displayName,

              email: email,

              profileImage:
                profile.photos?.[0]?.value || "",

              oauthProvider: "Google",

              lastLogin: Date.now()
            });

          } else {

            user.lastLogin = Date.now();

            await user.save();

          }


          return done(null, user);


        } catch (error) {

          return done(error, null);

        }
      }
    )
  );
}


// Store user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// Retrieve user from session
passport.deserializeUser(async (id, done) => {

  try {

    const user = await User.findById(id);

    done(null, user);


  } catch (error) {

    done(error, null);

  }

});


module.exports = passport;