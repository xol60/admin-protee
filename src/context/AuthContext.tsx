
import * as React from 'react';
import Cookies from 'universal-cookie';
import { useNavigate, useLocation } from 'react-router-dom'
import { AccessToken } from '../module/auth.dto'
export const UserContext = React.createContext<AccessToken>({
    accessToken: ''
});


const AppProvider: React.FC<any> = ({ children }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const location = useLocation();
    const [accessToken, setAccessToken] = React.useState<string>('')
    React.useEffect(() => {
        const access: string = cookies.get('jwt_authentication')
        setAccessToken(access);
        if (!access && location.pathname.slice(1, 5) !== "auth") {
            navigate('/auth/login')
        }
    }, [navigate]);
    const value = {
        accessToken
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
export default AppProvider