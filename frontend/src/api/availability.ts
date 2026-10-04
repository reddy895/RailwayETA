import { fetchApi } from './client';
import { Availability } from '../types';

export const availabilityApi = {
  checkAvailability: (params: {
    train: string;
    from: string;
    to: string;
    date: string;
    coachClass: string;
    quota?: string;
  }) => {
    const query = new URLSearchParams({
      train: params.train,
      from: params.from,
      to: params.to,
      date: params.date,
      class: params.coachClass,
      quota: params.quota || 'GN',
    }).toString();
    return fetchApi<Availability>(`/api/availability?${query}`);
  },

  getFare: (params: {
    train: string;
    from: string;
    to: string;
    date: string;
    coachClass: string;
    quota?: string;
  }) => {
    const query = new URLSearchParams({
      train: params.train,
      from: params.from,
      to: params.to,
      date: params.date,
      class: params.coachClass,
      quota: params.quota || 'GN',
    }).toString();
    return fetchApi<any>(`/api/fare?${query}`);
  },
};
