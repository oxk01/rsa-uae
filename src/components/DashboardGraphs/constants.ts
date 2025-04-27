
export const COLORS = {
  positive: {
    light: '#10b981',
    dark: '#34d399'
  },
  neutral: {
    light: '#6b7280',
    dark: '#9ca3af'
  },
  negative: {
    light: '#ef4444',
    dark: '#f87171'
  },
  overview: {
    light: ['#10b981', '#6b7280', '#ef4444'],
    dark: ['#34d399', '#9ca3af', '#f87171']
  },
  aspects: {
    light: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
    dark: ['#A78BFA', '#F472B6', '#FBBF24', '#34D399', '#60A5FA']
  },
  wordcloud: {
    light: {
      positive: '#22c55e',
      neutral: '#6b7280',
      negative: '#ef4444'
    },
    dark: {
      positive: '#34d399',
      neutral: '#9ca3af',
      negative: '#f87171'
    }
  },
  sources: {
    light: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
    dark: ['#60A5FA', '#A78BFA', '#F472B6', '#FBBF24', '#34D399']
  },
  mentioned: {
    light: ['#67e8f9', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185'],
    dark: ['#22d3ee', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#fb7185']
  },
  confusionMatrix: {
    light: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#881337'],
    dark: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#881337']
  }
};

export const getThemeColors = (isDark: boolean = false) => {
  const theme = isDark ? 'dark' : 'light';
  return {
    positive: COLORS.positive[theme],
    neutral: COLORS.neutral[theme],
    negative: COLORS.negative[theme],
    overview: COLORS.overview[theme],
    aspects: COLORS.aspects[theme],
    wordcloud: COLORS.wordcloud[theme],
    sources: COLORS.sources[theme],
    mentioned: COLORS.mentioned[theme],
    confusionMatrix: COLORS.confusionMatrix[theme]
  };
};
