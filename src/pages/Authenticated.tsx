import ScrollToTop from "components/ScrollToTop";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import PROTECTED_ROUTES from "routes/protectedRoutes";
import Navbar from "components/Navbar";
import { Container } from "@chakra-ui/react";

const AppWrapper = () => {
  const routes = useRoutes(PROTECTED_ROUTES);
  return routes;
};

const Authenticated = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Container>
        <AppWrapper />
      </Container>
    </Router>
  );
};
export default Authenticated;
