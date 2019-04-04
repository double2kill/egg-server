'use strict';
module.exports = {
  Query: {
    collections: async (root, _, ctx) => {
      const mongoose = await ctx.app.mongoose;

      mongoose.connection.db.listCollections().toArray(function(err, names) {
        console.log(names);
      });
      return {
        name: '1111',
      };
    },
  },
};
