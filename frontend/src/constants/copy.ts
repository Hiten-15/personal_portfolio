export const COPY = {
  hero: {
    availability: 'Open to opportunities',
    cta: {
      projects: 'View projects',
      contact: 'Get in touch',
    },
  },
  about: {
    headline: "Engineer with a designer's eye.",
    educationLabel: 'Education',
  },
  contact: {
    headline: "Let's build something together.",
  },
  app: {
    loadError: 'Failed to load portfolio content.',
    retry: 'Retry',
    backToTop: 'Back to top',
  },
  projects: {
    allRepos: (count: number) => `All ${count} repositories`,
  },
} as const;
