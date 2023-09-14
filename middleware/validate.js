
const validator = require("validator");
const { check, validationResult } = require("express-validator");

exports.validation = (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
        return this.handleError(res, this.buildErrObject(422, err.array()));
    }
  };

  exports.handleError = (res, err) => {
    res.status(err.code).json({
      errors: {
        msg: err.message,
      },
      code: err.code,
    });
  };
  
  exports.buildErrObject = (code, message) => {
    return {
      code,
      message,
    };
  };

exports.login = [
    check("user_name")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    check("password")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    (req, res, next) => {
        this.validation(req, res, next);
    },
  ];


  exports.register = [
    check("email")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    check("user_name")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    check("password")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    check("full_name")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    (req, res, next) => {
        this.validation(req, res, next);
    },
  ];


  exports.sendOtp = [
    check("user_name")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    (req, res, next) => {
        this.validation(req, res, next);
    },
  ];

  exports.forgetPassword = [
    check("user_name")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    check("password")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    check("otp")
      .exists()
      .withMessage("MISSING")
      .not()
      .isEmpty()
      .withMessage("IS_EMPTY"),
    (req, res, next) => {
        this.validation(req, res, next);
    },
  ];