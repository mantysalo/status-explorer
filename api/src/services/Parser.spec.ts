import { Parser } from './Parser';
import { status } from './status';

const parser = new Parser();

describe('Parser', () => {
    it('parses a status string to an array of objects', () => {
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
                depends: ['bar (1.0.0)', ',', 'foo'],
                package: 'baz',
                description: 'baz package',
            },
        ]);
    });
    expect(parser.parseStatusToObjects(status).length).toBe(3)
});
