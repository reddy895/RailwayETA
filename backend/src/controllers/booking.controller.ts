import { Request, Response } from "express";
import railwayService from "../services/railway.service";
import { sendSuccess, sendError } from "../utils/response";

export class BookingController {
  // GET /api/pnr/:pnr
  async getPNRStatus(req: Request, res: Response): Promise<Response> {
    try {
      const pnr = String(req.params.pnr || "").trim();
      if (!pnr || !/^\d{10}$/.test(pnr)) {
        return sendError(res, "PNR must be a valid 10-digit number", 400, "INVALID_PNR");
      }

      const pnrStatus = await railwayService.getPNRStatus(pnr);
      return sendSuccess(res, pnrStatus);
    } catch (error: any) {
      return sendError(
        res,
        error.message || `Unable to fetch status for PNR #${req.params.pnr}`,
        500,
        "PNR_FETCH_ERROR"
      );
    }
  }

  // GET /api/availability?train=...&from=...&to=...&date=...&class=...&quota=...
  async getAvailability(req: Request, res: Response): Promise<Response> {
    try {
      const train = String(req.query.train || req.query.trainNumber || "").trim();
      const from = String(req.query.from || "").trim();
      const to = String(req.query.to || "").trim();
      const date = String(req.query.date || new Date().toISOString().split("T")[0]).trim();
      const coachClass = String(req.query.class || "SL").trim();
      const quota = String(req.query.quota || "GN").trim();

      if (!train || !from || !to) {
        return sendError(
          res,
          "Train number, source station ('from'), and destination ('to') are required",
          400,
          "MISSING_PARAMETERS"
        );
      }

      const avail = await railwayService.getSeatAvailability(
        train,
        from,
        to,
        date,
        coachClass,
        quota
      );
      return sendSuccess(res, avail);
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to check seat availability",
        500,
        "AVAILABILITY_ERROR"
      );
    }
  }

  // GET /api/fare?train=...&from=...&to=...&date=...&class=...&quota=...
  async getFare(req: Request, res: Response): Promise<Response> {
    try {
      const train = String(req.query.train || req.query.trainNumber || "").trim();
      const from = String(req.query.from || "").trim();
      const to = String(req.query.to || "").trim();
      const date = String(req.query.date || new Date().toISOString().split("T")[0]).trim();
      const coachClass = String(req.query.class || "3A").trim();
      const quota = String(req.query.quota || "GN").trim();

      if (!train || !from || !to) {
        return sendError(
          res,
          "Train number, source station ('from'), and destination ('to') are required",
          400,
          "MISSING_PARAMETERS"
        );
      }

      const fare = await railwayService.getFare(train, from, to, date, coachClass, quota);
      return sendSuccess(res, fare);
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to calculate fare breakdown",
        500,
        "FARE_CALCULATION_ERROR"
      );
    }
  }
}

export const bookingController = new BookingController();
