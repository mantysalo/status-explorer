import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DeadCenter = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
height: calc(100vh - 1rem);
`;

const BigText = styled.h1`
font-size: 6rem;
font-weight: 700;
`

export const NotFound = () => {
  return (
    <DeadCenter>
      <header>
      <BigText>
        404 — Not found
      </BigText>
      <Link to="/">Back to frontpage</Link>
      </header>
    </DeadCenter>
  )
}
