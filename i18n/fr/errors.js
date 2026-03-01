export default {
  common: {
    missingPath: 'Chemin invalide: {message}',
  },
  classes: {
    invalidClassName: 'Classe invalide: {className}.',
    invalidSubClassName: 'Sous-classe invalide: {subClassName} pour {className}.',
  },
  character: {
    invalidField: 'Champ personnage invalide "{fieldName}": {reason}',
    malformedEquipments: 'La liste des equipements contient des donnees invalides.',
  },
  storage: {
    generic: 'Erreur de stockage: {message}',
    cloudEntryMissingId: 'Sauvegarde cloud invalide: id manquant.',
    cloudEntryMissingUpdatedAt: 'Sauvegarde cloud invalide: updatedAt manquant.',
    cloudEntryMissingData: 'Sauvegarde cloud invalide: donnees manquantes.',
    cloudEntryMissingUserId: 'Sauvegarde cloud invalide: user id manquant.',
    cloudAuthMissingUserId: 'Authentification cloud invalide: user id manquant.',
  },
  modal: {
    hostNotRegistered: 'Le composant modal "{tagName}" doit etre enregistre avant ouverture.',
    bootstrapRequired: 'Bootstrap Modal est requis.',
    contentMissingSetModalProps: 'Le composant "{contentTagName}" doit implementer setModalProps(props).',
  },
  auth: {
    supabaseSignInMissingUserId: 'La connexion a échoué: utilisateur Supabase introuvable dans la réponse.',
    providerPayloadMissingProviderId: 'Le payload provider est invalide: providerId manquant.',
    providerPayloadMissingIdToken: 'Le payload provider est invalide: idToken manquant.',
    providerPayloadMissingClaims: 'Le payload provider est invalide: claims manquants.',
    providerPayloadMissingUserId: 'Le payload provider est invalide: user.id manquant.',
    supabaseStateMissingProviderId: 'L etat Supabase authentifie est invalide: providerId manquant.',
    supabaseStateMissingUserId: 'L etat Supabase authentifie est invalide: userId manquant.',
    googleInvalidJwtFormat: 'Le jeton Google reçu est invalide.',
    googleCredentialMissing: 'La réponse Google ne contient pas de credential.',
    googleTokenMissingSub: 'Le profil Google ne contient pas d’identifiant utilisateur.',
    googleApiUnavailable: 'Le service de connexion Google est indisponible.',
  },
  sync: {
    conflict: 'Un conflit de synchronisation nécessite une résolution.',
    flushUnauthenticated: 'Impossible de synchroniser avant déconnexion: utilisateur non authentifié.',
    entryNotFound: 'Impossible de synchroniser la fiche "{entryId}": introuvable localement et dans le cloud.',
    batchFailed: 'Certaines synchronisations ont échoué ({count}).',
    unsupportedChoice: 'Choix de résolution de conflit non supporté: {choice}.',
  },
}
