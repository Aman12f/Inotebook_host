import React from 'react'
// import { useEffect } from 'react';
import { Outlet,Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();

//   useEffect(() => {
//     console.log(location)
//   }, [location]);
const navigate = useNavigate()
const handleLogOut =()=>{
   localStorage.removeItem('token');
   navigate("/login")
}
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{height:"65px"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Inotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {/* {!localStorage.getItem('token')?<form className="d-flex" role="search"> */}
      {/* <Link className="btn btn-primary mx-1" role="button" to="/login">Login</Link> */}
      {/* <Link className="btn btn-primary mx-1" role="button" to="/signup">SignUp</Link> */}
      {/* </form>:<button type="button" class="btn btn-primary" onClick={handleLogOut}>Logout</button>} */}
    </div>
  </div>
</nav>
<Outlet></Outlet>
    </>
  )
}

export default Navbar
