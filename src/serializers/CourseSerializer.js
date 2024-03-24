const BaseSerializer = require('./BaseSerializer');

class CourseSerializer extends BaseSerializer {
  constructor(model) {
    const serializedModel = model ? model.toJSON() : null;
    delete serializedModel?.deletedAt;

    super('success', serializedModel);
  }
}

module.exports = CourseSerializer;
