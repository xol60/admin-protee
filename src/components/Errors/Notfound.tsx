import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Page404 from '../../assests/404.jpg'
const WrapperStyled = styled.div`
  height: 100vh;
  background-image:url(${Page404});
`;
const CustomLink = styled.div`
    margin: 0;
  position: absolute;
  top: 90%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size:30px;
`;
export default function NotFoundPage() {
    return (
        <WrapperStyled>
            <CustomLink>
                <Link to="/homepage">Go to Home </Link>
            </CustomLink>
        </WrapperStyled>
    )
}