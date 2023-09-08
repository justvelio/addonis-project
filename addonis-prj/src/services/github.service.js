import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: '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',
});

export const getAddonInfo = async (repoOwner, repoName) => {
    try {
      const response = await octokit.repos.get({
        owner: repoOwner,
        repo: repoName,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching repository information:', error);
      throw error;
    }
  };