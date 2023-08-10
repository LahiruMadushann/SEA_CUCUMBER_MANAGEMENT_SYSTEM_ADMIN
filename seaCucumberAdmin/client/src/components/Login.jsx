import axios from "axios";
import React from "react";
import { useGetAdminsQuery } from "state/api";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";


const Login = ({user}) =>{

    // const  data  = useGetAdminsQuery();
    // console.log("data", data);
    // console.log("Olly", data.name);
  console.log(user.name)


  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      if(user.name === userName && user.password === password){
        alert("Login successful");
        setRedirect(true);
      }else{
        alert("Login failed");
        setUserName('');
        setPassword('');
      }
      
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
        {/* {console.log(user.name)} */}
       
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

          <button >
            Login</button>
          <div >
          
            Don't have an account yet?{" "}
            <Link to={"/register"}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
