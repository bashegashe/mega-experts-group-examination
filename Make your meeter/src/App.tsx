import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to='login' />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        {/* <Route path='meetups' element={<Meetups />} /> */}
        {/* <Route path='meetups/:id' element={<MeetupDetails />} /> */}
        {/* <Route path='reviews/:meetupId' element={<Reviews />} /> */}
        {/* <Route path='profile' element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
