import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { VerticalNavbar } from "../VerticalNavbar";

export function Layout() {
    return (
        <>
            <Header />
            <VerticalNavbar />
            <div className="container-fluid p-0">
                <div className="row" style={{ marginLeft: '75px', marginTop: '-75px', zIndex: 1, position: 'relative' }}>
                    <div className="col p-0">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                            <div className="card-custom bg-dark text-white">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}