import {useState} from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {CircleAlert, Pencil, ThumbsDown, ThumbsUp} from 'lucide-react';
import {
  openHelpfulFeedbackForm,
  openRaiseIssueForm,
  openSuggestEditForm,
} from '@site/src/lib/encatch';

export interface DocsPageFeedbackProps {
  pageUrl: string;
  pageTitle: string;
}

export default function DocsPageFeedback({
  pageUrl,
}: DocsPageFeedbackProps) {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);

  const handleVote = (next: 'yes' | 'no') => {
    const newVote = vote === next ? null : next;
    setVote(newVote);
    if (newVote) {
      openHelpfulFeedbackForm(pageUrl, newVote, locale);
    }
  };

  return (
    <div className="docs-page-feedback">
      <div className="docs-page-feedback__row">
        <div className="docs-page-feedback__group">
          <p className="docs-page-feedback__question">
            <Translate id="docsFeedback.helpfulQuestion">
              Was this page helpful?
            </Translate>
          </p>
          <div className="docs-page-feedback__actions">
            <button
              type="button"
              onClick={() => handleVote('yes')}
              aria-pressed={vote === 'yes'}
              className={`docs-page-feedback__pill${vote === 'yes' ? ' docs-page-feedback__pill--active' : ''}`}>
              <ThumbsUp size={16} strokeWidth={1.5} />
              <span>
                <Translate id="docsFeedback.yes">Yes</Translate>
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleVote('no')}
              aria-pressed={vote === 'no'}
              className={`docs-page-feedback__pill${vote === 'no' ? ' docs-page-feedback__pill--active' : ''}`}>
              <ThumbsDown size={16} strokeWidth={1.5} />
              <span>
                <Translate id="docsFeedback.no">No</Translate>
              </span>
            </button>
          </div>
        </div>
        <div className="docs-page-feedback__actions">
          <button
            type="button"
            onClick={() => openSuggestEditForm(pageUrl, locale)}
            className="docs-page-feedback__pill">
            <Pencil size={16} strokeWidth={1.5} />
            <span>
              <Translate id="docsFeedback.suggestEdits">Suggest edits</Translate>
            </span>
          </button>
          <button
            type="button"
            onClick={() => openRaiseIssueForm(pageUrl, locale)}
            className="docs-page-feedback__pill">
            <CircleAlert size={16} strokeWidth={1.5} />
            <span>
              <Translate id="docsFeedback.raiseIssue">Raise issue</Translate>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
