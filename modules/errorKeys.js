export default Object.freeze({
  common: Object.freeze({
    missingPath: 'common.missingPath',
  }),
  classes: Object.freeze({
    invalidClassName: 'classes.invalidClassName',
    invalidSubClassName: 'classes.invalidSubClassName',
  }),
  character: Object.freeze({
    invalidField: 'character.invalidField',
    malformedEquipments: 'character.malformedEquipments',
  }),
  storage: Object.freeze({
    generic: 'storage.generic',
    cloudEntryMissingId: 'storage.cloudEntryMissingId',
    cloudEntryMissingUpdatedAt: 'storage.cloudEntryMissingUpdatedAt',
    cloudEntryMissingData: 'storage.cloudEntryMissingData',
    cloudEntryMissingUserId: 'storage.cloudEntryMissingUserId',
    cloudAuthMissingUserId: 'storage.cloudAuthMissingUserId',
  }),
  modal: Object.freeze({
    hostNotRegistered: 'modal.hostNotRegistered',
    bootstrapRequired: 'modal.bootstrapRequired',
    contentMissingSetModalProps: 'modal.contentMissingSetModalProps',
  }),
  auth: Object.freeze({
    supabaseSignInMissingUserId: 'auth.supabaseSignInMissingUserId',
    providerPayloadMissingProviderId: 'auth.providerPayloadMissingProviderId',
    providerPayloadMissingIdToken: 'auth.providerPayloadMissingIdToken',
    providerPayloadMissingClaims: 'auth.providerPayloadMissingClaims',
    providerPayloadMissingUserId: 'auth.providerPayloadMissingUserId',
    supabaseStateMissingProviderId: 'auth.supabaseStateMissingProviderId',
    supabaseStateMissingUserId: 'auth.supabaseStateMissingUserId',
    googleInvalidJwtFormat: 'auth.googleInvalidJwtFormat',
    googleCredentialMissing: 'auth.googleCredentialMissing',
    googleTokenMissingSub: 'auth.googleTokenMissingSub',
    googleApiUnavailable: 'auth.googleApiUnavailable',
    googleProviderNotConfigured: 'auth.googleProviderNotConfigured',
  }),
  sync: Object.freeze({
    conflict: 'sync.conflict',
    flushUnauthenticated: 'sync.flushUnauthenticated',
    entryNotFound: 'sync.entryNotFound',
    batchFailed: 'sync.batchFailed',
    unsupportedChoice: 'sync.unsupportedChoice',
  }),
})
