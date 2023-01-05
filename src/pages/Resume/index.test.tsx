import { render, screen } from '@testing-library/react';
import { ResumePage } from '.';

test('Should render resume page', () => {
  render(<ResumePage />);
  expect(screen.getByTestId('ResumePage')).toBeInTheDocument();
});
