import { Enum } from '../helpers.js'

// TODO: use NumberFormat https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency_2

const GOLD_SYMBOL = Symbol('GOLD')
export function GOLD(amount) { return { amount, [GOLD_SYMBOL]: true } }
const SILVER_SYMBOL = Symbol('SILVER')
export function SILVER(amount) { return { amount, [SILVER_SYMBOL]: true } }
const COPPER_SYMBOL = Symbol('COPPER')
export function COPPER(amount) { return { amount, [COPPER_SYMBOL]: true } }

export function Money(...params) {
  const gold = params.filter(x => x[GOLD_SYMBOL] === true).reduce((acc, x) => acc + x.amount, 0)
  const silver = params.filter(x => x[SILVER_SYMBOL] === true).reduce((acc, x) => acc + x.amount, 0)
  const copper = params.filter(x => x[COPPER_SYMBOL] === true).reduce(
    (acc, x) => acc + x.amount,
    params.filter(x => Number.isInteger(x)).reduce(
      (acc, x) => acc + x
      , 0
    )
  )

  const asCopper = gold * MONEY_CHANGE.gold + silver * MONEY_CHANGE.silver + copper

  return {
    asCopper,
    gold, silver, copper,
  }
}
Money.copperToMoney = function (copperToMoney) {
  // const SILVER_PER_COPPER = copperChange.silver
  // const GOLD_PER_COPPER = copperChange.gold
  // // const COPPER_PER_GOLD = 10 * 10 // 100

  // const gold = Math.floor(copperToMoney * GOLD_PER_COPPER)
  // const silver = Math.floor((copperToMoney - gold / GOLD_PER_COPPER) / SILVER_PER_COPPER)
  // const copper = copperToMoney - gold / GOLD_PER_COPPER - silver / SILVER_PER_COPPER

  const gold = Math.floor(copperToMoney / MONEY_CHANGE.gold)
  const silver = Math.floor((copperToMoney % MONEY_CHANGE.gold) / MONEY_CHANGE.silver)
  const copper = copperToMoney % MONEY_CHANGE.silver

  return { gold, silver, copper, }
}

const MONEY_CHANGE = Enum({
  gold: 100,
  silver: 10,
  copper: 1,
  // gold: { silver: 10, copper: 100 }, // 1 gold = 10 silver = 100 copper
  // silver: { gold: 0.1, copper: 10 }, // 1 silver = 0.1 gold = 10 copper
  // copper: { fromGold: 100, fromSilver: 10, gold: 0.01, silver: 0.1 } // 1 copper = 0.01 gold = 0.1 silver
})
