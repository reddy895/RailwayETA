import { Router } from "express";
import { stationController } from "../controllers/station.controller";

const router = Router();

// GET /api/stations/search?name=... or ?q=...
router.get("/search", (req, res) => stationController.searchStations(req, res));

// GET /api/stations/:stationCode/live?hours=2|4|8
router.get("/:stationCode/live", (req, res) => stationController.getLiveBoard(req, res));

// GET /api/stations/:stationCode/timetable?date=...
router.get("/:stationCode/timetable", (req, res) => stationController.getStationTimetable(req, res));

// GET /api/stations/:stationCode
router.get("/:stationCode", (req, res) => stationController.getStationByCode(req, res));

export default router;
