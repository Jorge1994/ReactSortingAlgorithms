import { bubbleSortImplementations } from "./bubbleSortImplementations";
import { selectionSortImplementations } from "./selectionSortImplementations";
import { insertionSortImplementations } from "./insertionSortImplementations";
import { mergeSortImplementations } from "./mergeSortImplementations";
import { countingSortImplementations } from "./countingSortImplementations";
import { quickSortImplementations } from "./quickSortImplementations";
import { gnomeSortImplementations } from "./gnomeSortImplementations";
import { heapSortImplementations } from "./heapSortImplementations";
import { cocktailSortImplementations } from "./cocktailSortImplementations";
import { bogoSortImplementations } from "./bogoSortImplementations";
import { stoogeSortImplementations } from "./stoogeSortImplementations";
import { oddEvenSortImplementations } from "./oddEvenSortImplementations";
import { pancakeSortImplementations } from "./pancakeSortImplementations";
import { shellSortImplementations } from "./shellSortImplementations";
import type { AlgorithmImplementations } from "../types/implementations";
import type { AlgorithmKey } from "../algorithms/registry";

/**
 * Centralized registry for algorithm implementations in different languages
 */
export const implementationsRegistry: Record<AlgorithmKey, AlgorithmImplementations> = {
  "bubble-sort": bubbleSortImplementations,
  "selection-sort": selectionSortImplementations,
  "insertion-sort": insertionSortImplementations,
  "merge-sort": mergeSortImplementations,
  "counting-sort": countingSortImplementations,
  "quick-sort": quickSortImplementations,
  "gnome-sort": gnomeSortImplementations,
  "heap-sort": heapSortImplementations,
  "cocktail-sort": cocktailSortImplementations,
  "odd-even-sort": oddEvenSortImplementations,
  "bogo-sort": bogoSortImplementations,
  "stooge-sort": stoogeSortImplementations,
  "pancake-sort": pancakeSortImplementations,
  "shell-sort": shellSortImplementations,
} as const;

/**
 * Get algorithm implementations by algorithm key
 */
export const getImplementations = (
  algorithmKey: AlgorithmKey
): AlgorithmImplementations => {
  return implementationsRegistry[algorithmKey];
};
