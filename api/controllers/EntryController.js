/**
 * EntryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: async (req, res) => {
    let entries = await Entry.find();

    if (entries.length > 0) {
      return res.ok(entries);
    }

    return res.send([]);
  },

  findOne: async (req, res) => {
    if (!req.params.entryId) {
      return res.badRequest(`product ${req.params.entryId} not found`);
    }

    let entries = await Entry.find({ id: req.params.entryId });
    if (entries.length > 0) {
      return res.ok(entries[0]);
    }
  },

  create: async (req, res) => {
    const amount = req.param('amount');
    const categoryId = req.param('categoryId');
    const sourceId = req.param('sourceId');

    try {
      const entry = await Entry.create({ amount: amount, category: categoryId, source: sourceId });

      return res.ok(entry);
    }
    catch (error) {
      if (error) return res.serverError(error);
    }
  },

  update: async (req, res) => {
    const id = req.param('id');

    try {
      const entry = await Entry.findOne({ id: id });
      if (!entry) return res.notFound('Entry not found');

      const data = {};
      if (req.param('amount')) data.amount = req.param('amount');
      if (req.param('categoryId')) data.category = req.param('categoryId');
      if (req.param('sourceId')) data.source = req.param('sourceId');

      const updatedEntry = await Entry.update({ id: id }, data);

      return res.ok(updatedEntry);
    }
    catch (error) {
      return res.serverError(error);
    }
  },

  delete: async (req, res) => {
    const id = req.param('id');

    try {
      const entry = await Entry.findOne({ id: id });
      if (!entry) return res.notFound('Entry not found');

      const removedEntry = await Entry.destroy({ id: id });

      return res.ok(removedEntry);
    }
    catch (error) {
      return res.serverError(error);
    }
  }
};

