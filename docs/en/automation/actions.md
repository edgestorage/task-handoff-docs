# Preset Actions

A preset action stores reusable AI session configuration and a prompt template for recurring reviews, updates, reports, or diagnostics.

## Configuration

An action can define its title, prompt, target instance, Codex or OpenCode agent, model, reasoning, permission mode, working folder, Git/worktree mode, and message mode. A validated current session can also be saved as a preset action.

## Permissions

Every run reuses the saved permission mode. Saving Full access grants that level to future sessions created by the action. Prefer least privilege and keep risky operations in Ask mode.

## Run an Action

Confirm that the target instance is online and review its agent, directory, and permissions before running. The action creates a new AI session whose progress and result appear in the Story.

Codex and OpenCode require compatible model providers. Do not assume one model name works with both agents.

Prompt templates should specify input sources, output location, prohibited actions, and acceptance criteria. Never include one-time secrets or depend on context that exists only in a previous chat.
