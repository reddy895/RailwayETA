import { Request, Response } from "express";
import railwayService from "../services/railway.service";
import { railkitService } from "../services/railkit.service";
import { sendSuccess, sendError } from "../utils/response";

export class StationController {
  // GET /api/stations/search?name= or ?q=
  async searchStations(req: Request, res: Response): Promise<Response> {
    try {
      const name = (req.query.name || req.query.q || "") as string;
      if (!name || name.trim().length < 2) {
        return sendError(res, "Search query must be at least 2 characters", 400, "INVALID_QUERY");
      }

      // Try searching via railkit service / railway service
      const stations = await railkitService.searchStations(name.trim());
      return sendSuccess(res, stations);
    } catch (error: any) {
      return sendError(
        res,
        error.message || "Failed to search stations",
        500,
        "STATION_SEARCH_ERROR"
      );
    }
  }

  // GET /api/stations/:stationCode
  async getStationByCode(req: Request, res: Response): Promise<Response> {
    try {
      const stationCode = String(req.params.stationCode || "").trim();
      if (!stationCode) {
        return sendError(res, "Station code is required", 400, "INVALID_STATION_CODE");
      }

      const station = await railwayService.getStationByCode(stationCode);
      return sendSuccess(res, station);
    } catch (error: any) {
      return sendError(
        res,
        error.message || `Unable to retrieve station details for ${req.params.stationCode}`,
        404,
        "STATION_NOT_FOUND"
      );
    }
  }
}

export const stationController = new StationController();
