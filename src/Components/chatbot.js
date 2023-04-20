import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [inputVal, setInputVal] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const onSubmit = async () => {
      questions.push(inputVal);
    setQuestions(questions);
    try {
        const response = await axios.post("/chatbot", {
            input: inputVal,
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });          
      debugger;
      answers.push(response.data.response);
      setAnswers(answers);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const pressEnter = (e) => {
      if(e.key === 'Enter') {
        onSubmit()
      }
  };

  return (
    <div className="wrapper">
      <div className="title">Simple Chatbot</div>
      <div className="box">
        <div className="item">
          <div className="icon">
            <i className="fa fa-user"></i>
          </div>
          <div className="msg">
            {answers?.map((answer) => (
              <p>{answer}</p>
            ))}
          </div>
        </div>
        <br clear="both" />
        <div className="item right">
          <div className="msg">
            {questions?.map((question) => (
              <p>{question}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="typing-area">
        <div className="input-field">
          <input
            type="text"
            value={inputVal}
            onKeyDown={pressEnter}
            placeholder="Type your message"
            onChange={onChange}
            required
          />
          <button type="submit" onClick={onSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
