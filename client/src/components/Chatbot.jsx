import { useState, useEffect } from "react";
import { LuBotMessageSquare } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { PiEraserDuotone } from "react-icons/pi";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const chatBody = document.getElementById("chat-body");
    chatBody?.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }, [messages]);

    useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if(messages.length > 0){
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  const handleClearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "User", text: input },
      { sender: "Bot", text: "Typing..." },
    ]);
    setInput("");

    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      await new Promise((res) => setTimeout(res, 900));

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "Bot", text: data.reply };
        return updated;
      });
    } catch (error) {
      console.error(error);
      await new Promise((res) => setTimeout(res, 900));
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "Bot",
          text: "Sorry, something went wrong.",
        };
        return updated;
      });
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-5 bottom-10 bg-[#155DFC] text-white h-12 w-12 rounded-full flex items-center justify-center z-50 text-lg font-bold shadow-2xl cursor-pointer hover:scale-105"
      >
        {isOpen ? (
          <RxCross2 className="animate-pulse" />
        ) : (
          <LuBotMessageSquare className="animate-bounce" />
        )}
      </div>
      {isOpen && (
        <div className="fixed right-5 bottom-30 w-[30%] h-120 bg-white z-100 rounded-md backdrop-blur-2xl shadow-2xl border border-[#f2f4f6] overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#155DFC] w-full px-3 py-3 rounded-t-md text-white h-[15%]">
            <div className="relative w-10 h-10">
              <div className="flex items-center justify-center rounded-full bg-[#5081ED] w-10 h-10 text-lg font-bold">
                <LuBotMessageSquare />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-400 border-2 border-white rounded-full" />
            </div>

            <div className="">
              <h1 className="text-md font-bold">AI Assistant - RideNow</h1>
              <p className="text-[#D1E2FC] text-xs">
                Online | How Can I help you?
              </p>
            </div>

            <button
              onClick={handleClearChat}
              className="ml-auto underline text-white hover:text-yellow-300 cursor-pointer text-lg font-semibold bg-[#5081ED] rounded-full w-10 h-5 flex items-center justify-center" >
              <PiEraserDuotone />
            </button>
          </div>

          {/* Body */}
          <div
            id="chat-body"
            className="border-b border-[#E4E4E7] w-full h-[70%] overflow-y-auto px-4 py-3 space-y-2"
          >
            {messages.map((obj, index) => (
              <div
                key={index}
                className="flex items-center justify-start gap-1 -ml-3 -mr-3"
              >
                {obj.sender === "Bot" && (
                  <div className="h-8 w-8 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                    <LuBotMessageSquare />
                  </div>
                )}
                <div
                  className={`bg-[#DBEAFE] text-[#2563EB] text-sm px-4 py-2 w-fit max-w-[70%] ${
                    obj.sender === "User"
                      ? "ml-auto rounded-t-lg rounded-bl-lg"
                      : "rounded-t-lg rounded-br-lg"
                  }`}
                >
                  {obj.text === "Typing..." ? (
                    <div className="flex gap-1 py-2 ">
                      <span className="dot bg-[#2563EB] w-1.5 h-1.5 rounded-full animate-bounce" />
                      <span className="dot bg-[#2563EB] w-1.5 h-1.5 rounded-full animate-bounce delay-150" />
                      <span className="dot bg-[#2563EB] w-1.5 h-1.5 rounded-full animate-bounce delay-300" />
                    </div>
                  ) : (
                    obj.text
                  )}
                </div>
                {obj.sender === "User" && (
                  <div className="bg-[#DBEAFE] text-[#2563EB] h-8 w-8 rounded-full flex items-center justify-center">
                    <LuUser />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer - msg box */}
          <div className="w-full h-[15%] rounded-b-md flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="border border-[#E4E4E7] pr-35 pl-2 py-2.5 rounded-md text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#155DFC] text-white flex items-center justify-center text-lg font-semibold rounded-full w-9 h-9 cursor-pointer"
              >
                <IoIosSend />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
