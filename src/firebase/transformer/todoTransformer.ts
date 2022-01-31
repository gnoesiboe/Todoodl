import { TodoDocument } from '../model/todoDocument';
import { Todo, TodoPriority } from '../../model/todo';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { parseISOString } from '../../utility/dateTimeUtilities';
import { removeFieldsWithUndefinedValues } from '../utilities/documentUtilities';
import { User } from 'firebase/auth';

export function transformDocumentSnapshotToModel(documentSnapshot: QueryDocumentSnapshot<TodoDocument>): Todo {
    const data = documentSnapshot.data();

    return {
        uuid: documentSnapshot.id,
        done: data.done,
        description: data.description,
        rawValue: data.rawValue,
        project: data.project || null,
        tags: data.tags,
        priority: data.priority as TodoPriority,
        start: data.start ? parseISOString(data.start) : null,
        rank: data.rank,
    };
}

export function transformModelToDocument(todo: Todo, user: User): TodoDocument {
    const doc: TodoDocument = {
        userUid: user.uid,
        done: todo.done,
        description: todo.description,
        rawValue: todo.rawValue,
        project: todo.project || undefined,
        tags: todo.tags,
        priority: todo.priority,
        start: todo.start ? todo.start.toISOString() : undefined,
        rank: todo.rank,
    };

    removeFieldsWithUndefinedValues<TodoDocument>(doc);

    return doc;
}
