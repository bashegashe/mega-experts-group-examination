import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Meetups from './pages/Meetups';
import Profile from './pages/Profile';
import MeetupInfo from './pages/MeetupInfo';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index element={<Navigate replace to='login' />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='meetups' element={<Meetups />} />
        <Route path='meetups/:id' element={<MeetupInfo />} />
        {/* <Route path='reviews/:meetupId' element={<Reviews />} /> */}
        <Route path='profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
