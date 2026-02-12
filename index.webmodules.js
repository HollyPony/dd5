import { Ability } from './webComponents/Ability/Ability.js'
import { OriginSelect } from './webComponents/OriginSelect/OriginSelect.js'
import { SpeciesSelect } from './webComponents/SpeciesSelect/SpeciesSelect.js'
import { ClassSelect } from './webComponents/ClassSelect/ClassSelect.js'
import { SubClassSelect } from './webComponents/SubClassSelect/SubClassSelect.js'
import { ClassFeatures } from './webComponents/ClassFeatures/ClassFeatures.js'
import { ClassBase } from './webComponents/ClassFeatures/ClassBase/ClassBase.js'
import { ClassFeature } from './webComponents/ClassFeatures/ClassFeature/ClassFeature.js'
import { WeaponSelect } from './webComponents/WeaponSelect/WeaponSelect.js'
import { Trainings } from './webComponents/Trainings/Trainings.js'
import { Stats } from './webComponents/Stats/Stats.js'
import { WeaponsCantrip } from './webComponents/WeaponsCantrip/WeaponsCantrip.js'
import { SpeciesTraits } from './webComponents/SpeciesTraits/SpeciesTraits.js'
import { Feats } from './webComponents/Feats/Feats.js'
import { Specs } from './webComponents/Specs/Specs.js'

export default function registerWebComponents() {
  Ability.register()
  OriginSelect.register()
  SpeciesSelect.register()
  ClassSelect.register()
  SubClassSelect.register()
  ClassFeatures.register()
  ClassBase.register()
  ClassFeature.register()
  WeaponSelect.register()
  Trainings.register()
  Stats.register()
  Specs.register()
  WeaponsCantrip.register()
  SpeciesTraits.register()
  Feats.register()
}
