const releaseNotes = require('../release-notes.json');
const fs = require('fs');
const path = require('path');

const newReleases = {
	blocks: [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: ':rocket: *New releases are published!*',
			},
		},
	],
};

releaseNotes.releases
	.filter((r) => r.newVersion !== r.oldVersion)
	.forEach((r) => {
		const changes = [];
		r.changesets.forEach((c) => {
			const summary = releaseNotes.changesets.find((change) => change.id === c)?.summary;
			if (summary) changes.push(`\t-${summary}`);
		});

		newReleases.blocks.push({
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: `• ${r.name}@${r.newVersion}${changes.length > 0 ? '\n' : ''}${changes.join('\n')}`,
			},
		});
	});

const payload = JSON.stringify(newReleases).replace("'", "''");
console.log(payload);
