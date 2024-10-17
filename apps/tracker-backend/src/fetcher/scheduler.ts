import cron from 'node-cron';
import fetchIssues from './fetch-Issues';

const scheduler = {
    start: (): void => {
        cron.schedule('* * * * *', () => {
            console.log('Fetching issues from GitHub...');
            fetchIssues()
                .then(() => console.log('Issues fetched and stored'))
                .catch((err: unknown) => console.error('Error fetching issues:', err));
        });
    },
};

export default scheduler;
