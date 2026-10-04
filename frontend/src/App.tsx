import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

import { HomePage } from './pages/HomePage';
import { TrainSearchPage } from './pages/TrainSearchPage';
import { TrackTrainPage } from './pages/TrackTrainPage';
import { StationBoardPage } from './pages/StationBoardPage';
import { TrainDetailsPage } from './pages/TrainDetailsPage';
import { PnrPage } from './pages/PnrPage';
import { AvailabilityPage } from './pages/AvailabilityPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="trains" element={<TrainSearchPage />} />
        <Route path="train/:trainNumber" element={<TrainDetailsPage />} />
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
