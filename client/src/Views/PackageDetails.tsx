import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainHeader } from '../Components/MainHeader';
import { EnrichedPackageShape } from '../../../api/src/services/Enricher';
import {API_URL} from '../config'
import styled from 'styled-components';

type PackageDetailsProps = {
    packageNames: string[];
};

type SeparatedListItemProps = {
    type: 'normal' | 'alternate';
};

const SeparatedList = styled.ul`
    display: inline;
    list-style: none;

    li:last-child:after {
        content: '';
    }
`;

const SeparatedListItem = styled.li`
    display: inline;
    &:after {
        content: "${({ type }: SeparatedListItemProps) => (type === 'normal' ? ', ' : ' | ')}";
    }
`;

const ShortDescription = styled.p`
    font-weight: 600;
`;

const LongDescription = styled.p`
    white-space: pre-line;
`;

const SubHeader = styled.h2`
    font-weight: 600;
    font-size: 1.5em;
    margin: 8px 0px;
    font-family: Arial, Helvetica, sans-serif;
`;

export const PackageDetails = ({ packageNames }: PackageDetailsProps) => {
    const { packageName } = useParams();
    const [pkg, setPkg] = useState<EnrichedPackageShape>();
    useEffect(() => {
        const fetchData = async () => {
            const packageData: EnrichedPackageShape = await (await fetch(`${API_URL}/api/packages/${packageName}`)).json();
            setPkg(packageData);
        };
        fetchData();
    }, [packageName]);

    const isDependedOn = Boolean(pkg && pkg.dependedOnBy.length);
    const hasDependencies = Boolean(pkg && !!pkg.dependsOn.length);
    return (
        <div>
          <nav><Link to="/">Back to listing</Link></nav>
          {pkg ? ( <>
                    <header>
                        <MainHeader>{pkg.packageName}</MainHeader>
                    </header>
                    <main>
                    <ShortDescription>{pkg.shortDescription}</ShortDescription>
                    <LongDescription>{pkg.longDescription}</LongDescription>
                    {hasDependencies && (
                        <>
                            <SubHeader>Dependencies</SubHeader>
                            <SeparatedList>
                                {pkg.dependsOn.map(dep =>
                                    packageNames.includes(dep.name) ? (
                                        <SeparatedListItem type={dep.type}>
                                            <Link to={`/packages/${dep.name}`}>{dep.name}</Link>
                                        </SeparatedListItem>
                                    ) : (
                                        <SeparatedListItem type={dep.type}>{dep.name}</SeparatedListItem>
                                    )
                                )}
                            </SeparatedList>
                        </>
                    )}

                    {isDependedOn && (
                        <>
                            <SubHeader>Depended on by</SubHeader>
                            <ul>
                                {pkg.dependedOnBy.map((dep: string) => (
                                    <li>
                                        <Link to={`/packages/${dep}`}>{dep}</Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    </main>
          </>): <h1>Loading</h1>}
        </div> 
    );
};
