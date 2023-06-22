import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const commonStyles = {
    borderColor: 'black',
    m: 1,
    border: 1,
    width: '80%',
    height: '100%',
    margin: '5%',
    bgcolor: '#9e9e9e',
    color: 'white'
};

const InfoStyled = styled.div`
    margin-top:500px;
    color:white;
    text-aligin:center
`;

const InfoBox = (props: any) => {

    const { data, number, onClickNext, onClickPrev } = props
    return (
        <div>
            <Box
                sx={{
                    ...commonStyles, borderRadius: 1
                }}

            >
                <Stack direction="row" spacing={2}>
                    <Box
                        className="imageInfo"
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            maxWidth: 300,
                            maxHeight: 300,
                            margin: 5,
                            borderColor: 'primary.main'
                        }}
                        src={data.image}
                    />
                    <Box >
                        <Typography sx={{ mt: 15, ml: 5 }} variant="h4" gutterBottom>
                            {data.title}
                        </Typography>
                        <Typography variant="h3" align="center" gutterBottom>
                            {number}
                        </Typography>
                        <Stack spacing={2} sx={{ mt: '30%', ml: '80%' }} direction="row">
                            <Button onClick={onClickPrev}><ArrowBackIosIcon sx={{ color: 'white' }} /></Button>
                            <Button onClick={onClickNext}><ArrowForwardIosIcon sx={{ color: 'white' }} /></Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </div>
    );
}
export default InfoBox