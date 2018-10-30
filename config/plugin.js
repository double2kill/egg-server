'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
