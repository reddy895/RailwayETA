export interface StationStop {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  haltTime: string;
  distance: number;
  day: number;
  platform: string;
  isCurrent?: boolean;
  delay?: number;
  status?: string;
  scheduledArrival?: string;
  actualArrival?: string;
  scheduledDeparture?: string;
  actualDeparture?: string;
}

export interface NormalizedLiveTrack {
  trainNumber: string;
  trainName: string;
  currentStation: string;
  nextStation: string;
  delayMinutes: number;
  status: 'RUNNING' | 'ARRIVED' | 'DEPARTED' | 'DELAYED' | 'CANCELLED' | 'NOT_STARTED' | 'COMPLETED';
  lastUpdated: string;
  stations: StationStop[];
  source: string;
  destination: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  trainType: string;
  etaNextStationMinutes?: number;
  expectedNextArrival?: string;
}

export interface NormalizedTrainInfo {
  trainNumber: string;
  trainName: string;
  trainType: string;
  source: string;
  destination: string;
  frequency: string[];
  stations: StationStop[];
  totalDistance: number;
  totalDuration: string;
  runsOn: string[];
}

export interface NormalizedTrainBetween {
  trainNumber: string;
  trainName: string;
  trainType: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  availableClasses: string[];
  runsOn: string[];
  distance?: number;
  fare?: number;
}

export interface StationBoardItem {
  trainNumber: string;
  trainName: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival: string;
  actualDeparture: string;
  platform: string;
  delayMinutes: number;
  status: 'ON_TIME' | 'DELAYED' | 'CANCELLED' | 'ARRIVED' | 'DEPARTED';
  origin: string;
  destination: string;
}

export interface NormalizedStationBoard {
  stationCode: string;
  stationName: string;
  arrivals: StationBoardItem[];
  departures: StationBoardItem[];
  trains: StationBoardItem[];
}

export interface PassengerStatus {
  passengerNumber: number;
  bookingStatus: string;
  currentStatus: string;
  coach?: string;
  berth?: string;
  berthCode?: string;
}

export interface NormalizedPNR {
  pnrNumber: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  journeyDate: string;
  class: string;
  quota: string;
  passengers: PassengerStatus[];
  chartStatus: 'NOT_PREPARED' | 'PREPARED';
  bookingDate: string;
  boardingPoint?: string;
  totalFare?: number;
}

export interface NormalizedAvailability {
  trainNumber: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  date: string;
  class: string;
  quota: string;
  availableSeats: number;
  status: 'AVAILABLE' | 'RAC' | 'WAITLIST' | 'NOT_AVAILABLE' | 'REGRET';
  rac?: number;
  wl?: number;
  prediction?: string;
  fare?: {
    baseFare: number;
    reservation: number;
    superfast: number;
    gst: number;
    catering: number;
    totalFare: number;
  };
}
