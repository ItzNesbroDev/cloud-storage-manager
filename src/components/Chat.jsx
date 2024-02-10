import React from "react";

const ChatSection = () => {
  return (
    <div className="flex flex-col ml-64 w-full">
      <div className="flex-grow p-6">
        <div className="text-lg font-bold mb-4">Chat Section</div>
        {/* <div className="overflow-y-auto max-h-96">
          <div className="mb-2">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-2">
                You
              </div>
              <div className="bg-gray-200 p-2 rounded-lg">Hi there!</div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 rounded-lg border"
        />
      </div>
    </div>
  );
};

export default ChatSection;
