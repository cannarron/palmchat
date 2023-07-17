import React, { useEffect, useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import {Routes, Route } from 'react-router-dom';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsConfig from './aws-exports';
import Homepage from './Homepage'

Amplify.configure(awsConfig);

function App() {
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    try {
      Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook})
    
    } catch (error) {
      console.log('Error signing in:', error);
    }

  }
    return (
    <div className="App">
          <button onClick={(handleSignIn)}>Facebook Sign in</button>
      <Routes>
        <Route path='/home' element={<Homepage />} ></Route>
      </Routes>
  
      <div>{user && user.getUsername()}</div>
    </div>
  );
}
export default App;