
import styled from 'styled-components';
import background from '../../assests/background3.jpg'


const WrapperStyled = styled.div`
  height: 100vh;
  background-image:url(${background});
  margin-left:305.83px;
`;


export default function HomePage() {
  return (
    <WrapperStyled>
    </WrapperStyled>
  );
}