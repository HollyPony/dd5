import { t } from '../../modules/i18n.js'
import charSheetService from '../../modules/services/charSheet.service.js'
import charSheetStore from '../../modules/stores/charSheet.derived.store.js'
import charSheetProps from '../../modules/stores/charSheet.derived.properties.js'
import { createElement, domOn, replaceElement } from '../../modules/domlib.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'
import settingsService from '../../modules/services/settings.service.js'
import authService from '../../modules/auth/auth.service.js'
import { throwAsync } from '../../modules/errors.js'

export class AppNavbar extends AbstractComponent {
  static get tagName() { return 'app-navbar' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #exportCharLinkElement
  #importCharLinkElement
  #importCharFileElement
  #createCharacterLinkElement
  #savedCharactersListTitleElement
  #savedCharactersListElement
  #currentCharacterNameElement
  #debugItemElement
  #debugLinkElement
  #debugModalElement
  #debugModalTitleElement
  #debugOutputElement

  #authLoginButtonElement
  #authProvidersListElement

  _connectedCallback() {
    this.#exportCharLinkElement = this.querySelector('.export-char-link')
    this.#importCharLinkElement = this.querySelector('.import-char-link')
    this.#importCharFileElement = this.querySelector('.import-char-file')
    this.#createCharacterLinkElement = this.querySelector('.create-character-link')
    this.#savedCharactersListTitleElement = this.querySelector('.saved-characters-list-title')
    this.#savedCharactersListElement = this.querySelector('.saved-characters-list')
    this.#currentCharacterNameElement = this.querySelector('.current-character-name')
    this.#debugItemElement = this.querySelector('.debug-item')
    this.#debugLinkElement = this.querySelector('.debug-link')
    this.#debugModalElement = this.querySelector('.debug-modal')
    this.#debugModalTitleElement = this.querySelector('.debug-modal-title')
    this.#debugOutputElement = this.querySelector('.debug-output')

    this.#authLoginButtonElement = this.querySelector('.auth-login-button')
    this.#authProvidersListElement = this.querySelector('.auth-providers-list')

    this.#initDebugModalAttributes()

    this.#renderSavedCharSheets()
    this.#renderCurrentCharacterName()
    this.#renderDebugItem()
    this.#renderAuth()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#exportCharLinkElement, 'click', this.#exportJSONClicked),
      domOn(this.#importCharLinkElement, 'click', this.#importCharClicked),
      domOn(this.#importCharFileElement, 'change', this.#importCharFileChanged),
      domOn(this.#savedCharactersListElement, 'click', this.#savedCharacterClicked),
      domOn(this.#createCharacterLinkElement, 'click', this.#createCharacterClicked),
      domOn(this.#authProvidersListElement, 'click', this.#authProviderClicked),
      domOn(this.#debugModalElement, 'show.bs.modal', this.#renderJSONOutput),

      charSheetStore.on(charSheetProps.name, this.#renderCurrentCharacterName),
      charSheetService.onCharListChanged(this.#renderSavedCharSheets),
      settingsService.onChange(this.#renderDebugItem),
      authService.on(this.#renderAuth),
    )
  }

  _i18nChanged() {
    this.#renderSavedCharSheets()
    this.#renderCurrentCharacterName()
    this.#renderAuth()
  }

  #renderSavedCharSheets = () => {
    const saves = charSheetService.getList(false)

    replaceElement(this.#savedCharactersListTitleElement, t._(saves.length ? 'navbar.savedCharacters' : 'navbar.noCharacters'))
    replaceElement(this.#savedCharactersListElement, saves.map(save => createElement(
      'li',
      createElement('a', save.name, {
        href: '',
        class: 'dropdown-item',
        'data-save-id': save.id,
      }),
    )))
  }

  #renderCurrentCharacterName = () => {
    replaceElement(this.#currentCharacterNameElement, charSheetStore.getName() || t._('navbar.unnamedCharacter'))
  }

  #renderDebugItem = () => {
    this.#debugItemElement.classList[
      settingsService.isDebug ? 'remove' : 'add'
    ]('d-none')
  }

  #initDebugModalAttributes() {
    const debugModalId = `debugModal-${this._id}`
    const debugModalLabelId = `debugModalLabel-${this._id}`

    this.#debugModalElement.id = debugModalId
    this.#debugModalElement.setAttribute('aria-labelledby', debugModalLabelId)
    this.#debugModalTitleElement.id = debugModalLabelId
    this.#debugLinkElement.setAttribute('data-bs-target', `#${debugModalId}`)
  }

  #renderJSONOutput = () => {
    const defaultOpenLevels = 2
    const renderJsonTree = (value, keyLabel, level = 0) => {
      const type = Array.isArray(value) ? 'array' : (value === null ? 'null' : typeof value)

      if (type === 'object' || type === 'array') {
        const container = level === 0
          ? createElement()
          : createElement('div', null, { style: 'padding-left: 1rem;' })

        const entries = type === 'array' ? value.entries() : Object.entries(value)
        for (const [k, v] of entries) {
          container.appendChild(renderJsonTree(v, String(k), level + 1))
        }

        return level === 0
          ? createElement(null, container)
          : createElement('details', [
            createElement('summary', keyLabel ? `${keyLabel} (${type})` : type),
            container,
          ], { open: defaultOpenLevels > level })
      }

      const leaf = document.createElement('div')
      leaf.textContent = keyLabel ? `${keyLabel}: ${JSON.stringify(value)}` : JSON.stringify(value)
      return leaf
    }

    this.#debugOutputElement.replaceChildren(renderJsonTree(JSON.parse(charSheetService.getJSONEntry())))
  }

  #createCharacterClicked = (event) => {
    event.preventDefault()
    charSheetService.create()
  }

  #renderAuth = () => {
    const isAuthenticated = authService.isAuthenticated
    const loginLabel = isAuthenticated
      ? (authService.user?.displayName || authService.user?.email || t._('navbar.auth.account'))
      : t._('navbar.auth.login')

    replaceElement(this.#authLoginButtonElement, loginLabel)

    const providers = authService.getProviders()
    const authActions = isAuthenticated
      ? [
        createElement('li', createElement('button', t._('navbar.auth.logout'), {
          class: 'dropdown-item',
          type: 'button',
          'data-auth-action': 'logout',
        })),
        createElement('li', createElement('hr', null, { class: 'dropdown-divider' })),
      ]
      : []

    const providerActions = providers.map(provider => {
      return createElement('li', createElement(
        'button',
        t._(`navbar.auth.providers.${provider.providerId}`),
        {
          class: 'dropdown-item',
          type: 'button',
          disabled: !provider.isConfigured(),
          'data-provider-id': provider.providerId,
        }
      ))
    })

    replaceElement(this.#authProvidersListElement, [...authActions, ...providerActions])
  }

  #authProviderClicked = (event) => {
    event.preventDefault()

    const actionElement = event.target?.closest?.('[data-auth-action], [data-provider-id]')
    if (!actionElement) return

    if (actionElement.dataset.authAction === 'logout') {
      authService.signOut().catch(throwAsync)
      return
    }

    const providerId = actionElement.dataset.providerId
    authService.signIn(providerId).catch(throwAsync)
  }

  #savedCharacterClicked = (event) => {
    event.preventDefault()
    const saveLinkElement = event.target?.closest?.('a[data-save-id]')
    const saveId = saveLinkElement?.dataset?.saveId
    if (!saveId) return

    charSheetService.load(saveId)
  }

  #importCharClicked = (event) => {
    event.preventDefault()
    this.#importCharFileElement.click()
  }

  #importCharFileChanged = async ({ target: { files } }) => {
    if (!files?.length) return

    try {
      const jsonText = await files[0].text()
      charSheetService.importJSON(jsonText)
    } finally {
      this.#importCharFileElement.value = ''
    }
  }

  #exportJSONClicked = (event) => {
    event.preventDefault()

    let url
    try {
      const json = charSheetService.getJSONEntry(2)
      const blob = new Blob([json], { type: 'application/json' })
      url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.download = charSheetStore.getName().replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'TheCharacterWithNoName'
      link.href = url
      link.click()
    } finally {
      if (url) {
        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 0)
      }
    }
  }
}
