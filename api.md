# Files

Types:

- <code><a href="./src/resources/files.ts">APIFile</a></code>
- <code><a href="./src/resources/files.ts">ResponseOk</a></code>
- <code><a href="./src/resources/files.ts">FileRetrieveResponse</a></code>
- <code><a href="./src/resources/files.ts">FileDeleteResponse</a></code>

Methods:

- <code title="get /api/files/{fileId}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> FileRetrieveResponse</code>
- <code title="get /api/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> APIFilesMyOffsetPage</code>
- <code title="delete /api/files/{fileId}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> unknown</code>

# Jobs

Types:

- <code><a href="./src/resources/jobs.ts">Av1</a></code>
- <code><a href="./src/resources/jobs.ts">ChunkifyError</a></code>
- <code><a href="./src/resources/jobs.ts">H264</a></code>
- <code><a href="./src/resources/jobs.ts">H265</a></code>
- <code><a href="./src/resources/jobs.ts">Hls</a></code>
- <code><a href="./src/resources/jobs.ts">Job</a></code>
- <code><a href="./src/resources/jobs.ts">VideoCommon</a></code>
- <code><a href="./src/resources/jobs.ts">JobCreateResponse</a></code>
- <code><a href="./src/resources/jobs.ts">JobRetrieveResponse</a></code>
- <code><a href="./src/resources/jobs.ts">JobDeleteResponse</a></code>
- <code><a href="./src/resources/jobs.ts">JobCancelResponse</a></code>
- <code><a href="./src/resources/jobs.ts">JobGetFilesResponse</a></code>
- <code><a href="./src/resources/jobs.ts">JobGetLogsResponse</a></code>
- <code><a href="./src/resources/jobs.ts">JobGetTranscodersResponse</a></code>

Methods:

- <code title="post /api/jobs">client.jobs.<a href="./src/resources/jobs.ts">create</a>({ ...params }) -> JobCreateResponse</code>
- <code title="get /api/jobs/{jobId}">client.jobs.<a href="./src/resources/jobs.ts">retrieve</a>(jobID) -> JobRetrieveResponse</code>
- <code title="get /api/jobs">client.jobs.<a href="./src/resources/jobs.ts">list</a>({ ...params }) -> JobsMyOffsetPage</code>
- <code title="delete /api/jobs/{jobId}">client.jobs.<a href="./src/resources/jobs.ts">delete</a>(jobID) -> unknown</code>
- <code title="post /api/jobs/{jobId}/cancel">client.jobs.<a href="./src/resources/jobs.ts">cancel</a>(jobID) -> unknown</code>
- <code title="get /api/jobs/{jobId}/files">client.jobs.<a href="./src/resources/jobs.ts">getFiles</a>(jobID) -> JobGetFilesResponse</code>
- <code title="get /api/jobs/{jobId}/logs">client.jobs.<a href="./src/resources/jobs.ts">getLogs</a>(jobID, { ...params }) -> JobGetLogsResponse</code>
- <code title="get /api/jobs/{jobId}/transcoders">client.jobs.<a href="./src/resources/jobs.ts">getTranscoders</a>(jobID) -> JobGetTranscodersResponse</code>

# Notifications

Types:

- <code><a href="./src/resources/notifications.ts">Notification</a></code>
- <code><a href="./src/resources/notifications.ts">NotificationCreateResponse</a></code>
- <code><a href="./src/resources/notifications.ts">NotificationRetrieveResponse</a></code>
- <code><a href="./src/resources/notifications.ts">NotificationDeleteResponse</a></code>

Methods:

- <code title="post /api/notifications">client.notifications.<a href="./src/resources/notifications.ts">create</a>({ ...params }) -> NotificationCreateResponse</code>
- <code title="get /api/notifications/{notificationId}">client.notifications.<a href="./src/resources/notifications.ts">retrieve</a>(notificationID) -> NotificationRetrieveResponse</code>
- <code title="get /api/notifications">client.notifications.<a href="./src/resources/notifications.ts">list</a>({ ...params }) -> NotificationsMyOffsetPage</code>
- <code title="delete /api/notifications/{notificationId}">client.notifications.<a href="./src/resources/notifications.ts">delete</a>(notificationID) -> unknown</code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">Project</a></code>
- <code><a href="./src/resources/projects.ts">ProjectCreateResponse</a></code>
- <code><a href="./src/resources/projects.ts">ProjectRetrieveResponse</a></code>
- <code><a href="./src/resources/projects.ts">ProjectUpdateResponse</a></code>
- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>
- <code><a href="./src/resources/projects.ts">ProjectDeleteResponse</a></code>

Methods:

- <code title="post /api/projects">client.projects.<a href="./src/resources/projects.ts">create</a>({ ...params }) -> ProjectCreateResponse</code>
- <code title="get /api/projects/{projectId}">client.projects.<a href="./src/resources/projects.ts">retrieve</a>(projectID) -> ProjectRetrieveResponse</code>
- <code title="patch /api/projects/{projectId}">client.projects.<a href="./src/resources/projects.ts">update</a>(projectID, { ...params }) -> unknown</code>
- <code title="get /api/projects">client.projects.<a href="./src/resources/projects.ts">list</a>({ ...params }) -> ProjectListResponse</code>
- <code title="delete /api/projects/{projectId}">client.projects.<a href="./src/resources/projects.ts">delete</a>(projectID) -> unknown</code>

# Sources

Types:

- <code><a href="./src/resources/sources.ts">Source</a></code>
- <code><a href="./src/resources/sources.ts">SourceCreateResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceRetrieveResponse</a></code>
- <code><a href="./src/resources/sources.ts">SourceDeleteResponse</a></code>

Methods:

- <code title="post /api/sources">client.sources.<a href="./src/resources/sources.ts">create</a>({ ...params }) -> SourceCreateResponse</code>
- <code title="get /api/sources/{sourceId}">client.sources.<a href="./src/resources/sources.ts">retrieve</a>(sourceID) -> SourceRetrieveResponse</code>
- <code title="get /api/sources">client.sources.<a href="./src/resources/sources.ts">list</a>({ ...params }) -> SourcesMyOffsetPage</code>
- <code title="delete /api/sources/{sourceId}">client.sources.<a href="./src/resources/sources.ts">delete</a>(sourceID) -> unknown</code>

# Storages

Types:

- <code><a href="./src/resources/storages.ts">Storage</a></code>
- <code><a href="./src/resources/storages.ts">StorageCreateResponse</a></code>
- <code><a href="./src/resources/storages.ts">StorageRetrieveResponse</a></code>
- <code><a href="./src/resources/storages.ts">StorageListResponse</a></code>
- <code><a href="./src/resources/storages.ts">StorageDeleteResponse</a></code>

Methods:

- <code title="post /api/storages">client.storages.<a href="./src/resources/storages.ts">create</a>({ ...params }) -> StorageCreateResponse</code>
- <code title="get /api/storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">retrieve</a>(storageID) -> StorageRetrieveResponse</code>
- <code title="get /api/storages">client.storages.<a href="./src/resources/storages.ts">list</a>() -> StorageListResponse</code>
- <code title="delete /api/storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">delete</a>(storageID) -> unknown</code>

# Tokens

Types:

- <code><a href="./src/resources/tokens.ts">Token</a></code>
- <code><a href="./src/resources/tokens.ts">TokenCreateResponse</a></code>
- <code><a href="./src/resources/tokens.ts">TokenListResponse</a></code>
- <code><a href="./src/resources/tokens.ts">TokenRevokeResponse</a></code>

Methods:

- <code title="post /api/tokens">client.tokens.<a href="./src/resources/tokens.ts">create</a>({ ...params }) -> TokenCreateResponse</code>
- <code title="get /api/tokens">client.tokens.<a href="./src/resources/tokens.ts">list</a>() -> TokenListResponse</code>
- <code title="delete /api/tokens/{tokenId}">client.tokens.<a href="./src/resources/tokens.ts">revoke</a>(tokenID) -> unknown</code>

# Uploads

Types:

- <code><a href="./src/resources/uploads.ts">Upload</a></code>
- <code><a href="./src/resources/uploads.ts">UploadCreateResponse</a></code>
- <code><a href="./src/resources/uploads.ts">UploadRetrieveResponse</a></code>
- <code><a href="./src/resources/uploads.ts">UploadDeleteResponse</a></code>

Methods:

- <code title="post /api/uploads">client.uploads.<a href="./src/resources/uploads.ts">create</a>({ ...params }) -> UploadCreateResponse</code>
- <code title="get /api/uploads/{uploadId}">client.uploads.<a href="./src/resources/uploads.ts">retrieve</a>(uploadID) -> UploadRetrieveResponse</code>
- <code title="get /api/uploads">client.uploads.<a href="./src/resources/uploads.ts">list</a>({ ...params }) -> UploadsMyOffsetPage</code>
- <code title="delete /api/uploads/{uploadId}">client.uploads.<a href="./src/resources/uploads.ts">delete</a>(uploadID) -> unknown</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">Webhook</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookCreateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookUpdateResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDeleteResponse</a></code>

Methods:

- <code title="post /api/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookCreateResponse</code>
- <code title="get /api/webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookID) -> WebhookRetrieveResponse</code>
- <code title="patch /api/webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(webhookID, { ...params }) -> unknown</code>
- <code title="get /api/webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /api/webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> unknown</code>
