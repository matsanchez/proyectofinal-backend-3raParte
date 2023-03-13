import passport from "passport";
import local from "passport-local";
import { loadEmail } from "../utils/nodemailer.js";
import { userSchema } from "../models/user.model.js";
import { cartSchema } from "../models/cart.model.js";
import { createHash, isValid } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
      const { name, address, age, phone } = req.body;
      const file = req.file.filename;
      try {
        let user = await userSchema.findOne({ username });
        if (user) return done(null, false, { message: "Ya existe un usuario registrado con ese Email" });
        /* crear un carrito y que me devuelva el id para ponerselo al usuario y registrarlo */
        let cart_id = await cartSchema.create({ email: username, name: name });
        const newUser = {
          username,
          password: createHash(password),
          name: name,
          address: address,
          age: age,
          phone: phone,
          file: file,
          cart_id: cart_id._id,
        };
        try {
          let result = await userSchema.create(newUser);
          if (result) loadEmail(newUser);
          return done(null, result);
        } catch (error) {
          done(error);
        }
      } catch (error) {
        done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    userSchema.findById(id, done);
  });
  passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
      try {
        let user = await userSchema.findOne({ username });
        if (!user) return done(null, false, { message: "No existe usuario regitrado con ese Email" });
        if (!isValid(user, password)) return done(null, false, { message: "Contraseña incorrecta" });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};
