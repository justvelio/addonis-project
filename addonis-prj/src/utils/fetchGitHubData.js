const GITHUB_TOKEN = "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";

export async function fetchGitHubData(repoUrl) {
  const repoName = repoUrl.replace("https://github.com/", "");
  const cacheKey = `github-data-${repoName}`;

  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const repoResponse = await fetch(`https://api.github.com/repos/${repoName}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const repoData = await repoResponse.json();

  const openIssuesResponse = await fetch(`https://api.github.com/search/issues?q=repo:${repoName}+is:issue+is:open`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const openIssuesData = await openIssuesResponse.json();

  const pullRequestsResponse = await fetch(`https://api.github.com/search/issues?q=repo:${repoName}+is:pr+is:open`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const pullRequestsData = await pullRequestsResponse.json();

  const commitsResponse = await fetch(`https://api.github.com/repos/${repoName}/commits`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const commitsData = await commitsResponse.json();

  const result = {
    openIssues: openIssuesData.total_count,
    pullRequests: pullRequestsData.total_count,
    lastCommitDate: commitsData[0]?.commit?.author?.date,
  };

  localStorage.setItem(cacheKey, JSON.stringify(result));
  setTimeout(() => {
    localStorage.removeItem(cacheKey);
  }, 3600000);

  return result;
}