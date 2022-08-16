import type { ComputePositionConfig, ComputePositionReturn, Padding } from "@floating-ui/dom";
import type { Readable } from "svelte/store";

export * from '@floating-ui/dom';

export { createFloatingActions } from './';
export { arrow } from './';

export type ComputeConfig = Omit<ComputePositionConfig, "platform"> & { 
  onComputed?: (computed: ComputePositionReturn) => void
};
export type UpdatePosition = (contentOptions?: ComputeConfig) => void;
export type ReferenceAction = (node: HTMLElement) => void;
export type ContentAction = (node: HTMLElement, contentOptions?: ComputeConfig) => void;
export type ArrowOptions = { padding?: Padding, element: Readable<HTMLElement> | HTMLElement };