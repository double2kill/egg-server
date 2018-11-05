'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    statistics: Object,
  });

  return mongoose.model('Weather', UserSchema);
};
