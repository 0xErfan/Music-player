import "./Input.css"
import Nav from "./components/Nav"
import { useRoutes } from "react-router-dom"
import MainProvider from "./components/ReducerAndContexts"
import routesData from "./routes"

function App() {
    const routes = useRoutes(routesData)

    return (
        <MainProvider>
            <div className="max-w-[500px] w-full m-auto">
                {routes}
                <Nav />
            </div>
        </MainProvider>
    )
}

export default App