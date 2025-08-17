import { Outlet } from "react-router";
import ErrorPopup from "./components/ErrorPopup";
import Header from "./components/Header";
import PageLoader from "./components/PageLoader";

function App() {
  return (
    <>
      <ErrorPopup />
      <PageLoader />
      <div className="flex h-screen w-screen flex-col gap-4">
        <Header />
        <main className="h-screen-minus-header px-4 xl:px-16">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
