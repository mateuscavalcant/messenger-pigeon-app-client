// src/hook/useSignup.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// Tipo para resposta da API
interface SignupResponse {
  message?: string;
  error?: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}

// Tipo para propriedades do Signup
interface UseSignupReturn {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  setName: (value: string) => void;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useSignup = (): UseSignupReturn => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!name || !username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      const data: SignupResponse = await response.json();

      if (data.error) {
        const errors = Object.values(data.error).filter(Boolean).join(", ");
        setError(errors || "An unexpected error occurred");
      } else {
        console.log(data.message);
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return {
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
  };
};
