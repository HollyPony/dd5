import { ABILITIES } from '../common.js'
import { StorageError } from '../errors.js'
import { s } from '../helpers.js'
import initialData from '../stores/charSheet.authority.initial.js'
import properties from '../stores/charSheet.authority.properties.js'

const SYMBOL_PREFIX = '_sym_#'

const serializeSymbols = (() => {
  function serializeSymbol(symbol) {
    if (!symbol.description) throw StorageError(`Symbol without description cannot be serialized: ${symbol.toString()}`)
    return `${SYMBOL_PREFIX}${symbol.description}`
  }

  return function serializeSymbols(value) {
    const valueType = Object.prototype.toString.call(value)
    if (valueType === '[object Symbol]') return serializeSymbol(value)
    if (valueType === '[object Object]') {
      return Reflect.ownKeys(value).reduce((acc, key) => {
        const serializedKey = typeof key === 'symbol' ? serializeSymbol(key) : key
        if (typeof serializedKey !== 'string') throw StorageError(`Only string/symbol object keys are supported: ${key} -> ${serializedKey}`)
        acc[serializedKey] = value[key]
        return acc
      }, {})
    }

    return value
  }
})()

export function toJSONEntry(entry, space = undefined) {
  return JSON.stringify(entry, function replacer(key, value) {
    let result = value

    if (key === 'data') {
      const className = value[properties.className]
      const subClassName = value[properties.subClassName]

      result = {
        name: value[properties.name],
        origin: value[properties.originName],
        class: className
          ? (subClassName ? `${className}.${subClassName}` : className)
          : undefined,
        species: value[properties.speciesName],
        experience: value[properties.experience],
        alignment: value[properties.alignment],
        sizeCategory: value[properties.sizeCategory],
        size: value[properties.size],
        hitPointCurrent: value[properties.hitPointCurrent],
        hitPointTemp: value[properties.hitPointTemp],
        deathSaves: value[properties.deathSaves],
        abilities: {
          strength: value[properties.abilities][ABILITIES.strength],
          dexterity: value[properties.abilities][ABILITIES.dexterity],
          constitution: value[properties.abilities][ABILITIES.constitution],
          wisdom: value[properties.abilities][ABILITIES.wisdom],
          intelligence: value[properties.abilities][ABILITIES.intelligence],
          charisma: value[properties.abilities][ABILITIES.charisma],
        },
        choiceSelections: value[properties.choiceSelections],
        equipments: value[properties.equipments]
      }
    }

    return serializeSymbols(result)
  }, space)
}

const deserializeSymbols = (() => {
  function deserializeSymbol(value) {
    const symbolDescription = value.slice(SYMBOL_PREFIX.length)
    if (!symbolDescription) throw StorageError(`Serialized symbol description is required for: ${value}`)
    return Symbol.for(symbolDescription)
  }

  return function deserializeSymbols(value) {
    const valueType = Object.prototype.toString.call(value)
    if (valueType === '[object String]' && value.startsWith(SYMBOL_PREFIX)) return deserializeSymbol(value)
    if (valueType === '[object Object]') {
      return Object.entries(value).reduce((acc, [key, entryValue]) => {
        acc[key.startsWith(SYMBOL_PREFIX) ? deserializeSymbol(key) : key] = entryValue
        return acc
      }, {})
    }

    return value
  }
})()

export function fromJSONEntry(jsonEntry) {
  return JSON.parse(jsonEntry, function reviver(key, value) {
    const result = deserializeSymbols(value)

    if (key === 'data') {
      const [className = '', subClassName = ''] = (result?.class ?? '').split('.')

      return {
        [properties.name]: result?.name ?? initialData[properties.name] ?? '',
        [properties.originName]: result?.origin ?? initialData[properties.originName] ?? '',
        [properties.className]: className ?? initialData[properties.className],
        [properties.subClassName]: subClassName ?? initialData[properties.subClassName] ?? null,
        [properties.speciesName]: result?.species ?? initialData[properties.speciesName] ?? '',
        [properties.experience]: result?.experience ?? initialData[properties.experience] ?? 0,
        [properties.alignment]: result?.alignment ?? initialData[properties.alignment] ?? '',
        [properties.sizeCategory]: result?.sizeCategory ?? initialData[properties.sizeCategory] ?? '',
        [properties.size]: result?.size ?? initialData[properties.size] ?? '',
        [properties.hitPointCurrent]: result?.hitPointCurrent ?? initialData[properties.hitPointCurrent] ?? 0,
        [properties.hitPointTemp]: result?.hitPointTemp ?? initialData[properties.hitPointTemp] ?? 0,
        [properties.deathSaves]: result?.deathSaves ?? initialData[properties.deathSaves] ?? { success: 0, failure: 0 },
        [properties.abilities]: s({
          [ABILITIES.strength]: result?.abilities.strength ?? initialData[properties.abilities][ABILITIES.strength] ?? 10,
          [ABILITIES.dexterity]: result?.abilities.dexterity ?? initialData[properties.abilities][ABILITIES.dexterity] ?? 10,
          [ABILITIES.constitution]: result?.abilities.constitution ?? initialData[properties.abilities][ABILITIES.constitution] ?? 10,
          [ABILITIES.wisdom]: result?.abilities.wisdom ?? initialData[properties.abilities][ABILITIES.wisdom] ?? 10,
          [ABILITIES.intelligence]: result?.abilities.intelligence ?? initialData[properties.abilities][ABILITIES.intelligence] ?? 10,
          [ABILITIES.charisma]: result?.abilities.charisma ?? initialData[properties.abilities][ABILITIES.charisma] ?? 10,
        }),
        [properties.choiceSelections]: result?.choiceSelections ?? {},
        [properties.equipments]: result?.equipments ?? initialData[properties.equipments] ?? [],
      }
    }

    return result
  })
}

