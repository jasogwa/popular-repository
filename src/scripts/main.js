import config from './config';

export const renderRepositoryInfo = (app, data) => {
    const repositoryInfo = document.createElement('div');
    repositoryInfo.innerHTML = `
    <div class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="flex items-center mb-4">
        <img src="${data.owner.avatar_url}" alt="Repository Owner Avatar" class="w-8 h-8 mr-2 rounded-full">
        <h2 class="text-xl font-bold">${data.name}</h2>
      </div>
      <p class="mb-2">Author: ${data.owner.login}</p>
      <p class="mb-2">Stars: ${data.stargazers_count}</p>
      <p class="mb-2">Forks: ${data.forks_count}</p>
      <p>Popular: ${isPopular(data)}</p>
    </div>
  `;
    app.appendChild(repositoryInfo);
};

export const isPopular = (data) => {
    const score = data.stargazers_count * 1 + data.forks_count * 2;
    return score >= 500 ? 'Yes' : 'No';
};

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
