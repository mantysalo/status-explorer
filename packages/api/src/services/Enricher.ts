import { PackageShape } from './Parser';

interface DependencyShape {
    name: string;
    type: 'alternate' | 'normal';
}

export interface EnrichedPackageShape {
    packageName: string;
    dependsOn: DependencyShape[];
    dependedOnBy: string[];
    shortDescription: string;
    longDescription: string;
}

export class Enricher {
    public enrichPackageObjects = (packages: PackageShape[]): EnrichedPackageShape[] => {
        return packages
            .map<EnrichedPackageShape>((pkg, _, packages) => {
                const dependants = this.mapDependants(pkg, packages);
                const splitDescription = pkg.description.split(/(\n)/);
                const shortDescription = splitDescription[0];
                const longDescription =
                    splitDescription.slice(1).join(' ')
                const enhancedDependencies: DependencyShape[] = [];
                pkg.depends.forEach((dependency, index, dependencies) => {
                    if (dependencies[index] !== ',' && dependency !== '|') {
                        enhancedDependencies.push({
                            name: dependency,
                            type: this.getDependencyType(index, dependencies),
                        });
                    }
                });
                return {
                    packageName: pkg.package,
                    dependsOn: enhancedDependencies,
                    shortDescription,
                    longDescription,
                    dependedOnBy: dependants,
                };
            })
    };

    private getDependencyType = (index: number, dependencies: string[]): DependencyShape['type'] => {
        if (dependencies[index - 1] === '|' || dependencies[index + 1] === '|') {
            return 'alternate';
        } else return 'normal';
    };

    private mapDependants = (pkg: PackageShape, packages: PackageShape[]): string[] => {
        return packages
            .filter(dependantPackage => {
                const dependenciesWithoutVersionNumbers = dependantPackage.depends.map(dep => this.stripVersionNumber(dep))
                return dependenciesWithoutVersionNumbers.includes(pkg.package);
            })
            .map(dependency => dependency.package);
    };
    
    private stripVersionNumber = (dependency: string): string => {
        return dependency.replace(/ *\([^)]*\) */g, '');
    };
}

