import { render, screen } from '@testing-library/react';
import { SkillsPage } from '.';

test('Should render skills page', () => {
  render(<SkillsPage />);
  expect(screen.getByTestId('SkillsPage')).toBeInTheDocument();
});
