import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FlexCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const List = styled.ul`
    list-style-type: none;
`;

const MainHeader = styled.h1`
    font-size: 2em;
    font-weight: 600;
    margin: 8px;
    font-family: Arial, Helvetica, sans-serif;
`;

const ListItem = styled.li`
    font-family: Helvetica, Verdana, sans-serif;
    font-size: 1.3em;
    line-height: 1.5;
    font-weight: 200
    border-bottom: 1px solid #ccc;

    &:last-child {
        border: none;
    }

    a {
        text-decoration: none;
        color: #000;
        display: block;
        transition: background-color 0.3s ease;
    }

    &:hover {
        background-color: #f6f6f6;
    }
`;

export const FrontPage = () => {
    const [packages, setPackages] = useState<string[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const packageNames = await (await fetch('/api/packages/names')).json();
            setPackages(packageNames.data);
        };
        fetchData();
    }, []);
    return (
        <FlexCenter>
            <MainHeader>Packages</MainHeader>
            <List>
                {packages.map(pkg => (
                    <ListItem>
                        <Link to={`packages/${pkg}`} key={pkg}>
                            {pkg}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </FlexCenter>
    );
};
