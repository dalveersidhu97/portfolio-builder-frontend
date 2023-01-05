import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '.';

beforeEach(() => {
  render(<BrowserRouter><Layout /></BrowserRouter>);
});

test('Should render the side nav', () => {
  const sidenav = screen.getByTestId('SideNav');
  expect(sidenav).toBeInTheDocument();
});

test('Should render the top nav', () => {
  const topnav = screen.getByTestId('TopNav');
  expect(topnav).toBeInTheDocument();
});

test('Should render the main section', () => {
  const mainSection = screen.getByTestId('MainSection');
  expect(mainSection).toBeInTheDocument();
});
