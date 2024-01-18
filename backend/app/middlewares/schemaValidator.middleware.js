import _ from "lodash";

module.exports = (data) => (req, res, next) => {
  const _supportedMethods = ["post", "put"];

  const Schemas = data;
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const route = req.baseUrl + req.route.path;

  const method = req.method.toLowerCase();
  if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
    const _schema = _.get(Schemas, route);

    if (_schema) {
      try {
        const { error, value } = _schema.validate(req.body, _validationOptions);

        if (error) {
          const errorMessages = [];
          if (error?.details?.length) {
            error.details.forEach((err) => {
              errorMessages.push(err?.message);
            });
          }
          // handled error if body does not contain require parameters.
          res.status(400).json({
            mesage: errorMessages?.length
              ? errorMessages
              : error?.message || error || "Unknown error occurred",
          });
          return;
        }
        req.body = value;
        next();
      } catch (error) {
        const result = {
          message: error?.message || error,
        };
        res.status(500).json({
          message:
            error?.message || error || "Error ocurred while validate schema.",
        });
      }
    }
  } else {
    res.status(500).json({
      error: "Internal server error.",
      message: "Error while processing the request.",
    });
  }
};
