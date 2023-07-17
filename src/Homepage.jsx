import React from 'react';
import awsConfig from './aws-exports';
import { Auth, API} from 'aws-amplify';
import RoomList from './RoomList';
import RoomForm from './RoomForm';

const Homepage = () => {
  const signOut = async () => {
    try {
      Auth.signOut()
    
    } catch (error) {
      console.log(error);
    }
  }
 
  
  return (
    <div>
      <h1>Welcome to Palmchat App!</h1>
      <RoomList />
      <RoomForm />
      <button onClick={() => Auth.signOut()}>Sign Out</button>

    </div>
  );
};

export default Homepage;
