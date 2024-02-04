import "./Input.css"
import Main from "./components/Main/Main"
import Player from "./components/Player/Player"
import { Route, Routes } from "react-router-dom"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/player" element={<Player />} />
        </Routes>
    )
}

export default App