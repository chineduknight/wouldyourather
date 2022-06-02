import { useSelector } from "react-redux";
import { RootState } from "services/redux/configure_store";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const Pages = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthUser = user !== null;

  if (isAuthUser) {
    return <Authenticated />;
  }

  return <UnAuthenticated />;
};

export default Pages;
