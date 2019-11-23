import { Parser } from './Parser';
import { status } from './status';

describe('Parser', () => {
    it('parses a status string to an array of objects', () => {
        const parser = new Parser();
        expect(parser.parseStatusToObjects(status)).toMatchObject([
            {
                depends: [],
                description: `foo package
the best package in the world for foo based
programming.`,
                package: 'foo',
            },
            {
                depends: [
                    'awesome-package (1.2.3)',
                    ',',
                    'awesome-package (2.0.0)',
                    ',',
                    'another-awesome-package (1.2.3)',
                    '|',
                    'react',
                ],
                description: `bar package
for all your bar needs`,
                package: 'bar',
            },
            {
                depends: ['bar'],
                package: 'baz',
                description: 'baz package',
            },
        ]);
    });
});
