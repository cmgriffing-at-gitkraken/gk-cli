# GitHub MCP Server

The GitKraken MCP Server is a local MCP server that is powerful and easy to use. It combines the functionality of all of your GitKraken Integrations and provides that power to your AI agents, assistants, and chatbots. Your egentic workflows will be more capable and efficient.

### Use Cases

- Safe Git Operations: Perform Git operations safely and securely
- Issue & PR Automation: Read and Create Issues and Pull Requests across all supported GitKraken Integrations (GitHub, GitLab, BitBucket, Azure DevOps, Jira, Trello, Linear, etc.)

---

## Local GitKraken MCP Server

## Installation

There are several ways of installing the GitKraken MCP Server depending on the environment in which you want to use it.

### GitLens in VSCode/Copilot

If you are using a new enough version of VSCode and have GitLens installed, you simply need to run a Copilot prompt that would use our MCP server. For example, you can run the following prompt:

> What Issues are assigned to me?

### Install in GitHub Copilot on VS Code

For quick installation, use one of the one-click install buttons above. Once you complete that flow, toggle Agent mode (located by the Copilot Chat text input) and the server will start.

More about using MCP server tools in VS Code's [agent mode documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

Install in GitHub Copilot on other IDEs (JetBrains, Visual Studio, Eclipse, etc.)

Add the following JSON block to your IDE's MCP settings.

```json
{
  "mcp": {
    "servers": {
      "gitkraken": {
        "command": "npx",
        "args": ["@gitkraken/mcp"]
      }
    }
  }
}
```

Optionally, you can add a similar example (i.e. without the mcp key) to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with other host applications that accept the same format.

<details>
<summary><b>Example JSON block without the MCP key included</b></summary>
<br>

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "github_token",
      "description": "GitHub Personal Access Token",
      "password": true
    }
  ],
  "servers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github_token}"
      }
    }
  }
}
```

</details>

### Install in Other MCP Hosts

For other MCP host applications, please refer to our installation guides:

- **[GitHub Copilot in other IDEs](/docs/installation-guides/install-other-copilot-ides.md)** - Installation for JetBrains, Visual Studio, Eclipse, and Xcode with GitHub Copilot
- **[Claude Code & Claude Desktop](docs/installation-guides/install-claude.md)** - Installation guide for Claude Code and Claude Desktop
- **[Cursor](docs/installation-guides/install-cursor.md)** - Installation guide for Cursor IDE
- **[Google Gemini CLI](docs/installation-guides/install-gemini-cli.md)** - Installation guide for Google Gemini CLI
- **[Windsurf](docs/installation-guides/install-windsurf.md)** - Installation guide for Windsurf IDE

For a complete overview of all installation options, see our **[Installation Guides Index](docs/installation-guides)**.

> **Note:** Any host application that supports local MCP servers should be able to access the local GitHub MCP server. However, the specific configuration process, syntax and stability of the integration will vary by host application. While many may follow a similar format to the examples above, this is not guaranteed. Please refer to your host application's documentation for the correct MCP configuration syntax and setup process.

## Tools

- **git_add_or_commit** - Add file contents to the index (git add &lt;pathspec&gt;) OR record changes to the repository (git commit -m &lt;message&gt; [files...]). Use the &#39;action&#39; parameter to specify which action to perform.

  - action: The action to perform: &#39;add&#39; or &#39;commit&#39; (string, required)
  - directory: The directory to run git add or commit in (string, required)
  - files: Optional array of files to add or commit. If omitted, all files are added or all staged changes are committed. (array, required)
  - message: The commit message (required if action is &#39;commit&#39;) (string, required)

- **git_blame** - Show what revision and author last modified each line of a file (git blame &lt;file&gt;).

  - directory: The directory to run git blame in (string, required)
  - file: The file to blame (string, required)

- **git_branch** - List or create branches (git branch).

  - action: Git branch action to be executed (string, required)
  - branch_name: (Optional) Name of the branch to create or delete (string, required)
  - directory: The directory to run git branch in (string, required)

- **git_checkout** - Switch branches or restore working tree files (git checkout &lt;branch&gt;).

  - branch: The branch to checkout. This must be a valid branch name without spaces (string, required)
  - directory: The directory to run git checkout in (string, required)

- **git_log_or_diff** - Show commit logs or changes between commits (git log --oneline or git diff).

  - action: The action to perform: &#39;log&#39; for commit logs or &#39;diff&#39; for changes (string, required)
  - commit: Optional commit to compare against HEAD for &#39;diff&#39;, defaults to HEAD (string, required)
  - directory: The directory to run the command in (string, required)

- **git_push** - Update remote refs along with associated objects (git push).

  - directory: The directory to run git push in (string, required)

- **git_stash** - Stash the changes in a dirty working directory (git stash).

  - directory: The directory to run git stash in (string, required)
  - name: Optional name for the stash (used as the stash message) (string, required)

- **git_status** - Show the working tree status (git status).

  - directory: The directory to run git status in (string, required)

- **git_worktree** - List or add git worktrees (git worktree &lt;action&gt;).

  - action: Git worktree action to be executed (string, required)
  - branch: (Optional) Existing branch for the new worktree (used for add) (string, required)
  - directory: The directory to run git worktree in (string, required)
  - path: (Optional) Path for the worktree (required for add) (string, required)

- **gitkraken_workspace_list** - Lists all Gitkraken workspaces

- **issues_add_comment** - Add a comment to an issue

  - azure_organization: Optionally set the Azure DevOps organization name. Required for Azure DevOps (string, required)
  - azure_project: Optionally set the Azure DevOps project name. Required for Azure DevOps (string, required)
  - comment: The text content of the comment (string, required)
  - issue_id: The ID of the issue to comment on (string, required)
  - provider: Specify the issue provider. Default is JIRA (string, required)
  - repository_name: Repository name. This is required for GitHub and GitLab (string, required)
  - repository_organization: Organization name. This is required for GitHub and GitLab (string, required)

- **issues_assigned_to_me** - Fetch issues assigned to the user

  - azure_organization: Optionally set the Azure DevOps organization name. Required for Azure DevOps (string, required)
  - azure_project: Optionally set the Azure DevOps project name. Required for Azure DevOps (string, required)
  - page: Optional parameter to specify the page number, defaults to 1 (number, required)
  - provider: Specify the issue provider. Default is JIRA (string, required)

- **issues_get_detail** - Retrieve detailed information about a specific issue by its unique ID

  - azure_organization: Optionally set the Azure DevOps organization name. Required for Azure DevOps (string, required)
  - azure_project: Optionally set the Azure DevOps project name. Required for Azure DevOps (string, required)
  - issue_id: The ID of the issue to retrieve (string, required)
  - provider: Specify the issue provider. Default is JIRA (string, required)
  - repository_name: Repository name. This is required for GitHub and GitLab (string, required)
  - repository_organization: Organization name. This is required for GitHub and GitLab (string, required)

- **pull_request_assigned_to_me** - Search pull requests where you are the assignee, author, or reviewer

  - azure_project: Optionally set the Azure DevOps project name of the pull request. Required for Azure DevOps (string, required)
  - is_closed: Set to true if you want to search for closed pull requests (boolean, required)
  - page: Optional parameter to specify the page number, defaults to 1 (number, required)
  - provider: Specify the git provider. Default is GITHUB (string, required)
  - repository_name: Set the repository name of the pull request. Required for Azure DevOps and Bitbucket (string, required)
  - repository_organization: Set the organization name of the pull request. Required for Azure DevOps and Bitbucket (string, required)

- **pull_request_create** - Create a new pull request

  - azure_project: Optionally set the Azure DevOps project name of the pull request. Required for Azure DevOps (string, required)
  - body: The body&#x2F;description of the pull request (string, required)
  - is_draft: Create as draft pull request (boolean, required)
  - provider: Specify the git provider. Default is GITHUB (string, required)
  - repository_name: Set the repository name of the pull request. Required for Azure DevOps and Bitbucket (string, required)
  - repository_organization: Set the organization name of the pull request. Required for Azure DevOps and Bitbucket (string, required)
  - source_branch: Source branch from which the pull request will be created (string, required)
  - target_branch: Target branch where the pull request will be merged (string, required)
  - title: The title of the pull request (string, required)

- **pull_request_create_review** - Create a review for a pull request

  - approve: Set to true if you want to approve the pull request (boolean, required)
  - azure_project: Optionally set the Azure DevOps project name of the pull request. Required for Azure DevOps (string, required)
  - provider: Specify the git provider. Default is GITHUB (string, required)
  - pull_request_id: ID of the pull request to create the review for (string, required)
  - repository_name: Set the repository name of the pull request. Required for Azure DevOps and Bitbucket (string, required)
  - repository_organization: Set the organization name of the pull request. Required for Azure DevOps and Bitbucket (string, required)
  - review: Comment to add to the pull request review (string, required)

- **pull_request_get_comments** - Get all the comments in a pull requests

  - azure_project: Optionally set the Azure DevOps project name of the pull request. Required for Azure DevOps (string, required)
  - provider: Specify the git provider. Default is GITHUB (string, required)
  - pull_request_id: ID of the pull request to add the comment to (string, required)
  - repository_name: Set the repository name of the pull request (string, required)
  - repository_organization: Set the organization name of the pull request (string, required)

- **pull_request_get_detail** - Get an specific pull request

  - azure_project: Optionally set the Azure DevOps project name of the pull request. Required for Azure DevOps (string, required)
  - provider: Specify the git provider. Default is GITHUB (string, required)
  - pull_request_files: Set to true if you want to retrieve the files changed in the pull request. Not supported by Azure DevOps. (boolean, required)
  - pull_request_id: ID of the pull request to retrieve (string, required)
  - repository_name: Set the repository name of the pull request (string, required)
  - repository_organization: Set the organization name of the pull request (string, required)

- **repository_get_file_content** - Get file content from a repository

  - azure_project: Optionally set the Azure DevOps project name of the pull request. Required for Azure DevOps (string, required)
  - file_path: File path to retrieve from the repository (string, required)
  - provider: Specify the git provider. Default is GITHUB (string, required)
  - ref: Set the branch, tag, or commit SHA to retrieve the file from (string, required)
  - repository_name: Set the repository name of the pull request. Required for Azure DevOps and Bitbucket (string, required)
  - repository_organization: Set the organization name of the pull request. Required for Azure DevOps and Bitbucket (string, required)

## Prompts

- **code_review_branch** - Generate a code review branch name based on the provided context.

  - branch_name: Branch name to review (required)
