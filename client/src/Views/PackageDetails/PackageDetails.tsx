import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainHeader } from '../../Components/MainHeader';
import { EnrichedPackageShape } from '../../../../api/src/services/Enricher';
import { API_URL } from '../../config';
import styled from 'styled-components';
import { FlexCenter } from '../../Components/FlexCenter';
import { SubHeader } from '../../Components/SubHeader';

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

const DetailsContainer = styled.main`
    display: flex;
    flex-direction: column;
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
    const [error, setError] = useState<Error>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const packageData: EnrichedPackageShape = await (
                    await fetch(`${API_URL}/api/packages/${packageName}`)
                ).json();
                setPkg(packageData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        document.title = packageName ? `Package Browser | ${packageName}` : 'Package Browser';
    }, [packageName]);

    const isDependedOn = Boolean(pkg && pkg.dependedOnBy.length);
    const hasDependencies = Boolean(pkg && pkg.dependsOn.length);

    if (loading) {
        return <h1>Loading</h1>;
    } else if (error) {
        return (
            <div>
                <nav>
                    <Link to='/'>Back to listing</Link>
                </nav>
                <SubHeader>Failed to retrieve package information!</SubHeader>
                {error.message}
            </div>
        );
    }
    return (
        <div>
            <nav>
                <Link to='/'>Back to listing</Link>
            </nav>
            {pkg && (
                <>
                    <FlexCenter>
                        <header>
                            <MainHeader>{pkg.packageName}</MainHeader>
                        </header>
                    </FlexCenter>
                    <DetailsContainer>
                        <header>
                            <SubHeader>Description</SubHeader>
                        </header>
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
                                <header>
                                    <SubHeader>Depends on</SubHeader>
                                </header>
                                <SeparatedList>
                                    {pkg.dependsOn.map(dep =>
                                        packageNames.includes(stripVersionNumber(dep.name)) ? (
                                            <SeparatedListItem key={dep.name} type={dep.type}>
                                                <Link key={dep.name} to={`/packages/${stripVersionNumber(dep.name)}`}>
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
                                <header>
                                    <SubHeader>Depended on by</SubHeader>
                                </header>
                                <SeparatedList>
                                    {pkg.dependedOnBy.map((dep: string) => (
                                        <SeparatedListItem key={dep} type='normal'>
                                            <Link key={dep} to={`/packages/${dep}`}>
                                                {dep}
                                            </Link>
                                        </SeparatedListItem>
                                    ))}
                                </SeparatedList>
                            </>
                        )}
                    </DetailsContainer>
                </>
            )}
        </div>
    );
};
