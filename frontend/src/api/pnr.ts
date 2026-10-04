import { fetchApi } from './client';
import { PNR } from '../types';

export const pnrApi = {
  getStatus: (pnr: string) => fetchApi<PNR>(`/api/pnr/${encodeURIComponent(pnr)}`),
};
