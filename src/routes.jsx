import Songs from "./components/Pages/Library/Songs"
import Search from "./components/Pages/Search"
import Albums from "./components/Pages/Albums"
import Artists from "./components/Pages/Artists"
import Home from "./components/Pages/Home/Home"
import Player from "./components/Pages/Player/Player"
import Account from "./components/Pages/Account"
import SignUp from "./components/Authentication/SignIn"
import Login from "./components/Authentication/LogIn"

const routes = [
    { path: "/", element: <Home /> },
    { path: "/player", element: <Player /> },
    { path: "/songs", element: <Songs /> },
    { path: "/search", element: <Search /> },
    { path: "/songs/:type", element: <Songs /> },
    { path: "/albums", element: <Albums /> },
    { path: "/artists", element: <Artists /> },
    { path: "/account", element: <Account /> },
    { path: "/login", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },
    // { path: "/*", element: <p>Not Found</p> }
]

export default routes;