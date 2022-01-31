import { KeyboardEvent } from 'react';

type AdditionalKeySettings = {
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
};

const defaultAdditionalKeysSettings: AdditionalKeySettings = {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
};

export function checkIsKeyboardShortcut(
    event: WindowEventMap['keydown'] | KeyboardEvent,
    expectedKey: string,
    additionalRequirements: Partial<AdditionalKeySettings> = {},
) {
    if (event.key !== expectedKey) {
        return false;
    }

    const additionalKeySettings: AdditionalKeySettings = {
        ...defaultAdditionalKeysSettings,
        ...additionalRequirements,
    };

    if (additionalKeySettings.ctrlKey !== event.ctrlKey) {
        return false;
    }

    if (additionalKeySettings.altKey !== event.altKey) {
        return false;
    }

    if (additionalKeySettings.metaKey !== event.metaKey) {
        return false;
    }

    if (additionalKeySettings.shiftKey !== event.shiftKey) {
        return false;
    }

    return true;
}
