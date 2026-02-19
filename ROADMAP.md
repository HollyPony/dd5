# DD5 Roadmap (D&D 5e 2024)

## Features already implemented

- Web app architecture based on Web Components with FR i18n (`index.js`, `index.webmodules.js`, `modules/i18n.js`).
- Main shell blocks migrated to Web Components (`webComponents/AppNavbar/*`, `webComponents/CommonInformations/*`, `webComponents/LevelArmor/*`, `webComponents/Vitals/*`).
- Local character persistence with autosave, create, load, import/export JSON (`modules/services/charSheet.service.js`, `modules/storages/charSheet.storage.js`).
- Core character selectors: origin, class, subclass, species (`webComponents/OriginSelect/OriginSelect.js`, `webComponents/ClassSelect/ClassSelect.js`, `webComponents/SubClassSelect/SubClassSelect.js`, `webComponents/SpeciesSelect/SpeciesSelect.js`).
- Structured 2024 data packs: 12 classes, 16 origins, 10 species (+ lineages), 75 feats, large spells/equipment datasets (`modules/data/*.js`).
- Derived calculations already wired: level from XP, proficiency bonus, ability modifiers, saves, skills, initiative, speed, passive perception, max HP, max hit dice, armor class (`modules/stores/charSheet.derived.store.js`, `modules/data/leveling.js`).
- Ability UI block functional (score editing + modifier/save/skills rendering) (`webComponents/Ability/Ability.js`, `webComponents/Stats/Stats.js`).
- Class Features block rendered with class base description and class skills/tools choices (partially interactive) (`webComponents/ClassFeatures/*`).
- Species Traits block rendered with traits/spells/resistances (`webComponents/SpeciesTraits/SpeciesTraits.js`).
- Core sheet vitals/specs write flows wired: alignment, size category/size, current HP, temp HP, death saves (+ autosave + import/export persistence) (`webComponents/CharacterProfile/CharacterProfile.html`, `webComponents/Specs/Specs.js`, `webComponents/Vitals/Vitals.js`, `modules/stores/charSheet.authority.store.js`, `modules/storages/charSheet.storage.js`).
- Placeholder blocks inserted for upcoming features: character profile, spellbook, backpack inventory, currency (`webComponents/CharacterProfile/*`, `webComponents/Spellbook/*`, `webComponents/Backpack/*`, `webComponents/Currency/*`).

## Partially implemented / missing

- `WeaponsCantrip` and `Feats` are still placeholders (`webComponents/WeaponsCantrip/WeaponsCantrip.js`, `webComponents/Feats/Feats.js`).
- `CharacterProfile`, `Spellbook`, `Backpack`, and `Currency` are UI placeholders only (not wired to store/storage yet).
- `WeaponSelect` lists weapons but does not add them to the character (`webComponents/WeaponSelect/WeaponSelect.js`).
- Many class/feat/species effects exist in data but are not applied in the rules engine yet (multiple TODOs in `modules/data/feats.js`, `modules/data/classes.js`, `modules/data/species.js`).
- Equipment edition flow is incomplete (add/remove/equip/attune from UI not fully operational).
- Character economy and ownership are missing from state flow (currency values and backpack items are not persisted).
- Player narrative profile is missing from state flow (description, history, appearance are not persisted).
- Player spell workflow is missing from state flow (known/prepared/list/details/slots usage are not persisted in sheet UX).

## Roadmap priorities

### P0 - Close a playable sheet MVP

- [x] Wire all core sheet inputs (alignment, size, current/temp HP, death saves).
- Finish inventory/equipment flows: add, remove, equip, shield/armor handling, basic attunement.
- Make `WeaponsCantrip` fully functional.
- Definition of done: a full level 1-20 character can be managed without manual JSON editing.

### P1 - Character profile and economy foundations (new RAF)

- Make `CharacterProfile` functional: description, history, appearance (UI write flow + autosave + import/export).
- Make `Currency` functional: cp/sp/ep/gp/pp values with validation and persistence.
- Make `Backpack` functional: owned inventory list with quantity and notes, clearly separated from equipped items.
- Definition of done: profile and economy data can be created/edited/saved/loaded/exported/imported without JSON edits.

### P2 - Complete the 2024 character creation engine

- Make `Feats` functional (origin feat, level feats, selection and validation).
- Implement core effects impacting sheet math (AC, saves, speed, proficiencies, expertise).
- Handle choice conflicts and replacements cleanly (origin vs class, class/species/subclass changes).
- Definition of done: choice changes consistently trigger correct recalculations everywhere.

### P3 - Casters and resources

- Make `Spellbook` functional for player workflow (known/prepared lists, spell details view, per-level grouping).
- Add spellcasting engine: known/prepared cantrips/spells, spell slots, spell save DC/attack bonus.
- Track limited-use resources and reset cycles (short/long rest) for traits/feats/spells.
- Definition of done: full caster workflow is usable (e.g. Cleric/Wizard/Warlock).

### P4 - 2024 rules fidelity and data quality

- Address rules TODOs for species/classes/feats effects.
- Fill missing or inconsistent translations/descriptions.
- Definition of done: high coverage of common 2024 gameplay scenarios across all 12 classes.

### P5 - Mobile-first UX and product robustness

- Improve mobile ergonomics on dense blocks (class features, inventory, spells).
- Strengthen import/export versioning and migration handling.
- Improve debug/error UX for end users.
- Definition of done: smooth mobile editing and robust cross-version character portability.
