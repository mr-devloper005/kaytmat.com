import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Buy & sell anything, anywhere',
      description: 'Discover fresh listings or post your own for free. A clean, premium marketplace for buyers and sellers.',
      openGraphTitle: 'Buy & sell anything, anywhere',
      openGraphDescription: 'Browse thousands of listings across every category, or post your own in minutes — free and simple.',
      keywords: ['marketplace', 'classifieds', 'buy and sell', 'free listings', 'local deals'],
    },
    hero: {
      badge: 'The premium marketplace',
      title: ['Buy & sell anything,', 'anywhere.'],
      description: 'Discover great deals or post your own listing for free. Join a growing community of buyers and sellers.',
      primaryCta: { label: 'Browse listings', href: '/classified' },
      secondaryCta: { label: 'Post an ad', href: '/create' },
      searchPlaceholder: 'What are you looking for?',
      focusLabel: 'Focus',
      featureCardBadge: 'featured listing',
      featureCardTitle: 'Fresh listings shape the homepage every day.',
      featureCardDescription: 'The newest posts stay front and center, so buyers always see what just went live.',
    },
    intro: {
      badge: 'How it works',
      title: 'A simple, trusted place to buy and sell.',
      paragraphs: [
        'Browse thousands of listings across every category, from vehicles and electronics to services and real estate — all in one place.',
        'Found something you like? Connect directly with the seller. Have something to sell? Post a listing in minutes and reach interested buyers.',
        'Everything stays fast, clean, and easy to navigate, whether you are here to discover a great deal or to move something on.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first homepage built for fast discovery.',
        'Dozens of categories for buyers and sellers.',
        'Free to browse and free to post a listing.',
        'A polished experience on desktop and mobile.',
      ],
      primaryLink: { label: 'Browse listings', href: '/classified' },
      secondaryLink: { label: 'Post an ad', href: '/create' },
    },
    cta: {
      badge: 'Get started',
      title: 'Ready to buy or sell? Everything starts here.',
      description: 'Browse fresh listings from the community, or post your own for free and reach buyers in minutes.',
      primaryCta: { label: 'Browse listings', href: '/classified' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest listings in this section.',
    },
  },
  about: {
    badge: 'About us',
    title: 'A simpler way to buy and sell.',
    description: `${slot4BrandConfig.siteName} is built to connect buyers and sellers through a clean, trustworthy marketplace where great deals are easy to find.`,
    paragraphs: [
      'Instead of scattering listings across cluttered pages, we keep everything organised, searchable, and easy to move through.',
      'Whether you are hunting for a bargain or listing something to sell, you can get where you need to be in just a few taps.',
    ],
    values: [
      {
        title: 'Discovery-first experience',
        description: 'We prioritise clean search, clear categories, and fast browsing so buyers find what they want without noise.',
      },
      {
        title: 'Made for buyers and sellers',
        description: 'Listings, profiles, and categories stay connected so both sides of every deal can meet in one place.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clear layouts and honest listings to help the community trade with confidence.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Questions about a listing or your account? We are here to help.',
    description: 'Tell us what you need — a question about buying, selling, or your account — and we will point you in the right direction.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search listings',
      description: 'Search listings, categories, and sellers across the marketplace.',
    },
    hero: {
      badge: 'Search the marketplace',
      title: 'Find the right listing, faster.',
      description: 'Use keywords, categories, and filters to discover listings from every active section of the marketplace.',
      placeholder: 'Search by keyword, category, or title',
    },
    resultsTitle: 'Latest listings',
  },
  create: {
    metadata: {
      title: 'Post an ad',
      description: 'Create and publish a new listing on the marketplace.',
    },
    locked: {
      badge: 'Seller access',
      title: 'Login to post your listing.',
      description: 'Sign in to open the posting workspace and publish a listing to the active sections of the marketplace.',
    },
    hero: {
      badge: 'Posting workspace',
      title: 'Post a listing in minutes.',
      description: 'Choose a category, add your details, images, and price, and publish a clean listing buyers can find.',
    },
    formTitle: 'Listing details',
    submitLabel: 'Publish listing',
    successTitle: 'Listing published successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login to your marketplace account.',
      badge: 'Member access',
      title: 'Welcome back to the marketplace.',
      description: 'Login to browse, manage your listings, and post new ads from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your marketplace account.',
      badge: 'Join the community',
      title: 'Create your account and start selling.',
      description: 'Create an account to post listings, save your details, and connect with buyers across the marketplace.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Other members',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Website',
    },
  },
} as const
