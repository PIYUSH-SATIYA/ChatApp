import React, { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
    const {
        messages,
        selectedUser,
        setSelectedUser,
        sendMessage,
        getMessages,
    } = useContext(ChatContext);
    const { authUser, onlineUsers } = useContext(AuthContext);

    const scrollEnd = useRef();

    const [input, setInput] = useState("");

    // message sending
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === "") return null;
        await sendMessage({ text: input.trim() });
        setInput("");
    };

    // image sending
    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("select an image file");
            return;
        }
        const reader = new FileReader();

        reader.onloadend = async () => {
            await sendMessage({ image: reader.result });
            e.target.value = "";
        };

        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        // Only scroll if the container is visible (selectedUser exists)
        if (scrollEnd.current && selectedUser) {
            // Prevent scroll events from bubbling up to parent containers
            // const scrollOptions = { behavior: "smooth", block: "end" };
            // setTimeout(() => {
            scrollEnd.current.scrollIntoView();
            // }, 100); // Small delay to ensure DOM is fully updated
        }
    });

    return selectedUser ? (
        // Add overflow-hidden to ensure scrolling is contained within this component
        // This is very imp, otherwise the flex container will just grow longer and longer as the messages get incresed, which stretches the user list container too
        <div className="h-full flex flex-col relative backdrop-blur-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
                <img
                    src={selectedUser.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-8 rounded-full"
                />
                <p className="flex-1 text-lg text-white flex items-center gap-2">
                    {selectedUser.fullName}
                    {onlineUsers.includes(selectedUser._id) && (
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    )}
                </p>
                <img
                    onClick={() => {
                        setSelectedUser(null);
                    }}
                    src={assets.arrow_icon}
                    alt=""
                    className="md:hidden max-w-7"
                />
                <img
                    src={assets.help_icon}
                    alt=""
                    className="max-md:hidden max-w-5"
                />
            </div>
            {/* Chat area */}
            <div className="flex-1 overflow-y-scroll p-3">
                {" "}
                {/* Changed to flex-1 and added pb-20 for input space */}
                {messages.map((msg, index) => (
                    <div
                        key={msg._id}
                        className={`flex items-end gap-2 justify-end ${
                            msg.senderId !== authUser._id && "flex-row-reverse"
                        }`}
                    >
                        {msg.image ? (
                            <img
                                src={msg.image}
                                alt=""
                                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                            />
                        ) : (
                            <p
                                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                                    msg.senderId === authUser._id
                                        ? "rounded-br-none"
                                        : "rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </p>
                        )}
                        <div className="text-center text-xs">
                            <img
                                src={
                                    msg.senderId === authUser._id
                                        ? authUser?.profilePic ||
                                          assets.avatar_icon
                                        : selectedUser.profilePic ||
                                          assets.avatar_icon
                                }
                                alt=""
                                className="w-7 rounded-full"
                            />
                            <p className="text-gray-500">
                                {formatMessageTime(msg.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={scrollEnd}></div>
            </div>
            {/* Bottom Area */}
            <div className="sticky bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-[#282142]/50 backdrop-blur-sm">
                {" "}
                {/* Changed from absolute to sticky */}
                <div className="flex-1 flex item-center bg-gray-100/12 px-3 rounded-full">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onKeyDown={(e) =>
                            e.key === "Enter" ? handleSendMessage(e) : null
                        }
                        type="text"
                        name=""
                        id=""
                        placeholder="Send a message"
                        className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
                    />
                    <input
                        onChange={handleSendImage}
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        hidden
                    />
                    <label htmlFor="image">
                        <img
                            src={assets.gallery_icon}
                            alt=""
                            className="w-5 mr-2 cursor-pointer"
                        />
                    </label>
                </div>
                <img
                    onClick={handleSendMessage}
                    src={assets.send_button}
                    alt=""
                    className="w-7 cursor-pointer"
                />
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
            <img src={assets.logo_icon} alt="" className="max-w-16" />
            <p className="text-lg font-medium text-white">Just Chat</p>
        </div>
    );
};

export default ChatContainer;
