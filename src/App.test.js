import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading message', () => {
  render(<App />);
  const sidebarTitle = screen.getByText(/Projects/i);
  expect(sidebarTitle).toBeInTheDocument();
});