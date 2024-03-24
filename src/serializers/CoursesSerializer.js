const BaseSerializer = require("./BaseSerializer");

class CoursesSerializer extends BaseSerializer {
  constructor(models, paginationInfo) {
    const serializedModels = models.map((model) => {
      const serializedModel = model.toJSON();
      
      serializedModel.numLessons = serializedModel?.lessons.length;
      delete serializedModel?.lessons;

      return serializedModel;
    });

    super("success", serializedModels, paginationInfo);
  }
}

module.exports = CoursesSerializer;
