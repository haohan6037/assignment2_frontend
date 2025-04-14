import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';

describe('Login Component', () => {

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('renders Login form', () => {
        render(<Login login={jest.fn()} />);

        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    test('displays success message when login is successful', async () => {
        const mockLogin = jest.fn().mockResolvedValueOnce();
        render(<Login login={mockLogin} />);

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user7' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: '123456' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Login-success/i)).toBeInTheDocument();
        });

        expect(mockLogin).toHaveBeenCalledWith({ username: 'user7', password: '123456' });
    });

});