/**
 * Entry.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    amount: { type: 'number', required: true },
    category: { model: 'category', required: true },
    source: { model: 'source', required: true }
  },

};

