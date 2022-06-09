import Loader from "components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "services/redux/configure_store";
import { updateAllUsers } from "services/redux/reducers/auth";
import { updateQuestions } from "services/redux/reducers/questions";
import { IQuestion } from "type";
import { _getQuestions, _getUsers } from "utils/_DATA";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const Pages = () => {
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const getUsersAndQuestions = async () => {
      const allQuestions: Record<string, IQuestion> = await _getQuestions();
      const allUsers = await _getUsers();
      dispatch(updateAllUsers(allUsers));
      dispatch(updateQuestions(allQuestions));
    };
    if (loading) {
      getUsersAndQuestions();
    }
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Authenticated />;
  }

  return <UnAuthenticated />;
};

export default Pages;
