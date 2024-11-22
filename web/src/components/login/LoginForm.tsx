import React from 'react';
import { useLogin } from '../../hook/useLogin';
import LoginView from './LoginView';

const LoginForm: React.FC = () => {
  const { email, password, error, setEmail, setPassword, handleSubmit } = useLogin();

  return (
    <LoginView
      email={email}
      password={password}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginForm;
