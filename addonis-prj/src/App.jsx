import HomeContent from "./components/views/HomeContent/HomeContent";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContext from '../src/context/AppContext';
import Header from "./components/Header/Header";
import MyProfileView from "./components/views/MyProfile/MyProfile";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <Router>
        <div className="App">
          <Header />
          {<HomeContent />}
          <Routes>
          <Route path="/user-profile" element={<MyProfileView />} />
      </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
