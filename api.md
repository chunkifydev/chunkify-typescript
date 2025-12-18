# Shared

Types:

- <code><a href="./src/resources/shared.ts">ChunkifyError</a></code>

# Files

Types:

- <code><a href="./src/resources/files.ts">APIFile</a></code>

Methods:

- <code title="get /api/files/{fileId}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> APIFile</code>
- <code title="get /api/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> APIFilesPaginatedResults</code>
- <code title="delete /api/files/{fileId}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> void</code>

# Jobs

Types:

- <code><a href="./src/resources/jobs/jobs.ts">HlsAv1</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">HlsH264</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">HlsH265</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">Job</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">Jpg</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">MP4Av1</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">MP4H264</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">MP4H265</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">WebmVp9</a></code>

Methods:

- <code title="post /api/jobs">client.jobs.<a href="./src/resources/jobs/jobs.ts">create</a>({ ...params }) -> Job</code>
- <code title="get /api/jobs/{jobId}">client.jobs.<a href="./src/resources/jobs/jobs.ts">retrieve</a>(jobID) -> Job</code>
- <code title="get /api/jobs">client.jobs.<a href="./src/resources/jobs/jobs.ts">list</a>({ ...params }) -> JobsPaginatedResults</code>
- <code title="delete /api/jobs/{jobId}">client.jobs.<a href="./src/resources/jobs/jobs.ts">delete</a>(jobID) -> void</code>
- <code title="post /api/jobs/{jobId}/cancel">client.jobs.<a href="./src/resources/jobs/jobs.ts">cancel</a>(jobID) -> void</code>

## Files

Types:

- <code><a href="./src/resources/jobs/files.ts">FileListResponse</a></code>

Methods:

- <code title="get /api/jobs/{jobId}/files">client.jobs.files.<a href="./src/resources/jobs/files.ts">list</a>(jobID) -> FileListResponse</code>

## Logs

Types:

- <code><a href="./src/resources/jobs/logs.ts">LogListResponse</a></code>

Methods:

- <code title="get /api/jobs/{jobId}/logs">client.jobs.logs.<a href="./src/resources/jobs/logs.ts">list</a>(jobID, { ...params }) -> LogListResponse</code>

## Transcoders

Types:

- <code><a href="./src/resources/jobs/transcoders.ts">TranscoderListResponse</a></code>

Methods:

- <code title="get /api/jobs/{jobId}/transcoders">client.jobs.transcoders.<a href="./src/resources/jobs/transcoders.ts">list</a>(jobID) -> TranscoderListResponse</code>

# Notifications

Types:

- <code><a href="./src/resources/notifications.ts">Notification</a></code>

Methods:

- <code title="post /api/notifications">client.notifications.<a href="./src/resources/notifications.ts">create</a>({ ...params }) -> Notification</code>
- <code title="get /api/notifications/{notificationId}">client.notifications.<a href="./src/resources/notifications.ts">retrieve</a>(notificationID) -> Notification</code>
- <code title="get /api/notifications">client.notifications.<a href="./src/resources/notifications.ts">list</a>({ ...params }) -> NotificationsPaginatedResults</code>
- <code title="delete /api/notifications/{notificationId}">client.notifications.<a href="./src/resources/notifications.ts">delete</a>(notificationID) -> void</code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">Project</a></code>
- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="post /api/projects">client.projects.<a href="./src/resources/projects.ts">create</a>({ ...params }) -> Project</code>
- <code title="get /api/projects/{projectId}">client.projects.<a href="./src/resources/projects.ts">retrieve</a>(projectID) -> Project</code>
- <code title="patch /api/projects/{projectId}">client.projects.<a href="./src/resources/projects.ts">update</a>(projectID, { ...params }) -> void</code>
- <code title="get /api/projects">client.projects.<a href="./src/resources/projects.ts">list</a>() -> ProjectListResponse</code>
- <code title="delete /api/projects/{projectId}">client.projects.<a href="./src/resources/projects.ts">delete</a>(projectID) -> void</code>

# Sources

Types:

- <code><a href="./src/resources/sources.ts">Source</a></code>

Methods:

- <code title="post /api/sources">client.sources.<a href="./src/resources/sources.ts">create</a>({ ...params }) -> Source</code>
- <code title="get /api/sources/{sourceId}">client.sources.<a href="./src/resources/sources.ts">retrieve</a>(sourceID) -> Source</code>
- <code title="get /api/sources">client.sources.<a href="./src/resources/sources.ts">list</a>({ ...params }) -> SourcesPaginatedResults</code>
- <code title="delete /api/sources/{sourceId}">client.sources.<a href="./src/resources/sources.ts">delete</a>(sourceID) -> void</code>

# Storages

Types:

- <code><a href="./src/resources/storages.ts">Storage</a></code>
- <code><a href="./src/resources/storages.ts">StorageListResponse</a></code>

Methods:

- <code title="post /api/storages">client.storages.<a href="./src/resources/storages.ts">create</a>({ ...params }) -> Storage</code>
- <code title="get /api/storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">retrieve</a>(storageID) -> Storage</code>
- <code title="get /api/storages">client.storages.<a href="./src/resources/storages.ts">list</a>() -> StorageListResponse</code>
- <code title="delete /api/storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">delete</a>(storageID) -> void</code>

# Tokens

Types:

- <code><a href="./src/resources/tokens.ts">Token</a></code>
- <code><a href="./src/resources/tokens.ts">TokenListResponse</a></code>

Methods:

- <code title="post /api/tokens">client.tokens.<a href="./src/resources/tokens.ts">create</a>({ ...params }) -> Token</code>
- <code title="get /api/tokens">client.tokens.<a href="./src/resources/tokens.ts">list</a>() -> TokenListResponse</code>
- <code title="delete /api/tokens/{tokenId}">client.tokens.<a href="./src/resources/tokens.ts">revoke</a>(tokenID) -> void</code>

# Uploads

Types:

- <code><a href="./src/resources/uploads.ts">Upload</a></code>

Methods:

- <code title="post /api/uploads">client.uploads.<a href="./src/resources/uploads.ts">create</a>({ ...params }) -> Upload</code>
- <code title="get /api/uploads/{uploadId}">client.uploads.<a href="./src/resources/uploads.ts">retrieve</a>(uploadID) -> Upload</code>
- <code title="get /api/uploads">client.uploads.<a href="./src/resources/uploads.ts">list</a>({ ...params }) -> UploadsPaginatedResults</code>
- <code title="delete /api/uploads/{uploadId}">client.uploads.<a href="./src/resources/uploads.ts">delete</a>(uploadID) -> void</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">Webhook</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">NewEventWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code title="post /api/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> Webhook</code>
- <code title="get /api/webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookID) -> Webhook</code>
- <code title="patch /api/webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(webhookID, { ...params }) -> void</code>
- <code title="get /api/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /api/webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(body) -> void</code>
