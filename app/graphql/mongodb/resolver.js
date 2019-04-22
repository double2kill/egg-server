'use strict';

const getListCollections = mongoose => {
  return new Promise((res, rej) => {
    mongoose.connection.db.listCollections().toArray(function(err, names) {
      if (err) {
        rej(err);
      } else {
        res(names);
      }
    });
  });
};

module.exports = {
  Query: {
    collections: async (root, _, ctx) => {
      const mongoose = await ctx.app.mongoose;
      const results = await getListCollections(mongoose);
      return results;
    },
  },
};
