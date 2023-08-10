import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";


const LoginPage = ({user}) =>{
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/", { user, password });
      // console.log(setUser(data))
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div sx={{marginTop:"1rem",display: "flex",alignItems: "center",justifyContent: "space-around"}} className="container">
      <div >
        <h1 >Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button >Login</button>
          <div >
            Don't have an account yet?{" "}
            <Link to={"/register"}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
