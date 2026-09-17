# Triggers

A trigger defines which event sends which prompt to an AI session. A template does nothing until deployed to a session.

## Sources

- Schedule: interval, daily time, or weekly weekdays with an explicit timezone;
- File change: workspace roots, globs, ignores, and debounce;
- AI session: agent, lifecycle status, or phase such as tool, approval, or failure.

Keep file scopes narrow and exclude build outputs, dependencies, and noisy logs.

## Run Policy

Cooldown suppresses duplicate events. **Skip when busy** prevents overlap; **Queue when busy** preserves every run. Start with maximum concurrency `1`.

Deploy a template to one or more sessions and test it manually before enabling automation. Unbinding stops one deployment without deleting the template. Deleting a template removes its control-plane deployments permanently.

Story automation is action-centered and best for scheduled business workflows. Triggers are event-centered and best for file or session state. Do not schedule the same task in both systems.
