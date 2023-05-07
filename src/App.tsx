import React from 'react';

import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Login from './components/Auth/Login'
import ForgotPassword from './components/Auth/ForgotPassword'
import SidebarLayout from './components/Pages/Sidebar'
import HomePage from './components/Pages/HomePage';
import LocationPage from './components/Pages/LocationPage'
import UserPage from './components/Pages/UserPage'
import SearchUserModal from './components/Modal/SearchUserModal'
import UserDetail from './components/Pages/UsetDetail'
import NotFoundPage from './components/Errors/Notfound'
import AppContext from './context/UserContext'
function App() {
  return (
    <BrowserRouter>
      <AppContext >
        <Routes>
          <Route element={<SidebarLayout />} >
            <Route path="homepage" element={<HomePage />} />
            <Route path="users" element={<UserPage />} />
            <Route path='user/:id' element={<UserDetail />} />
          </Route>

          <Route path="/auth" >
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route path="locations" element={<LocationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <SearchUserModal />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
