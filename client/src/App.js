import { useEffect, useState } from 'react';
import Axios from "axios";
import moment from "moment"
import { Route, Routes } from "react-router";
import Login from './components/Login';
import IndexPage from './components/IndexPage';
import PostPage from './components/PostPage';
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost';
import HomePage from './components/HomePage';
import Header from './Header';


function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(()=>{
  //   Axios.get("/")
  // })

  // useEffect(()=>{
  //   Axios.get("http://localhost:3001/getUsers").then((res)=>{
  //     setListOfUsers(res.data);
  //   })
  // },[listOfUsers]);

  // const showUsers = () => {
  //   console.log('button clicked');
  //   Axios.get("http://localhost:3001/getUsers").then((res)=>{
  //     setListOfUsers(res.data);
  //   });
  // };

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);



  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      username, email, password
    }).then((response) => {
      console.log(response);
      setListOfUsers([
        ...listOfUsers,
        {
          username,
          email,
          password
        },
      ]);
      if(response.data.error === 'User already Exists'){
        window.alert("User already exists");
        console.log("User already exists");
      } else if(response.status === 201) {
        // window.alert("Succesfull Registration");
        console.log("Succesfull Registration");
        // eslint-disable-next-line no-restricted-globals
        // history.push("/login");
        // window.location.reload();
      } else{
        window.alert("Invalid Registration");
      }
    });
    setListOfUsers("");
  };


  const deleteUser = async (userId) => {
    try {
      const response = await Axios.delete(`http://localhost:3001/updateUsers/${userId}`);
      console.log(response.data); // Output the deleted user object
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };



  return (
    // <div className='post-page'>
    // <div class="header">
    //   <div>
    //     {listOfUsers.map((user) => {
    //       return (
    //         <div className='content'>
    //           <li key={user._id}>
    //           <p className='time'>Created at : {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} </p>
    //           <p className='author'>@{user.username}</p>
    //           {/* <p>Email : {user.email}</p> */}
    //           <div className="content-blog"><p>{user.blog}</p></div>
    //           <button onClick={() => deleteUser(user._id)}>Delete user</button>
    //           </li>
    //           <hr />
    //         </div>
    //       )
    //     })}
    //   </div>
    // </div>
    // <div className="input-field">
    //   <input type="text" name="username" placeholder='username' onChange={(event)=> setUsername(event.target.value)}/>
    //   <input type="text" name="email" placeholder='email' onChange={(event)=> setEmail(event.target.value)}/>
    //   <input type="text" name="password" placeholder='password'onChange={(event)=> setPassword(event.target.value)}/>
    //   <div><textarea name="blog" placeholder='write your blog' onChange={(event)=> setBlog(event.target.value)}/> </div>
    //   <button onClick={createUser}>Create User</button>
    // </div>
    // {/* <div>
    //   <button onClick={showUsers}>Show Users</button>
    // </div> */}
    // </div>

<>
      <Routes>
        <Route path='/' element={<><Navbar /><HomePage /></>} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create' element={<CreatePost />} />
      </Routes>

      {/* <Header /> */}
      </>
  );
}

export default App;