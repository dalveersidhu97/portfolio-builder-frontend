import { render, screen } from '@testing-library/react';
import { AboutPage } from '.';

test('Should render aobut page', () => {
  render(<AboutPage />);
  expect(screen.getByTestId('AboutPage')).toBeInTheDocument();
});
