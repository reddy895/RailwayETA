import NodeCache from "node-cache";
import { railkitService } from "./railkit.service";
import {
  NormalizedTrainInfo,
  NormalizedLiveTrack,
  NormalizedStationBoard,
  NormalizedTrainBetween,
  NormalizedPNR,
  NormalizedAvailability,
} from "../types/railway";

class RailwayService {
  private cache: NodeCache;
  private inFlightRequests: Map<string, Promise<any>> = new Map();

  constructor() {
    this.cache = new NodeCache({ stdTTL: 300, checkperiod: 60, useClones: false });
  }

  private async getOrFetch<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    if (this.inFlightRequests.has(key)) {
      return this.inFlightRequests.get(key) as Promise<T>;
    }

    const promise = (async () => {
      try {
        const result = await fetcher();
        if (result) {
          this.cache.set(key, result, ttlSeconds);
        }
        return result;
      } finally {
        this.inFlightRequests.delete(key);
      }
    })();

    this.inFlightRequests.set(key, promise);
    return promise;
  }

  // 1. Station details by code (TTL: 30 mins)
  async getStationByCode(code: string): Promise<{ stationCode: string; stationName: string }> {
    const key = `station:code:${code.toUpperCase().trim()}`;
    return this.getOrFetch(key, 1800, () => railkitService.getStationDetails(code));
  }

  // 2. Train schedule & station route (TTL: 30 mins)
  async getTrainInfo(trainNumber: string): Promise<NormalizedTrainInfo> {
    const key = `train:info:${trainNumber.trim()}`;
    return this.getOrFetch(key, 1800, () => railkitService.getTrainInfo(trainNumber));
  }

  // 3. Search trains between stations (TTL: 10 mins)
  async searchTrainsBetween(from: string, to: string, date?: string): Promise<NormalizedTrainBetween[]> {
    const dateStr = date || "today";
    const key = `trains:between:${from.toUpperCase().trim()}:${to.toUpperCase().trim()}:${dateStr}`;
    return this.getOrFetch(key, 600, () => railkitService.searchTrainsBetween(from, to, date));
  }

  // 4. Live train status & ETA (TTL: 90 seconds)
  async getLiveTrainStatus(trainNumber: string, date?: string): Promise<NormalizedLiveTrack> {
    const dateStr = date || "today";
    const key = `train:live:${trainNumber.trim()}:${dateStr}`;
    return this.getOrFetch(key, 90, () => railkitService.getLiveTracking(trainNumber, date));
  }

  // 5. Live station arrival/departure board (TTL: 90 seconds)
  async getStationLiveBoard(stationCode: string, hours: 2 | 4 | 8 = 4): Promise<NormalizedStationBoard> {
    const key = `station:live:${stationCode.toUpperCase().trim()}:${hours}`;
    return this.getOrFetch(key, 90, () => railkitService.getStationBoard(stationCode, hours));
  }

  // 6. PNR status enquiry (TTL: 30 seconds)
  async getPNRStatus(pnr: string): Promise<NormalizedPNR> {
    const key = `pnr:${pnr.trim()}`;
    return this.getOrFetch(key, 30, () => railkitService.getPNRStatus(pnr));
  }

  // 7. Seat availability (TTL: 60 seconds)
  async getSeatAvailability(
    trainNumber: string,
    from: string,
    to: string,
    date: string,
    coachClass: string,
    quota: string = "GN"
  ): Promise<NormalizedAvailability> {
    const key = `avail:${trainNumber.trim()}:${from.toUpperCase().trim()}:${to.toUpperCase().trim()}:${date}:${coachClass.toUpperCase().trim()}:${quota.toUpperCase().trim()}`;
    return this.getOrFetch(key, 60, () =>
      railkitService.getAvailability({
        train: trainNumber,
        from,
        to,
        date,
        class: coachClass,
        quota,
      })
    );
  }

  // 8. Fare details (TTL: 10 mins)
  async getFare(
    trainNumber: string,
    from: string,
    to: string,
    date: string,
    coachClass: string,
    quota: string = "GN"
  ): Promise<any> {
    const key = `fare:${trainNumber.trim()}:${from.toUpperCase().trim()}:${to.toUpperCase().trim()}:${date}:${coachClass.toUpperCase().trim()}:${quota.toUpperCase().trim()}`;
    return this.getOrFetch(key, 600, () =>
      railkitService.getFare({
        train: trainNumber,
        from,
        to,
        date,
        class: coachClass,
        quota,
      })
    );
  }

  // Cache flush utility
  flushCache(): void {
    this.cache.flushAll();
  }
}

export default new RailwayService();
