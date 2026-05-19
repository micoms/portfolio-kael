import Container from '@/components/common/Container';
import { SectionRule } from '@/components/common/SectionRule';
import CheckCircle from '@/components/svgs/CheckCircle';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { settingsJson, steps } from '@/config/Setup';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/setup'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function SetupPage() {
  return (
    <main>
      <section style={{ position: 'relative', padding: '80px 0 40px' }}>
        <Container>
          <SectionRule
            roman="S."
            left="Setup / Dev Environment"
            middle="VS Code configuration"
            right="-- / --"
          />
          <div data-reveal>
            <span className="label">
              Setup <span className="ix">&middot; N&ordm; 01</span>
            </span>
            <h1
              style={{
                fontFamily: 'var(--sans)',
                fontWeight: 800,
                letterSpacing: '-0.028em',
                color: 'var(--ink)',
                lineHeight: 1.0,
                fontSize: 'clamp(40px, 5vw, 66px)',
                margin: '22px 0 20px',
              }}
            >
              Complete{' '}
              <em
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                setup
              </em>{' '}
              guide<span style={{ color: 'var(--coral)' }}>.</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--body)',
                fontSize: 16,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
                maxWidth: '48ch',
              }}
            >
              Complete guide to setting up VS Code with my preferred
              configuration, extensions, and fonts.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div style={{ paddingBottom: 80 }}>
          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {steps.map((step) => (
              <div
                key={step.id}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {/* Step Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      padding: '6px 12px',
                      background: 'var(--bone)',
                      borderRadius: 8,
                      fontFamily: 'var(--sans)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--ink-faint)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Step {step.id}
                  </div>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'var(--bone)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ink)',
                    }}
                  >
                    {step.icon}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'var(--ink)',
                    }}
                  >
                    {step.title}
                  </h2>
                </div>

                {/* Step Content */}
                <div
                  style={{
                    paddingLeft: 52,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {step.content.map((item, index) => (
                    <div key={index}>
                      {item.type === 'download' && (
                        <Link
                          href={item.href || '#'}
                          download
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '14px 18px',
                            background: 'var(--bone)',
                            borderRadius: 12,
                            textDecoration: 'none',
                            color: 'var(--ink-soft)',
                            border: '1px solid var(--line)',
                            transition: 'background 160ms ease',
                          }}
                        >
                          <Download
                            size={16}
                            style={{ color: 'var(--ink-faint)', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--sans)',
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: 'var(--ink)',
                                }}
                              >
                                {item.name}
                              </span>
                              <ExternalLink
                                size={12}
                                style={{ color: 'var(--ink-faint)' }}
                              />
                            </div>
                            <p
                              style={{
                                fontFamily: 'var(--body)',
                                fontSize: 12,
                                color: 'var(--ink-mute)',
                                marginTop: 4,
                              }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      )}

                      {item.type === 'instruction' && (
                        <p
                          style={{
                            fontFamily: 'var(--body)',
                            fontSize: 14,
                            color: 'var(--ink-mute)',
                            lineHeight: 1.55,
                          }}
                        >
                          {item.text}
                        </p>
                      )}

                      {item.type === 'shortcut' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 16px',
                            background: 'var(--bone)',
                            borderRadius: 10,
                            border: '1px solid var(--line)',
                          }}
                        >
                          <kbd
                            style={{
                              background: 'var(--paper-dark)',
                              borderRadius: 4,
                              border: '1px solid var(--line)',
                              padding: '3px 8px',
                              fontFamily: 'var(--mono)',
                              fontSize: 11,
                              color: 'var(--ink-mute)',
                            }}
                          >
                            {item.text}
                          </kbd>
                        </div>
                      )}

                      {item.type === 'prompt' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 16px',
                            background: 'var(--bone)',
                            borderRadius: 10,
                            border: '1px solid var(--line)',
                          }}
                        >
                          <FileText
                            size={16}
                            style={{ color: 'var(--ink-faint)', flexShrink: 0 }}
                          />
                          <code
                            style={{
                              fontFamily: 'var(--mono)',
                              fontSize: 13,
                              color: 'var(--ink-mute)',
                              wordBreak: 'break-all',
                            }}
                          >
                            {item.text}
                          </code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Settings JSON Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--bone)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ink)',
                  }}
                >
                  <FileText size={16} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  settings.json
                </h3>
              </div>

              <div style={{ paddingLeft: 52 }}>
                <div
                  style={{
                    background: 'var(--ink)',
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(247, 241, 222, 0.1)',
                      padding: '10px 16px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--paper)',
                      }}
                    >
                      settings.json
                    </span>
                    <button
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: 11,
                        color: 'var(--paper-faint)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <div style={{ overflowX: 'auto', padding: '16px 20px' }}>
                    <pre
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 12,
                        lineHeight: 1.7,
                        color: 'var(--paper)',
                        whiteSpace: 'pre',
                        margin: 0,
                      }}
                    >
                      <code>
                        {settingsJson.split('\n').map((line, index) => {
                          const trimmedLine = line.trim();
                          if (trimmedLine.startsWith('//')) {
                            return (
                              <div
                                key={index}
                                style={{
                                  color: 'var(--ink-faint)',
                                  fontStyle: 'italic',
                                }}
                              >
                                {line}
                              </div>
                            );
                          } else if (
                            trimmedLine.includes(':') &&
                            trimmedLine.includes('"')
                          ) {
                            const [key, ...valueParts] = line.split(':');
                            const value = valueParts.join(':');
                            return (
                              <div key={index}>
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color: 'var(--paper)',
                                  }}
                                >
                                  {key}
                                </span>
                                <span style={{ color: 'var(--ink-faint)' }}>
                                  :
                                </span>
                                <span style={{ color: 'var(--ink-faint)' }}>
                                  {value}
                                </span>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={index}
                                style={{ color: 'var(--ink-faint)' }}
                              >
                                {line}
                              </div>
                            );
                          }
                        })}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    padding: '6px 12px',
                    background: 'var(--bone)',
                    borderRadius: 8,
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--ink-faint)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Final
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--bone)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ink)',
                  }}
                >
                  <CheckCircle className="size-4" />
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--ink)',
                  }}
                >
                  Complete Setup
                </h2>
              </div>

              <div
                style={{
                  paddingLeft: 52,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--body)',
                    fontSize: 14,
                    color: 'var(--ink-mute)',
                  }}
                >
                  Paste the code in the settings.json file in VS Code
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <p
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 14,
                      color: 'var(--ink-mute)',
                    }}
                  >
                    Save the settings.json file
                  </p>
                  <kbd
                    style={{
                      background: 'var(--bone)',
                      borderRadius: 4,
                      border: '1px solid var(--line)',
                      padding: '3px 8px',
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      color: 'var(--ink-mute)',
                    }}
                  >
                    Cmd + S (Mac) / Ctrl + S (Windows)
                  </kbd>
                  <span
                    style={{
                      fontFamily: 'var(--body)',
                      fontSize: 14,
                      color: 'var(--ink-mute)',
                    }}
                  >
                    and restart VS Code
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 18px',
                    background: 'var(--bone)',
                    borderRadius: 12,
                    border: '1px solid var(--line)',
                    marginTop: 16,
                  }}
                >
                  <CheckCircle className="size-5" />
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    Done!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
