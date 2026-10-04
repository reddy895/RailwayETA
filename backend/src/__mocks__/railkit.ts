export const configure = (key: string) => {};

export const trackTrain = async (trainNo: string, date?: string) => ({
  trainNumber: trainNo,
  trainName: `Express ${trainNo}`,
  currentStation: 'NEW DELHI',
  nextStation: 'KANPUR CENTRAL',
  delay: 10,
  stations: [
    { code: 'NDLS', name: 'New Delhi', departureTime: '06:00', actualDeparture: '06:10' },
    { code: 'CNB', name: 'Kanpur Central', arrivalTime: '11:00', expectedArrival: '11:10' },
  ],
});

export const getTrainInfo = async (trainNo: string) => ({
  trainNumber: trainNo,
  trainName: `Express ${trainNo}`,
  stations: [
    { code: 'NDLS', name: 'New Delhi', departureTime: '06:00' },
    { code: 'CNB', name: 'Kanpur Central', arrivalTime: '11:00' },
  ],
});

export const searchTrainBetweenStations = async (from: string, to: string, date?: string) => [
  {
    trainNumber: '12301',
    trainName: 'Rajdhani Express',
    fromStation: from,
    toStation: to,
    departureTime: '16:55',
    arrivalTime: '09:55',
  },
];

export const liveAtStation = async (code: string, hours?: number) => ({
  stationCode: code,
  stationName: `${code} Station`,
  trains: [
    { trainNumber: '12301', trainName: 'Rajdhani Express', scheduledArrival: '10:00', platform: '1', delay: 0 },
  ],
});

export const stationByCode = async (code: string) => ({
  code: code.toUpperCase(),
  name: `${code.toUpperCase()} Central`,
});

export const stationsByName = async (name: string) => [
  { code: name.toUpperCase().slice(0, 4), name: `${name} Junction` },
];

export const checkPNRStatus = async (pnr: string) => ({
  pnrNumber: pnr,
  trainNumber: '12301',
  trainName: 'Rajdhani Express',
  passengers: [{ passengerNumber: 1, bookingStatus: 'CNF', currentStatus: 'CNF', coach: 'B1', berth: '12' }],
});

export const getAvailability = async () => ({
  availableSeats: 42,
  status: 'AVAILABLE',
});

export const fareLookup = async () => ({
  baseFare: 1000,
  totalFare: 1250,
});
