import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';

export const fetchLatestReleaseTag = async (tagPrefix: string) => {
  try {
    const githubToken = getInput('github_token', { required: true });
    const octokit = getOctokit(githubToken);
    const { owner, repo } = context.repo;

    const response = await octokit.rest.repos.listTags({
      owner,
      repo,
    });

    return response.data.find((tag) => tag.name.startsWith(tagPrefix))?.name;
  } catch (e) {
    console.error('Error while fetching tags list for this repository', e);
    throw e;
  }
};
