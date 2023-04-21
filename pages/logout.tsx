import Cookies from 'universal-cookie';

export default function Logout() {
    const cookies = new Cookies();
    cookies.remove('jwt_authentication')

}