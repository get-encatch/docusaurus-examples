import {useEffect} from 'react';
import {_encatch} from '@encatch/web-sdk';
import type {Theme} from '@encatch/web-sdk';

/**
 * Encatch Web SDK integration for Docusaurus docs feedback.
 *
 * Configure via ENCATCH_* env vars (see .env.example), exposed through
 * customFields in docusaurus.config.ts.
 */

export type EncatchConfig = {
  publishableKey: string;
  formSlug: string;
  feedbackTypeQuestionSlug: string;
  pageUrlQuestionSlug: string;
  helpfulChoiceQuestionSlug: string;
  apiHost?: string;
  webHost?: string;
};

type DocumentationFeedbackRoute = 'page-helpful' | 'suggest-edit' | 'raise-issue';

let encatchConfig: EncatchConfig | null = null;

export function setEncatchConfig(config: EncatchConfig): void {
  encatchConfig = config;
}

function getEncatchConfig(): EncatchConfig | null {
  return encatchConfig;
}

function trimEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function toEncatchHostUrl(value: string | undefined): string | undefined {
  const trimmed = trimEnv(value);
  if (!trimmed) {
    return undefined;
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function buildEncatchInitConfig(
  config: EncatchConfig,
  options?: {theme?: Theme},
): import('@encatch/web-sdk').EncatchConfig {
  const initConfig: import('@encatch/web-sdk').EncatchConfig = {
    theme: options?.theme ?? 'system',
  };
  const webHost = toEncatchHostUrl(config.webHost);
  const apiHost = toEncatchHostUrl(config.apiHost);
  if (webHost) {
    initConfig.webHost = webHost;
  }
  if (apiHost) {
    initConfig.apiBaseUrl = apiHost;
  }
  return initConfig;
}

/** Ensure `_encatch.init` has run before `showForm` / other SDK calls. */
export function ensureEncatchInitialized(options?: {theme?: Theme}): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const config = getEncatchConfig();
  const apiKey = config?.publishableKey?.trim();
  if (!apiKey) {
    console.warn('ENCATCH_SDK_PUBLISHABLE_KEY is not set or is empty');
    return false;
  }
  if (!_encatch._initialized) {
    try {
      const theme: Theme = options?.theme ?? 'system';
      _encatch.init(apiKey, buildEncatchInitConfig(config, options));
    } catch (error) {
      console.error('Encatch init failed:', error);
      return false;
    }
  }
  return true;
}

/** Sync Encatch form language with the active Docusaurus locale. */
export function syncEncatchLocale(locale: string): void {
  if (!ensureEncatchInitialized()) {
    return;
  }
  const normalized = locale.trim();
  if (!normalized) {
    return;
  }
  _encatch.setLocale(normalized);
}

function getDocusaurusColorMode(): Theme {
  if (typeof document === 'undefined') {
    return 'light';
  }
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

/** Sync Encatch form theme with the active Docusaurus color mode. */
export function syncEncatchTheme(theme: Theme): void {
  if (!ensureEncatchInitialized()) {
    return;
  }
  _encatch.setTheme(theme);
}

function toAbsolutePageUrl(pageUrl: string): string {
  return typeof window !== 'undefined'
    ? new URL(pageUrl, window.location.origin).href
    : pageUrl;
}

function openDocumentationFeedbackForm(
  pageUrl: string,
  route: DocumentationFeedbackRoute,
  locale?: string,
  helpfulVote?: 'yes' | 'no',
) {
  const config = getEncatchConfig();
  const formSlug = config?.formSlug?.trim();
  const feedbackTypeQuestionSlug = config?.feedbackTypeQuestionSlug?.trim();
  const pageUrlQuestionSlug = config?.pageUrlQuestionSlug?.trim();
  const helpfulChoiceQuestionSlug = config?.helpfulChoiceQuestionSlug?.trim();

  if (!formSlug) {
    console.warn(
      'ENCATCH_DOCUMENTATION_FEEDBACK_FORM_SLUG is not set or is empty',
    );
    return;
  }
  if (!feedbackTypeQuestionSlug) {
    console.warn(
      'ENCATCH_FEEDBACK_TYPE_QUESTION_SLUG is not set or is empty',
    );
    return;
  }
  if (!pageUrlQuestionSlug) {
    console.warn('ENCATCH_PAGE_URL_QUESTION_SLUG is not set or is empty');
    return;
  }
  if (route === 'page-helpful') {
    if (!helpfulChoiceQuestionSlug) {
      console.warn(
        'ENCATCH_HELPFUL_CHOICE_QUESTION_SLUG is not set or is empty',
      );
      return;
    }
    if (!helpfulVote) {
      console.warn('Helpful feedback requires a yes/no vote');
      return;
    }
  }
  if (!ensureEncatchInitialized()) {
    return;
  }
  if (locale) {
    syncEncatchLocale(locale);
  }

  _encatch.addToResponse(feedbackTypeQuestionSlug, route);
  _encatch.addToResponse(pageUrlQuestionSlug, toAbsolutePageUrl(pageUrl));
  if (route === 'page-helpful' && helpfulVote) {
    _encatch.addToResponse(helpfulChoiceQuestionSlug, helpfulVote);
  }
  _encatch.showForm(formSlug);
}

export function openHelpfulFeedbackForm(
  pageUrl: string,
  vote: 'yes' | 'no',
  locale?: string,
) {
  openDocumentationFeedbackForm(pageUrl, 'page-helpful', locale, vote);
}

export function openSuggestEditForm(pageUrl: string, locale?: string) {
  openDocumentationFeedbackForm(pageUrl, 'suggest-edit', locale);
}

export function openRaiseIssueForm(pageUrl: string, locale?: string) {
  openDocumentationFeedbackForm(pageUrl, 'raise-issue', locale);
}

export function EncatchInit({
  locale,
  config,
}: {
  locale: string;
  config: EncatchConfig;
}) {
  useEffect(() => {
    setEncatchConfig(config);
    const colorMode = getDocusaurusColorMode();
    ensureEncatchInitialized({theme: colorMode});
    syncEncatchLocale(locale);
    syncEncatchTheme(colorMode);

    const observer = new MutationObserver(() => {
      syncEncatchTheme(getDocusaurusColorMode());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [locale, config]);

  return null;
}
