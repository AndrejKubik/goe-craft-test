import { Block } from "@minecraft/server";

export class BlockUtility {
  static removeBlock(block: Block) {
    block.setType("minecraft:air");
  }
}
