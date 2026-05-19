/*
 * GitHub Contribution Configuration
 *
 * This file contains the configuration for the GitHub contribution graph.
 * Update the username to match your GitHub profile.
 */

export const githubConfig = {
  username: 'micoms',
  apiUrl: 'https://github-contributions-api.deno.dev',

  // Display settings
  title: 'GitHub Activity',
  subtitle: 'coding journey over the past year',

  // Chart settings
  blockSize: 11,
  blockMargin: 3,
  fontSize: 12,
  maxLevel: 4,

  // Month labels
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  // Weekday labels (empty for weekends, M for Monday, etc.)
  weekdays: ['', 'M', '', 'W', '', 'F', ''],

  // Total count label template
  totalCountLabel: '{{count}} contributions in the last year',

  // Theme configuration for dark and light modes (indigo/violet accent)
  theme: {
    dark: [
      'rgb(22, 22, 35)', // Very dark for no contributions
      'rgb(55, 30, 80)', // Dark violet
      'rgb(80, 40, 130)', // Medium violet
      'rgb(110, 60, 180)', // Bright violet
      'rgb(140, 90, 220)', // Very bright violet
    ],
    light: [
      'rgb(235, 237, 240)', // Light gray
      'rgb(210, 195, 245)', // Light lavender
      'rgb(160, 120, 230)', // Medium violet
      'rgb(120, 80, 200)', // Dark violet
      'rgb(85, 50, 160)', // Very dark violet
    ],
  },

  // Error state configuration
  errorState: {
    title: 'Unable to load GitHub contributions',
    description: 'Check out my profile directly for the latest activity',
    buttonText: 'View on GitHub',
  },

  // Loading state configuration
  loadingState: {
    title: 'Loading contributions...',
    description: 'Fetching your GitHub activity data',
  },
};
