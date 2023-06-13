import * as React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import user from '../../assests/user.png'
import location from '../../assests/location.png'
import family from '../../assests/family.png'
const commonStyles = {

    borderColor: 'black',
    m: 1,
    border: 1,
    width: 300,
    height: 300,
};

const ImageStyled = styled.div`
.imageInfo{
     margin-left:100px;
  margin-top:50px;
  }
  .info{
     margin-left:90px;
  margin-top:50px;
  }
`;

const InfoBox = (props: any) => {
    const { type, number } = props
    const [image, setImage] = React.useState(user)
    const [info, setInfo] = React.useState('')
    React.useEffect(() => {
        switch (type) {
            case "user":
                setImage(user);
                setInfo("Users   :   " + number);
                break
            case "family":
                setImage(family);
                setInfo("Family  :   " + number);
                break
            case "location":
                setImage(location);
                setInfo("Location  :   " + number);
                break
        }
    }, [])
    return (
        <div>
            <Box
                sx={{
                    ...commonStyles, borderRadius: 1
                }}

            >
                <ImageStyled>
                    <Box
                        className="imageInfo"
                        component="img"
                        sx={{
                            height: 100,
                            width: 100,
                            borderColor: 'primary.main'
                        }}
                        src={image}
                    />
                    <Typography variant="h5" className="info" gutterBottom>
                        {info}
                    </Typography>
                </ImageStyled>
            </Box>
        </div>
    );
}
export default InfoBox