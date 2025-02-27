import { useEndpoint } from '@rocket.chat/ui-contexts';
import moment from 'moment';
import { useQuery } from 'react-query';

type UseHourlyChatActivityOptions = {
	displacement: number;
	utc: boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useHourlyChatActivity = ({ displacement, utc }: UseHourlyChatActivityOptions) => {
	const getHourlyChatActivity = useEndpoint('GET', '/v1/engagement-dashboard/users/chat-busier/hourly-data');

	return useQuery(
		['admin/engagement-dashboard/users/hourly-chat-activity', { displacement, utc }],
		async () => {
			const day = (utc ? moment.utc().endOf('day') : moment().endOf('day')).subtract(displacement, 'days').toDate();

			const response = await getHourlyChatActivity({
				start: day,
			});

			return response
				? {
						...response,
						day,
				  }
				: undefined;
		},
		{
			refetchInterval: 5 * 60 * 1000,
		},
	);
};
