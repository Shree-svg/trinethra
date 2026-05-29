import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trinethra heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Trinethra/i);
  expect(headingElement).toBeInTheDocument();
});
