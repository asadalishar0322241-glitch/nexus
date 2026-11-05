/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, ArrowRight, Loader2, ShieldCheck, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface GeminiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const GeminiChatbotModal: React.FC<GeminiChatbotModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Welcome to the Nexus Senior Strategy Advisory Desk. Our practice directors in London, New York, and Dubai evaluate full-funnel digital architecture, paid media attribution, enterprise search authority, and unit economics. What commercial growth challenge is your leadership team diagnosing today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: textToSend.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build history for multi-turn server endpoint
      const history = updatedMessages.slice(1, -1).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'I am analyzing your metrics. For in-depth modeling, our senior practice directors are available for a direct 30-minute consultation.',
          },
        ]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Thank you for your question. You can also connect directly with our agency team via the Book Consultation button.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'How should we allocate budget between Google Ads and Meta for e-commerce?',
    'What are the key technical SEO requirements for targeting both UK and UAE markets?',
    'How does server-side CAPI improve Event Match Quality on iOS?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
              NX
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-2">
                <span>Senior Strategy Advisory Desk</span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Pod
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                London · New York · Dubai Senior Growth Practice
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close Advisory Desk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  NX
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                  You
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-bold">
                NX
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Senior Strategist is formulating diagnostic recommendation...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        {messages.length < 3 && (
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1.5">
              Suggested Growth Topics:
            </span>
            <div className="flex flex-col gap-1.5">
              {samplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-left text-[11px] text-blue-600 dark:text-blue-400 hover:underline truncate"
                >
                  → {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about marketing channels, CAC benchmarks, or strategy..."
            className="flex-1 px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors shrink-0"
            aria-label="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Booking Trigger */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">Need human partner review?</span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            Book Free Consultation <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
