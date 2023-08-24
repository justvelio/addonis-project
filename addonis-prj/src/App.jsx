import HomeContent from "./components/views/HomeContent/HomeContent";
import { useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../src/context/AppContext';
import Header from "./components/Header/Header";

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <HomeContent />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
