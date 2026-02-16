# DD5 Roadmap (D&D 5e 2024)

## Features already implemented

- Web app architecture based on Web Components with FR i18n (`index.js`, `index.webmodules.js`, `modules/i18n.js`).
- Local character persistence with autosave, create, load, import/export JSON (`modules/services/charSheet.service.js`, `modules/storages/charSheet.storage.js`).
- Core character selectors: origin, class, subclass, species (`webComponents/OriginSelect/OriginSelect.js`, `webComponents/ClassSelect/ClassSelect.js`, `webComponents/SubClassSelect/SubClassSelect.js`, `webComponents/SpeciesSelect/SpeciesSelect.js`).
- Structured 2024 data packs: 12 classes, 16 origins, 10 species (+ lineages), 75 feats, large spells/equipment datasets (`modules/data/*.js`).
- Derived calculations already wired: level from XP, proficiency bonus, ability modifiers, saves, skills, initiative, speed, passive perception, max HP, max hit dice, armor class (`modules/stores/charSheet.derived.store.js`, `modules/data/leveling.js`).
- Ability UI block functional (score editing + modifier/save/skills rendering) (`webComponents/Ability/Ability.js`, `webComponents/Stats/Stats.js`).
- Class Features block rendered with class base description and class skills/tools choices (partially interactive) (`webComponents/ClassFeatures/*`).
- Species Traits block rendered with traits/spells/resistances (`webComponents/SpeciesTraits/SpeciesTraits.js`).

## Partially implemented / missing

- `WeaponsCantrip` and `Feats` are still placeholders (`webComponents/WeaponsCantrip/WeaponsCantrip.js`, `webComponents/Feats/Feats.js`).
- `WeaponSelect` lists weapons but does not add them to the character (`webComponents/WeaponSelect/WeaponSelect.js`).
- Many class/feat/species effects exist in data but are not applied in the rules engine yet (multiple TODOs in `modules/data/feats.js`, `modules/data/classes.js`, `modules/data/species.js`).
- Several sheet fields are present in UI but not fully bound for write/update flows (alignment, size/category, current/temp HP, death saves, etc.) (`index.html`, `index.js`).
- Equipment edition flow is incomplete (add/remove/equip/attune from UI not fully operational).

## Roadmap priorities

### P0 - Close a playable sheet MVP

- Wire all core sheet inputs (alignment, size, current/temp HP, death saves).
- Finish inventory/equipment flows: add, remove, equip, shield/armor handling, basic attunement.
- Make `WeaponsCantrip` fully functional.
- Definition of done: a full level 1-20 character can be managed without manual JSON editing.

### P1 - Complete the 2024 character creation engine

- Make `Feats` functional (origin feat, level feats, selection and validation).
- Implement core effects impacting sheet math (AC, saves, speed, proficiencies, expertise).
- Handle choice conflicts and replacements cleanly (origin vs class, class/species/subclass changes).
- Definition of done: choice changes consistently trigger correct recalculations everywhere.

### P2 - Casters and resources

- Add spellcasting engine: known/prepared cantrips/spells, spell slots, spell save DC/attack bonus.
- Track limited-use resources and reset cycles (short/long rest) for traits/feats/spells.
- Definition of done: full caster workflow is usable (e.g. Cleric/Wizard/Warlock).

### P3 - 2024 rules fidelity and data quality

- Address rules TODOs for species/classes/feats effects.
- Fill missing or inconsistent translations/descriptions.
- Definition of done: high coverage of common 2024 gameplay scenarios across all 12 classes.

### P4 - Mobile-first UX and product robustness

- Improve mobile ergonomics on dense blocks (class features, inventory, spells).
- Strengthen import/export versioning and migration handling.
- Improve debug/error UX for end users.
- Definition of done: smooth mobile editing and robust cross-version character portability.
