import { body } from "express-validator";

export const jobValidationRules = [
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),
  body("contactNumber").trim().notEmpty().withMessage("Contact number is required."),
  body("contactEmail").trim().isEmail().withMessage("A valid contact email is required."),
];