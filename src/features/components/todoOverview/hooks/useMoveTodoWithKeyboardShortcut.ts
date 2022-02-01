import { useEffect } from 'react';
import { checkIsKeyboardShortcut } from '../../../../utility/keyboardUtilities';
import { checkIsFormInputElement } from '../../../../utility/formUtilities';
import { TodoCollection } from '../../../../model/todo';
import { resolveNextIndexToMoveTodoTo, resolvePreviousIndexToMoveTodoTo } from '../utility/todoResolver';
import { useManageTodos } from '../../../../context/todo/TodoContext';

export default function useMoveTodoWithKeyboardShortcut(
    currentTodoUUid: string | null,
    flatTodoCollection: TodoCollection,
) {
    const { move } = useManageTodos();

    useEffect(() => {
        if (!currentTodoUUid) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.target && checkIsFormInputElement(event.target)) {
                return;
            }

            if (checkIsKeyboardShortcut(event, 'ArrowDown', { shiftKey: true })) {
                const [currentIndex, nextIndex] = resolveNextIndexToMoveTodoTo(currentTodoUUid, flatTodoCollection);

                move(currentIndex, nextIndex);
            }

            if (checkIsKeyboardShortcut(event, 'ArrowUp', { shiftKey: true })) {
                const [currentIndex, nextIndex] = resolvePreviousIndexToMoveTodoTo(currentTodoUUid, flatTodoCollection);

                move(currentIndex, nextIndex);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentTodoUUid, flatTodoCollection, move]);
}
