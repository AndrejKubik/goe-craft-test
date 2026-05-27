export class BlockUtility {
    static removeBlock(block) {
        block.setType("minecraft:air");
    }
    /**Use only when defining permutation states by index number. Example: [0, 1, 2, 3] */
    static setPermutationByIndex(block, permutationStateId, permutationIndex) {
        const allPermutationStates = block.permutation.getAllStates();
        const targetPermutationState = allPermutationStates[permutationStateId];
        if (targetPermutationState === undefined) {
            console.error(`Block does not have a defined permutation state inside JSON file: ${permutationStateId}`);
            return;
        }
        if (typeof targetPermutationState !== "number") {
            console.error(`Permutation state '${permutationStateId}' does not expect a number value`);
            return;
        }
        try {
            block.setPermutation(block.permutation.withState(permutationStateId, permutationIndex));
        }
        catch (error) {
            console.error(`Failed to set permutation '${permutationStateId}' to '${permutationIndex}' on block '${block.typeId}'.`);
        }
    }
}
//# sourceMappingURL=BlockUtility.js.map