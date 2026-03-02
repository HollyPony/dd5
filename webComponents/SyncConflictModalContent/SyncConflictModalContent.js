import { createElement, domOn, replaceElement } from '../../modules/domlib.js'
import { t } from '../../modules/i18n.js'
import { SYNC_CHOICES } from '../../modules/services/charSheetSync.service.js'
import { AbstractComponent } from '../AbstractComponent/AbstractComponent.js'

export class SyncConflictModalContent extends AbstractComponent {
  static get tagName() { return 'sync-conflict-modal-content' }
  static _modulePath = new URL('.', import.meta.url).pathname

  #listElement
  #props

  /**
   * @param {{
   *   syncConflicts: Array<{
   *     entryId: string,
   *     localEntry: { updatedAt: number },
   *     remoteEntry: { updatedAt: number },
   *   }>,
   *   resolveConflict: ({ entryId: string, choice: 'local' | 'remote' | 'both' }) => Promise<void>
   * }} props
   */
  setModalProps(props) {
    this.#props = {
      ...props,
      syncConflicts: [...props.syncConflicts],
    }
    if (this.#listElement) this.#render()
  }

  _connectedCallback() {
    this.#listElement = this.querySelector('.sync-conflicts-list')
    this.#render()
  }

  _registerEvents() {
    this._pushEvents(
      domOn(this.#listElement, 'click', this.#listClicked),
    )
  }

  _i18nChanged = () => {
    this.#render()
  }

  #listClicked = async ({ target }) => {
    const actionElement = target.closest('[data-choice][data-entry-id]')
    if (!actionElement) return
    const entryElement = target.closest('[data-entry]')
    const actionElements = entryElement.querySelectorAll('[data-choice][data-entry-id]')

    for (const action of actionElements) {
      action.disabled = true
    }
    actionElement.querySelector('[data-spinner]').classList.add('spinner-border', 'spinner-border-sm', 'me-1')

    const entryId = actionElement.dataset.entryId
    const choice = actionElement.dataset.choice

    try {
      await this.#props.resolveConflict({ entryId, choice })
    } catch (error) {
      for (const action of actionElements) {
        action.disabled = false
      }
    } finally {
      actionElement.querySelector('[data-spinner]').classList.remove('spinner-border', 'spinner-border-sm', 'me-1')
    }
  }

  #render() {
    replaceElement(this.#listElement, this.#props.syncConflicts.map(conflict => {
      const localDate = new Date(conflict.localEntry.updatedAt).toISOString()
      const remoteDate = new Date(conflict.remoteEntry.updatedAt).toISOString()

      return createElement('div', [
        createElement('div', [
          createElement('div', t._('modals.syncConflicts.entryTitle', { entryId: conflict.entryId }), {
            class: 'fw-semibold text-break',
          }),
          createElement('small', t._('modals.syncConflicts.localDate', { date: localDate, name: conflict.localEntry.data.name }), {
            class: 'text-body-secondary d-block',
          }),
          createElement('small', t._('modals.syncConflicts.remoteDate', { date: remoteDate, name: conflict.remoteEntry.data.name }), {
            class: 'text-body-secondary d-block',
          }),
        ], { class: 'd-flex flex-column gap-1' }),
        createElement('div', Object.keys(SYNC_CHOICES).map(choice => createElement(
          'button',
          [
            createElement('span', undefined, { 'data-spinner': true }),
            createElement('span', t._(`modals.syncConflicts.choices.${choice}`)),
          ],
          {
            class: 'btn btn-sm btn-outline-primary',
            type: 'button',
            'data-entry-id': conflict.entryId,
            'data-choice': choice,
          }
        )), { class: 'd-flex flex-wrap gap-2 mt-2' }),
      ], {
        class: 'list-group-item d-flex flex-column',
        'data-entry': true,
      })
    }))
  }
}

