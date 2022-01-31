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

export default function useManageCurrentTodo(
    groupedTodos: GroupedTodoCollection,
): string | null {
    const [currentTodoUuid, setCurrentTodoUuid] = useState<string | null>(
        () => {
            return (
                resolveFirstTodoInGroupedTodoCollection(groupedTodos)?.uuid ||
                null
            );
        },
    );

    const onKeyDown = useCallback(
        (event: WindowEventMap['keydown']) => {
            if (event.target && checkIsFormInputElement(event.target)) {
                return;
            }

            const isNext = checkIsKeyboardShortcut(event, 'ArrowDown');
            const isPrevious = checkIsKeyboardShortcut(event, 'ArrowUp');

            setCurrentTodoUuid((currentTodoUuid) => {
                if (isNext) {
                    return resolveNextTodoUuid(currentTodoUuid, groupedTodos);
                }

                if (isPrevious) {
                    return resolvePreviousTodoUuid(
                        currentTodoUuid,
                        groupedTodos,
                    );
                }

                return currentTodoUuid;
            });
        },
        [groupedTodos],
    );

    useEffect(() => {
        if (
            !currentTodoUuid ||
            !checkIfTodoIsInGroupedTodoCollection(currentTodoUuid, groupedTodos)
        ) {
            setCurrentTodoUuid(
                resolveFirstTodoInGroupedTodoCollection(groupedTodos)?.uuid ||
                    null,
            );
        }
    }, [currentTodoUuid, groupedTodos]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return currentTodoUuid;
}
