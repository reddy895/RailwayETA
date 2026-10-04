import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";

const router = Router();

// GET /api/pnr/:pnr
router.get("/pnr/:pnr", (req, res) => bookingController.getPNRStatus(req, res));

// GET /api/availability
router.get("/availability", (req, res) => bookingController.getAvailability(req, res));

// GET /api/fare
router.get("/fare", (req, res) => bookingController.getFare(req, res));

export default router;
