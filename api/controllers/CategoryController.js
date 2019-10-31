const os = require('os');
const Logger = require('r7insight_node');

const logger = new Logger({ token: '2e5c8fb2-240b-44c3-b8e4-53a423b05834' , region: 'eu'});


/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  test: (req,res) => {
    logger.info('Send container id');
    res.send({ hostname: os.hostname() });
  },
  find: async (req, res) => {
    let categories = await Category.find();

    if (categories.length > 0) {
      return res.ok(categories);
    }

    return res.send([]);
  },

  findOne: async (req, res) => {
    if (!req.params.categoryId) {
      return res.badRequest(`product ${req.params.categoryId} not found`);
    }

    let products = await Category.find({ id: req.params.categoryId });
    if (products.length > 0) {
      return res.ok(products[0]);
    }
  },

  create: async (req, res) => {
    const title = req.param('title');

    try {
      const category = await Category.create({ title: title });

      return res.ok(category);
    }
    catch (error) {
      if (error) return res.serverError(error);
    }
  },

  update: async (req, res) => {
    const id = req.param('id');

    try {
      const category = await Category.findOne({ id: id });
      if (!category) return res.notFound('Category not found');

      const data = {};
      if (req.param('title')) data.title = req.param('title');

      const updatedCategory = await Category.update({ id: id }, data);

      return res.ok(updatedCategory);
    }
    catch (error) {
      return res.serverError(error);
    }
  },

  delete: async (req, res) => {
    const id = req.param('id');

    try {
      const category = await Category.findOne({ id: id });
      if (!category) return res.notFound('Category not found');

      const removedCategory = await Category.destroy({id: id});

      return res.ok(removedCategory);
    }
    catch (error) {
      return res.serverError(error);
    }
  }
};

