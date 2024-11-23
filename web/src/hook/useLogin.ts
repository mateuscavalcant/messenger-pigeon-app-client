import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Tipo para resposta da API
interface LoginResponse {
  token?: string;
  message?: string;
  error?: {
    credentials?: string;
    password?: string;
  };
}

// Tipo para propriedades da lógica do Login
interface UseLoginReturn {
  email: string;
  password: string;
  error: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('identifier', email);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data: LoginResponse = await response.json();

      if (data.error) {
        setError(data.error.credentials || data.error.password || 'An error occurred');
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.replace("/chats");
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return { email, password, error, setEmail, setPassword, handleSubmit };
};
