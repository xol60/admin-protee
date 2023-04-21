
import React from 'react';
import styled from 'styled-components';
import background from '../../public/background3.jpg'


const WrapperStyled = styled.div`
  height: 100vh;
  background-image:url(${background?.src})
`;


export default function HomePage() {
  return (
    <WrapperStyled>
    </WrapperStyled>
  );
}