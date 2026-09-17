# Repository Workflows

When a session directory is inside a Git worktree, its repository environment provides files, changes, worktrees, branches, and remote delivery. Every operation runs inside the controlled instance.

## Files and Changes

The file browser can edit ordinary text files within the worktree. It will not open `.git` internals, escaped symlinks, binary or oversized files, special files, or nested repository internals as normal text.

Saving uses a server content version. If another tool changed the file, saving stops and preserves your draft so you can compare it with the latest version.

Changes are grouped as conflicts, staged, unstaged, and untracked. Supported operations include stage, unstage, discard selected tracked changes, discard all selected tracked changes, and commit the current index.

::: danger Discard is irreversible
TaskHandoff does not create a stash automatically. Verify the selected paths and scope before discarding changes.
:::

## Worktrees and Branches

Managed worktrees are created by TaskHandoff and can host new AI sessions. External worktrees remain user-owned and can be used only when they are within authorized workspace roots.

A managed worktree can be deleted only when it is not the main worktree, is clean and unlocked, and has no active AI or app sessions. The Git branch remains after its directory is removed.

Branch actions never auto-stash or force an overwrite. Unsafe checkout or deletion is blocked.

## Remote Delivery

- Fetch updates selected remote-tracking references;
- Pull allows fast-forward only and never merges, rebases, or stashes;
- Publish and Push require an explicit source, remote, and target;
- Diverged branches must be reconciled manually in a terminal;
- Force push is never used.

After an authentication error, update authorization under **Instance settings → Git credentials**, then retry manually. Failed write operations are not replayed automatically.

Use the session terminal for complex conflicts, diverged branches, large or binary diffs, Git hooks, signing, SSH diagnosis, and advanced commands not exposed by the conservative UI.
