import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';
import { FrontPage } from './FrontPage';

describe('<FrontPage />', () => {
    it('should render without crashing', () => {
        render(<FrontPage packageNames={['foo', 'bar', 'baz']} />, { wrapper: MemoryRouter });
    });
    it('should render a list with all the provided packages in alphabetical order', async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve({ data: ['foo', 'bar', 'baz'] }),
            } as Response);
        });
        const { getAllByRole } = render(<App />);
       const listItems = await waitForElement(() => getAllByRole('listitem'))
       expect(listItems.length).toBe(3)
        
    });
});
