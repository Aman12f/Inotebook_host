import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    
  const handleOnSubmit =async(e)=>{
    e.preventDefault();  // avoid page reloading 
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method:"POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}), // body data type must match "Content-Type" header
      });
      const json = await response.json()
      console.log(json)
      if(json.success){
        //save the auth token and redirece
        console.log(` the value of authtoken is ${json.authToken}`)
        localStorage.setItem('token',json.authToken)
        navigate("/");
        props.showAlert("Logged in succesfully","success");
      }
      else{
        props.showAlert("Login Failed, invalid details","danger")
      }
  }
  return (
    <>
    <div className='mt-2'>
    <h2>Login to continue to InoteBook</h2>
    <form onSubmit={handleOnSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} value={credentials.email}></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onchange} value={credentials.password}></input>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}


export default Login
