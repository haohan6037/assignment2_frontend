import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '../components/Signup';

// 模拟 axios 请求
jest.mock('axios');

describe('Signup Component', () => {
  test('renders username and password input and submit button', () => {
    render(<Signup onSubmit={() => {}} />);

    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('submits form with correct username and password', () => {
    const mockSubmit = jest.fn();
    render(<Signup onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'myUser' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'myPass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'myUser',
      password: 'myPass123',
    });
  });
});