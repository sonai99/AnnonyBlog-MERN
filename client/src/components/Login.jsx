import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import {Navigate} from "react-router-dom";
import "../App.css"
import Navbar from './Navbar';
import CreatePost from './CreatePost';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect,setRedirect] = useState(false);
    const [name, setName] = useState('')
    const login = async () => {
        const response = await Axios.post("http://localhost:3001/login", {
            username, password})    
        // console.log(response);
        if(response.status === 200){
            // alert("Login Succesfull");
            setRedirect(true);
            // console.log(response.data.username)
            const name = response.data.username
            setName(name)
            console.log(name)
        }else if(response.status === 400){
            console.log("login failed")
        }
    }

    // useEffect(() => {
    //     console.log(name);
    //   }, []);


  return (
    <>
    <Navbar key={name} name={name} />
    { name ? (<CreatePost />) : (
        <div  className='login-form'>
        <h1>Login</h1>
        <div className="form-section">
        <input type="text" name="username" placeholder='username' onChange={(event)=> setUsername(event.target.value)}/>
        <input type="password" name="password" placeholder='password'onChange={(event)=> setPassword(event.target.value)}/>
        <button onClick={login}>Login</button>
    </div>
    <div className="back-button">
        <Link to="/create">
        Register
        </Link>
    </div>
    <div className="back-button">
        <Link to="/" style={{ marginTop: '1rem', textDecoration: 'none', display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'skyblue', color: 'black', borderRadius: '0.25rem' }}>
        See Blogs
        </Link>
    </div>
    </div>
    ) }
        {/* <div  className='login-form'>
        <h1>Login</h1>
        <div className="form-section">
        <input type="text" name="username" placeholder='username' onChange={(event)=> setUsername(event.target.value)}/>
        <input type="password" name="password" placeholder='password'onChange={(event)=> setPassword(event.target.value)}/>
        <button onClick={login}>Login</button>
    </div>
    <div className="back-button">
        <Link to="/create">
        Register
        </Link>
    </div>
    <div className="back-button">
        <Link to="/">
        See Blogs
        </Link>
    </div>
    </div> */}
    </>
  )
}

export default Login