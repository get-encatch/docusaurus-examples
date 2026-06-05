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
    locales: ['en', 'es'],
    localeConfigs: {
      en: {label: 'English'},
      es: {label: 'Español'},
    },
  },

  customFields: {
    encatch: {
      publishableKey: process.env.ENCATCH_SDK_PUBLISHABLE_KEY ?? '',
      helpfulFormSlug:
        process.env.ENCATCH_HELPFUL_FORM_SLUG ?? 'helpful_documentation_choice',
      helpfulPageUrlQuestionSlug:
        process.env.ENCATCH_HELPFUL_PAGE_URL_QUESTION_SLUG ?? 'page_url',
      helpfulChoiceQuestionSlug:
        process.env.ENCATCH_HELPFUL_CHOICE_QUESTION_SLUG ??
        'helpful_question_choice',
      suggestEditFormSlug:
        process.env.ENCATCH_SUGGEST_AN_EDIT_FORM_SLUG ?? 'encatch_suggest_an_edit',
      suggestEditQuestionSlug:
        process.env.ENCATCH_SUGGEST_AN_EDIT_QUESTION_SLUG ?? 'documentation_url',
      raiseIssueFormSlug:
        process.env.ENCATCH_RAISE_ISSUE_FORM_SLUG ?? 'encatch_raise_issue',
      raiseIssueQuestionSlug:
        process.env.ENCATCH_RAISE_ISSUE_QUESTION_SLUG ?? 'page_url',
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
          type: 'localeDropdown',
          position: 'right',
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
