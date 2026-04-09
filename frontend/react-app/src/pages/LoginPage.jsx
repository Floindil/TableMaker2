import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.token);
      navigate("/players");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <LanguageSwitcher />
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}