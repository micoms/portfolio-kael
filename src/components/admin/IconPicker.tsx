'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { iconKeys, iconRegistry } from '@/lib/icons';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function IconPicker({
  value,
  onChange,
  placeholder = 'Select icon...',
}: IconPickerProps) {
  const [open, setOpen] = useState(false);

  const SelectedIcon = value ? iconRegistry[value] : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--line)',
            background: 'var(--paper)',
            cursor: 'pointer',
            fontFamily: 'var(--sans)',
            fontSize: 13,
            color: value ? 'var(--ink)' : 'var(--ink-faint)',
            textAlign: 'left',
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = 'var(--ink-faint)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = 'var(--line)')
          }
        >
          {SelectedIcon && (
            <span
              style={{
                width: 20,
                height: 20,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <SelectedIcon className="size-4" />
            </span>
          )}
          <span style={{ flex: 1 }}>{value || placeholder}</span>
          <ChevronsUpDown
            style={{ width: 14, height: 14, opacity: 0.5, flexShrink: 0 }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          width: 'var(--radix-popover-trigger-width)',
          maxHeight: 320,
          padding: 0,
          background: 'var(--bone)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          boxShadow: 'var(--shadow)',
        }}
      >
        <Command>
          <CommandInput
            placeholder="Search icons..."
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 13,
              border: 'none',
              outline: 'none',
            }}
          />
          <CommandList style={{ maxHeight: 260, overflowY: 'auto' }}>
            <CommandEmpty
              style={{
                padding: '16px',
                textAlign: 'center',
                fontFamily: 'var(--sans)',
                fontSize: 12,
                color: 'var(--ink-faint)',
              }}
            >
              No icon found.
            </CommandEmpty>
            <CommandGroup>
              {iconKeys.map((key) => {
                const Icon = iconRegistry[key];
                return (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={() => {
                      onChange(key === value ? '' : key);
                      setOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--sans)',
                      fontSize: 13,
                      borderRadius: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 6,
                        background: 'var(--paper)',
                        border: '1px solid var(--line-soft)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <span style={{ flex: 1 }}>{key}</span>
                    {key === value && (
                      <Check
                        style={{
                          width: 14,
                          height: 14,
                          color: 'var(--coral)',
                        }}
                      />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
