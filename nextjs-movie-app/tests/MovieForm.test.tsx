import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from '../components/MovieForm';

describe('MovieForm', () => {
  test('renders input and button', () => {
    render(<MovieForm />);
    const inputElement = screen.getByPlaceholderText(/Enter IMDb ID/i);
    const buttonElement = screen.getByRole('button', { name: /Search/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('allows user to input IMDb ID', () => {
    render(<MovieForm />);
    const inputElement = screen.getByPlaceholderText(/Enter IMDb ID/i);
    fireEvent.change(inputElement, { target: { value: 'tt1234567' } });
    expect(inputElement.value).toBe('tt1234567');
  });

  test('calls the onSubmit function when the form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<MovieForm onSubmit={mockOnSubmit} />);
    const inputElement = screen.getByPlaceholderText(/Enter IMDb ID/i);
    const buttonElement = screen.getByRole('button', { name: /Search/i });
    
    fireEvent.change(inputElement, { target: { value: 'tt1234567' } });
    fireEvent.click(buttonElement);
    
    expect(mockOnSubmit).toHaveBeenCalledWith('tt1234567');
  });
});