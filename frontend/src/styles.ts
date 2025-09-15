import React from "react";
import { CSSProperties } from 'react';

type Styles = {
  [key: string]: CSSProperties | { [key: string]: CSSProperties | string };
};

// Dark theme palette
const colors = {
  background: '#0f172a',
  surface: '#111827',
  text: '#e5e7eb',
  textSecondary: '#94a3b8',
  border: '#334155',
  primary: '#8b5cf6',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  highlight: '#1f2937',
  lightGray: '#0b1220',
  textLight: '#a1a1aa',
  textLighter: '#9ca3af'
} as const;

// Spacing
const space = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const;

// Border radius
const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px',
} as const;

// Shadows
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.35), 0 2px 4px -1px rgba(0, 0, 0, 0.25)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
} as const;

// Typography
const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const styles: Styles = {
  container: {
    maxWidth: '880px',
    margin: '0 auto',
    padding: `${space.xl} ${space.md}`,
    fontFamily,
    lineHeight: 1.6,
    color: colors.text,
    background: 'linear-gradient(180deg, #0b1220 0%, #0f172a 40%, #0b1220 100%)',
    minHeight: '100vh',
  },
  header: {
    fontSize: '2.1rem',
    fontWeight: 800,
    marginBottom: space.xs,
    textAlign: 'center',
    color: colors.text,
    letterSpacing: '-0.03em',
  },
  subheader: {
    fontSize: '1rem',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: space.xl,
    fontWeight: 400,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    margin: `${space.sm} 0`,
    gap: space.sm,
    position: 'relative',
  },
  fighter: {
    flex: 1,
    padding: `${space.sm} ${space.xs}`,
    borderRadius: '14px',
    backgroundColor: colors.surface,
    border: '2px solid transparent',
    boxShadow: shadows.md,
    transition: 'all 0.3s ease',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '140px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
    '&.positive': {
      border: '2px solid #22c55e',
      boxShadow: '0 0 12px 4px rgba(34, 197, 94, 0.45)',
    },
    '&.positive:hover': {
      border: '2px solid #22c55e',
      boxShadow: '0 0 18px 6px rgba(34, 197, 94, 0.55)',
    },
    '&.negative': {
      border: '2px solid #ef4444',
      boxShadow: '0 0 12px 4px rgba(239, 68, 68, 0.4)',
    },
    '&.negative:hover': {
      border: '2px solid #ef4444',
      boxShadow: '0 0 18px 6px rgba(239, 68, 68, 0.5)',
    },
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: space.xs,
    color: colors.text,
    letterSpacing: '-0.01em',
  },
  odds: {
    fontSize: '1.05rem',
    fontWeight: 700,
    margin: '2px 0',
    color: colors.primary,
  },
  stats: {
    fontSize: '0.78rem',
    color: colors.textSecondary,
    margin: '2px 0',
    lineHeight: 1.3,
    '& > div': {
      margin: '1px 0',
    },
  },
  vs: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    background: 'linear-gradient(145deg, #1f2937, #111827)',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '8px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    color: '#cbd5e1',
    zIndex: 10,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    fontSize: '0.8rem',
    letterSpacing: '0.5px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: colors.primary,
    color: 'white',
    fontSize: '0.62rem',
    padding: '0.18rem 0.55rem',
    borderRadius: radii.full,
    fontWeight: 700,
    position: 'absolute',
    top: '4px',
    right: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.35)',
    letterSpacing: '0.02em',
  },
  loading: {
    textAlign: 'center',
    padding: space.xl,
    fontSize: '1.125rem',
    color: colors.textSecondary,
  },
  error: {
    textAlign: 'center',
    padding: space.lg,
    color: colors.danger,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: radii.md,
    margin: space.md,
    border: `1px solid rgba(239, 68, 68, 0.25)`,
  },
  dateSection: {
    marginBottom: space['2xl'],
    '&:last-child': {
      marginBottom: 0,
    },
  },
  dateHeader: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: colors.text,
    margin: `0 0 ${space.md}`,
    paddingBottom: space.sm,
    borderBottom: `1px solid ${colors.border}`,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    margin: "16px 0",
    width: "100%"
  }
};