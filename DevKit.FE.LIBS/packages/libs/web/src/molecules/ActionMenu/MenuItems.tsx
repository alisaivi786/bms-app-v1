import React from 'react';
import styles from './ActionMenu.styles';

export interface IGroupActionMenuItem {
	renderItem: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
}

export const MenuItems = ({
	groups,
	onClick,
}: {
	groups: IGroupActionMenuItem[][];
	onClick?: () => void;
}): React.ReactNode => {
	return (
		<>
			{groups.map((items, i, { length }) => (
				<div key={i} className={styles.itemContainer(length - 1 === i)}>
					{items.map((item, i) => (
						<button
							className={styles.itemButton(item.disabled)}
							disabled={item.disabled}
							onClick={() => {
								item.onClick?.();
								onClick?.();
							}}
							key={i}
						>
							{item.renderItem}
						</button>
					))}
				</div>
			))}
		</>
	);
};
