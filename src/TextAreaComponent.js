//TextAreaComponent.js

import React, { useState, useEffect } from "react";
import "./App.css";
import ChatUI from "./Chat-UI";

const TextAreaComponent = () => {
  return (
    <div className="container">
      <ChatUI />
    </div>
  );
};

export default TextAreaComponent;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import "./App.css";

// const TextAreaComponent = () => {
//   const [isMinimized, setIsMinimized] = useState(false);

//   const toggleBox = () => {
//     setIsMinimized((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.code === "Space") {
//         event.preventDefault(); // 스크롤 방지
//         toggleBox();
//       }
//     };

//     // 스페이스바를 눌렀을 때 toggleBox 함수 호출
//     document.addEventListener("keydown", handleKeyDown);

//     // cleanup function to remove the event listener
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div className="container">
//       <motion.textarea
//         animate={{
//           width: isMinimized ? 52 : 950,
//           height: isMinimized ? 11.32 : 58,
//           backgroundColor: isMinimized ? "#e86363" : "#e86363", // 텍스트 영역 배경색
//           color: isMinimized ? "#ffffff" : "#ffffff", // 텍스트 색상
//           fontSize: isMinimized ? "8px" : "22px", // 텍스트 크기 변경
//           borderRadius: "10px", // 둥근 모서리 추가
//         }}
//         transition={{
//           width: isMinimized ? { duration: 34 / 60 } : { duration: 71 / 60 },
//           height: isMinimized ? { duration: 34 / 60 } : { duration: 20 / 60 },
//           backgroundColor: { duration: 0.2 },
//           color: { duration: 0.2 },
//         }}
//         className="textarea"
//         placeholder="여기에 질문하세요!"
//         style={{ resize: "none" }}
//       />
//       <style>
//         {`
//           .textarea::placeholder {
//             color: ${
//               isMinimized ? "#E0E0E0" : "#E0E0E0"
//             }; /* placeholder 색상 */
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TextAreaComponent;
