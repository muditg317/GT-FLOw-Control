import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './main.scss';


const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

export default function Main() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const getUser = async () => {
    try {
      let response = await axios.get(`api/users`, headers);
      let newUserList = response.data;
      console.log(newUserList);
      setUsers(newUserList);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async () => {
    try {
      const payload = { name, email };
      let response = await axios.post(`api/users`, payload, headers);
      let data = response.data;
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      getUser();
    }, []);

  return (
      <>
        <input className="border-solid border-black border-2" placeholder='Name' onChange={event => setName(event.target.value)}></input>
        <input className="border-solid border-black border-2" placeholder='Email' onChange={event => setEmail(event.target.value)}></input>
        <button onClick={addUser}>Add user</button>
        { users.map(user => (
          <div>
            <p>{user.name}</p>
          </div>
        )) }
      </>
    );
}
