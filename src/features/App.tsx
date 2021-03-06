import React from 'react';
import TodoOverview from './components/todoOverview/TodoOverview';
import UsageOverview from './components/usageOverview/UsageOverview';
import { TodoContextProvider } from '../context/todo/TodoContext';
import { AuthContextProvider } from '../auth/AuthContext';
import useSwitchAfterTimeout from '../hooks/useSwitchAfterTimeout';

function App() {
    const usageOverviewVisible = useSwitchAfterTimeout(false, 2000);

    return (
        <AuthContextProvider>
            <main className="max-w-4xl mx-auto md:mt-4 space-y-10">
                <TodoContextProvider>
                    <TodoOverview />
                </TodoContextProvider>
                {usageOverviewVisible && <UsageOverview />}
            </main>
        </AuthContextProvider>
    );
}

export default App;
