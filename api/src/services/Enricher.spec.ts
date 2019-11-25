import { Enricher } from './Enricher';
import { Parser } from './Parser';
import { status } from './status';

const enricher = new Enricher();
const parser = new Parser();
const packages = parser.parseStatusToObjects(status);
const enrichedPackages = enricher.enrichPackageObjects(packages);



describe('Enricher', () => {
    it('includes the full description', () => {
        const barDesc = packages.find(pkg => pkg.package === 'bar')?.description.replace(/\s/g, '')
        const bazDesc = packages.find(pkg => pkg.package === 'baz')?.description.replace(/\s/g, '')
        const fooDesc = packages.find(pkg => pkg.package === 'foo')?.description.replace(/\s/g, '')

        expect(barDesc).toBe(`${enrichedPackages[0].shortDescription}${enrichedPackages[0].longDescription}`.replace(/\s/g, ''));
        expect(bazDesc).toBe(`${enrichedPackages[1].shortDescription}${enrichedPackages[1].longDescription}`.replace(/\s/g, ''));
        expect(fooDesc).toBe(`${enrichedPackages[2].shortDescription}${enrichedPackages[2].longDescription}`.replace(/\s/g, ''));
    });

    it('maps cross-dependencies correctly', () => {
        expect(enrichedPackages[0].dependedOnBy).toEqual(['baz']);
        expect(enrichedPackages[1].dependedOnBy).toEqual([]);
        expect(enrichedPackages[2].dependedOnBy).toEqual(['baz']);
    });
});
