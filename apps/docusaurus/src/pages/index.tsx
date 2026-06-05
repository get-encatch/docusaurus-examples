import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home(): React.ReactElement {
  const {i18n} = useDocusaurusContext();
  const docsHref = i18n.currentLocale === 'en' ? '/docs' : `/${i18n.currentLocale}/docs`;

  return (
    <Layout
      title="Encatch example"
      description="Sample Docusaurus docs site with Encatch page feedback in the footer.">
      <main className={styles.hero}>
        <Heading as="h1" className={styles.title}>
          Encatch × Docusaurus — Docusaurus example
        </Heading>
        <p className={styles.subtitle}>
          Sample docs site with Encatch page feedback in the footer — built on
          Docusaurus.
        </p>
        <Link className="button button--primary button--lg" to={docsHref}>
          Open documentation
        </Link>
      </main>
    </Layout>
  );
}
