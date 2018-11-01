'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    user_id: String,
    github_info: Schema.Types.Mixed,
  });

  return mongoose.model('User', UserSchema);
};
