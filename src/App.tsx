import { ChakraProvider } from "@chakra-ui/react";
import Pages from "pages";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import ErrorBoundary from "components/ErrorBoundary";
import { Provider } from "react-redux";
import theme from "styles/theme";
import store from "services/redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const RenderDevTool = () => {
  if (process.env.NODE_ENV === "development") {
    return <ReactQueryDevtools initialIsOpen={false} />;
  }
  return null;
};

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ErrorBoundary>
          <Provider store={store}>
            <Pages />
          </Provider>
        </ErrorBoundary>
        <RenderDevTool />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
