import HomeContent from "./components/views/HomeContent/HomeContent";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppContext from "../src/context/AppContext";
import Header from "./components/Header/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { getUserData } from "./services/users.service";
import MyProfileView from "./components/views/MyProfile/MyProfile";
import UploadPlugin from "../src/components/views/UploadPlugin/UploadPlugin";
import Footer from "./components/Footer/Footer";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import ProductsPage from "./components/views/ProductsPage/ProductsPage";
import MyPlugins from "./components/views/MyPlugins/MyPlugins";
import Partners from "./components/views/Partners/Partners";
import PluginDetailView from "./components/PluginDetailView/PluginDetailView";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
    loading: true,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const uid = user.uid;
        getUserData(uid).then((data) => {
          setAppState({ user, userData: data });
          // console.log(data)
        });
      } else {
        // console.log(user)
        setAppState({
          user: null,
          userData: null,
        });
      }
    });
    setAppState((previous) => ({ ...previous, loading: false }));
  }, []);

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/user-profile" element={<MyProfileView />} />
            <Route path="/my-plugins" element={<MyPlugins />} />
            <Route path="/upload-plugin" element={<UploadPlugin />} />
            <Route
              path="/admin"
              element={<AdminPanel role={appState.role} />}
            />
            <Route path="/edit-profile" element={<UpdateProfile />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/plugin/:id" element={<PluginDetailView />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
