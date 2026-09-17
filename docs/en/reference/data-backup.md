# Data, Backup, and Recovery

TaskHandoff configuration, node state, instance data, and workspaces have different owners.

| Data | Owner | Key point |
| --- | --- | --- |
| Users, nodes, models, projects, chat, triggers | Control Plane database | Back up `control-plane.sqlite` and identity files consistently |
| Private node config and instance records | Each Node Agent | Never merge with the control-plane database |
| `/data` and `/home/agent` | Managed instance volumes | Can be permanently deleted with the instance |
| Git `/workspace` | Managed Git workspace volume | Unpushed work exists only here |
| Local-folder workspace | Host filesystem | TaskHandoff does not back it up |
| Story documents | Story owner node | Story deletion removes its file directory |

Environment templates capture only the writable Docker layer. They exclude workspaces, data volumes, mounts, memory, and processes and are not backups.

Before deleting an instance, push required Git work, export non-Git files, record retained volume names, and check attachments and Story documents.

Back up Control Plane consistently, protect each Node Agent data directory and important volumes, store original secrets in a password manager, and perform recovery drills. Stop the relevant writer before file-level database restoration and record the software version.
