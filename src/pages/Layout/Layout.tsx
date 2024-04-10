import { Outlet, Link } from "react-router-dom";

import "./Layout.css"

const Layout = () => {
    return (
        <>
            <header>
                <h1>Engineering Thesis</h1>
            </header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/secondsandbox">Second Sandbox</Link>
                    </li>
                    <li>
                        <Link to="/sandbox">Sandbox</Link>
                    </li>
                    <li>
                        <Link to="/workingarea">Working Area</Link>
                    </li>
                    <li>
                        <Link to="/sourcecode">Source Code</Link>
                    </li>
                    <li>
                        <Link to="/download">Download</Link>
                    </li>
                </ul>
            </nav >

            <Outlet />
        </>
    )
};

export default Layout;