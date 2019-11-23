export interface PackageShape {
    package: string;
    description: string;
    depends: string[];
}

export class Parser {
    public parseStatusToObjects = (status: string): PackageShape[] => {
        const packages = status.trim().split(/\n{2,}/g); // Split each package
        const keysToParse = ['package', 'description', 'depends'];
        return packages.map((pkg: string) => {
            return pkg
                .split(/\n(?!\s)/) // Split fields e.g ['Package: package-name', 'Depends: dependency-name']
                .map(line => line.split(/:([\s\S]+)/)) // Split key and value e.g ['Package', 'package-name']
                .reduce((packageObject: PackageShape, splitLine) => {
                    const key = splitLine[0].toLowerCase() as keyof PackageShape;
                    if (keysToParse.includes(key)) {
                        if (key === 'depends') {
                            packageObject[key] =
                                splitLine[1]
                                    // Use capture group to preserve delimiters
                                    // so they can be used to categorize dependencies
                                    .split(/([,|])/g)
                                    .map(dependency => dependency && dependency.trim()) || [];
                        } else if (key === 'description') {
                            packageObject[key] = splitLine[1]
                                .trim()
                                .replace(/\n\s/g, '\n')
                                .replace(/\s\s/g, ' ');
                        } else {
                            packageObject[key] = splitLine[1].trim();
                        }
                    }
                    if (!packageObject['depends']) {
                        packageObject['depends'] = [];
                    }
                    return packageObject;
                }, {} as PackageShape);
        });
    };
}
