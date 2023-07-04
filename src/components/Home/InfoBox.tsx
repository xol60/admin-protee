
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const c1 = { padding: 10, margin: 5, width: 300, height: 200, backgroundColor: '#007E33' }

const InfoBox = (props: any) => {

    const { data, number, onClickNext, onClickPrev } = props
    const theme = useTheme();
    return (

        <Box
            m={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"

            bgcolor='#9e9e9e'
            sx={{ p: 5, mr: 15 }}
        >
            <CardMedia
                component="img"
                sx={{ width: '20vw', height: '20vw' }}
                image={data.image}
                alt="Live from space album cover"
            />
            <Box alignItems="center" justifyContent="center" sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: '5%' }}>
                <CardContent sx={{ flex: '1 0 auto', color: 'white' }} >
                    <Typography component="div" variant="h4">
                        {data.title}
                    </Typography>
                    <Typography variant="h3" sx={{ mt: '5%', ml: '25%' }}>
                        {number}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, ml: '60%', mt: '5%' }}>
                    <Button onClick={onClickPrev}><ArrowBackIosIcon sx={{ color: 'white' }} /></Button>
                    <Button onClick={onClickNext}><ArrowForwardIosIcon sx={{ color: 'white' }} /></Button>
                </Box>
            </Box>
        </Box >
    );
}
export default InfoBox