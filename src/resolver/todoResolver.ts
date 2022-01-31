import { GroupedTodoCollection, Todo, TodoPriority } from '../model/todo';

export function checkIfTodoIsInGroupedTodoCollection(
    uuid: string,
    groupedTodos: GroupedTodoCollection,
): boolean {
    const priorities = Object.keys(groupedTodos) as TodoPriority[];

    for (let i = 0, l = priorities.length; i < l; i++) {
        const priority = priorities[i];

        if (groupedTodos[priority].some((todo) => todo.uuid === uuid)) {
            return true;
        }
    }

    return false;
}

export function resolveFirstTodoInGroupedTodoCollection(
    groupedTodos: GroupedTodoCollection,
): Todo | null {
    const groups = Object.keys(groupedTodos);

    for (let i = 0, l = groups.length; i < l; i++) {
        const currentGroup = groups[i] as TodoPriority;
        const currentGroupTodos = groupedTodos[currentGroup];

        if (currentGroupTodos.length > 0) {
            return currentGroupTodos[0];
        }
    }

    return null;
}

export function resolveNextTodoUuid(
    currentTodoUuid: string | null,
    groupedTodos: GroupedTodoCollection,
): string | null {
    if (!currentTodoUuid) {
        return (
            resolveFirstTodoInGroupedTodoCollection(groupedTodos)?.uuid || null
        );
    }

    const priorities = Object.keys(groupedTodos) as TodoPriority[];

    let returnNext = false;

    for (
        let priorityIndex = 0, numberOfPriorities = priorities.length;
        priorityIndex < numberOfPriorities;
        priorityIndex++
    ) {
        const priority = priorities[priorityIndex];

        const todos = groupedTodos[priority];

        for (
            let todoIndex = 0, numberOfTodos = todos.length;
            todoIndex < numberOfTodos;
            todoIndex++
        ) {
            const todo = todos[todoIndex];

            if (returnNext) {
                return todo.uuid;
            }

            if (todo.uuid === currentTodoUuid) {
                returnNext = true;
            }
        }
    }

    return resolveFirstTodoInGroupedTodoCollection(groupedTodos)?.uuid || null;
}

function resolveLastTodoInGroupedTodoCollection(
    groupedTodos: GroupedTodoCollection,
): Todo | null {
    const groups = Object.keys(groupedTodos) as TodoPriority[];

    for (let i = groups.length - 1; i >= 0; i--) {
        const currentGroup = groups[i];
        const currentGroupTodos = groupedTodos[currentGroup];

        if (currentGroupTodos.length > 0) {
            return currentGroupTodos[currentGroupTodos.length - 1];
        }
    }

    return null;
}

export function resolvePreviousTodoUuid(
    currentTodoUuid: string | null,
    groupedTodos: GroupedTodoCollection,
): string | null {
    if (!currentTodoUuid) {
        return (
            resolveLastTodoInGroupedTodoCollection(groupedTodos)?.uuid || null
        );
    }

    const reversedPriorities = Object.keys(groupedTodos) as TodoPriority[];

    let returnNext = false;

    for (
        let priorityIndex = reversedPriorities.length - 1;
        priorityIndex >= 0;
        priorityIndex--
    ) {
        const priority = reversedPriorities[priorityIndex];

        const todos = groupedTodos[priority];

        for (let todoIndex = todos.length - 1; todoIndex >= 0; todoIndex--) {
            const todo = todos[todoIndex];

            if (returnNext) {
                return todo.uuid;
            }

            if (todo.uuid === currentTodoUuid) {
                returnNext = true;
            }
        }
    }

    return resolveLastTodoInGroupedTodoCollection(groupedTodos)?.uuid || null;
}
