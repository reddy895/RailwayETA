import { fetchApi } from './client';
import { TrainInfo, TrainBetween, LiveTrain } from '../types';

export const trainApi = {
  searchByName: (name: string) =>
    fetchApi<TrainInfo[]>(`/api/trains/search?name=${encodeURIComponent(name)}`),

  searchBetween: (from: string, to: string, date?: string) => {
    const dateParam = date ? `&date=${encodeURIComponent(date)}` : '';
    return fetchApi<TrainBetween[]>(
      `/api/trains/between?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${dateParam}`
    );
  },

  getDetails: (trainNumber: string) =>
    fetchApi<TrainInfo>(`/api/trains/${encodeURIComponent(trainNumber)}`),

  getLiveStatus: (trainNumber: string, date?: string) => {
    const dateParam = date ? `?date=${encodeURIComponent(date)}` : '';
    return fetchApi<LiveTrain>(`/api/trains/${encodeURIComponent(trainNumber)}/live${dateParam}`);
  },
};
