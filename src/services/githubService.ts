import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';

export const fetchLatestReleaseTag = async (tagPrefix: string) => {
  try {
    const githubToken = getInput('github_token', { required: true });
    const octokit = getOctokit(githubToken);
    const { owner, repo } = context.repo;

    const response = await octokit.paginate('GET /repos/{owner}/{repo}/tags', {
      owner,
      repo,
    });

    const tags = response.map((tag) => tag.name);

    return tags.find((tag) => tag.startsWith(tagPrefix));
  } catch (e) {
    console.error('Error while fetching tags list for this repository', e);
    throw e;
  }
};
