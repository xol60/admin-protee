import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Pages/Auth/Login'
import ResetPassword from './components/Pages/Auth/ResetPassword'
import ForgotPassword from './components/Pages/Auth/ForgotPassword'
import SidebarLayout from './components/Pages/Sidebar/Sidebar'
import HomePage from './components/Pages/HomePage';
import LocationPage from './components/Pages/LocationPage'
import UserPage from './components/Pages/UserPage'
import LoadingContext from './context/LoadingContext'
import UserDetail from './components/Pages/UsetDetailPage'
import NotFoundPage from './components/Supplement/Notfound'
import LoadingPage from './components/Supplement/Loading'
import AppContext from './context/AuthContext'
import WithAxios from './api/axiosClient';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <LoadingContext>
        <AppContext >
          <WithAxios>
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
            <LoadingPage />
          </WithAxios>
        </AppContext>
      </LoadingContext>
    </BrowserRouter>
  );
}

export default App;
