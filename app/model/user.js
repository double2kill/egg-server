'use strict';

module.exports = function(model, types) {
  const { STRING, INTEGER, TEXT, DATE } = types;
  return model.define('user', {
    login: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
    },
    email: STRING,
    avatar: STRING,
    created_at: DATE,
    updated_at: DATE,
  }, {
    getterMethods: {
      fullName() {
        return `${this.login} (${this.name})`;
      },
    },
    classMethods: {
      * findByLogin(login) {
        return yield this.findOne({
          where: {
            login: login.toLowerCase(),
          },
        });
      },
    },
  });
};
