import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Login() {
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    const addlogin=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/login/add",{
            "name":name,
            "email":email,
            "password":password
        }).
      then((res)=>{
        console.log(res.data)
      })
      .catch((error)=>{
        console.log(error)
      });

      document.getElementById('login').reset(); 
    }
    
  return (
    <div className='container m-5'>
      <h1>Add Login </h1>
<form id='login'>
  {/* Name input */}
  <div className="form-outline mb-4">
    <input type="text" id="form5Example1" onChange={(e)=>{setName(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example1">Name</label>
  </div>
  {/* Email input */}
  <div className="form-outline mb-4">
    <input type="email" id="form5Example2" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example2">Email address</label>
  </div>
   {/* PASSWORD input */}
   <div className="form-outline mb-4">
    <input type="password" id="form5Example3" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" />
    <label className="form-label" htmlFor="form5Example2">Password</label>
  </div>
  {/* Submit button */}
  <button type="submit" onClick={(e)=>{addlogin(e)}} className="btn btn-outline-success btn-block mb-4">Login</button>
</form>

<Link to="/" > Back to Home Page </Link>

    </div>
  )
}

export default Login
