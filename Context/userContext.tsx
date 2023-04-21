
import * as React from 'react';
import { UserContextType, User } from '../@type/user.dto';
import { Query } from '../@type/query.dto'
import Cookies from 'universal-cookie';
export const UserContext = React.createContext<UserContextType | null>({ users: null, setUsers: () => null, user: null, setUser: () => null, selectedIdUser: null, setSelectedIdUser: () => null, query: null, setQuery: () => null, etSelectedIdUser: () => null, isSearchModalVisible: null, setIsSearchModalVisible: () => null });


const UserProvider: React.FC = ({ children }) => {
    const cookies = new Cookies();
    const accessToken = cookies.get('jwt_authentication')
    const [query, setQuery] = React.useState<Query>({
        page: '1',
        take: '10',
        filter: '',
        sortField: ''
    })
    if (!accessToken) {
        console.log('no ok')
    }
    const [isSearchModalVisible, setIsSearchModalVisible] = React.useState<boolean>(false);
    console.log(isSearchModalVisible);
    const [users, setUsers] = React.useState<User[]>([])
    const [user, setUser] = React.useState<User>({
        id: '',
        name: '',
        phoneNumber: '',
        email: '',

        isActive: false
    })
    const [selectedIdUser, setSelectedIdUser] = React.useState<string>('')
    const loadUser = async () => {
        console.log(111);
        try {
            await fetch('http://localhost:3001/api/v1/users/' + selectedIdUser, {

                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),

            }).then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
                ).then(res => {
                    if (res.status == 200) {
                        setUser(res.data);
                    }
                }))
        }
        catch (err) {
            console.log(err);
        }
    }
    const loadUsers = async () => {
        try {
            await fetch('http://localhost:3001/api/v1/users?page=' + query.page + '&take=' + query.take + '&filter=' + query.filter + '&sortField=' + query.sortField, {

                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),

            }).then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                })
                ).then(res => {
                    if (res.status == 200) {
                        setUsers(res.data.data);
                    }
                }))
        }
        catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        loadUser();
    }, [selectedIdUser]);
    console.log(11, query);
    React.useEffect(() => {
        loadUsers();
    }, [query]);
    const value = {
        users,
        query,
        setQuery,
        user,
        selectedIdUser,
        setSelectedIdUser,
        accessToken,
        isSearchModalVisible,
        setIsSearchModalVisible
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider