import config from './config';

export const fetchRepositoryInfo = async (repoName) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${config.githubAccessToken}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching repository info:', error);
        throw error;
    }
};
