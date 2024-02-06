import "./Input.css"
import Nav from "./components/Nav/Nav"
import { useRoutes } from "react-router-dom"
import MainProvider from "./components/ReducerAndContexts/ReducerAndContexts"
import routesData from "./routes"

function App() {
    const routes = useRoutes(routesData)

    return (
        <MainProvider>
            <Nav />
            {routes}
        </MainProvider>
    )
}

export default App