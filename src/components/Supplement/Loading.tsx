import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import loadingImage from '../../assests/loading.svg'
import { LoadingContext } from '../../context/LoadingContext'
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
export default function LoadingPage() {
    const { loading } = React.useContext(LoadingContext)
    console.log(loading);
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <Stack gap={1} justifyContent="center" alignItems="center">
                <Box
                    component="img"
                    src={loadingImage}
                />
                <Typography>Loading...</Typography>
            </Stack>
        </Backdrop>

    )
}