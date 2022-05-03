const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Récupération du token depuis le header, dans la partie "authorization"
    // Le token ressemble à ceci, avec l'espace entre Bearer et le token:
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI1YTg0NzM2MjY3YmUxNjVlZTBjM2Q1IiwiZW1haWwiOiJqZXJvbWVAdXB0by5mciIsImlhdCI6MTY1MDEwMzE2NSwiZXhwIjoxNjUwMTQ2MzY1fQ.wA9xgdAV1cTSdnfMYGsL7vUIuc111sX6NugZ0bf_wO4
    // On récupère donc la partie de droite de la valeur de "authorization"
    const token = req.headers.authorization.split(' ')[1];

    // On utilise la méthode verify() qui fait le match avec le token fourni, et la phrase secrète qu'on avait utilisé
    const decodedToken = jwt.verify(token, 'RANDOM'); // Attention d'utiliser le même secret que dans la génération du token.

    const userId = decodedToken.userId;
    if (req.body.user && req.body.user !== decodedToken.user) {
      // On gère le cas ou un utilisateur ne peut accéder qu'à son contenu par exemple !
      res.status(401).end(); // unauthorized.
    }
    // On passe au liddleware suivant. S'il n'y a pas d'erreur a ce stade, le token est valie.
    else {
      next();
    }
  }
  // Si le token n'existe pas ou s'il est impossible de le parser / décoder => on envoie un message d'erreur, on a besoin du token
  catch {
    res.status(401).json({
      error: "Requête invalide"
    });
  }
};
