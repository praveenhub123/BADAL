import Navbar from "../NewNavbar";
import Header from "./Header";

const NavBarSwitcher = props => {
  const login = sessionStorage.getItem('LoginStatus');
  if ( login === 'true') {
      return (<Navbar />);
    } 
  else {
      return (<Header />);
    }
  };
  export default NavBarSwitcher;
  