import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FeatureItem, HomepageFeatures } from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const featureList: FeatureItem[] = [
	{
		title: 'Coding Standards',
		image: '/img/coding.png',
		link: 'docs/category/typescript',
	},
	{
		title: 'Knowledge Base',
		image: '/img/blog.png',
		link: '/blog',
	},
	{
		title: 'devkit Docs',
		image: '/img/devkit-logo.png',
		link: '/docs/devkit-docs/overview',
	},
];

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	return (
		<Layout>
			<HomepageHeader />
			<main>
				<HomepageFeatures items={featureList} />
			</main>
		</Layout>
	);
}
