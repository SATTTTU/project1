import  { ChevronRight, Clock } from"react-feather";

 export const ChatInput = ({ replyText, setReplyText }) => (
  <div className="border-t border-gray-200 p-4 bg-white">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-end">
        <div className="flex-1 bg-gray-100 rounded-lg p-3">
          <textarea
            rows="2"
            placeholder="Type your message..."
            className="w-full bg-transparent outline-none resize-none text-gray-700 placeholder-gray-500"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
        </div>
        <button
          className={`ml-3 p-3 rounded-full bg-blue-500 text-white shadow-sm transition-all ${replyText.trim() ? "opacity-100" : "opacity-50"}`}
          disabled={!replyText.trim()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex mt-2 text-xs text-gray-500">
        <span className="flex items-center">
          <Clock size={12} className="mr-1" />
          Typically replies within 10 minutes
        </span>
      </div>
    </div>
  </div>
);