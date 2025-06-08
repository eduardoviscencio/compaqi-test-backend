import { RequestHandler, Router } from "express";
import { check } from "express-validator";

import {
  fetchLocations,
  saveLocation,
  deleteLocation,
} from "../controllers/locations.controller";

import { handleAuthorization, validateFields } from "../middlewares";

const router = Router();

router.use(handleAuthorization as RequestHandler);

router.get("/", fetchLocations);
router.post(
  "/",
  [
    check("tag").notEmpty().withMessage("Tag is required"),
    check("latitude")
      .notEmpty()
      .withMessage("Latitude is required")
      .isNumeric()
      .withMessage("Latitude must be a number"),
    check("longitude")
      .notEmpty()
      .withMessage("Longitude is required")
      .isNumeric()
      .withMessage("Longitude must be a number"),
    check("placeId").notEmpty().withMessage("Place ID is required"),
    validateFields as RequestHandler,
  ],
  saveLocation
);
router.delete("/:id", deleteLocation as unknown as RequestHandler);

export default router;
