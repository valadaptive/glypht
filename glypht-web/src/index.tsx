import {render} from 'preact';
import 'preact/debug';

import './css/fonts.css';
import './css/global.scss';
import './css/buttons.scss';

import AppInner from './components/App/App';
import {AppContext, createStore} from './app-state';
import {OverlayProvider} from './components/Overlay/Overlay';
import {ToastProvider} from './components/Toast/Toast';

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

document.body.className = '';
render(<App />, document.body);
