
import styled from 'styled-components';
import logo from '../../assests/logo.png'
import Box from '@mui/material/Box';
import ListBox from '../Home/ListBox'
import Typography from '@mui/material/Typography';

const WrapperStyled = styled.div`
  height: 100vh;
  background-color:white;
  margin-left:305.83px;
  .image{
    display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  }
`;
const ListStyled = styled.div`
  background-color:white;
  margin-left:8%;
  margin-top:10%;
  aligin:center;
`;

export default function HomePage() {
  return (
    <WrapperStyled>
      <ListStyled>
        <ListBox />
      </ListStyled>
      <Box
        className="image"
        component="img"
        sx={{
          height: 200,
          width: 400,
        }}
        src={logo}
      />

    </WrapperStyled>
  );
}