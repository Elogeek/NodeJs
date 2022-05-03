
// Gestion des erreurs.
const dataError = (res, message, err) => {
  res.status(400);
  console.error(message, err);
  res.json({error: message})
};

module.exports = dataError;