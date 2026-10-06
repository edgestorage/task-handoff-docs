# Tutorial: Parallel AI with Worktrees

Git worktrees give parallel Codex and OpenCode sessions separate directories and branches.

1. Open **Environment → Worktrees** from an existing Git session.
2. Select **New worktree** to create an isolated worktree from an existing branch or a new branch.
3. Enter a branch name and starting ref.
4. Choose the same or a different agent.
5. Write a clear task and create it.

Use Codex for Codex configuration, context mentions, or multi-agent work, and OpenCode for its provider/model ecosystem. Never let two sessions edit the same files in one worktree concurrently.

Review, test, and commit each branch independently. Use Terminal for complex merge/rebase or divergence.

Before removing a managed worktree, close its AI/app sessions and make it clean and unlocked. Removal is non-force and preserves its Git branch. Main, external, dirty, locked, or occupied worktrees cannot be removed from the UI. A branch you no longer need can also be merged back with **Move to main worktree**: uncommitted changes are carried over, and the worktree directory is then deleted.
