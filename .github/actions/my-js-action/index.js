const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get input values
    const message = core.getInput('message');
    const token = core.getInput('github-token');

    // Log the message
    console.log(`Logging message: ${message}`);

    // If a token is provided, comment on the pull request
    if (token) {
      const octokit = github.getOctokit(token);
      const context = github.context;

      if (context.payload.pull_request) {
        const { owner, repo } = context.repo;
        const pullRequestNumber = context.payload.pull_request.number;

        await octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number: pullRequestNumber,
          body: message,
        });

        core.setOutput('result', `Commented on PR #${pullRequestNumber}`);
      } else {
        core.setFailed('This action can only be run on pull requests.');
      }
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
