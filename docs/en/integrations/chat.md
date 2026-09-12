# Chat Bridges

Chat bridges connect Telegram, WeChat, DingTalk, and Feishu/Lark to TaskHandoff and route messages to AI sessions.

## Configure a Bridge

Open **Settings → Chat**, select a channel, enter its app/client IDs and tokens, then configure a default target and allowed users. Platform-specific callback and bot permissions remain defined by that platform and the fields shown in TaskHandoff.

One chat entry cannot be bound to multiple control planes or instances. Restrict users and choose a trusted default instance because messages can trigger workspace actions under session permissions.

## Public URL and Operations

The public access URL creates control-plane links in chat. Use the externally reachable HTTPS origin and verify sign-in plus WebSocket connectivity.

On bridge errors, inspect credentials, callbacks, network, and gateway logs. Deleting a bridge stops the entry but does not delete existing AI sessions.

Never send API keys, Git tokens, node join tokens, or SSH keys in chat. Keep sensitive AI operations in Ask mode and rotate bot credentials regularly.
