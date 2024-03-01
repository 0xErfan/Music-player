import Songs from "./Pages/Library/Songs"
import Search from "./Pages/Search"
import Albums from "./Pages/Albums"
import Artists from "./Pages/Artists"
import Home from "./Pages/Home/Home"
import Player from "./Pages/Player/Player"
import Account from "./Pages/Account"
import SignUp from "./Pages/SignIn"
import Login from "./Pages/LogIn"
import NotFound from "./Pages/NotFound"

const routes = [
    { path: "/Music-player", element: <Home /> },
    { path: "/player", element: <Player /> },
    { path: "/search", element: <Search /> },
    { path: "/search/:text", element: <Search /> },
    { path: "/songs", element: <Songs /> },
    { path: "/songs/:type", element: <Songs /> },
    { path: "/albums", element: <Albums /> },
    { path: "/artists", element: <Artists /> },
    { path: "/account", element: <Account /> },
    { path: "/login", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },
    { path: "/*", element: <NotFound /> }
]

export default routes;