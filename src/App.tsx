import "./App.css";
import Menu from "./features/menu/Menu";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateGame from "./features/menu/CreateGame";
import GameAlert from "./features/menu/GameAlert";
import StartGame from "./features/menu/StartGame";
import Battle from "./features/battle/battle";

declare global {
  interface Window { ethereum: any; }
}

window.ethereum = window.ethereum || {};

function App() {
  return (
    <Router>
      <div className="App">
        <GameAlert />
        <header className="App-header">
          <Switch>
            <Route exact path="/">
              <Menu />
            </Route>
            <Route path="/create-game/">
              <CreateGame />
            </Route>
            <Route path="/start-game/">
              <StartGame />
            </Route>
            <Route path="/battle/">
              <Battle />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
