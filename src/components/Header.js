// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f0f0f0;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 1.5rem;
    color: #333;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Title>Calendar</Title>
            <Filter />
        </HeaderContainer>
    );
};

export default Header;
