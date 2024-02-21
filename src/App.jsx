import "./Input.css"
import Nav from "./components/Nav"
import { useRoutes } from "react-router-dom"
import MainProvider from "./components/ReducerAndContexts"
import routesData from "./routes"

function App() {
    const routes = useRoutes(routesData)

    return (
        <MainProvider>
            {routes}
            <Nav />
        </MainProvider>
    )
}

export default App