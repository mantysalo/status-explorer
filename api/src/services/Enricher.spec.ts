import { Enricher } from './Enricher';
import { Parser } from './Parser';
import { status } from './status';

const enricher = new Enricher();
const parser = new Parser();
const packages = parser.parseStatusToObjects(status);
const enrichedPackages = enricher.enrichPackageObjects(packages);



describe('Enricher', () => {
    it('includes the full description', () => {
        const barDesc = packages.find(pkg => pkg.package === 'bar')?.description?.replace(/\n/g, ' ');
        const bazDesc = packages.find(pkg => pkg.package === 'baz')?.description?.replace(/\n/g, ' ');
        const fooDesc = packages.find(pkg => pkg.package === 'foo')?.description?.replace(/\n/g, ' ');

        expect(barDesc).toBe(`${enrichedPackages[0].shortDescription} ${enrichedPackages[0].longDescription}`);
        expect(bazDesc).toBe(`${enrichedPackages[1].shortDescription}${enrichedPackages[1].longDescription}`);
        expect(fooDesc).toBe(`${enrichedPackages[2].shortDescription} ${enrichedPackages[2].longDescription}`);
    });

    it('maps cross-dependencies correctly', () => {
        expect(enrichedPackages[0].dependedOnBy).toEqual(['baz']);
        expect(enrichedPackages[1].dependedOnBy).toEqual([]);
        expect(enrichedPackages[2].dependedOnBy).toEqual(['baz']);
    });
});
