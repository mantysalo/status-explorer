import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainHeader } from '../Components/MainHeader';
import { EnrichedPackageShape } from '../../../api/src/services/Enricher';
import { API_URL } from '../config';
import styled from 'styled-components';
import { FlexCenter } from '../Components/FlexCenter';

type PackageDetailsProps = {
    packageNames: string[];
};

type SeparatedListItemProps = {
    type: 'normal' | 'alternate';
};

const SeparatedList = styled.ul`
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

const ShortDescription = styled.strong`
    font-weight: 600;
`;

const LongDescription = styled.p`
    white-space: pre-line;
`;

const SubHeader = styled.h2`
    font-weight: 600;
    font-size: 1.5rem;
    margin: 8px 0px;
    font-family: Arial, Helvetica, sans-serif;
`;

// CRA does not allow relative imports outside of src so this is copied from
// api/src/services/Enricher.ts
const stripVersionNumber = (dependency: string): string => {
    return dependency.replace(/ *\([^)]*\) */g, '');
};

export const PackageDetails = ({ packageNames }: PackageDetailsProps) => {
    const { packageName } = useParams();
    const [pkg, setPkg] = useState<EnrichedPackageShape>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const packageData: EnrichedPackageShape = await (
                await fetch(`${API_URL}/api/packages/${packageName}`)
            ).json();
            setPkg(packageData);
            setLoading(false)
        };
        fetchData();
        document.title = packageName ? `Package Browser | ${packageName}` : 'Package Browser';
    }, [packageName]);

    const isDependedOn = Boolean(pkg && pkg.dependedOnBy.length);
    const hasDependencies = Boolean(pkg && pkg.dependsOn.length);
    if (loading) return <h1>Loading</h1>
    return (
        <div>
            <nav>
                <Link to='/'>Back to listing</Link>
            </nav>
            {pkg &&
                <>
                    <FlexCenter>
                        <header>
                            <MainHeader>{pkg.packageName}</MainHeader>
                        </header>

                        <main>
                            <SubHeader>Description</SubHeader>
                            <ShortDescription>{pkg.shortDescription}</ShortDescription>
                            <LongDescription>
                                {pkg.longDescription
                                    .replace(/  +/g, ' ') // Turn 2 or more spaces in to one
                                    .replace(/\n (?![-*])/g, '') // Remove linebreaks from non-list items
                                    .replace(/\s\.\s\n|\s\.\s/g, '\n\n') // Replace paragraph separators with line breaks
                                }
                            </LongDescription>
                            {hasDependencies && (
                                <>
                                    <SubHeader>Dependencies</SubHeader>
                                    <SeparatedList>
                                        {pkg.dependsOn.map(dep =>
                                            packageNames.includes(stripVersionNumber(dep.name)) ? (
                                                <SeparatedListItem key={dep.name} type={dep.type}>
                                                    <Link
                                                        key={dep.name}
                                                        to={`/packages/${stripVersionNumber(dep.name)}`}
                                                    >
                                                        {dep.name}
                                                    </Link>
                                                </SeparatedListItem>
                                            ) : (
                                                <SeparatedListItem key={dep.name} type={dep.type}>
                                                    {dep.name}
                                                </SeparatedListItem>
                                            )
                                        )}
                                    </SeparatedList>
                                </>
                            )}

                            {isDependedOn && (
                                <>
                                    <SubHeader>Depended on by</SubHeader>
                                    <SeparatedList>
                                        {pkg.dependedOnBy.map((dep: string) => (
                                            <SeparatedListItem type='normal'>
                                                <Link to={`/packages/${dep}`}>{dep}</Link>
                                            </SeparatedListItem>
                                        ))}
                                    </SeparatedList>
                                </>
                            )}
                        </main>
                    </FlexCenter>
                </>}
        </div>
    );
};
