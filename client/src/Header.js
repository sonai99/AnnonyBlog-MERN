import {useEffect, useState} from "react";

const Header = () => {
    const [userInfo, setUserInfo] = useState('')
    useEffect(() => {
        fetch('http://localhost:3001/profile', {
          credentials: 'include',
        }).then(response => {
          response.json().then(userInfo => {
            setUserInfo(userInfo);
          });
        });
      }, []);

      const username = userInfo?.username;

  return (
    <div>
        { username ? (
            <h1> username </h1>
        ) : (
            <h1> No username yet </h1>
        )}
    </div>
  )
}

export default Header