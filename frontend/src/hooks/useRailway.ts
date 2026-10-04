import { useQuery } from '@tanstack/react-query';
import { trainApi } from '../api/trains';
import { stationApi } from '../api/stations';
import { pnrApi } from '../api/pnr';
import { availabilityApi } from '../api/availability';

// 1. Hook for live train tracking
export function useLiveTrain(trainNumber: string, date?: string) {
  return useQuery({
    queryKey: ['liveTrain', trainNumber, date],
    queryFn: () => trainApi.getLiveStatus(trainNumber, date),
    enabled: Boolean(trainNumber && trainNumber.length >= 4),
    refetchInterval: 60000, // Auto refresh every 60 seconds
    staleTime: 45000,
  });
}

// 2. Hook for train schedule & info
export function useTrainDetails(trainNumber: string) {
  return useQuery({
    queryKey: ['trainDetails', trainNumber],
    queryFn: () => trainApi.getDetails(trainNumber),
    enabled: Boolean(trainNumber && trainNumber.length >= 4),
    staleTime: 300000,
  });
}

// 3. Hook for trains between stations
export function useTrainBetween(from: string, to: string, date?: string) {
  return useQuery({
    queryKey: ['trainBetween', from, to, date],
    queryFn: () => trainApi.searchBetween(from, to, date),
    enabled: Boolean(from && to && from.length >= 2 && to.length >= 2),
    staleTime: 120000,
  });
}

// 4. Hook for train search by name/number
export function useTrainSearch(name: string) {
  return useQuery({
    queryKey: ['trainSearch', name],
    queryFn: () => trainApi.searchByName(name),
    enabled: Boolean(name && name.length >= 2),
    staleTime: 300000,
  });
}

// 5. Hook for station live board
export function useStationBoard(stationCode: string, hours: 2 | 4 | 8 = 4) {
  return useQuery({
    queryKey: ['stationBoard', stationCode, hours],
    queryFn: () => stationApi.getLiveBoard(stationCode, hours),
    enabled: Boolean(stationCode && stationCode.length >= 2),
    refetchInterval: 60000,
    staleTime: 45000,
  });
}

// 6. Hook for station search
export function useStationSearch(query: string) {
  return useQuery({
    queryKey: ['stationSearch', query],
    queryFn: () => stationApi.search(query),
    enabled: Boolean(query && query.length >= 2),
    staleTime: 600000,
  });
}

// 7. Hook for PNR status lookup
export function usePNR(pnr: string) {
  return useQuery({
    queryKey: ['pnrStatus', pnr],
    queryFn: () => pnrApi.getStatus(pnr),
    enabled: Boolean(pnr && /^\d{10}$/.test(pnr)),
    staleTime: 30000,
  });
}

// 8. Hook for seat availability
export function useAvailability(params: {
  train: string;
  from: string;
  to: string;
  date: string;
  coachClass: string;
  quota?: string;
}) {
  return useQuery({
    queryKey: ['availability', params.train, params.from, params.to, params.date, params.coachClass, params.quota],
    queryFn: () => availabilityApi.checkAvailability(params),
    enabled: Boolean(params.train && params.from && params.to && params.date && params.coachClass),
    staleTime: 60000,
  });
}
