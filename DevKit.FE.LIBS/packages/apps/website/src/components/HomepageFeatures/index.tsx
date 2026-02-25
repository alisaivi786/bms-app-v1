import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type FeatureItem = {
	title: string;
	image: string;
	description: JSX.Element;
	link: string;
};

function Feature({ title, image, link, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<Link to={link} className={styles.featureItem}>
				<div className="text--center">
					<img className={styles.featureSvg} src={image} role="img" />
				</div>
				<div className="text--center padding-horiz--md">
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
			</Link>
		</div>
	);
}

export const HomepageFeatures = ({ items }: { items: FeatureItem[] }) => {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
					{(items as any).map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
};
