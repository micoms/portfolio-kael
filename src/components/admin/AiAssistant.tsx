'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  {
    label: 'Add a new project',
    message: 'Help me add a new project to my portfolio',
  },
  { label: 'Write a blog post', message: 'Help me write a blog post' },
  { label: 'Update my bio', message: 'Help me update my about section' },
  { label: 'Add experience', message: 'Help me add a new work experience' },
];

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            style={{
              background: 'var(--ink)',
              color: 'var(--bone)',
              padding: '12px 16px',
              borderRadius: 8,
              fontFamily: 'var(--mono)',
              fontSize: 12,
              overflowX: 'auto',
              margin: '8px 0',
              whiteSpace: 'pre-wrap',
            }}
          >
            {codeContent.trim()}
          </pre>,
        );
        codeContent = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.slice(3);
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <div
          key={i}
          style={{
            fontWeight: 700,
            fontSize: 14,
            marginTop: i > 0 ? 12 : 0,
            marginBottom: 4,
            color: 'var(--ink)',
          }}
        >
          {line.replace(/\*\*/g, '')}
        </div>,
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 8,
            padding: '2px 0',
            paddingLeft: 4,
          }}
        >
          <span style={{ color: 'var(--coral)', flexShrink: 0 }}>•</span>
          <span
            dangerouslySetInnerHTML={{
              __html: line
                .slice(2)
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(
                  /`(.*?)`/g,
                  '<code style="background:var(--line-soft);padding:1px 4px;border-radius:3px;font-family:var(--mono);font-size:12px">$1</code>',
                ),
            }}
          />
        </div>,
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: 8 }} />);
    } else {
      elements.push(
        <div
          key={i}
          style={{ padding: '1px 0' }}
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(
                /`(.*?)`/g,
                '<code style="background:var(--line-soft);padding:1px 4px;border-radius:3px;font-family:var(--mono);font-size:12px">$1</code>',
              ),
          }}
        />,
      );
    }
  }

  return elements;
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/admin/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text.trim() }),
        });

        if (!res.ok) throw new Error('Failed to get response');

        const data = await res.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage],
  );

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--ink)',
          color: 'var(--paper)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(21, 20, 15, 0.25)',
          zIndex: 1000,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 32px rgba(21, 20, 15, 0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(21, 20, 15, 0.25)';
        }}
      >
        {isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
            <path d="M10 21v1a2 2 0 004 0v-1" />
            <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
            <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 88,
            right: 24,
            width: 400,
            maxWidth: 'calc(100vw - 48px)',
            height: 560,
            maxHeight: 'calc(100vh - 120px)',
            background: 'var(--bone)',
            border: '1px solid var(--line)',
            borderRadius: 16,
            boxShadow: '0 30px 60px -30px rgba(21, 20, 15, 0.28)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 999,
            animation: 'ai-panel-in 0.2s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--line)',
              background: 'var(--paper)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--paper)"
                  strokeWidth="1.8"
                >
                  <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
                  <path d="M10 21v1a2 2 0 004 0v-1" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: 'var(--ink)',
                    lineHeight: 1.2,
                  }}
                >
                  AI Assistant
                </div>
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    color: 'var(--ink-faint)',
                    lineHeight: 1.2,
                    marginTop: 2,
                  }}
                >
                  Portfolio content helper
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--ink-faint)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--line-soft)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  textAlign: 'center',
                  padding: '0 8px',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ink-faint)"
                    strokeWidth="1.4"
                  >
                    <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
                    <path d="M10 21v1a2 2 0 004 0v-1" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 600,
                      fontSize: 14,
                      color: 'var(--ink)',
                      marginBottom: 4,
                    }}
                  >
                    How can I help?
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 12,
                      color: 'var(--ink-faint)',
                      lineHeight: 1.5,
                    }}
                  >
                    Ask me about managing your portfolio content or use a quick
                    action below.
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent:
                    msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius:
                      msg.role === 'user'
                        ? '12px 12px 2px 12px'
                        : '12px 12px 12px 2px',
                    background:
                      msg.role === 'user' ? 'var(--ink)' : 'var(--paper)',
                    color: msg.role === 'user' ? 'var(--paper)' : 'var(--ink)',
                    border:
                      msg.role === 'assistant'
                        ? '1px solid var(--line)'
                        : 'none',
                    fontFamily: 'var(--sans)',
                    fontSize: 13,
                    lineHeight: 1.55,
                  }}
                >
                  {msg.role === 'assistant' ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      {renderMarkdown(msg.content)}
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px 12px 12px 2px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  <span
                    className="ai-typing-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--ink-faint)',
                      animation: 'ai-bounce 1.2s infinite 0s',
                    }}
                  />
                  <span
                    className="ai-typing-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--ink-faint)',
                      animation: 'ai-bounce 1.2s infinite 0.15s',
                    }}
                  />
                  <span
                    className="ai-typing-dot"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--ink-faint)',
                      animation: 'ai-bounce 1.2s infinite 0.3s',
                    }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length === 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                padding: '0 20px 12px',
              }}
            >
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.message)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    border: '1px solid var(--line)',
                    background: 'var(--paper)',
                    cursor: 'pointer',
                    fontFamily: 'var(--sans)',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--ink-mute)',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--ink-faint)';
                    e.currentTarget.style.color = 'var(--ink)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--ink-mute)';
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: 8,
              padding: '12px 20px 16px',
              borderTop: messages.length > 0 ? '1px solid var(--line)' : 'none',
              background: 'var(--paper)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid var(--line)',
                background: 'var(--bone)',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--ink)',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--ink-faint)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'var(--line)')
              }
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: 'none',
                background: input.trim() ? 'var(--ink)' : 'var(--line)',
                color: input.trim() ? 'var(--paper)' : 'var(--ink-faint)',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes ai-panel-in {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ai-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
