import { renderRepositoryInfo, isPopular, fetchRepositoryInfo } from '../scripts/main';
import config from '../scripts/config';

describe('Main Tests', () => {
    test('renders repository info correctly', () => {
        const app = document.createElement('div');
        const mockedRepoData = {
            owner: {
                avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
                login: 'facebook'
            },
            name: 'react',
            stargazers_count: 213700,
            forks_count: 44963
        };

        renderRepositoryInfo(app, mockedRepoData);

        expect(app.innerHTML).toContain('facebook');
        expect(app.innerHTML).toContain('react');
    });

    test('checks if repository is popular', () => {
        const popularRepo = { stargazers_count: 300, forks_count: 200 };
        const notPopularRepo = { stargazers_count: 100, forks_count: 200 };

        expect(isPopular(popularRepo)).toBe('Yes');
        expect(isPopular(notPopularRepo)).toBe('Yes');
    });

    test('fetches repository info correctly', async () => {
        const repoName = 'facebook/react';

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({})
            })
        );

        await fetchRepositoryInfo(repoName);

        expect(fetch).toHaveBeenCalledWith(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${config.githubAccessToken}`
            }
        });
    });
});
