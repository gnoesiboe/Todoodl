import { Todo, TodoCollection } from '../../../../model/todo';

export function resolveIndexInFlatCollection(todo: Todo, todoCollection: TodoCollection): number {
    const index = todoCollection.findIndex((cursorTodo) => cursorTodo.uuid === todo.uuid);

    if (index === -1) {
        throw new Error(`Expecting todo with uuid ${todo.uuid} to be in the collection`);
    }

    return index;
}

export function resolveNextIndexToMoveTodoTo(
    currentTodoUuid: string,
    flatTodoCollection: TodoCollection,
): [from: number, to: number] {
    const currentIndex = flatTodoCollection.findIndex((cursorTodo) => cursorTodo.uuid === currentTodoUuid);

    if (currentIndex === -1) {
        throw new Error(`Expecting to find todo with uuid '${currentTodoUuid}'`);
    }

    if (currentIndex === flatTodoCollection.length - 1) {
        return [currentIndex, 0];
    }

    const todoToMove = flatTodoCollection[currentIndex];

    for (let i = currentIndex + 1, l = flatTodoCollection.length; i < l; i++) {
        const cursorTodo = flatTodoCollection[i];

        if (cursorTodo.priority === todoToMove.priority) {
            return [currentIndex, i];
        }
    }

    return [currentIndex, 0];
}

export function resolvePreviousIndexToMoveTodoTo(
    currentTodoUuid: string,
    flatTodoCollection: TodoCollection,
): [from: number, to: number] {
    const currentIndex = flatTodoCollection.findIndex((cursorTodo) => cursorTodo.uuid === currentTodoUuid);

    if (currentIndex === -1) {
        throw new Error(`Expecting to find todo with uuid '${currentTodoUuid}'`);
    }

    const lastIndex = flatTodoCollection.length - 1;

    if (currentIndex === 0) {
        return [currentIndex, lastIndex];
    }

    const todoToMove = flatTodoCollection[currentIndex];

    for (let i = currentIndex - 1; i >= 0; i--) {
        const cursorTodo = flatTodoCollection[i];

        if (cursorTodo.priority === todoToMove.priority) {
            return [currentIndex, i];
        }
    }

    return [currentIndex, lastIndex];
}
