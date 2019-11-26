import { Enricher } from './Enricher';
import { Parser } from './Parser';
import { status } from './status';

const enricher = new Enricher();
const parser = new Parser();
const packages = parser.parseStatusToObjects(status);
const enrichedPackages = enricher.enrichPackageObjects(packages);

const fooPkg = enrichedPackages.find(pkg => pkg.packageName === 'foo')
const barPkg = enrichedPackages.find(pkg => pkg.packageName === 'bar')
const bazPkg = enrichedPackages.find(pkg => pkg.packageName === 'baz')

describe('Enricher', () => {
    it('includes the full description', () => {
        const fooDesc = packages.find(pkg => pkg.package === 'foo')?.description.replace(/\s/g, '')
        const barDesc = packages.find(pkg => pkg.package === 'bar')?.description.replace(/\s/g, '')
        const bazDesc = packages.find(pkg => pkg.package === 'baz')?.description.replace(/\s/g, '')
        
        expect(fooDesc).toBe(`${fooPkg?.shortDescription}${fooPkg?.longDescription}`.replace(/\s/g, ''));
        expect(barDesc).toBe(`${barPkg?.shortDescription}${barPkg?.longDescription}`.replace(/\s/g, ''));
        expect(bazDesc).toBe(`${bazPkg?.shortDescription}${bazPkg?.longDescription}`.replace(/\s/g, ''));
    });

    it('maps cross-dependencies correctly', () => {
        expect(fooPkg?.dependedOnBy).toEqual(['baz']);
        expect(barPkg?.dependedOnBy).toEqual(['baz']);
        expect(bazPkg?.dependedOnBy).toEqual([]);
    });
});
