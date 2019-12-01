import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexCenter } from '../../Components/FlexCenter';
import { MainHeader } from '../../Components/MainHeader';
import { SubHeader } from '../../Components/SubHeader';
import { LoadingSpinner } from '../../Components/LoadingSpinner';

type FrontPageProps = {
    packageNames: string[];
    error?: Error;
};

const List = styled.ul`
    list-style-type: none;
    text-align: center;
`;

const Container = styled.main`
    margin-top: 3rem;
`;

const ListItem = styled.li`
    font-size: 1.3rem;
    line-height: 1.5;
    font-weight: 200
    border-bottom: 1px solid #ccc;

    &:last-child {
        border: none;
    }

    a {
        text-decoration: none;
        display: block;
        transition: background-color 0.3s ease;
    }

    &:hover {
        background-color: #f4f4f4;
    }
`;

const StickyContainer = styled.div`
    position: fixed;
    top: 0;
    background-color: white;
    width: 100%
    text-align: center;
`;

const ErrorContainer = styled.div`
    margin-top: 50px;
`;

const Header = () => (
    <StickyContainer>
        <header>
            <MainHeader>Packages</MainHeader>
        </header>
    </StickyContainer>
);

export const FrontPage = ({ packageNames, error }: FrontPageProps) => {
    if (packageNames.length === 0 && !error) {
        return (
            <FlexCenter>
                <Header />
                <Container>
                    <LoadingSpinner />
                </Container>
            </FlexCenter>
        );
    }
    return (
        <FlexCenter>
            <Header />
            <Container>
                {error ? (
                    <ErrorContainer>
                        <SubHeader>Failed to fetch packages!</SubHeader>
                        {error.message}
                    </ErrorContainer>
                ) : (
                    <List>
                        {packageNames.sort().map(pkg => (
                            <ListItem key={pkg}>
                                <Link to={`packages/${pkg}`} key={pkg}>
                                    {pkg}
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Container>
        </FlexCenter>
    );
};
