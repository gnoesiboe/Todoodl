import { TodoCollection } from '../model/todo';

export function sortTodosByRank(todos: TodoCollection): TodoCollection {
    const newTodos = [...todos];

    newTodos.sort((first, second) => {
        if (first.rank === second.rank) {
            return 0;
        }

        if (first.rank > second.rank) {
            return 1;
        }

        return -1;
    });

    return newTodos;
}
