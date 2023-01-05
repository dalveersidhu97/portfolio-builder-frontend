import { render, screen } from '@testing-library/react';
import { ExperiencePage } from '.';

test('Should render Experience page', () => {
  render(<ExperiencePage />);
  expect(screen.getByTestId('ExperiencePage')).toBeInTheDocument();
});
