'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const WeatherSchema = new Schema({
    text: String,
    date: String,
    city: String,
    data: [],
    statistics: {},
    users: [],
    create_time: { type: Date, default: Date.now },
  });

  return mongoose.model('Weather', WeatherSchema);
};
