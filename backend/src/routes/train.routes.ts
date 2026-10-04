import { Router } from "express";
import { trainController } from "../controllers/train.controller";

const router = Router();

// GET /api/trains/search?name=... or ?q=...
router.get("/search", (req, res) => trainController.searchTrainByName(req, res));

// GET /api/trains/between?from=...&to=...&date=...
router.get("/between", (req, res) => trainController.searchTrainsBetween(req, res));

// GET /api/trains/:trainNumber
router.get("/:trainNumber", (req, res) => trainController.getTrainDetails(req, res));

export default router;
