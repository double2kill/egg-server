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

module.exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};

exports.model = {
  enable: true,
  package: 'egg-model',
};
