# Users, Roles, and Sign-in Providers

**Settings → Users and access** controls who can sign in and which resources they can use. It requires administrator permission.

## Users

Create local users with a display name, login name, initial role, and temporary password. Disabled users cannot sign in and can be restored. Password reset creates a new temporary password and revokes existing sessions.

## Roles and Resource Scope

Roles group permissions across users, nodes, projects, runtimes, templates, instances, app and AI sessions, triggers, repositories, attachments, images, models, settings, secrets, and chat bridges.

Apply least privilege. A user who only runs Codex or OpenCode tasks normally does not need user, secret, node, or system settings management.

Resource scope further restricts accessible nodes and instances. **Inherit all instances on assigned nodes** may include future instances; use explicit instance assignment for strict isolation. Review effective permissions before saving.

## OIDC and GitHub

Sign-in providers require an issuer/type, Client ID, Client Secret, and callback URL. Saved secrets are not returned. Choose whether new external users are automatic, approval-based, or limited to existing bindings.

Before unbinding an identity, ensure the user has another sign-in method. A provider with bound identities cannot be deleted.

Revoke sessions immediately after device loss, access reduction, or suspected compromise, then rotate passwords or external credentials as needed.
