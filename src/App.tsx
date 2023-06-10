import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Auth/Login'
import ResetPassword from './components/Pages/Auth/ResetPassword'
import ForgotPassword from './components/Pages/Auth/ForgotPassword'
import SidebarLayout from './components/Pages/Sidebar/Sidebar'
import HomePage from './components/Pages/HomePage';
import LocationPage from './components/Pages/LocationPage'
import UserPage from './components/Pages/UserPage'
import SearchUserModal from './components/Modal/SearchModal'
import UserDetail from './components/Pages/UsetDetailPage'
import NotFoundPage from './components/Errors/Notfound'
import AppContext from './context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
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
            <Route path="reset-password/:secretKey" element={<ResetPassword />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route path="locations" element={<LocationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
