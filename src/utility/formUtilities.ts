export function checkIsFormInputElement(
    element: HTMLElement | EventTarget,
): boolean {
    return (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
    );
}
