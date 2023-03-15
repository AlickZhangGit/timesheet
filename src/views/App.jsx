import { useState } from "react";
//import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <form>Email: <input type='text'></input> Password:<input type='text'></input></form>
        </div>
    );
}

export default App;