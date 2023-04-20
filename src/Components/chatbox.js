import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsRobot } from "react-icons/bs";
import { RiSendPlane2Fill } from "react-icons/ri";
import moment from "moment";
import BeatLoader from "react-spinners/BeatLoader";

const cloneDeep = require("clone-deep");

const ChatBox = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [questionAns, setQuestionAns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef();

  // Scroll to the bottom of the chatbox
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Call scrollToBottom whenever the questionAns state changes
  useEffect(() => {
    scrollToBottom();
  }, [questionAns]);

  // Resize the textarea based on its content
  const resizeTextarea = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/chatbot",
        {
          input: inputVal,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const qusAns = cloneDeep(questionAns);
      qusAns.push({
        question: inputVal,
        answer: response.data.response,
        time: moment().format("hh:mm A"),
      });
      setQuestionAns(qusAns);
      setInputVal("");
      scrollToBottom();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error making API request:", error);
    }
  };

  const onChange = (e) => {
    setInputVal(e.target.value);
    resizeTextarea();
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      scrollToBottom();
      onSubmit(e);
    }
  };

  return (
    <div className="chatbox-wrapper">
      <div
        className="chatbox-toggle"
        onClick={() => setShowChatbox(!showChatbox)}
      >
        <BsRobot />
      </div>
      <div className={`chatbox-message-wrapper ${showChatbox ? "show" : ""}`}>
        <div className="chatbox-message-header">
          <div className="chatbox-message-profile">
            <img src="/bot.jpg" alt="" className="chatbox-message-image" />
            <div>
              <h4 className="chatbox-message-name">FlexiBot</h4>
            </div>
          </div>
          <div className="chatbox-message-dropdown">
            <i className="bx bx-dots-vertical-rounded chatbox-message-dropdown-toggle"></i>
            <ul className="chatbox-message-dropdown-menu">
              <li>
                <a href="#">Search</a>
              </li>
              <li>
                <a href="#">Report</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="chatbox-message-content">
          {questionAns.length === 0 ? (
            <h4 class="chatbox-message-no-message">
              You don't have message yet!
            </h4>
          ) : (
            questionAns?.map((qa, index) => {
              return (
                <>
                  <div className="chatbox-message-item sent">
                    <span className="chatbox-message-item-text">
                      {qa.question}
                    </span>

                    <span className="chatbox-message-item-time">{qa.time}</span>
                  </div>
                  <div className="chatbox-message-item received">
                    <span className="chatbox-message-item-text">
                      {qa.answer}
                    </span>
                    <span className="chatbox-message-item-time">{qa.time}</span>
                  </div>
                </>
              );
            })
          )}
          {isLoading ? (
            <div className="chatbox-message-item received">
              <span className="chatbox-message-item-text">
                <BeatLoader color="#335DFF" />
              </span>
            </div>
          ) : null}
          {/* Add the ref div at the end of the chatbox-message-content */}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbox-message-bottom">
          <form className="chatbox-message-form">
            <textarea
              ref={textareaRef}
              rows="1"
              placeholder="Type message..."
              className="chatbox-message-input"
              value={inputVal}
              onKeyDown={pressEnter}
              placeholder="Type your message"
              onChange={onChange}
              required
              style={{ overflow: "hidden" }}
            ></textarea>
            <button
              disabled={isLoading}
              type="submit"
              onClick={onSubmit}
              className="chatbox-message-submit"
            >
              <RiSendPlane2Fill />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
