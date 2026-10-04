import { Router } from "express";
import { stationController } from "../controllers/station.controller";

const router = Router();

// GET /api/stations/search?name=... or ?q=...
router.get("/search", (req, res) => stationController.searchStations(req, res));

// GET /api/stations/:stationCode
router.get("/:stationCode", (req, res) => stationController.getStationByCode(req, res));

export default router;
