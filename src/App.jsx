import { useEffect, useState } from "react";
import "./styles/tailwind.css";
import AOS from "aos";
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Footer from "./components/layout/Footer";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    // <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-[120px] md:pb-[70px]">
    //   {/* <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    //   <Body searchTerm={searchTerm} /> */}
    //   <Footer />
    // </div>
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-screen-lg px-1 mx-auto py-3">
        <Body searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
};

export default App;