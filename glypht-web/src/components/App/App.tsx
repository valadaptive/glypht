import style from './style.module.scss';

import FontInfo from '../FontInfo/FontInfo';
import ExportPanel from '../ExportPanel/ExportPanel';
import {useAppState} from '../../app-state';
import GoogleFontsModal from '../GoogleFontsModal/GoogleFontsModal';

const App = () => {
    const appState = useAppState();
    return <div className={style.app}>
        <div className={style.displayPane}>
            <div className={style.mainPane}>
                <FontInfo />
            </div>
            <ExportPanel />
        </div>
        {appState.googleFontsModalState.open.value ?
            <GoogleFontsModal /> :
            null}
    </div>;
};

export default App;
