import { Todo, TodoCollection } from '../../model/todo';
import { User } from 'firebase/auth';
import { createDocReference, getDatabaseCollection } from '../firebase';
import { query as createQuery, where, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { TodoDocument } from '../model/todoDocument';
import { transformDocumentSnapshotToModel, transformModelToDocument } from '../transformer/todoTransformer';

const collection = getDatabaseCollection<TodoDocument>('todos');

export async function fetchAllTodos(user: User): Promise<TodoCollection> {
    const query = createQuery(collection, where('userUid', '==', user.uid));
    const documentsSnapshot = await getDocs(query);

    const todos: TodoCollection = [];

    documentsSnapshot.forEach((documentSnapshot) => {
        todos.push(transformDocumentSnapshotToModel(documentSnapshot));
    });

    return todos;
}

export async function persistTodo(todo: Todo, user: User): Promise<void> {
    const documentReference = createDocReference<TodoDocument>(collection.id, todo.uuid);

    const document = transformModelToDocument(todo, user);

    await setDoc(documentReference, document);
}

export async function deleteTodo(todo: Todo): Promise<void> {
    const documentReference = createDocReference<TodoDocument>(collection.id, todo.uuid);

    await deleteDoc(documentReference);
}
