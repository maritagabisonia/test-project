import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './details.css'
import UserList from './userList';


const Details = () => {
  const[data, setData] = useState({})
  const { id } = useParams();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`);
        const d = await response.json();
        setData(d)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [id]);


  return (
    <div className='Wrapper'>
       <div className='details'>
         <img src={data.imageUrl} className='photo'></img>
        
         <fieldset className='info'>
           <legend>Info</legend>
           <header className='name'>{data.prefix} {data.name} {data.lastName}</header>
           <header className='title'>{data.title}</header>
           <p className='paragrap'><span className="i">Email</span>:&nbsp;{data.email}</p>
           <p className='paragrap'><span className="i">IP Address</span>:&nbsp;{data.ip}</p>
           <p className='paragrap'><span className="i">IP Address</span>:&nbsp;{data.ip}</p>
           <p className='paragrap'><span className="i">Job Area</span>:&nbsp;{data.jobArea}</p>
           <p className='paragrap'><span className="i">Job Type</span>:&nbsp;{data.jobType}</p>
         </fieldset>
   

        <fieldset className='info'>
          <legend>Address</legend>
          <header className='name'>{data.company?.name} {data.company?.suffix}</header>
         <p className='paragrap'><span className="i">City</span>:&nbsp;{data.address?.city}</p>
         <p className='paragrap'><span className="i">Country</span>:&nbsp;{data.address?.country}</p>
         <p className='paragrap'><span className="i">State</span>:&nbsp;{data.address?.state}</p>
         <p className='paragrap'><span className="i">Street Address</span>:&nbsp;{data.address?.streetAddress}</p>
         <p className='paragrap'><span className="i">ZIP</span>:&nbsp;{data.address?.zipCode}</p>
        </fieldset>
       </div>
     
     <div>
         <h2 className='friendTitle'>Friends:</h2>
         <header>
          
           <UserList url= {`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends`} />
         </header>
      </div>
      
     </div>
  );
};

export default Details;