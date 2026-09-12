# Tutorial: Parallel AI with Worktrees

Git worktrees give parallel Codex and OpenCode sessions separate directories and branches.

1. Open **Environment → Worktrees** from an existing Git session.
2. Select **New managed worktree AI session**.
3. Enter a branch, starting ref, agent, and focused task.
4. Create the worktree and session; the original session remains in its directory.

Use Codex for Codex configuration, context mentions, or multi-agent work, and OpenCode for its provider/model ecosystem. Never let two sessions edit the same files in one worktree concurrently.

Review, test, and commit each branch independently. Use Terminal for complex merge/rebase or divergence.

Before removing a managed worktree, close its AI/app sessions and make it clean and unlocked. Removal is non-force and preserves its Git branch. Main, external, dirty, locked, or occupied worktrees cannot be removed from the UI.
