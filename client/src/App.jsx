import "./App.css";
import { Toaster } from "react-hot-toast";
import User from "./components/User";

function App() {
  return (
    <div className="App">
      <Toaster />
      <User />
    </div>
  );
}

export default App;
