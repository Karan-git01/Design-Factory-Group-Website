import { body } from "express-validator";

export const branchValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("slug")
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must be lowercase letters, numbers, and hyphens only."),
  body("address").trim().notEmpty().withMessage("Address is required."),
  body("phone").trim().notEmpty().withMessage("Phone is required."),
  body("email").trim().isEmail().withMessage("A valid email is required."),
  body("photoUrl").trim().isURL().withMessage("A valid photo URL is required."),
  body("latitude").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude."),
  body("longitude").isFloat({ min: -180, max: 180 }).withMessage("Invalid longitude."),
];