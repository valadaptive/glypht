import style from './style.module.scss';

import FontInfo from '../FontInfo/FontInfo';
import ExportPanel from '../ExportPanel/ExportPanel';

const App = () => {
    return <div className={style.app}>
        <div className={style.displayPane}>
            <div className={style.mainPane}>
                <FontInfo />
            </div>
            <ExportPanel />
        </div>
    </div>;
};

export default App;
