import Songs from "./components/Pages/Library/Songs"
import Search from "./components/Pages/Search"
import Albums from "./components/Pages/Albums"
import Artists from "./components/Pages/Artists"
import Home from "./components/Pages/Home/Home"
import Player from "./components/Pages/Player/Player"
import Authentication from "./components/Authentication/Authentication"

const routes = [
    { path: "/", element: <Home /> },
    { path: "/player", element: <Player /> },
    { path: "/songs", element: <Songs /> },
    { path: "/search", element: <Search /> },
    { path: "/songs/:type", element: <Songs /> },
    { path: "/albums", element: <Albums /> },
    { path: "/artists", element: <Artists /> },
    { path: "/account:status", element: < Authentication /> },
    { path: "/*", element: <p>Not Found</p> }
]

export default routes