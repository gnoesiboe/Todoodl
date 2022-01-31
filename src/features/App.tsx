import React from 'react';
import TodoOverview from './components/todoOverview/TodoOverview';
import KeyboardShortcutOverview from './components/keyboardShortcutOverview/KeyboardShortcutOverview';
import { TodoContextProvider } from '../context/todo/TodoContext';

function App() {
    return (
        <main className="max-w-4xl mx-auto md:mt-4 space-y-10">
            <TodoContextProvider>
                <TodoOverview />
            </TodoContextProvider>
            <KeyboardShortcutOverview />
        </main>
    );
}

export default App;
