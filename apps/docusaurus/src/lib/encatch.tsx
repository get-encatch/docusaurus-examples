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
  helpfulFormSlug: string;
  helpfulPageUrlQuestionSlug: string;
  helpfulChoiceQuestionSlug: string;
  suggestEditFormSlug: string;
  suggestEditQuestionSlug: string;
  raiseIssueFormSlug: string;
  raiseIssueQuestionSlug: string;
};

let encatchConfig: EncatchConfig | null = null;

export function setEncatchConfig(config: EncatchConfig): void {
  encatchConfig = config;
}

function getEncatchConfig(): EncatchConfig | null {
  return encatchConfig;
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
      _encatch.init(apiKey, {theme});
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

export function openHelpfulFeedbackForm(
  pageUrl: string,
  vote: 'yes' | 'no',
  locale?: string,
) {
  const config = getEncatchConfig();
  const formSlug = config?.helpfulFormSlug?.trim();
  const pageUrlQuestionSlug = config?.helpfulPageUrlQuestionSlug?.trim();
  const choiceQuestionSlug = config?.helpfulChoiceQuestionSlug?.trim();

  if (!formSlug) {
    console.warn('ENCATCH_HELPFUL_FORM_SLUG is not set or is empty');
    return;
  }
  if (!pageUrlQuestionSlug) {
    console.warn(
      'ENCATCH_HELPFUL_PAGE_URL_QUESTION_SLUG is not set or is empty',
    );
    return;
  }
  if (!choiceQuestionSlug) {
    console.warn(
      'ENCATCH_HELPFUL_CHOICE_QUESTION_SLUG is not set or is empty',
    );
    return;
  }
  if (!ensureEncatchInitialized()) {
    return;
  }
  if (locale) {
    syncEncatchLocale(locale);
  }

  _encatch.addToResponse(pageUrlQuestionSlug, toAbsolutePageUrl(pageUrl));
  _encatch.addToResponse(choiceQuestionSlug, vote);
  _encatch.showForm(formSlug);
}

export function openSuggestEditForm(pageUrl: string, locale?: string) {
  const config = getEncatchConfig();
  const formSlug = config?.suggestEditFormSlug?.trim();
  const questionSlug = config?.suggestEditQuestionSlug?.trim();

  if (!formSlug) {
    console.warn('ENCATCH_SUGGEST_AN_EDIT_FORM_SLUG is not set or is empty');
    return;
  }
  if (!questionSlug) {
    console.warn(
      'ENCATCH_SUGGEST_AN_EDIT_QUESTION_SLUG is not set or is empty',
    );
    return;
  }
  if (!ensureEncatchInitialized()) {
    return;
  }
  if (locale) {
    syncEncatchLocale(locale);
  }

  _encatch.addToResponse(questionSlug, toAbsolutePageUrl(pageUrl));
  _encatch.showForm(formSlug);
}

export function openRaiseIssueForm(pageUrl: string, locale?: string) {
  const config = getEncatchConfig();
  const formSlug = config?.raiseIssueFormSlug?.trim();
  const questionSlug = config?.raiseIssueQuestionSlug?.trim();

  if (!formSlug) {
    console.warn('ENCATCH_RAISE_ISSUE_FORM_SLUG is not set or is empty');
    return;
  }
  if (!questionSlug) {
    console.warn('ENCATCH_RAISE_ISSUE_QUESTION_SLUG is not set or is empty');
    return;
  }
  if (!ensureEncatchInitialized()) {
    return;
  }
  if (locale) {
    syncEncatchLocale(locale);
  }

  _encatch.addToResponse(questionSlug, toAbsolutePageUrl(pageUrl));
  _encatch.showForm(formSlug);
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
