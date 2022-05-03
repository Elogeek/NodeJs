const bcrypt = require("bcrypt");
const User = require ('../model/User');
const JWT = require('jsonwebtoken');

class Users {

  /**
   * Users registration.
   * @param req
   * @param res
   */
  static register = async (req, res) => {

    try {
      // Création du hash et de l'utilisateur.
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: passwordHash
      });

      // Sauvegarde de l'utilisateur.
      await user.save();
      res.status(201);
      res.json({message: "ok"});
    }
    catch(error) {
      res.status(500);
      res.json({error: "Impossible de créer votre compte"});
    }
  }

  /**
   * User login.
   * @param req
   * @param res
   */
  static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" })
      }

      const passwordOk = await bcrypt.compare(req.body.password, user.password);
      if(!passwordOk) {
        return res.status(401).json({error: "Le mot de passe n'est pas valide"});
      }

      const tokenPayload = {
        data: {
          user: user._id,
          email: user.email
        },
        options: {
          expiresIn: '12h'
        }
      }

      // Tout est ok
      res.status(200).json({
        user: user._id,
        token: JWT.sign(tokenPayload.data, "RANDOM", tokenPayload.options)
      });
    }
    catch {
      res.status(500);
      res.json({error: "Impossible de traiter la demande"});
    }
  }

  /**
   * User logout
   * @param req
   * @param res
   */
  static logout = (req, res) => {

  }
}

module.exports = Users;
