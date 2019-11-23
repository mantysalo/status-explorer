import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexCenter } from '../Components/FlexCenter';
import { MainHeader } from '../Components/MainHeader';

const List = styled.ul`
    list-style-type: none;
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
