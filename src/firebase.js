import { initializeApp } from 'firebase/app';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const firebaseConfig = {

    apiKey: "AIzaSyC5ctQpjl2bNXjDe1LEYcD7os7wwzom50A",  
    authDomain: "login-b8038.firebaseapp.com",  
    projectId: "login-b8038",  
    storageBucket: "login-b8038.appspot.com",  
    messagingSenderId: "843232217272",  
    appId: "1:843232217272:web:68530249d5089f907bcc4d"

  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function useAuth(){
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(()=> {
     const unsub = onAuthStateChanged(auth,user => setCurrentUser(user));
     return unsub;
  }, [])

  return currentUser;
}

export default app;