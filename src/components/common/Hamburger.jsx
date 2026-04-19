import { useState } from "react";

const Hamburger = () => {
  const [nav, setNav] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-0.5 rounded-full bg-black dark:bg-white z-30 transition ease transform duration-300`;

  function openNave() {
    setNav(!nav);
    nav
      ? document.body.classList.remove("overflow-hidden", "touch-none")
      : document.body.classList.add("overflow-hidden", "touch-none");
  }

  return (
    <button
      onClick={openNave}
      className="flex flex-col rounded justify-center items-center"
    >
      <div
        className={`${genericHamburgerLine} ${
          nav && "rotate-45 translate-y-2"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          nav ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          nav && "-rotate-45 -translate-y-2"
        }`}
      />
    </button>
  );
};

export default Hamburger;
