import React from 'react';
import Root from '@theme-original/Root';
import type RootType from '@theme/Root';
import type {WrapperProps} from '@docusaurus/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {EncatchInit, type EncatchConfig} from '@site/src/lib/encatch';

export default function RootWrapper(
  props: WrapperProps<typeof RootType>,
): React.ReactElement {
  const {i18n, siteConfig} = useDocusaurusContext();
  const encatch = siteConfig.customFields?.encatch as EncatchConfig | undefined;
  const hasEncatch = Boolean(encatch?.publishableKey?.trim());

  return (
    <>
      {hasEncatch ? (
        <EncatchInit locale={i18n.currentLocale} config={encatch!} />
      ) : null}
      <Root {...props} />
    </>
  );
}
