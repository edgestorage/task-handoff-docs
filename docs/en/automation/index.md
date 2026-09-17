# About Story

Story is TaskHandoff's main unit for long-running work. It groups documents, Codex/OpenCode sessions, preset actions, and scheduled automation around one goal.

## What a Story Contains

| Content | Purpose |
| --- | --- |
| Documents | Requirements, context, plans, decisions, and results |
| AI sessions | Codex and OpenCode work related to the goal |
| Preset actions | Reusable agent, instance, permission, and prompt configuration |
| Automation | Scheduled execution of preset actions |

## Create a Story

Open **Story**, select **New Story**, enter a title and optional description, choose an owner node, and set the maximum retained idle AI sessions.

The owner node determines where Story files live and which instances and sessions can be attached. Choose a node expected to remain available.

<figure class="doc-screenshot">
  <img src="/images/story-node-filter.png" alt="Story owner-node filter">
  <figcaption>Filter Stories by owner node when work is distributed across nodes.</figcaption>
</figure>

## Sessions and Lifecycle

Create sessions inside the Story or attach unassigned sessions from its owner node. New sessions can use Codex or OpenCode with an explicit instance, directory, model, and permission mode.

<figure class="doc-screenshot">
  <img src="/images/story-overview-en.png" alt="Story overview with preset actions, documents, AI sessions, and automations">
  <figcaption>A Story keeps preset actions, goal documents, related AI sessions, and automations in one workspace.</figcaption>
</figure>

Archive completed Stories for later reading. Deleting a Story also deletes its file directory and cannot be undone. Move important deliverables into the project repository or another backup first.

## Continue Reading

- [Story Documents](./documents)
- [Preset Actions](./actions)
- [Story Automation](./schedules)
