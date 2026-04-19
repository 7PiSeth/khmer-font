import { useState, useRef } from "react";

const SearchBox = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setContent(e.target.value);

    // Adjust the height dynamically
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to calculate the new height
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col items-center mt-10 relative">
      <textarea
        ref={textareaRef}
        autoComplete="off"
        value={content}
        onChange={handleInputChange}
        placeholder="Message ChatPD ..."
        className="overflow-hidden w-[40vw] max-md:w-[90vw]  
        p-7 rounded-3xl resize-none font-raleway text-lg
        dark:bg-[rgb(22,27,34)] dark:text-[#A3B3BC]"
        rows={1} // Start with one row
      />
    </div>
  );
};

export default SearchBox;
