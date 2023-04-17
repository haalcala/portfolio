export function popOverOverlayPosition(
    targetBounds: DOMRect,
    innerHeight: number,
    spaceRequiredAbove: number,
    spaceRequiredBelow?: number,
    horizontalPosition?: 'left' | 'right',
): string {
    let placement: string;

    if (targetBounds.top > spaceRequiredAbove) {
        placement = 'top';
    } else if (innerHeight - targetBounds.bottom > (spaceRequiredBelow || spaceRequiredAbove)) {
        placement = 'bottom';
    } else {
        placement = horizontalPosition || 'left';
    }
    return placement;
}
