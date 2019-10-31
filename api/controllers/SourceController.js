/**
 * SourceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: async (req, res) => {
    let sources = await Source.find();

    if (sources.length > 0) {
      return res.ok(sources);
    }

    return res.send([]);
  },

  findOne: async (req, res) => {
    if (!req.params.sourceId) {
      return res.badRequest(`product ${req.params.sourceId} not found`);
    }

    let products = await Source.find({ id: req.params.sourceId });
    if (products.length > 0) {
      return res.ok(products[0]);
    }
  },

  create: async (req, res) => {
    const title = req.param('title');

    try {
      const source = await Source.create({ title: title });

      return res.ok(source);
    }
    catch (error) {
      if (error) return res.serverError(error);
    }
  },

  update: async (req, res) => {
    const id = req.param('id');

    try {
      const source = await Source.findOne({ id: id });
      if (!source) return res.notFound('Source not found');

      const data = {};
      if (req.param('title')) data.title = req.param('title');

      const updatedSource = await Source.update({ id: id }, data);

      return res.ok(updatedSource);
    }
    catch (error) {
      return res.serverError(error);
    }
  },

  delete: async (req, res) => {
    const id = req.param('id');

    try {
      const source = await Source.findOne({ id: id });
      if (!source) return res.notFound('Source not found');

      const removedSource = await Source.destroy({id: id});

      return res.ok(removedSource);
    }
    catch (error) {
      return res.serverError(error);
    }
  }
};

