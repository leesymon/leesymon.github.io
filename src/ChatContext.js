// ChatContext.js
import React, { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    console.log("ChatContext updated: keywords", keywords);
  }, [keywords]);

  return (
    <ChatContext.Provider
      value={{
        questions,
        setQuestions,
        keywords,
        setKeywords,
        answers,
        setAnswers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
