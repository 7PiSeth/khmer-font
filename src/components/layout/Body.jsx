import { useState } from "react";
import SearchBox from "../common/SearchBox";
import SideBar from "../common/SideBar";
import { BsArrowUpCircle } from "react-icons/bs";

const Body = () => {
  const [isMessageSent, setIsMessageSent] = useState(false);
  return (
    <div
      className={`min-h-[95vh] flex justify-center transition-all duration-500 ease-out ${
        isMessageSent ? "items-end pb-7" : " items-center"
      }`}
    >
      <SideBar />
      <div className="relative">
        <SearchBox />
        <BsArrowUpCircle
          onClick={() => setIsMessageSent(true)}
          className="absolute right-4 top-12 cursor-pointer hover:scale-110 active:scale-150 transition-all ease-out duration-300"
          size={27}
        />
      </div>
    </div>
  );
};

export default Body;
