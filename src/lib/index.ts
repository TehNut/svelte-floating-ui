import type { ComputePositionConfig } from '@floating-ui/core';
import { computePosition } from "@floating-ui/dom";

type ComputeConfig = Omit<ComputePositionConfig, "platform">;
type UpdatePosition = (contentOptions?: ComputeConfig) => void;
type ReferenceAction = (node: HTMLElement) => void;
type ContentAction = (node: HTMLElement, contentOptions?: ComputeConfig) => void;

export function createFloatingActions(initOptions?: ComputeConfig): [ ReferenceAction, ContentAction, UpdatePosition ] {
  let referenceElement: HTMLElement;
  let contentElement: HTMLElement;
  let options: ComputeConfig | undefined = initOptions;

  const updatePosition = (updateOptions?: ComputeConfig) => {
    if (referenceElement && contentElement) {
      options = { ...initOptions, ...updateOptions };
      computePosition(referenceElement, contentElement, options)
        .then(v => {
          Object.assign(contentElement.style, {
            position: v.strategy,
            left: `${v.x}px`,
            top: `${v.y}px`,
          });
        });
    }
  }

  const referenceAction: ReferenceAction = node => {
    referenceElement = node;
    updatePosition();
  }

  const contentAction: ContentAction = (node, contentOptions?) => {
    contentElement = node;
    options = { ...initOptions, ...contentOptions };
    updatePosition();
    return {
      update: updatePosition
    }
  }

  return [
    referenceAction, // Action to set the reference element
    contentAction, // Action to set the content element and apply config overrides
    updatePosition // Method to update the content position
  ]
}