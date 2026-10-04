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

  // GET /api/stations/:stationCode/live?hours=2|4|8
  async getLiveBoard(req: Request, res: Response): Promise<Response> {
    try {
      const stationCode = String(req.params.stationCode || "").trim();
      const hoursParam = Number(req.query.hours || 4);
      const hours: 2 | 4 | 8 = [2, 4, 8].includes(hoursParam) ? (hoursParam as 2 | 4 | 8) : 4;

      if (!stationCode) {
        return sendError(res, "Station code is required", 400, "INVALID_STATION_CODE");
      }

      const board = await railwayService.getStationLiveBoard(stationCode, hours);
      return sendSuccess(res, board);
    } catch (error: any) {
      return sendError(
        res,
        error.message || `Unable to fetch live board for station ${req.params.stationCode}`,
        500,
        "STATION_BOARD_ERROR"
      );
    }
  }

  // GET /api/stations/:stationCode/timetable?date=...
  async getStationTimetable(req: Request, res: Response): Promise<Response> {
    try {
      const stationCode = String(req.params.stationCode || "").trim();
      const date = (req.query.date as string) || undefined;

      if (!stationCode) {
        return sendError(res, "Station code is required", 400, "INVALID_STATION_CODE");
      }

      const board = await railwayService.getStationLiveBoard(stationCode, 8);
      return sendSuccess(res, {
        stationCode: board.stationCode,
        stationName: board.stationName,
        date: date || new Date().toISOString().split("T")[0],
        totalPassingTrains: board.trains.length,
        trains: board.trains,
      });
    } catch (error: any) {
      return sendError(
        res,
        error.message || `Unable to fetch timetable for station ${req.params.stationCode}`,
        500,
        "STATION_TIMETABLE_ERROR"
      );
    }
  }
}

export const stationController = new StationController();
