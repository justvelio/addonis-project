import HomeContent from "./components/views/HomeContent/HomeContent";
import { useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../src/context/AppContext';


function App() {
  const [appState, setAppState] = useState({
    use: null,
    userData: null,
  });

  return (
    <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
      <BrowserRouter>
        <div className="App">
          <HomeContent />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );

}

export default App;
