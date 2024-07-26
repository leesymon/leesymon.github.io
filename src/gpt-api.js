import React, { useState, useContext } from "react";
import { ChatContext } from "./ChatContext";
import { useLoading } from "./LoadingContext";

const apiKey = process.env.REACT_APP_API_KEY;

const Chatbot = () => {
  const {
    questions,
    setQuestions,
    keywords,
    setKeywords,
    answers,
    setAnswers,
  } = useContext(ChatContext);
  const { loading, setLoading } = useLoading();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isComposing, setIsComposing] = useState(false); // IME 입력 중인지 여부를 추적하는 상태

  const apiEndpoint = "https://api.openai.com/v1/chat/completions";

  const addMessage = (sender, message) => {
    setMessages((prevMessages) => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async () => {
    let message = userInput.trim();
    if (message.length === 0) return;

    addMessage("user", message);
    setUserInput("");
    setLoading(true);

    setQuestions((prevQuestions) => [...prevQuestions, message]);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                'Your name is 초록이. 반말만 할 수 있어! You are an assistant created to raise awareness and understanding of AI, which has recently come to the forefront, for students ranging from kindergarteners to middle schoolers. Please respond in a friendly tone. Even if the question is not related to AI, please answer kindly and casual! Like a friendly Kindergarten teacher. However, try to steer the conversation in a way that suggests I want to talk about AI. Additionally, you are an assistant that provides a summary keyword and a detailed answer for the user\'s question.\n\n사용자의 질문: "${message}"\n\nJSON 형식으로 응답해줘:\n{\n  "keyword": "질문의 키워드",\n  "answer": "질문에 대한 답변"\n}',
            },
            {
              role: "user",
              content: `사용자의 질문: "${message}"\n\nJSON 형식으로 응답해줘:\n{\n  "keyword": "질문의 키워드",\n  "answer": "질문에 대한 답변"\n}`,
            },
          ],
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Something went wrong");
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content.trim();

      let structuredResponse;
      try {
        structuredResponse = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error("JSON 파싱 오류:", parseError);
        throw new Error("응답을 JSON으로 파싱하는 데 실패했습니다.");
      }

      const { keyword, answer } = structuredResponse;

      setKeywords((prevKeywords) => {
        const newKeywords = [...prevKeywords, keyword];
        console.log("Updated keywords in Chatbot:", newKeywords);
        return newKeywords;
      });
      setAnswers((prevAnswers) => [...prevAnswers, answer]);

      addMessage("bot", `질문 키워드: ${keyword}\n답변: ${answer}`);
    } catch (error) {
      console.error("오류 발생!", error);
      addMessage("bot", `오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isComposing) {
      // IME 입력 중이 아닐 때만 전송
      handleSendMessage();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (event) => {
    setIsComposing(false);
    // IME 입력이 끝났을 때 Enter 키가 눌린 경우 메시지 전송
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handlePrintData = () => {
    console.log("Questions:", questions);
    console.log("Keywords:", keywords);
    console.log("Answers:", answers);
  };

  return (
    <div id="Chatbot">
      <div className="chatDiv">
        {loading && (
          <span className="messageWait">답변을 기다리고 있습니다</span>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {`${msg.sender === "user" ? "나" : "챗봇"} : ${msg.message}`}
          </div>
        ))}
      </div>
      <div className="inputDiv">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <button onClick={handleSendMessage}>전송</button>
        <button onClick={handlePrintData}>콘솔 출력</button>
      </div>
    </div>
  );
};

export default Chatbot;
