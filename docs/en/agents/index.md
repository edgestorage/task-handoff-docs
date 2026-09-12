# Codex and OpenCode

TaskHandoff currently focuses on two AI agents: **Codex** and **OpenCode**. Both use the unified AI session interface for creation, live progress, messages, permissions, stopping, history, and recovery.

::: tip Choosing an agent
Choose Codex for deep Codex integration, context mentions, and multi-agent work. Choose OpenCode for its provider ecosystem and Chat Completions-compatible models.
:::

## Capability Comparison

| Capability | Codex | OpenCode |
| --- | --- | --- |
| Primary model protocol | OpenAI Responses | OpenAI Chat Completions |
| Session create and discovery | Supported | Supported |
| Live text, reasoning, and tools | Supported | Supported |
| Permission requests | Supported | Supported |
| Stop, close, and fork | Supported | Supported |
| Model and reasoning selection | Supported | Supported through model variants |
| File context mentions | First-class support | Not a primary capability today |
| Managed defaults | Style, personality, multi-agent, and more | Uses OpenCode session and model configuration |

Claude compatibility may remain visible for existing images or configurations, but this guide uses Codex and OpenCode as the primary documented and tested paths.

<figure class="doc-screenshot">
  <img src="/images/ai-session-agent-selector.png" alt="Codex and OpenCode agent selector">
  <figcaption>Codex and OpenCode are available from the same session entry point. The interface shown is in Simplified Chinese.</figcaption>
</figure>

## Configure Codex

Create a model under **Settings → Models**, select Codex and `openai-responses`, enter the endpoint, key, and model names, test it, then assign it to an instance.

**Instance settings → AI → Codex** also controls response detail, personality, default reasoning, Codex Home, multi-agent enablement, concurrency, and sub-agent defaults. These settings apply to new sessions and sub-agents.

<figure class="doc-screenshot">
  <img src="/images/ai-session-model-reasoning.png" alt="Model provider and reasoning selector">
  <figcaption>Select the provider, model, and reasoning level for a session. The interface shown is in Simplified Chinese.</figcaption>
</figure>

## Configure OpenCode

Create an OpenCode model using `openai-chat-completions`, test it, assign it to the instance, and restart the instance for the assignment to take effect. OpenCode model and reasoning choices cannot be changed during an active turn.

## Parallel Work

Codex and OpenCode can run in the same instance and see the same disk changes. Give parallel tasks separate Git worktrees to avoid concurrent edits to the same files.
