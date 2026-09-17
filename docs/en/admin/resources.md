# Models, Images, and Projects

Global resource registries determine what can be selected during instance creation.

## Models

Model connections can belong to Control Plane or one node. Supported upstream protocols are `openai-responses` for Codex, `openai-chat-completions` for OpenCode, and `anthropic-messages` for Claude compatibility.

Configure one or more ordered model names and use discovery and test actions before saving. Disabling a model prevents new selection while preserving existing references for repair.

## Images

The Image Market is read-only; custom OCI image references are administrator-owned. Deleting a catalog entry does not remove cached Docker layers and is blocked while projects, node defaults, or instances reference it.

An instance stores an immutable image snapshot and resolved digest, so later tag or market changes do not silently rewrite its environment.

## Environment Templates

A template is created from a Docker instance and remains local to its source node. It captures the writable container layer but excludes workspaces, data volumes, mounts, memory, and processes.

## Projects

A Git project stores a reusable repository URL, name, optional default image, and credential reference. It is not a copy of repository content. Never embed a token in the Git URL.

<figure class="doc-screenshot">
  <img src="/images/git-projects.png" alt="Git project registry">
  <figcaption>The project registry shows repository URLs, default images, credentials, and references.</figcaption>
</figure>

A local project points to a folder on one specific node and is available only there. Runtime isolation and host permissions still apply.
