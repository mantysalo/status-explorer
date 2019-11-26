import React from 'react';
import App from './App';
import { render, cleanup, waitForElement, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EnrichedPackageShape } from '../../api/src/services/Enricher';

describe('<App/>', () => {
    afterEach(() => {
        cleanup();
    });
    it('renders', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve({ data: ['foo', 'bar', 'baz'] }),
            } as Response);
        });
        const { getByText } = render(<App />);
        expect(getByText('Packages')).toBeInTheDocument();
        // Wait for the useEffect to run, to avoid warnings in terminal.
        await wait(() => expect(getByText('foo')).toBeInTheDocument());
    });

    it('allows navigating to a package', async () => {
        const packageObject: EnrichedPackageShape = {
            packageName: 'foo',
            dependsOn: [{ name: 'bar', type: 'normal' }],
            dependedOnBy: ['baz'],
            shortDescription: 'foo package',
            longDescription: 'Long description',
        };
        jest.spyOn(window, 'fetch')
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    json: () => Promise.resolve({ data: ['foo', 'bar', 'baz'] }),
                } as Response);
            })
            .mockImplementationOnce(() => {
                return Promise.resolve({
                    json: () => Promise.resolve(packageObject),
                } as Response);
            });
        const { getByText } = render(<App />);
        const fooListItem = await waitForElement(() => getByText('foo'));
        fireEvent.click(fooListItem);
        
        await waitForElement(() => getByText(packageObject.packageName));
        await waitForElement(() => getByText(packageObject.dependsOn[0].name));
        await waitForElement(() => getByText(packageObject.dependedOnBy[0]));
        await waitForElement(() => getByText(packageObject.shortDescription));
        await waitForElement(() => getByText(packageObject.longDescription));
    });
});
