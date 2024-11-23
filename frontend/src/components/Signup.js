import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate();
  const handleOnSubmit =async(e)=>{
    e.preventDefault();  // avoid page reloading
    const {name,email,password}=credentials 
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method:"POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:name,email:email,password:password}), // body data type must match "Content-Type" header
      });
      const json = await response.json()
      console.log(json)
      if(json.success){
        //save the auth token and redirece
      localStorage.setItem('token',json.authtoken)
      navigate("/");
      props.showAlert("Account created succesfully","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
  }
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const onchange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
  <>
  <div className='mt-2'>
    <h2>Create an account to Use InoteBook</h2>
  <form onSubmit={handleOnSubmit}>
  <div className="form-group">
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="name" className="form-control" id="name" name="name" placeholder="Name" onChange={onchange} minLength={5} required value={credentials.name}></input>
  </div>
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} minLength={5} required value={credentials.email}></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onchange} minLength={5} required value={credentials.password}></input>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="cpassword" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={onchange} minLength={5} required value={credentials.cpassword}></input>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
  </>
  )
}

export default Signup
