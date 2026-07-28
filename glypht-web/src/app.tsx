import {render} from 'preact';
//import 'preact/debug';

import './shared.tsx';

import AppInner from './components/App/App';
import {AppContext, createStore} from './app-state';
import {OverlayProvider} from 'valadaptive-lib/Overlay';
import {ToastProvider} from 'valadaptive-lib/Toast';

const store = createStore();

export function App() {
    return (
        <AppContext.Provider value={store}>
            <OverlayProvider>
                <ToastProvider>
                    <AppInner />
                </ToastProvider>
            </OverlayProvider>
        </AppContext.Provider>
    );
}

const appContainer = document.getElementById('main');
if (appContainer) render(<App />, appContainer);
