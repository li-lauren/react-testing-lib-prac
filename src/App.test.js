import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import mockResponse from './__mocks__/subreddit-reactjs-response.json'

fetchMock.enableMocks();

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

// define header test suite
describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    setup();
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

describe('Subreddit form', () => {
  test('loads posts that are rendered on the page', async () => {
    fetch.once(JSON.stringify(mockResponse));
    setup();

    const subredditInput = screen.getByLabelText('r /');
    userEvent.type(subredditInput, 'reactjs')

    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);

    expect(screen.getByText(/is loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/number of top posts: 25/i)).toBeInTheDocument();

    // ensure the correct API endpoint was called
    expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/reactjs/top.json');
  });
})