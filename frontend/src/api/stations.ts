import { fetchApi } from './client';
import { StationBoard } from '../types';

export const stationApi = {
  search: (query: string) =>
    fetchApi<Array<{ stationCode: string; stationName: string }>>(
      `/api/stations/search?name=${encodeURIComponent(query)}`
    ),

  getByCode: (code: string) =>
    fetchApi<{ stationCode: string; stationName: string }>(
      `/api/stations/${encodeURIComponent(code)}`
    ),

  getLiveBoard: (code: string, hours: 2 | 4 | 8 = 4) =>
    fetchApi<StationBoard>(
      `/api/stations/${encodeURIComponent(code)}/live?hours=${hours}`
    ),
};
