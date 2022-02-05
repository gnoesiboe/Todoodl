import { useCallback, useEffect, useState } from 'react';
import { checkIsFormInputElement } from '../../../../utility/formUtilities';
import { GroupedTodoCollection } from '../../../../model/todo';
import {
    checkIfTodoIsInGroupedTodoCollection,
    resolveFirstTodoInGroupedTodoCollection,
    resolveNextTodoUuid,
    resolvePreviousTodoUuid,
} from '../../../../resolver/todoResolver';
import { checkIsKeyboardShortcut } from '../../../../utility/keyboardUtilities';

type SetCurrentTodoUuidHandler = (uuid: string) => void;

type Output = {
    currentTodoUuid: string | null;
    setCurrentTodoUuid: SetCurrentTodoUuidHandler;
};

export default function useManageCurrentTodo(groupedTodos: GroupedTodoCollection): Output {
    const [currentTodoUuid, setCurrentTodoUuidState] = useState<string | null>(() => {
        return resolveFirstTodoInGroupedTodoCollection(groupedTodos)?.uuid || null;
    });

    const onKeyDown = useCallback(
        (event: WindowEventMap['keydown']) => {
            if (event.target && checkIsFormInputElement(event.target)) {
                return;
            }

            const isNext = checkIsKeyboardShortcut(event, 'ArrowDown');
            const isPrevious = checkIsKeyboardShortcut(event, 'ArrowUp');

            setCurrentTodoUuidState((currentTodoUuid) => {
                if (isNext) {
                    return resolveNextTodoUuid(currentTodoUuid, groupedTodos);
                }

                if (isPrevious) {
                    return resolvePreviousTodoUuid(currentTodoUuid, groupedTodos);
                }

                return currentTodoUuid;
            });
        },
        [groupedTodos],
    );

    useEffect(() => {
        if (!currentTodoUuid || !checkIfTodoIsInGroupedTodoCollection(currentTodoUuid, groupedTodos)) {
            setCurrentTodoUuidState(resolveFirstTodoInGroupedTodoCollection(groupedTodos)?.uuid || null);
        }
    }, [currentTodoUuid, groupedTodos]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    const setCurrentTodoUuid: SetCurrentTodoUuidHandler = (currentTodoUuid) => {
        setCurrentTodoUuidState(currentTodoUuid);
    };

    return { currentTodoUuid, setCurrentTodoUuid };
}
