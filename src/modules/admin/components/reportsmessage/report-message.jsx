import { useState, useMemo } from "react";
import {
  Menu,
  MessageSquare,
} from "lucide-react";
import { SidebarHeader } from "@/components/ui/report-ui/sidebarheader";
import { Tabs } from "@/components/ui/report-ui/tabs";
import { MessageList } from "@/components/ui/report-ui/messagelist";
import { ConversationHeader } from "@/components/ui/report-ui/conversationheader";
import { Conversation } from "@/components/ui/report-ui/conversation";

// Sample message and conversation data
const messagesData = {
  all: [
    { id: 1, sender: "Cook A", role: "Cook", avatar: "/api/placeholder/40/40", text: "My withdrawal request is pending.", time: "10:25 AM", unread: true, online: true },
    { id: 2, sender: "Customer X", role: "Customer", avatar: "/api/placeholder/40/40", text: "Where is my order? I've been waiting for over an hour now.", time: "9:42 AM", unread: true, online: false },
    { id: 3, sender: "Cook B", role: "Cook", avatar: "/api/placeholder/40/40", text: "How do I update bank details? The current ones are outdated.", time: "Yesterday", unread: false, online: true },
    { id: 4, sender: "Customer Y", role: "Customer", avatar: "/api/placeholder/40/40", text: "Food was cold on arrival. I would like a refund please.", time: "Yesterday", unread: false, online: false },
    { id: 5, sender: "Cook C", role: "Cook", avatar: "/api/placeholder/40/40", text: "Can I get an extension on my delivery time?", time: "2 days ago", unread: false, online: false },
    { id: 6, sender: "Customer Z", role: "Customer", avatar: "/api/placeholder/40/40", text: "I'd like to place a large catering order for next week.", time: "3 days ago", unread: false, online: true },
  ],
  cooks: [
    { id: 1, sender: "Cook A", role: "Cook", avatar: "/api/placeholder/40/40", text: "My withdrawal request is pending.", time: "10:25 AM", unread: true, online: true },
    { id: 3, sender: "Cook B", role: "Cook", avatar: "/api/placeholder/40/40", text: "How do I update bank details? The current ones are outdated.", time: "Yesterday", unread: false, online: true },
    { id: 5, sender: "Cook C", role: "Cook", avatar: "/api/placeholder/40/40", text: "Can I get an extension on my delivery time?", time: "2 days ago", unread: false, online: false },
  ],
  customers: [
    { id: 2, sender: "Customer X", role: "Customer", avatar: "/api/placeholder/40/40", text: "Where is my order? I've been waiting for over an hour now.", time: "9:42 AM", unread: true, online: false },
    { id: 4, sender: "Customer Y", role: "Customer", avatar: "/api/placeholder/40/40", text: "Food was cold on arrival. I would like a refund please.", time: "Yesterday", unread: false, online: false },
    { id: 6, sender: "Customer Z", role: "Customer", avatar: "/api/placeholder/40/40", text: "I'd like to place a large catering order for next week.", time: "3 days ago", unread: false, online: true },
  ],
};

const conversations = {
  1: [
    { id: 1, sender: "Cook A", isUser: false, text: "My withdrawal request is pending. It's been 3 days already.", time: "10:20 AM" },
    { id: 2, sender: "Admin", isUser: true, text: "I'll check on that right away. Can you provide your request number?", time: "10:22 AM" },
    { id: 3, sender: "Cook A", isUser: false, text: "Sure, it's #WD-24601. Thank you for the quick response!", time: "10:25 AM" },
  ],
  2: [
    { id: 1, sender: "Customer X", isUser: false, text: "Hello, I placed order #45678 an hour ago and haven't received it yet.", time: "9:35 AM" },
    { id: 2, sender: "Admin", isUser: true, text: "I apologize for the delay. Let me check the status for you.", time: "9:38 AM" },
    { id: 3, sender: "Admin", isUser: true, text: "I see that your order is currently being prepared. The kitchen is experiencing higher volume than usual today.", time: "9:39 AM" },
    { id: 4, sender: "Customer X", isUser: false, text: "Where is my order? I've been waiting for over an hour now.", time: "9:42 AM" },
  ],
  3: [
    { id: 1, sender: "Cook B", isUser: false, text: "How do I update bank details? The current ones are outdated.", time: "Yesterday" },
  ],
  4: [
    { id: 1, sender: "Customer Y", isUser: false, text: "Food was cold on arrival. I would like a refund please.", time: "Yesterday" },
  ],
  5: [
    { id: 1, sender: "Cook C", isUser: false, text: "Can I get an extension on my delivery time?", time: "2 days ago" },
  ],
  6: [
    { id: 1, sender: "Customer Z", isUser: false, text: "I'd like to place a large catering order for next week.", time: "3 days ago" },
  ],
};


export const MessagesPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");

  // Optimize filtering using useMemo
  const filteredMessages = useMemo(() => {
    return messagesData[selectedTab].filter(
      msg =>
        msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedTab]);

  // Counts for display in tabs and header
  const messagesCount = {
    all: messagesData.all.length,
    cooks: messagesData.cooks.length,
    customers: messagesData.customers.length,
  };
  const totalNewMessages = messagesData[selectedTab].filter(msg => msg.unread).length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Section */}
      <div
        className={`border-r border-gray-200 bg-white transition-all duration-300 ease-in-out shadow-sm ${
          sidebarCollapsed ? "w-0 overflow-hidden" : "w-full md:w-1/3 lg:w-1/4"
        }`}
      >
        <SidebarHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleSidebar={() => setSidebarCollapsed(true)}
          totalNewMessages={totalNewMessages}
        />
        <Tabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          messagesCount={messagesCount}
          onTabChange={() => setSelectedMessage(null)}
        />
        <MessageList messages={filteredMessages} selectedMessage={selectedMessage} onSelectMessage={setSelectedMessage} />
      </div>

      {/* Collapsed sidebar toggle */}
      {sidebarCollapsed && (
        <button
          className="fixed left-0 top-4 z-20 p-2 bg-white rounded-r-lg shadow-md border border-l-0 border-gray-200 text-gray-600 hover:text-blue-600"
          onClick={() => setSidebarCollapsed(false)}
        >
          <Menu size={20} />
        </button>
      )}

      {/* Conversation Section */}
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
        {selectedMessage ? (
          <>
            <ConversationHeader message={selectedMessage} toggleSidebar={() => setSidebarCollapsed(true)} />
            <Conversation
              conversation={conversations[selectedMessage.id]}
              message={selectedMessage}
              replyText={replyText}
              setReplyText={setReplyText}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="rounded-full bg-blue-100 p-4 mb-4">
              <MessageSquare size={32} className="text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Messages</h2>
            <p className="text-gray-500 max-w-md mb-4">
              Select a conversation from the list to view and respond to messages from cooks and customers.
            </p>
            <p className="text-sm text-gray-400">
              {messagesData.all.filter(msg => msg.unread).length} unread messages
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
