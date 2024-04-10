import { Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home'
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import WorkingArea from "./pages/WorkingArea/WorkingArea";
import Sandbox from "./pages/Sandbox/Sandbox";
import SecondSandBox from "./pages/SecondSandbox/SecondSandbox";
import SourceCode from "./pages/SourceCode/SourceCode";
import Download from "./pages/Download";


function App() {
    /*
    
    */
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="workingarea" element={<WorkingArea />} />
                <Route path="secondsandbox" element={<SecondSandBox />} />
                <Route path="sandbox" element={<Sandbox />} />
                <Route path="sourcecode" element={<SourceCode />} />
                <Route path="download" element={<Download />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    )
}

export default App
