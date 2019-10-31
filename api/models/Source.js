/**
 * Source.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {
    title: { type: 'string', required: true }
  },

};

