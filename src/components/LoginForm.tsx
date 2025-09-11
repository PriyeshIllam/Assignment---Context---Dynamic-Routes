import { useState } from "react";
import { users } from "../data/users";
import { useUserContext } from "../context/UserContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const { setUser } = useUserContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = users.find((u) => u.username === username.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("User not found. Try anna or john");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username (anna / john)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
