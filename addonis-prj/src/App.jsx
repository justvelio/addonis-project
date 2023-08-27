import HomeContent from "./components/views/HomeContent/HomeContent";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import AppContext from '../src/context/AppContext';
import Header from "./components/Header/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import MyProfileView from "./components/views/MyProfile/MyProfile";
import UploadPlugin from "../src/components/views/UploadPlugin/UploadPlugin";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        const uid = user.uid;
        getUserData(uid)
          .then((data) => {
            setAppState({ user, userData: data })
            console.log(data)

          }
          )
      } else {
        console.log(user)
      }
    });
  }, [])




  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomeContent />} /> {/* Render HomeContent only for root path */}
            <Route path="/user-profile" element={<MyProfileView />} />
            <Route path="/upload-plugin" element={<UploadPlugin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
