'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    user_id: String,
    github_info: Schema.Types.Mixed,
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

  return mongoose.model('User', UserSchema);
};
