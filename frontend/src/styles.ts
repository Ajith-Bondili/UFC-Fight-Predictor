import React from "react";
import { CSSProperties } from 'react';

type Styles = {
  [key: string]: CSSProperties | { [key: string]: CSSProperties | string };
};

// Color palette
const colors = {
  background: '#ffffff',
  surface: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  primary: '#3b82f6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  highlight: '#f1f5f9',
  lightGray: '#f8f8f8',
  textLight: '#777',
  textLighter: '#999'
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
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
} as const;

// Typography
const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const styles: Styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: `${space.xl} ${space.md}`,
    fontFamily,
    lineHeight: 1.6,
    color: colors.text,
    backgroundColor: colors.background,
    minHeight: '100vh',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: space.xs,
    textAlign: 'center',
    color: colors.text,
    letterSpacing: '-0.025em',
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
    borderRadius: '12px',
    backgroundColor: colors.surface,
    border: '2px solid transparent',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.08)',
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
      border: '2px solid #10b981',
      boxShadow: '0 0 10px 3px rgba(16, 185, 129, 0.5)',
    },
    '&.positive:hover': {
      border: '2px solid #10b981',
      boxShadow: '0 0 15px 5px rgba(16, 185, 129, 0.7)',
    },
    '&.negative': {
      border: '2px solid #ef4444',
      boxShadow: '0 0 10px 3px rgba(239, 68, 68, 0.5)',
    },
    '&.negative:hover': {
      border: '2px solid #ef4444',
      boxShadow: '0 0 15px 5px rgba(239, 68, 68, 0.7)',
    },
  },
  name: {
    fontSize: '1.15rem',
    fontWeight: 700,
    marginBottom: space.xs,
    color: colors.text,
    letterSpacing: '-0.01em',
  },
  odds: {
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: '2px 0',
    color: colors.primary,
  },
  stats: {
    fontSize: '0.75rem',
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
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '50%',
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#4b5563',
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    fontSize: '0.85rem',
    textShadow: '0 1px 1px rgba(255, 255, 255, 0.8)',
    letterSpacing: '-0.5px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: colors.primary,
    color: 'white',
    fontSize: '0.6rem',
    padding: '0.15rem 0.5rem',
    borderRadius: radii.full,
    fontWeight: 600,
    position: 'absolute',
    top: '4px',
    right: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    letterSpacing: '0.01em',
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
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: radii.md,
    margin: space.md,
    border: `1px solid rgba(239, 68, 68, 0.2)`,
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