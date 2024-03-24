const BaseSerializer = require('./BaseSerializer');

class LessonSerializer extends BaseSerializer {
  constructor(model) {
    const serializedModel = model ? model.toJSON() : null;

    super('success', serializedModel);
  }
}

module.exports = LessonSerializer;