'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const weatherJobSchema = new Schema({
    remark: String,
    cityName: String,
    users: [ String ],
  });

  return mongoose.model('WeatherJob', weatherJobSchema);
};
