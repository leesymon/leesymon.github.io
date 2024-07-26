// gptApi.js
import React, { useState, useContext } from "react";
import { ChatContext } from "./ChatContext";
import { useLoading } from "./LoadingContext";

const apiKey = process.env.REACT_APP_API_KEY;

const useGptApi = () => {
  const [error, setError] = useState(null);

  const sendMessage = async (message, setLoading) => {
    setLoading(true);
    setError(null);

    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
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
                'Your name is 초록이.반말만 할 수 있어. You are an assistant created to raise awareness and understanding of AI, which has recently come to the forefront, for students ranging from kindergarteners to middle schoolers. Please respond in a friendly tone. Even if the question is not related to AI, please answer kindly and casual! Like a friendly Kindergarten teacher. However, try to steer the conversation in a way that suggests I want to talk about AI. Additionally, you are an assistant that provides a summary keyword and a detailed answer for the user\'s question.\n\n사용자의 질문: "${message}"\\n\\nJSON 형식으로 응답해줘:\\n{\\n  "keyword": "질문의 키워드",\\n  "answer": "질문에 대한 답변"\\n}',
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
      // console.log("API 응답 데이터:", data); // API 응답 데이터를 콘솔에 출력
      const aiResponse = data.choices[0].message.content.trim();

      // console.log("AI 응답 데이터:", aiResponse); // AI 응답 데이터를 콘솔에 출력

      // 응답 데이터를 올바르게 파싱
      let structuredResponse;
      try {
        structuredResponse = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error("JSON 파싱 오류:", parseError);
        throw new Error("응답을 JSON으로 파싱하는 데 실패했습니다.");
      }

      return structuredResponse;
    } catch (error) {
      setError(error);
      console.error("오류 발생!", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, error };
};

export default useGptApi;
