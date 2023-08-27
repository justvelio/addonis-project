import HomeContent from "./components/views/HomeContent/HomeContent";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AppContext from '../src/context/AppContext';
import Header from "./components/Header/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import MyProfileView from "./components/views/MyProfile/MyProfile";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user)
  //       const uid = user.uid;
  //       getUserData(uid)
  //       .then((data) => {
  //         setAppState({ user, userData: data })
  //         console.log(data)

  //       }
  //       )
  //     } else {
  //       console.log(user)
  //     }
  //   });
  // }, [])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getUserData(uid)
          .then((data) => {
            setAppState({ user, userData: data });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
    });
  }, []);
  

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/user-profile" element={<MyProfileView />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
