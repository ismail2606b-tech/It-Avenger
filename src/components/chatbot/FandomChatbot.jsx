import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, Send, X, Sparkles, ArrowRight, CornerDownLeft, RefreshCw } from 'lucide-react';
import { useFandom } from '../../context/FandomContext';

export const FandomChatbot = () => {
  const { faqChatbot, navigateTo, setIsCartOpen, setIsBookmarksOpen } = useFandom();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: faqChatbot.welcomeMessage,
      action: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Rule-based keyword matching engine
  const processQuery = (query) => {
    const clean = query.toLowerCase().trim();
    
    // Find matching rule
    for (const rule of faqChatbot.faqRules) {
      for (const kw of rule.keywords) {
        if (clean.includes(kw.toLowerCase())) {
          return {
            response: rule.response,
            action: rule.action || null
          };
        }
      }
    }

    // Default Fallback
    return {
      response: faqChatbot.defaultFallback,
      action: { label: "Explore Category Hubs", page: "home" }
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate responsive AI response delay (300-600ms)
    setTimeout(() => {
      const match = processQuery(query);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: match.response,
        action: match.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.page === 'merchandise' && action.label.includes('Cart')) {
      setIsCartOpen(true);
    } else if (action.page === 'bookmarks') {
      setIsBookmarksOpen(true);
    } else {
      navigateTo(action.page, action.category || null);
    }
  };

  return (
    <>
      {/* Floating Chatbot Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 p-3.5 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-br from-[#030303] via-[#160812] to-[#db2777] text-white shadow-2xl shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
            aria-label="Open AI Chatbot Assistant"
          >
            <div className="relative">
              <Bot className="w-6 h-6 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>
            <div className="hidden sm:block text-left pr-1">
              <div className="text-xs font-bold leading-tight">Fandom Bot</div>
              <div className="text-[10px] text-indigo-200">Fandom Navigator</div>
            </div>
          </button>
        )}
      </div>

      {/* Chatbot Window Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] rounded-3xl bg-slate-950/95 border border-indigo-500/40 shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-br from-[#030303] via-[#160812] to-[#db2777] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-bold text-white">Fandom Assistant</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Rule-Based AI
                  </span>
                </div>
                <p className="text-[10px] text-emerald-400 font-medium">
                  Fandom Verse Bot
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors"
              aria-label="Close Chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Action Link button inside bot response */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action)}
                      className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-bold transition-all"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-slate-900/80 border border-white/5 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Prompts Carousel */}
          <div className="px-4 py-2 border-t border-white/5 bg-slate-950/60 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-1.5">
            <span className="text-[10px] font-semibold text-slate-500 mr-1 flex items-center space-x-1 shrink-0">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Suggested:</span>
            </span>
            {faqChatbot.suggestedPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 border border-white/10 shrink-0 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900/80 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about anime, games, trailers, cart..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#030303] via-[#160812] to-[#db2777] disabled:opacity-40 text-white transition-all shadow-md"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
