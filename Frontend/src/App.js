import LandingPage from "./components/materialSignin";
import SignupPage from "./components/materialSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Companies from "./components/pages/companies";
import React, { useEffect, useState } from "react";
import Projects from "./components/pages/projects";
import MyProjects from "./components/pages/myProjects";
import ProjectBreakdown from "./components/pages/projectBreakdown";
import Module from "./components/pages/module";
import Task from "./components/pages/task";
import Employee from "./components/pages/Employee";
import Team from "./components/pages/Team";
import Ngo from "./components/pages/ngos";
import { SideBarNew } from "./components/SideBarNew";
import Navbar from "./components/NewNavbar";
import UserCard from "./components/pages/UserCard";
import Box from "@mui/material/Box";
import Test from "./components/test";
import { Divider, Typography } from "@mui/material";
import Header from "../src/components/Header";

// GraphQL
import { client } from "./Apollo";
import { ApolloProvider } from "@apollo/client";
// import NavBarSwitcher from "./components/Navbar/NavbarSwitcher";

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql/",
//   cache: new InMemoryCache()
// });


const App = () => {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("LoginStatus"));

  const login = sessionStorage.getItem('LoginStatus');
  
  function NavBarSwitcher() {
  if ( login === 'true') {
      return (<Navbar />);
    } 
  else {
      return (<Header />);
    }
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBarSwitcher />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<SideBarNew />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/breakdown" element={<ProjectBreakdown />} />
          {/* <Route path="/module" element={<Module />} /> */}
          <Route path="/tasks" element={<Task />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/team" element={<Team />} />
          <Route path="/ngo" element={<Ngo />} />
          <Route path="/user" element={<UserCard />} />
          <Route path="/test" element={<Test />} />
          <Route path="/module/:id" element={<Module />} />
        </Routes>
        <Box
          sx={{
            width: "100%",
            height: 40,
            textAlign: "center",
            justifyContent:"center",
            alignItems:"center",
            // padding: "25px",
            position: "fixed",
            left: "0",
            bottom: "0",
              // height: "60px",
            backgroundColor:"#94e6ff",
            width: "100%",
          }}
        >
          <Divider variant="middle" />
          <Typography
           color="textPrimary"
           variant="h6">
            Powered by Real Page
          </Typography>
        </Box>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
