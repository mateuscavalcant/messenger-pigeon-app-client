import React from "react";
import { useSignup } from "../../hook/useSignup";
import SignupView from "./SignupView";

const SignupForm: React.FC = () => {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    error,
    setName,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = useSignup();

  return (
    <SignupView
      name={name}
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      setName={setName}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignupForm;
