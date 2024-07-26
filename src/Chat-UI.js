import React, { useState, useContext } from "react";
import useGptApi from "./gptApi";
import { useLoading } from "./LoadingContext";
import { motion } from "framer-motion";
import "./App.css";
import { ChatContext } from "./ChatContext";

const ChatUI = () => {
  const {
    questions,
    setQuestions,
    keywords,
    setKeywords,
    answers,
    setAnswers,
  } = useContext(ChatContext);
  const { sendMessage } = useGptApi();
  const { loading, setLoading } = useLoading();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage("user", message);
    setUserInput(""); // 질문 전송 후 입력 필드 초기화
    setQuestions((prevQuestions) => [...prevQuestions, message]);

    setIsMinimized(true);

    try {
      const structuredResponse = await sendMessage(message, setLoading);
      const { keyword, answer } = structuredResponse;

      setKeywords((prevKeywords) => [...prevKeywords, keyword]);
      setAnswers((prevAnswers) => [...prevAnswers, answer]);

      addMessage("bot", `질문 키워드: ${keyword}\n답변: ${answer}`);
    } catch (error) {
      addMessage("bot", `오류 발생: ${error.message}`);
    } finally {
      setTimeout(() => {
        setIsMinimized(false);
      }, 2500);
    }
  };

  const handlePrintData = () => {
    console.log("Questions:", questions);
    console.log("Keywords:", keywords);
    console.log("Answers:", answers);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Enter 키의 기본 동작(줄바꿈) 방지
      handleSendMessage();
      handlePrintData();
    }
  };

  return (
    <div id="Chatbot">
      <div className="inputDiv">
        <motion.textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          animate={{
            width: isMinimized ? 0 : 940,
            height: isMinimized ? 0 : 58,
            backgroundColor: isMinimized ? "#e86363" : "#e86363",
            color: isMinimized ? "#ffffff" : "#ffffff",
            fontSize: isMinimized ? "0px" : "22px",
            borderRadius: "10px",
            padding: isMinimized ? "0px" : "8px", // padding을 0으로 설정
            margin: isMinimized ? "0px" : "8px", // margin을 0으로 설정
          }}
          transition={{
            delay: isMinimized ? 0 : 0.5,
            width: isMinimized
              ? { duration: 13 / 60 }
              : { duration: 71 / 60, ease: "easeInOut" },
            height: isMinimized
              ? { duration: 24 / 60 }
              : { duration: 20 / 60, ease: "easeInOut" },
            backgroundColor: { duration: 0.2 },
            color: { duration: 0.2 },
            padding: { duration: 0.2 },
            margin: { duration: 0.2 },
          }}
          className="textarea"
          placeholder="여기에 질문하세요!"
          style={{
            resize: "none",
            outline: "none",
            boxShadow: "none",
            border: "none",
          }}
        />
        <style>
          {`
            .textarea::placeholder {
              color: ${isMinimized ? "#E0E0E0" : "#E0E0E0"};
            }
            .textarea:focus {
              outline: none;
              box-shadow: none;
              border: none;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ChatUI;
