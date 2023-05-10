import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { FaSmile } from "react-icons/fa";

function ShowEmoji({ setText, className }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerToggle = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        const { emoji } = emojiObject;
        setText((prevText) => prevText + emoji);
    };
    return (
        <div>
            <div onClick={handleEmojiPickerToggle} className={className}>
                <div className="flex items-center gap-2 text-[1.2rem] font-semibold border-[4px] p-2 rounded-[12px] cursor-pointer text-gray-700">
                    More icon <FaSmile className="text-[2rem]" />
                </div>
            </div>
            {showEmojiPicker && (
                <div className="absolute bottom-[80px] right-[60px]">
                    <EmojiPicker height={300} onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}

export default ShowEmoji;
