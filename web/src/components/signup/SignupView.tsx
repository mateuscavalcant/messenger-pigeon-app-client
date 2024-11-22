import React from 'react';

interface SignupViewProps {
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



const SignupView: React.FC<SignupViewProps> = ({
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
    }) => {

    return (
        <div className="container">
            <div className="form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}; 

export default SignupView;
