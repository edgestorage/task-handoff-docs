# Story Automation

Story automation links a preset action to a schedule that creates and runs AI sessions.

## Schedules

Use fixed minute/hour/day/week intervals, daily times, selected weekdays, or monthly dates including end-of-month options. Always choose an explicit business timezone.

## Create Automation

Select an existing action or create one, configure schedule and timezone, set busy behavior, concurrency, and cooldown, then save it disabled. Run it once manually and enable it only after verifying the result.

Use **Skip** when only the latest check matters and **Queue** when every run must be preserved. Start at concurrency `1` to prevent agents editing one workspace simultaneously. Cooldown limits dispatch frequency but does not replace idempotent task design.

Run history shows queued, dispatching, running, completed, failed, or skipped entries and links to the generated AI session. Disabling automation preserves its action and history.

Use Story automation for scheduled business workflows. Use [Triggers](./triggers) for file changes or AI session events, and do not schedule the same task in both systems.
