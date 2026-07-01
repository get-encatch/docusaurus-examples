import 'dotenv/config';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Encatch example',
  tagline: 'Docusaurus docs with Encatch page feedback',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'http://localhost:3000',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {label: 'English'},
    },
  },

  customFields: {
    encatch: {
      publishableKey: process.env.ENCATCH_SDK_PUBLISHABLE_KEY ?? '',
      formSlug:
        process.env.ENCATCH_DOCUMENTATION_FEEDBACK_FORM_SLUG ??
        'documentation_feedback',
      feedbackTypeQuestionSlug:
        process.env.ENCATCH_FEEDBACK_TYPE_QUESTION_SLUG ??
        'documentation_feedback_type',
      pageUrlQuestionSlug:
        process.env.ENCATCH_PAGE_URL_QUESTION_SLUG ?? 'page_url',
      helpfulChoiceQuestionSlug:
        process.env.ENCATCH_HELPFUL_CHOICE_QUESTION_SLUG ??
        'helpful_question_choice',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Encatch example',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/get-encatch/docusaurus-examples',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Encatch. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
