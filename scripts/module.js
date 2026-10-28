
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
  // Structure flow steps
  if (game.settings.get(MODULE_ID, "enableStructure")) {
    flowSteps.set("rollStructureTable", altRollStructure);
    flowSteps.set("checkStructureMultipleOnes", structCheckMultipleOnes);
    flowSteps.set("structureInsertHullCheckButton", insertHullCheckButton);
    flowSteps.set(
      "structureInsertSecondaryRollButton",
      insertSecondaryRollButton
    );
  }

  // Stress flow steps
  if (game.settings.get(MODULE_ID, "enableStress")) {
    flowSteps.set("rollOverheatTable", altRollStress);
    flowSteps.set("checkOverheatMultipleOnes", stressCheckMultipleOnes);
    flowSteps.set("overheatInsertEngCheckButton", insertEngheckButton);
  }
});
