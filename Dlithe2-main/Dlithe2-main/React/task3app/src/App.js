import { useState } from "react";
import imgName from "./logo.svg";

export default function ReadMoreComponent() {
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <img 
        src={imgName}
        alt="Logo"
        style={{ width: "400px", height: "400px" }}
      />

      <button 
        onClick={() => setShowText(!showText)}
      >
        {showText ? "Read Less" : "Read More"}
      </button>
      {showText && (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum sagittis massa, in ultrices felis. Mauris at sagittis neque. In lorem felis, maximus at pretium ut, pulvinar vitae lacus. Integer ante neque, tristique et nunc in, iaculis ultrices diam. Nam ac luctus sapien. Fusce iaculis, lorem volutpat sagittis ornare, velit sapien egestas sapien, non porttitor nibh ligula quis sem. Aenean non arcu egestas, interdum sem sed, euismod est. Praesent vitae ultrices erat. Suspendisse eu lorem non enim ultricies feugiat quis quis nunc. Ut ligula neque, facilisis nec ultrices et, sollicitudin vel dolor.
        </p>
      )}
    </div>
  );
}
