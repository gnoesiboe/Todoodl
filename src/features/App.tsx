import React from 'react';
import TodoOverview from './components/todoOverview/TodoOverview';
import KeyboardShortcutOverview from './components/keyboardShortcutOverview/KeyboardShortcutOverview';
import { TodoContextProvider } from '../context/todo/TodoContext';
import { AuthContextProvider } from '../auth/AuthContext';

function App() {
    return (
        <AuthContextProvider>
            <main className="max-w-4xl mx-auto md:mt-4 space-y-10">
                <TodoContextProvider>
                    <TodoOverview />
                </TodoContextProvider>
                <KeyboardShortcutOverview />
            </main>
        </AuthContextProvider>
    );
}

export default App;
