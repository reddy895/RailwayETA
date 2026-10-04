import { Request, Response } from "express";
import railwayService from "../services/railway.service";
import { sendSuccess, sendError } from "../utils/response";

export class TrainController {
  // GET /api/trains/search?name=... or ?q=...
  async searchTrainByName(req: Request, res: Response): Promise<Response> {
    try {
      const name = String(req.query.name || req.query.q || "").trim();
      if (!name || name.length < 2) {
        return sendError(res, "Train search query must be at least 2 characters", 400, "INVALID_QUERY");
      }

      // If it looks like a 5-digit train number, get exact info
      if (/^\d{5}$/.test(name)) {
        const info = await railwayService.getTrainInfo(name);
        return sendSuccess(res, [info]);
      }

      const info = await railwayService.getTrainInfo(name);
      return sendSuccess(res, [info]);
    } catch (error: any) {
      return sendError(res, error.message || "Failed to search trains", 500, "TRAIN_SEARCH_ERROR");
    }
  }

  // GET /api/trains/between?from=...&to=...&date=...
  async searchTrainsBetween(req: Request, res: Response): Promise<Response> {
    try {
      const from = String(req.query.from || "").trim();
      const to = String(req.query.to || "").trim();
      const date = (req.query.date as string) || undefined;

      if (!from || !to) {
        return sendError(res, "Both 'from' and 'to' station codes are required", 400, "INVALID_STATION_CODES");
      }

      const trains = await railwayService.searchTrainsBetween(from, to, date);
      return sendSuccess(res, trains);
    } catch (error: any) {
      return sendError(res, error.message || `Unable to search trains between ${req.query.from} and ${req.query.to}`, 500, "TRAIN_BETWEEN_ERROR");
    }
  }

  // GET /api/trains/:trainNumber
  async getTrainDetails(req: Request, res: Response): Promise<Response> {
    try {
      const trainNumber = String(req.params.trainNumber || "").trim();
      if (!trainNumber) {
        return sendError(res, "Train number is required", 400, "INVALID_TRAIN_NUMBER");
      }

      const info = await railwayService.getTrainInfo(trainNumber);
      return sendSuccess(res, info);
    } catch (error: any) {
      return sendError(res, error.message || `Unable to fetch train information for ${req.params.trainNumber}`, 404, "TRAIN_NOT_FOUND");
    }
  }
}

export const trainController = new TrainController();
