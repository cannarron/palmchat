import React from 'react';
import awsConfig from './aws-exports';
import { Auth, API, graphqlOperation} from 'aws-amplify';
import { createRoom, createMessage } from './graphql/mutations';
import RoomList from './RoomList';


const Homepage = () => {
  const signOut = async () => {
    try {
      Auth.signOut()
    
    } catch (error) {
      console.log(error);
    }
  }
 
  const createRoomFunction = async (e) => {
    e.preventDefault();
    const { target } = e;
    const input = { name: target.roomName.value };
    try{
      await API.graphql(graphqlOperation(createRoom, {input}));
    }catch(error){
      console.log(error);
    }
};
  return (
    <div>
      <h1>Welcome to Palmchat App!</h1>
      <RoomList />
      <button onClick={() => Auth.signOut()}>Sign Out</button>
      <form onSubmit={createRoomFunction}>
<input placeholder='Enter room name' name="roomName" />
<button type="submit">Create room</button>
      </form>
    
    </div>
  );
};

export default Homepage;
