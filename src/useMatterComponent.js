import React, { useRef, useContext, useState } from "react";
import TextBox from "./TextBox.js";
import useMatter from "./useMatter";
import { ChatContext } from "./ChatContext";
import ModalComponent from "./ModalComponent";

const UseMatterComponent = () => {
  const sceneRef = useRef(null);
  const { keywords, questions, answers } = useContext(ChatContext);
  const fontSize = 90;
  const boxes = useMatter(sceneRef, fontSize, keywords);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    question: "",
    keyword: "",
    answer: "",
  });

  const handleBoxClick = (index) => {
    console.log("Box clicked:", index);
    console.log("Questions:", questions);
    console.log("Keywords:", keywords);
    console.log("Answers:", answers);
    if (questions[index] && keywords[index] && answers[index]) {
      setModalContent({
        question: questions[index],
        keyword: keywords[index],
        answer: answers[index],
      });
      setIsModalOpen(true);
    } else {
      console.error("Invalid index or missing data for modal content");
    }
  };

  return (
    <div
      ref={sceneRef}
      style={{ width: "1080px", height: "1354px", position: "relative" }}
    >
      {boxes.map(({ information, color, position, rotation }, index) => (
        <TextBox
          key={index}
          text={information}
          color={color}
          fontSize={fontSize}
          position={position}
          rotation={rotation}
          onClick={() => handleBoxClick(index)}
        />
      ))}
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
};

export default UseMatterComponent;
