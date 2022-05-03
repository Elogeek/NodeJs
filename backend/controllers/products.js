const Product = require('../model/Product');
const dataError = require('../utils/DataError');

class Products {

  /**
   * Return all products.
   * @param req
   * @param res
   */
    static getAllProducts = (req, res) => {
      Product.find()
        .then(products => {
          res.status(200);
          res.json(products)
        })
        .catch(err =>
          dataError(res, "Impossible de récupérer les produits", err)
        )
      ;
    }

  /**
   * Return available product id.
   * @param req
   * @param res
   */
  static getById = (req, res) => {
    Product.findById(req.params.id)
      .then(product => {
        res.status(200);
        res.json(product)
      })
      .catch(err => dataError(res, "Erreur de récupération du produit", err))
    ;
  }

  /**
   * Find a product by key + value.
   * @param req
   * @param res
   */
  static find = (req, res) => {
    const search = {};
    search[req.params.key] = req.params.value;
    Product.findOne(search)
      .then(product => {
        res.status(200);
        res.json(product)
      })
      .catch(err => dataError(res, "Impossible de trouver ce produit", err))
    ;
  }

  /**
   * Add a new product.
   * @param req
   * @param res
   */
  static add = (req, res) => {
    const product = new Product({...req.body});
    product.save()
      .then(() => {
        res.status(201);
        res.json({message: "ok"});
      })
      .catch(err => dataError(res, "Impossible d'enregistrer le produit", err))
    ;
  }

  /**
   * Update a product.
   * @param req
   * @param res
   */
  static update = (req, res) => {
    Product.updateOne({_id: req.params.id}, {...data, _id: req.params.id})
      .then(result => {
        res.status(204);
        res.json(result)
      }) // Je renvoie les informations de feedback renvoyées par mongoose, voir postman
      .catch(err => dataError(res, "Impossible de mettre à jour le produit", err))
    ;
  }

  /**
   * Delete a product.
   * @param req
   * @param res
   */
  static delete = (req, res) => {
    Product.deleteOne({_id: req.params.id})
      .then(deleteResult => {
        res.status(204); // 204 = no content -> généralement renvoyée quand données mises à jour, mais aucune création, 200 peut aussi convenir
        res.json(deleteResult)
      })
      .catch(err => dataError(res, "Impossible de supprimer ce produit", err))
    ;
  }
}

module.exports = Products;