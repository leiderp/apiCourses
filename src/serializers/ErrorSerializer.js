const BaseSerializer = require('./BaseSerializer');

class ErrorSerializer extends BaseSerializer {
  constructor(status, message) {
    super(status, message, null);
  }
}

module.exports = ErrorSerializer;
