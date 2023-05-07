import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Typography } from 'antd';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
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
    const navigate = useNavigate();
    const onClick = () => {
        const cookies = new Cookies();
        cookies.remove('jwt_authentication')
    }
    return (
        <WrapperStyled>
            <div>
                <Typography.Text className='username'>ADMIN WEBSITE</Typography.Text>
            </div>
            <Button
                ghost
                type="link"
                onClick={onClick}
                href="/auth/login"
            >
                <LogoutIcon />
            </Button>
        </WrapperStyled >
    );
}