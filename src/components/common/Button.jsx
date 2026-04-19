import React from "react";

const Button = (props) => {
  return (
    <div>
        <button 
        className="active:scale-150 duration-100 font-poppins text-xl px-5 py-2 rounded-xl bg-primary text-white">
            {props.title}
        </button>
    </div>
  );
};

export default Button;