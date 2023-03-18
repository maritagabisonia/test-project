import React, { useState, useEffect, useCallback } from 'react';
import './UserList.css';
import { useNavigate } from 'react-router';



const ITEMS_PER_PAGE = 20;

function UserList(props) {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const handleClick = useCallback((id) => {
    console.log(id);
  navigate(`/details/${id}`);
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${props.url}/${page}/${ITEMS_PER_PAGE}`);
        const data = await response.json();
        setUsers((prevUsers) => [...prevUsers, ...data.list.slice(0, ITEMS_PER_PAGE)]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className='wrapper'>
       <div className='main'>
        {users.map((user, index) => (
        
          <div 
          key={index} 
          className='Profile' 
          onClick={() => handleClick(user.id)}
          >
            <img src={user.imageUrl} className='photo' alt={`Photo of ${user.name}`}></img>
            <header className='Name'>{user.prefix} {user.name} {user.lastName}</header>
            <header className='Title'>{user.title}</header>
         </div>
         
        ))}
       </div>
       <div>
         {loading && <p>Loading...</p>}
       </div>
    </div>
  );
}

export default UserList;
