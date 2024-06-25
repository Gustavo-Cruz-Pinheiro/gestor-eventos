import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { TournamentList } from "./pages/TournamentList";
import { NewTournament } from "./pages/NewTournament";
import { TournamentDetails } from "./pages/TournamentDetails";
import { Private } from "./routes/private";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/configuracao',
                element: <Settings />,
            },
            {
                path: '/torneios',
                element: <Private><TournamentList /></Private>,
            },
            {
                path: '/torneios/novo',
                element: <Private><NewTournament /></Private>,
            },
            {
                path: '/torneios/:id',
                element: <Private><TournamentDetails /></Private>
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
])

export { router}