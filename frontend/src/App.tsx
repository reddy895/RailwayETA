import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

// Temporary placeholder components until detailed page commits
const HomePage = () => <div className="text-white p-6">RailETA Home</div>;
const TrainSearchPage = () => <div className="text-white p-6">Train Search</div>;
const TrackTrainPage = () => <div className="text-white p-6">Live Track Train</div>;
const StationBoardPage = () => <div className="text-white p-6">Station Live Board</div>;
const PnrPage = () => <div className="text-white p-6">PNR Status</div>;
const AvailabilityPage = () => <div className="text-white p-6">Seat Availability</div>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="trains" element={<TrainSearchPage />} />
        <Route path="track" element={<TrackTrainPage />} />
        <Route path="track/:trainNumber" element={<TrackTrainPage />} />
        <Route path="station" element={<StationBoardPage />} />
        <Route path="station/:stationCode" element={<StationBoardPage />} />
        <Route path="pnr" element={<PnrPage />} />
        <Route path="availability" element={<AvailabilityPage />} />
      </Route>
    </Routes>
  );
}
