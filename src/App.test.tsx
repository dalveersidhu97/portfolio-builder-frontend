import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe("App Router", () => {
  test('Should show About page on home and SkillsPage after navigating to route /skills', async () => {
    const history = createMemoryHistory();
    render(<Router location={'/'} navigator={history}><App /></Router>);
    const aboutPage = screen.getByTestId('AboutPage');
    expect(aboutPage).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', { name: 'Skills' }));
    expect(history.location.pathname).toBe('/skills');
    // waitFor(() => expect(screen.getByTestId('SkillsPage')).toBeInTheDocument());
  });
  test('Should show ExperiencePage after navigating to route /experience', () => {
    const history = createMemoryHistory();
    render(<Router location={'/'} navigator={history}><App /></Router>);
    const aboutPage = screen.getByTestId('AboutPage');
    expect(aboutPage).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', { name: 'Experience' }));
    expect(history.location.pathname).toBe('/experience');
    // waitFor(() => expect(screen.getByTestId('ExperiencePage')).toBeInTheDocument());
  });
  test('Should show ResumePage after navigating to route /resume', () => {
    const history = createMemoryHistory();
    render(<Router location={'/'} navigator={history}><App /></Router>);
    const aboutPage = screen.getByTestId('AboutPage');
    expect(aboutPage).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', { name: 'Resume' }));
    expect(history.location.pathname).toBe('/resume');
    // waitFor(() => expect(screen.getByTestId('ResumePage')).toBeInTheDocument());
  });
});
