import axios from 'axios';
import { Issue } from '../models/issues.model'; // Assuming Issues is the Mongoose model

const fetchIssues = async (): Promise<void> => {
    const repos: string[] = ['dubinc/dub', 'code100x/cms', 'calcom/cal.com', 'processing/p5.js-web-editor', 'processing/p5.js-website', 'connieliu0/p5.js-showcase', 'processing/p5.js', 'apache/apisix-website', 'apache/apisix-dashboard', 'RocketChat/Rocket.Chat', 'scorelab/Webiu', 'chromium/chromium', 'kubernetes/kubernetes']; // Replace with your target repos
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
        throw new Error('GitHub token is missing.');
    }

    for (const repo of repos) {
        const url = `https://api.github.com/repos/${repo}/issues?assignee=none`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${githubToken}`,
                    'User-Agent': 'GSoC-Issue-Tracker',
                },
            });

            const issues = response.data.map((issue: {
                id: any;
                number: any;
                url: any;
                title: any;
                state: any;
                labels: any[];
                comments: any;
                created_at: any;
                updated_at: any;
            }) => ({
                githubId: issue.id,
                issueNumber: issue.number,
                issueURL: issue.url,
                title: issue.title,
                state: issue.state,
                labels: issue.labels.map((label: { name: any; }) => label.name),
                comments: issue.comments,
                createdAt: issue.created_at,
                updatedAt: issue.updated_at,
                repository: repo,
            }));

            // Remove previous issues for the specific repo from the database
            await Issue.deleteMany({ repository: repo });

            // Insert all fetched issues into the database
            await Issue.insertMany(issues);

            console.log(`Issues for ${repo} successfully fetched and updated in the database.`);
        } catch (error) {
            console.error(`Error fetching issues for ${repo}:`, error);
        }
    }
};

export default fetchIssues;
