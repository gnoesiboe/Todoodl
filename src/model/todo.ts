export type TodoPriority = 'must' | 'should' | 'would' | 'could';

export const allPriorities: Array<TodoPriority> = ['must', 'should', 'could', 'would'];

export type Todo = {
    uuid: string;
    doneAt: Date | null;
    description: string;
    rawValue: string;
    project: string | null;
    tags: string[];
    priority: TodoPriority;
    start: Date | null;
    due: Date | null;
    rank: number; // @todo when adding a new item, use half between before and after!
};

export type TodoCollection = Todo[];

export type GroupedTodoCollection = Record<TodoPriority, TodoCollection>;

export type PartialTodoCollection = Array<Partial<Todo>>;
