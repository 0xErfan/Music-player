import "./Input.css"
import Main from "./components/Main/Main"
import Nav from "./components/Nav/Nav"
import Player from "./components/Player/Player"
import { Route, Routes } from "react-router-dom"
import Songs from "./components/Library/Songs"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/player" element={<Player />} />
                <Route path="/songs" element={<Songs />}/>
                <Route path="/songs/:type" element={<Songs />}/>
                <Route path="/*" element={<p>Not Found</p>}/>
            </Routes>
            <Nav />
        </>
    )
}

export default App