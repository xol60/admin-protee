
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
    font-size:20px;
  }
`;

export default function Info() {
    const navigate = useNavigate()
    const onClick = () => {
        const cookies = new Cookies();
        cookies.remove('jwt_authentication')
        navigate('/auth/login')
    }
    return (
        <WrapperStyled>
            <Typography variant="h6" gutterBottom className='username'>ADMIN WEBSITE</Typography>
            <Button title="Logout" variant="text" onClick={onClick}>
                <LogoutIcon />
            </Button>
        </WrapperStyled >
    );
}