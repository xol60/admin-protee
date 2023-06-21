import * as React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import logo from '../../../assests/logo.png'
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <WrapperStyled>
            <Box
                className="imageInfo"
                component="img"
                sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: 200,
                    maxHeight: 100,
                    borderColor: 'primary.main'
                }}
                src={logo}
            />
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar sx={{ width: '100%', height: '100%', maxWidth: 50, maxHeight: 50 }} src={process.env.REACT_APP_ADMIN_IMAGE}></Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={onClick}>
                    <ListItemIcon >
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

        </WrapperStyled >
    );
}