
import * as React from 'react';
import { UserContextType, User } from '../module/user.dto';
import { Query } from '../module/query.dto'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
export const UserContext = React.createContext<UserContextType>({
    isSearchModalVisible: false, setIsSearchModalVisible: () => null
});


const AppProvider: React.FC<any> = ({ children }) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    React.useEffect(() => {
        const access: string = cookies.get('jwt_authentication')
        if (!access) {
            navigate('/auth/login')
        }
    }, [navigate]);
    const [isSearchModalVisible, setIsSearchModalVisible] = React.useState<boolean>(false);
    const value = {
        isSearchModalVisible,
        setIsSearchModalVisible,
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
export default AppProvider