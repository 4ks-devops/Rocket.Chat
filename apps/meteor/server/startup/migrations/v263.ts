import { addMigration } from '../../lib/migrations';
import { Subscriptions } from '../../../app/models/server';

addMigration({
	version: 263,
	up() {
		Subscriptions.tryDropIndex({ 'userHighlights.0': 1 });
	},
});
