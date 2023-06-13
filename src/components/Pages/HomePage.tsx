
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
    margin-left: 370px;
    margin-top:100px;
  }
`;
const ListStyled = styled.div`
  background-color:white;
  margin-left:70px;
  margin-top:100px;
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