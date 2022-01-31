export type TodoPriority = 'must' | 'should' | 'would' | 'could';

export const allPriorities: Array<TodoPriority> = ['must', 'should', 'could', 'would'];

export type Todo = {
    uuid: string;
    done: boolean;
    description: string;
    rawValue: string;
    project: string | null;
    tags: string[];
    priority: TodoPriority;
    start: Date | null;
};

export type TodoCollection = Todo[];

export type GroupedTodoCollection = Record<TodoPriority, TodoCollection>;

export type PartialTodoCollection = Array<Partial<Todo>>;
