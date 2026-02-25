import clsx from 'clsx';
import { FeatureItem, HomepageFeatures } from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const featureList: FeatureItem[] = [];

function HomepageHeader() {
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">devkit NPM Packages</h1>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	return (
		<Layout>
			<HomepageHeader />
			<main>
				<HomepageFeatures items={featureList} noOffset />
			</main>
		</Layout>
	);
}
