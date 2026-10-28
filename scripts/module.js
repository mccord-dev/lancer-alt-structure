
import {
  altRollStress,
  insertEngheckButton,
  stressCheckMultipleOnes,
} from "./stress.js";

import {
  altRollStructure,
  structCheckMultipleOnes,
  insertHullCheckButton,
  insertSecondaryRollButton,
} from "./structure.js";

const MODULE_ID = "lancer-alt-structure";

// Register configurable settings.
Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "enableStructure", {
    name: "Alternative Structure Rules",
    hint: "Use the alternative structure table and related flow steps.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, "enableStress", {
    name: "Alternative Stress Rules",
    hint: "Use the alternative stress table and related flow steps.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });
});


Hooks.once("lancer.registerFlows", (flowSteps, flows) => {
  
const orig = {
    rollStructureTable: flowSteps.get("rollStructureTable"),
    checkStructureMultipleOnes: flowSteps.get("checkStructureMultipleOnes"),
    structureInsertHullCheckButton: flowSteps.get("structureInsertHullCheckButton"),
    structureInsertSecondaryRollButton: flowSteps.get("structureInsertSecondaryRollButton"),
    rollOverheatTable: flowSteps.get("rollOverheatTable"),
    checkOverheatMultipleOnes: flowSteps.get("checkOverheatMultipleOnes"),
    overheatInsertEngCheckButton: flowSteps.get("overheatInsertEngCheckButton"),
  };
  
  // Wraps a PC-only function: NPCs are routed to the original step instead.
  const pcOnly = (customFn, origFn) => (state) => {
    if (state.actor.is_npc()) return origFn ? origFn(state) : true;
    return customFn(state);
  };  
  // Structure flow steps
  if (game.settings.get(MODULE_ID, "enableStructure")) {
    flowSteps.set("rollStructureTable", pcOnly(altRollStructure, orig.rollStructureTable));
    flowSteps.set("checkStructureMultipleOnes", pcOnly(structCheckMultipleOnes, orig.checkStructureMultipleOnes));
    flowSteps.set("structureInsertHullCheckButton", pcOnly(insertHullCheckButton, orig.structureInsertHullCheckButton));
    flowSteps.set("structureInsertSecondaryRollButton", pcOnly(insertSecondaryRollButton, orig.structureInsertSecondaryRollButton));
  }

  // Stress flow steps
  if (game.settings.get(MODULE_ID, "enableStress")) {
    flowSteps.set("rollOverheatTable", pcOnly(altRollStress, orig.rollOverheatTable));
    flowSteps.set("checkOverheatMultipleOnes", pcOnly(stressCheckMultipleOnes, orig.checkOverheatMultipleOnes));
    flowSteps.set("overheatInsertEngCheckButton", pcOnly(insertEngheckButton, orig.overheatInsertEngCheckButton));
  }
});
