import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import LandingPage from "./components/materialSignin";
import SignupPage from "./components/materialSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./components/pages/companies";
import Projects from "./components/pages/projects";
import MyProjects from "./components/pages/myProjects";
import ProjectBreakdown from "./components/pages/projectBreakdown";
import Module from "./components/pages/module";
import Task from "./components/pages/task";
import Employee from "./components/pages/Employee";
import Team from "./components/pages/Team";
import Ngo from "./components/pages/ngos";
import { SideBarNew } from "./components/SideBarNew";
import Navbar from "./components/NewNavbar"; */
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from "./App"; 
/* 
sessionStorage.setItem("type", "core-team");
sessionStorage.setItem("entity", "core-team");
 */
const a = sessionStorage.getItem("type")? null : sessionStorage.setItem("type", "core-team")
const b = sessionStorage.getItem("entity")? null : sessionStorage.setItem("entity", "core-team")
const c = sessionStorage.getItem("company")
  ? null
  : sessionStorage.setItem("company", "core-team");

/* class App extends React.Component {
  render() {
    const DefaultRoutes = () => {
      return (
        <div>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<SideBarNew />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route path="/breakdown" element={<ProjectBreakdown />} />
            <Route path="/module" element={<Module />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/team" element={<Team />} />
            <Route path="/ngo" element={<Ngo />} />
          </Routes>
        </div>
      );
    };

    return (
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route component={DefaultRoutes} />
        </Routes>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
 */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>   
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

