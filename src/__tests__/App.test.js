import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';  // Ajusta la ruta de tu componente App

describe('App Component', () => {
  it('renders ErrorBoundary component correctly', async () => {
    render(<App />);
    
    // Si tienes un estado de error en Dashboard que provoca el uso de ErrorBoundary, prueba el comportamiento de este
    const errorElement = await screen.findByText(/Error:/i);
    expect(errorElement).toBeInTheDocument();
  });
});
