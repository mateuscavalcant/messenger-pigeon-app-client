import React from 'react';

interface LoginViewProps {
  email: string;
  password: string;
  error: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginView: React.FC<LoginViewProps> = ({
  email,
  password,
  error,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <div className="container">
      <div className="form">
        <h2 className="header">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <span className="error">{error}</span>}
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <div className="form-link">
          <p>
            Don't have an account? <a href="/signup" className="link">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
