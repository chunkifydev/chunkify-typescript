# Shared

Types:

- <code><a href="./src/resources/shared.ts">AssetOutputError</a></code>
- <code><a href="./src/resources/shared.ts">ChunkifyError</a></code>
- <code><a href="./src/resources/shared.ts">CreatedVia</a></code>
- <code><a href="./src/resources/shared.ts">InstanceType</a></code>
- <code><a href="./src/resources/shared.ts">Log</a></code>
- <code><a href="./src/resources/shared.ts">TranscoderStatus</a></code>

# Assets

Types:

- <code><a href="./src/resources/assets/assets.ts">Asset</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetActionInput</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetActionResult</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetActionStatus</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetActionType</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetCaption</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetCaptionOutput</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetCaptionOutputCreateParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetCaptionOutputParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetCreateStorageParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetDefaults</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetDefaultsMaxResolution</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetDefaultsMinResolution</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetDefaultsParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetError</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetOutputStatus</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetPoster</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetRenditionProgress</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetSourceMetadata</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetStaticRendition</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetStaticRenditionCreateParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetStaticRenditionOutput</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetStaticRenditionOutputCreateParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetStatus</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetThumbnailCreateParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetThumbnailOutput</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetThumbnailOutputCreateParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTimelinePreviews</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTranscript</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTranscriptContent</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTranscriptOutput</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTranscriptOutputCreateParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTranscriptOutputParams</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetTranscriptSegment</a></code>
- <code><a href="./src/resources/assets/assets.ts">AssetUnknownOutput</a></code>

Methods:

- <code title="post /assets">client.assets.<a href="./src/resources/assets/assets.ts">create</a>({ ...params }) -> Asset</code>
- <code title="get /assets/{assetId}">client.assets.<a href="./src/resources/assets/assets.ts">retrieve</a>(assetID) -> Asset</code>
- <code title="patch /assets/{assetId}">client.assets.<a href="./src/resources/assets/assets.ts">update</a>(assetID, { ...params }) -> void</code>
- <code title="get /assets">client.assets.<a href="./src/resources/assets/assets.ts">list</a>({ ...params }) -> AssetsPaginatedResults</code>
- <code title="delete /assets/{assetId}">client.assets.<a href="./src/resources/assets/assets.ts">delete</a>(assetID, { ...params }) -> void</code>

## Outputs

Types:

- <code><a href="./src/resources/assets/outputs.ts">AssetOutput</a></code>

Methods:

- <code title="post /assets/{assetId}/outputs">client.assets.outputs.<a href="./src/resources/assets/outputs.ts">create</a>(assetID, { ...params }) -> AssetOutput</code>
- <code title="get /assets/{assetId}/outputs/{outputId}">client.assets.outputs.<a href="./src/resources/assets/outputs.ts">retrieve</a>(outputID, { ...params }) -> AssetOutput</code>
- <code title="get /assets/{assetId}/outputs">client.assets.outputs.<a href="./src/resources/assets/outputs.ts">list</a>(assetID, { ...params }) -> AssetOutputsPaginatedResults</code>
- <code title="delete /assets/{assetId}/outputs/{outputId}">client.assets.outputs.<a href="./src/resources/assets/outputs.ts">delete</a>(outputID, { ...params }) -> void</code>

## Workflow

Methods:

- <code title="post /assets/{assetId}/workflow/update">client.assets.workflow.<a href="./src/resources/assets/workflow/workflow.ts">update</a>(assetID) -> WorkflowRun</code>

### Actions

Types:

- <code><a href="./src/resources/assets/workflow/actions.ts">AssetActionRun</a></code>

Methods:

- <code title="get /assets/{assetId}/workflow/actions">client.assets.workflow.actions.<a href="./src/resources/assets/workflow/actions.ts">list</a>(assetID, { ...params }) -> AssetActionRunsPaginatedResults</code>

# Events

Types:

- <code><a href="./src/resources/events.ts">Event</a></code>

Methods:

- <code title="get /events/{eventId}">client.events.<a href="./src/resources/events.ts">retrieve</a>(eventID) -> Event</code>
- <code title="get /events">client.events.<a href="./src/resources/events.ts">list</a>({ ...params }) -> EventsPaginatedResults</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">JobFile</a></code>

Methods:

- <code title="get /files/{fileId}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> JobFile</code>
- <code title="get /files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> JobFilesPaginatedResults</code>
- <code title="delete /files/{fileId}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> void</code>

# Jobs

Types:

- <code><a href="./src/resources/jobs/jobs.ts">HlsAv1</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">HlsH264</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">HlsH265</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">Job</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobCreateFormatParams</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobCreateStorageParams</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobCreateTranscoderParams</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobFormat</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobFormatID</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobStorage</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">JobTranscoder</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">Jpg</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">MP4Av1</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">MP4H264</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">MP4H265</a></code>
- <code><a href="./src/resources/jobs/jobs.ts">WebmVp9</a></code>

Methods:

- <code title="post /jobs">client.jobs.<a href="./src/resources/jobs/jobs.ts">create</a>({ ...params }) -> Job</code>
- <code title="get /jobs/{jobId}">client.jobs.<a href="./src/resources/jobs/jobs.ts">retrieve</a>(jobID) -> Job</code>
- <code title="get /jobs">client.jobs.<a href="./src/resources/jobs/jobs.ts">list</a>({ ...params }) -> JobsPaginatedResults</code>
- <code title="delete /jobs/{jobId}">client.jobs.<a href="./src/resources/jobs/jobs.ts">delete</a>(jobID) -> void</code>
- <code title="post /jobs/{jobId}/cancel">client.jobs.<a href="./src/resources/jobs/jobs.ts">cancel</a>(jobID) -> void</code>

## Files

Types:

- <code><a href="./src/resources/jobs/files.ts">FileListResponse</a></code>

Methods:

- <code title="get /jobs/{jobId}/files">client.jobs.files.<a href="./src/resources/jobs/files.ts">list</a>(jobID) -> FileListResponse</code>

## Logs

Types:

- <code><a href="./src/resources/jobs/logs.ts">LogListResponse</a></code>

Methods:

- <code title="get /jobs/{jobId}/logs">client.jobs.logs.<a href="./src/resources/jobs/logs.ts">list</a>(jobID, { ...params }) -> LogListResponse</code>

## Transcoders

Types:

- <code><a href="./src/resources/jobs/transcoders.ts">TranscoderListResponse</a></code>

Methods:

- <code title="get /jobs/{jobId}/transcoders">client.jobs.transcoders.<a href="./src/resources/jobs/transcoders.ts">list</a>(jobID) -> TranscoderListResponse</code>

# Metrics

Types:

- <code><a href="./src/resources/metrics.ts">MetricsAssetCounts</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssetDay</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssetOutputs</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssetSources</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssetStreaming</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssetTimings</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssetValues</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsAssets</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsCreditsSpent</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsStorage</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsStorageDay</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsStorageEntry</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsStorageValues</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsage</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageAssets</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageCaptions</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageDay</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageEgress</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageNotifications</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageSources</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageStaticRenditions</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageThumbnails</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageTranscodings</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageUploads</a></code>
- <code><a href="./src/resources/metrics.ts">MetricsUsageValues</a></code>

Methods:

- <code title="get /metrics/assets">client.metrics.<a href="./src/resources/metrics.ts">assets</a>({ ...params }) -> MetricsAssets</code>
- <code title="get /metrics/storage">client.metrics.<a href="./src/resources/metrics.ts">storage</a>({ ...params }) -> MetricsStorage</code>
- <code title="get /metrics/usage">client.metrics.<a href="./src/resources/metrics.ts">usage</a>({ ...params }) -> MetricsUsage</code>

# Notifications

Types:

- <code><a href="./src/resources/notifications.ts">Notification</a></code>

Methods:

- <code title="post /notifications">client.notifications.<a href="./src/resources/notifications.ts">create</a>({ ...params }) -> Notification</code>
- <code title="get /notifications/{notificationId}">client.notifications.<a href="./src/resources/notifications.ts">retrieve</a>(notificationID) -> Notification</code>
- <code title="get /notifications">client.notifications.<a href="./src/resources/notifications.ts">list</a>({ ...params }) -> NotificationsPaginatedResults</code>
- <code title="delete /notifications/{notificationId}">client.notifications.<a href="./src/resources/notifications.ts">delete</a>(notificationID) -> void</code>

# Projects

Types:

- <code><a href="./src/resources/projects/projects.ts">Project</a></code>
- <code><a href="./src/resources/projects/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="post /projects">client.projects.<a href="./src/resources/projects/projects.ts">create</a>({ ...params }) -> Project</code>
- <code title="get /projects/{projectId}">client.projects.<a href="./src/resources/projects/projects.ts">retrieve</a>(projectID) -> Project</code>
- <code title="patch /projects/{projectId}">client.projects.<a href="./src/resources/projects/projects.ts">update</a>(projectID, { ...params }) -> void</code>
- <code title="get /projects">client.projects.<a href="./src/resources/projects/projects.ts">list</a>() -> ProjectListResponse</code>
- <code title="delete /projects/{projectId}">client.projects.<a href="./src/resources/projects/projects.ts">delete</a>(projectID) -> void</code>

## Analytics

### Connections

Types:

- <code><a href="./src/resources/projects/analytics/connections/connections.ts">AnalyticsConnection</a></code>
- <code><a href="./src/resources/projects/analytics/connections/connections.ts">ConnectionCreateResponse</a></code>
- <code><a href="./src/resources/projects/analytics/connections/connections.ts">ConnectionListResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/analytics/connections">client.projects.analytics.connections.<a href="./src/resources/projects/analytics/connections/connections.ts">create</a>(projectID, { ...params }) -> ConnectionCreateResponse</code>
- <code title="get /projects/{projectId}/analytics/connections/{connectionId}">client.projects.analytics.connections.<a href="./src/resources/projects/analytics/connections/connections.ts">retrieve</a>(connectionID, { ...params }) -> AnalyticsConnection</code>
- <code title="patch /projects/{projectId}/analytics/connections/{connectionId}">client.projects.analytics.connections.<a href="./src/resources/projects/analytics/connections/connections.ts">update</a>(connectionID, { ...params }) -> AnalyticsConnection</code>
- <code title="get /projects/{projectId}/analytics/connections">client.projects.analytics.connections.<a href="./src/resources/projects/analytics/connections/connections.ts">list</a>(projectID) -> ConnectionListResponse</code>
- <code title="delete /projects/{projectId}/analytics/connections/{connectionId}">client.projects.analytics.connections.<a href="./src/resources/projects/analytics/connections/connections.ts">delete</a>(connectionID, { ...params }) -> void</code>

#### Keys

Types:

- <code><a href="./src/resources/projects/analytics/connections/keys.ts">AnalyticsKey</a></code>
- <code><a href="./src/resources/projects/analytics/connections/keys.ts">KeyCreateResponse</a></code>
- <code><a href="./src/resources/projects/analytics/connections/keys.ts">KeyListResponse</a></code>
- <code><a href="./src/resources/projects/analytics/connections/keys.ts">KeyRotateResponse</a></code>

Methods:

- <code title="post /projects/{projectId}/analytics/connections/{connectionId}/keys">client.projects.analytics.connections.keys.<a href="./src/resources/projects/analytics/connections/keys.ts">create</a>(connectionID, { ...params }) -> KeyCreateResponse</code>
- <code title="get /projects/{projectId}/analytics/connections/{connectionId}/keys">client.projects.analytics.connections.keys.<a href="./src/resources/projects/analytics/connections/keys.ts">list</a>(connectionID, { ...params }) -> KeyListResponse</code>
- <code title="post /projects/{projectId}/analytics/connections/{connectionId}/keys/{keyId}/rotate">client.projects.analytics.connections.keys.<a href="./src/resources/projects/analytics/connections/keys.ts">rotate</a>(keyID, { ...params }) -> KeyRotateResponse</code>

# Sources

Types:

- <code><a href="./src/resources/sources.ts">Source</a></code>
- <code><a href="./src/resources/sources.ts">SourceCreateStorageParams</a></code>

Methods:

- <code title="post /sources">client.sources.<a href="./src/resources/sources.ts">create</a>({ ...params }) -> Source</code>
- <code title="get /sources/{sourceId}">client.sources.<a href="./src/resources/sources.ts">retrieve</a>(sourceID) -> Source</code>
- <code title="get /sources">client.sources.<a href="./src/resources/sources.ts">list</a>({ ...params }) -> SourcesPaginatedResults</code>
- <code title="delete /sources/{sourceId}">client.sources.<a href="./src/resources/sources.ts">delete</a>(sourceID) -> void</code>

# Storages

Types:

- <code><a href="./src/resources/storages.ts">AwsRegion</a></code>
- <code><a href="./src/resources/storages.ts">ChunkifyRegion</a></code>
- <code><a href="./src/resources/storages.ts">Storage</a></code>
- <code><a href="./src/resources/storages.ts">StorageAws</a></code>
- <code><a href="./src/resources/storages.ts">StorageAwsCreateParams</a></code>
- <code><a href="./src/resources/storages.ts">StorageChunkify</a></code>
- <code><a href="./src/resources/storages.ts">StorageChunkifyCreateParams</a></code>
- <code><a href="./src/resources/storages.ts">StorageCloudflare</a></code>
- <code><a href="./src/resources/storages.ts">StorageCloudflareCreateParams</a></code>
- <code><a href="./src/resources/storages.ts">StorageLocation</a></code>
- <code><a href="./src/resources/storages.ts">StorageS3Compatible</a></code>
- <code><a href="./src/resources/storages.ts">StorageS3CompatibleCreateParams</a></code>
- <code><a href="./src/resources/storages.ts">StorageListResponse</a></code>

Methods:

- <code title="post /storages">client.storages.<a href="./src/resources/storages.ts">create</a>({ ...params }) -> Storage</code>
- <code title="get /storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">retrieve</a>(storageID) -> Storage</code>
- <code title="patch /storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">update</a>(storageID, { ...params }) -> void</code>
- <code title="get /storages">client.storages.<a href="./src/resources/storages.ts">list</a>() -> StorageListResponse</code>
- <code title="delete /storages/{storageId}">client.storages.<a href="./src/resources/storages.ts">delete</a>(storageID) -> void</code>

# Thumbnails

Types:

- <code><a href="./src/resources/thumbnails.ts">Thumbnail</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailCreateStorageParams</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailCrop</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailError</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailFile</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailFormat</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailOutput</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailRange</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailRangeParams</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailSample</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailSettings</a></code>
- <code><a href="./src/resources/thumbnails.ts">ThumbnailStatus</a></code>

Methods:

- <code title="post /thumbnails">client.thumbnails.<a href="./src/resources/thumbnails.ts">create</a>({ ...params }) -> Thumbnail</code>
- <code title="get /thumbnails/{thumbnailId}">client.thumbnails.<a href="./src/resources/thumbnails.ts">retrieve</a>(thumbnailID) -> Thumbnail</code>
- <code title="get /thumbnails">client.thumbnails.<a href="./src/resources/thumbnails.ts">list</a>({ ...params }) -> ThumbnailsPaginatedResults</code>
- <code title="delete /thumbnails/{thumbnailId}">client.thumbnails.<a href="./src/resources/thumbnails.ts">delete</a>(thumbnailID, { ...params }) -> void</code>

# Tokens

Types:

- <code><a href="./src/resources/tokens.ts">Token</a></code>
- <code><a href="./src/resources/tokens.ts">TokenScope</a></code>
- <code><a href="./src/resources/tokens.ts">TokenListResponse</a></code>

Methods:

- <code title="post /tokens">client.tokens.<a href="./src/resources/tokens.ts">create</a>({ ...params }) -> Token</code>
- <code title="get /tokens">client.tokens.<a href="./src/resources/tokens.ts">list</a>() -> TokenListResponse</code>
- <code title="delete /tokens/{tokenId}">client.tokens.<a href="./src/resources/tokens.ts">revoke</a>(tokenID) -> void</code>

# Transcodings

Types:

- <code><a href="./src/resources/transcodings.ts">Transcoding</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingCreateFormatParams</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingCreateStorageParams</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingError</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingFile</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingFileThumbnail</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingFormat</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingM4aAac</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingMP4Av1</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingMP4H264</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingMP4H265</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingProcessingStage</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingStatus</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingStorage</a></code>
- <code><a href="./src/resources/transcodings.ts">TranscodingWebmVp9</a></code>

Methods:

- <code title="post /transcodings">client.transcodings.<a href="./src/resources/transcodings.ts">create</a>({ ...params }) -> Transcoding</code>
- <code title="get /transcodings/{transcodingId}">client.transcodings.<a href="./src/resources/transcodings.ts">retrieve</a>(transcodingID) -> Transcoding</code>
- <code title="get /transcodings">client.transcodings.<a href="./src/resources/transcodings.ts">list</a>({ ...params }) -> TranscodingsPaginatedResults</code>
- <code title="delete /transcodings/{transcodingId}">client.transcodings.<a href="./src/resources/transcodings.ts">delete</a>(transcodingID, { ...params }) -> void</code>
- <code title="post /transcodings/{transcodingId}/cancel">client.transcodings.<a href="./src/resources/transcodings.ts">cancel</a>(transcodingID) -> void</code>

# Uploads

Types:

- <code><a href="./src/resources/uploads.ts">Upload</a></code>
- <code><a href="./src/resources/uploads.ts">UploadCreateStorageParams</a></code>
- <code><a href="./src/resources/uploads.ts">UploadMultipartPartParams</a></code>
- <code><a href="./src/resources/uploads.ts">UploadMultipartSession</a></code>
- <code><a href="./src/resources/uploads.ts">UploadMultipartSignedPart</a></code>

Methods:

- <code title="post /uploads">client.uploads.<a href="./src/resources/uploads.ts">create</a>({ ...params }) -> Upload</code>
- <code title="get /uploads/{uploadId}">client.uploads.<a href="./src/resources/uploads.ts">retrieve</a>(uploadID) -> Upload</code>
- <code title="get /uploads">client.uploads.<a href="./src/resources/uploads.ts">list</a>({ ...params }) -> UploadsPaginatedResults</code>
- <code title="delete /uploads/{uploadId}">client.uploads.<a href="./src/resources/uploads.ts">delete</a>(uploadID) -> void</code>
- <code title="post /uploads/completion/{token}">client.uploads.<a href="./src/resources/uploads.ts">complete</a>(token, { ...params }) -> void</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">NotificationPayload</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAsset</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetDeleted</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetDeletedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetOutput</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetOutputData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetOutputDeleted</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadAssetOutputDeletedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadJobCompleted</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadJobCompletedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadJobCreated</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadJobCreatedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadJobFailed</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadJobFailedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadSourceCreated</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadSourceCreatedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadSourceDeleted</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadSourceDeletedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadThumbnail</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadThumbnailData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadTranscoding</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadTranscodingData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadUploadCompleted</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadUploadCompletedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadUploadCreated</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadUploadCreatedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadUploadFailed</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadUploadFailedData</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadWorkflowRun</a></code>
- <code><a href="./src/resources/webhooks.ts">NotificationPayloadWorkflowRunData</a></code>
- <code><a href="./src/resources/webhooks.ts">Webhook</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookEvent</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> Webhook</code>
- <code title="get /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookID) -> Webhook</code>
- <code title="patch /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(webhookID, { ...params }) -> void</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /webhooks/{webhookId}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks.ts">unwrap</a>(body) -> void</code>

# Workflows

Types:

- <code><a href="./src/resources/workflows/workflows.ts">Workflow</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowAction</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowActionCounts</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowActionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCaption</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCaptionAction</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCaptionActionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowCaptionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowOrigin</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowOriginParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowOutputBinding</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowOutputBindingFrom</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowOutputBindingParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowRule</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowRuleEvent</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowRuleParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowRunStatus</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowStatic</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowStaticAction</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowStaticActionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowStaticParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowStaticResolution</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowThumbnail</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowThumbnailAction</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowThumbnailActionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowThumbnailParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowThumbnailRange</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowThumbnailRangeParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranscript</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranscriptAction</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranscriptActionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranscriptParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranslation</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranslationAction</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranslationActionParams</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranslationLanguageCode</a></code>
- <code><a href="./src/resources/workflows/workflows.ts">WorkflowTranslationParams</a></code>

Methods:

- <code title="post /workflows">client.workflows.<a href="./src/resources/workflows/workflows.ts">create</a>({ ...params }) -> Workflow</code>
- <code title="get /workflows/{workflowId}">client.workflows.<a href="./src/resources/workflows/workflows.ts">retrieve</a>(workflowID) -> Workflow</code>
- <code title="patch /workflows/{workflowId}">client.workflows.<a href="./src/resources/workflows/workflows.ts">update</a>(workflowID, { ...params }) -> void</code>
- <code title="get /workflows">client.workflows.<a href="./src/resources/workflows/workflows.ts">list</a>({ ...params }) -> WorkflowsPaginatedResults</code>
- <code title="delete /workflows/{workflowId}">client.workflows.<a href="./src/resources/workflows/workflows.ts">delete</a>(workflowID) -> void</code>

## Revisions

Types:

- <code><a href="./src/resources/workflows/revisions.ts">WorkflowRevision</a></code>

Methods:

- <code title="get /workflows/{workflowId}/revisions/{revision}">client.workflows.revisions.<a href="./src/resources/workflows/revisions.ts">retrieve</a>(revision, { ...params }) -> WorkflowRevision</code>

## Runs

Types:

- <code><a href="./src/resources/workflows/runs/runs.ts">WorkflowRun</a></code>

Methods:

- <code title="get /workflows/{workflowId}/runs/{runId}">client.workflows.runs.<a href="./src/resources/workflows/runs/runs.ts">retrieve</a>(runID, { ...params }) -> WorkflowRun</code>
- <code title="get /workflows/{workflowId}/runs">client.workflows.runs.<a href="./src/resources/workflows/runs/runs.ts">list</a>(workflowID, { ...params }) -> WorkflowRunsPaginatedResults</code>

### Actions

Methods:

- <code title="get /workflows/{workflowId}/runs/{runId}/actions/{actionRunId}">client.workflows.runs.actions.<a href="./src/resources/workflows/runs/actions.ts">retrieve</a>(actionRunID, { ...params }) -> AssetActionRun</code>
- <code title="get /workflows/{workflowId}/runs/{runId}/actions">client.workflows.runs.actions.<a href="./src/resources/workflows/runs/actions.ts">list</a>(runID, { ...params }) -> AssetActionRunsPaginatedResults</code>
