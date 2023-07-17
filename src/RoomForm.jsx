import React from 'react';
import awsConfig from './aws-exports';
import { Auth, API, graphqlOperation} from 'aws-amplify';
import { createRoom } from './graphql/mutations';

function RoomForm(props) {

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
             <form onSubmit={createRoomFunction}>
<input placeholder='Enter room name' name="roomName" />
<button type="submit">Create room</button>
      </form> 
        </div>
    );
}

export default RoomForm;