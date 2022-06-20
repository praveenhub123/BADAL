import LandingPage from "./components/materialSignin";
import SignupPage from "./components/materialSignup";
import { BrowserRouter, Routes, Route, UNSAFE_RouteContext } from "react-router-dom";
import Companies from "./components/pages/companies";
import { DashboardLayout } from "./components/default";
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

// GraphQL
import { client } from "./Apollo";
import { ApolloProvider } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql/",
//   cache: new InMemoryCache()
// });

const App = () => {
  const UserContext = createContext();
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <UserContext.provider>
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
            height: 50,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              position: "fixed",
              left: "0",
              bottom: "0",
              height: "60px",
              width: "100%",
              backgroundColor: "#ecf7ff",
            }}
          >
            Powered by real page
          </div>
        </Box>
        </UserContext.provider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
