import React from 'react';
import UserList from './userList';
import Details from './details';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList url={`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user`} />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;