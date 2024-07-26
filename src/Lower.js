import React from "react";
import RiveAnimation from "./RiveAnimation";
import TextAreaComponent from "./TextAreaComponent";
import "./App.css";
import { LoadingProvider } from "./LoadingContext";
import Chatbot from "./gpt-api"; // 수정: Chatbot import

const instructions = [
  "초록색 친구의 입에 궁금한걸 적고 ENTER 를 눌러봐. \n\n 친구는 AI에 대해 뭐든지 대답해줄 수 있어\nAI가 어떻게 작동하는지, 어디에 사용되는지, 또는 AI가 미래에 어떤 변화를 가져올지 궁금해?\n\n질문해 봐. 초록색 친구가 다 알려줄 거야!",
];




function Lower() {
  return (
    <div>
      <div className="rive-here">
        <LoadingProvider>
          <RiveAnimation />
          <TextAreaComponent />
        </LoadingProvider>
      </div>
      <div className="ai">
        <img
          src={`${process.env.PUBLIC_URL}/images/ai가뭐에요.svg`}
          alt="AI가 뭐에요"
        />
      </div>
      <div className="ai-text">
        {instructions.map((instruction, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{
              __html: instruction.replace("ENTER", "<code>ENTER</code>"),
            }}
          ></p>
        ))}
      </div>
      <Chatbot />
    </div>
  );
}

export default Lower;
