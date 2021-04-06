import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// define header test suite
describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    // print out the dom
    // screen.debug();

    const link = screen.getByRole('link', { name: /how it works/i });
    // screen.debug(link);
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /how it works/i })
    ).toBeInTheDocument();

    const logoLink = screen.getByRole('link', { name: /logo/i });
    screen.debug(logoLink);

    userEvent.click(logoLink);

    expect(
      screen.getByRole('heading', { name: /find the top posts/i })
    ).toBeInTheDocument();
  });
});