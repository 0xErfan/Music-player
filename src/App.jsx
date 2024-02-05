import "./Input.css"
import Main from "./components/Main/Main"
import Nav from "./components/Nav/Nav"
import Player from "./components/Player/Player"
import { Route, Routes } from "react-router-dom"
import Songs from "./components/Library/Songs"
import Search from "./components/Search/Search"
import Albums from "./components/Albums/Albums"
import Artists from "./components/Artists/Artists"
import MainProvider from "./components/DataContext/ReducerAndContexts"
function App() {
    return (
        <MainProvider>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/player" element={<Player />} />
                <Route path="/songs" element={<Songs />}/>
                <Route path="/songs/:type" element={<Songs />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/albums" element={<Albums />}/>
                <Route path="/artists" element={<Artists />}/>
                <Route path="/*" element={<p>Not Found</p>}/>
            </Routes>
            <Nav />
        </MainProvider>
    )
}

export default App