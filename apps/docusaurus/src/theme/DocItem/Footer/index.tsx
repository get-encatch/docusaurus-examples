import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocsPageFeedback from '@site/src/components/DocsPageFeedback';

export default function FooterWrapper(
  props: WrapperProps<typeof FooterType>,
): React.ReactElement {
  const {metadata} = useDoc();

  return (
    <>
      <Footer {...props} />
      <DocsPageFeedback
        pageUrl={metadata.permalink}
        pageTitle={metadata.title}
      />
    </>
  );
}
