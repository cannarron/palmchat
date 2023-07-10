import React from 'react';
import awsConfig from './aws-exports';
import { Auth} from 'aws-amplify';

const Homepage = () => {
  const SignOut = async () => {
    try {
      Auth.signOut()
    
    } catch (error) {
      console.log('Error signing in:', error);
    }

  }
  return (
    <div>
      <h1>Welcome to Palmchat App!</h1>
      <button onClick={() => Auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default Homepage;
