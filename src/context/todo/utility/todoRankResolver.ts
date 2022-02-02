import { TodoCollection } from '../../../model/todo';
import { sortTodosByRank } from '../../../utility/todoSortingUtilities';

export function resolveRankForIndex(todos: TodoCollection, index: number): number {
    if (todos.length === 0) {
        return 1;
    }

    const sortedTodos = sortTodosByRank(todos);
    const lastIndex = sortedTodos.length - 1;

    if (index === 0) {
        const firstItem = sortedTodos[0];

        const previousRank = firstItem.rank - 1;

        return previousRank + (firstItem.rank - previousRank) / 2;
    }

    if (index > lastIndex) {
        const lastItem = sortedTodos[lastIndex];

        return lastItem.rank + 1;
    }

    const itemBefore = sortedTodos[index - 1];
    const itemAfter = sortedTodos[index];

    return itemBefore.rank + (itemAfter.rank - itemBefore.rank) / 2;
}
