import { body } from "express-validator";

export const projectValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("year")
    .isInt({ min: 1900, max: 2100 })
    .withMessage("Year must be a valid year."),
  body("location").trim().notEmpty().withMessage("Location is required."),
  body("description").trim().notEmpty().withMessage("Description is required."),
  body("imageUrl").trim().isURL().withMessage("A valid image URL is required."),
  body("status")
    .isIn(["Ongoing", "Completed"])
    .withMessage("Status must be Ongoing or Completed."),
];