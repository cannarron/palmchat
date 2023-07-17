import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRooms } from './graphql/queries';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listRooms));
      setRooms(data.listRooms.items);
    } catch (error) {
      console.error('Error fetching rooms', error);
    }
  };

  return (
    <div>
      <h1>Room List</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
