import style from './style.module.scss';

import {useCallback} from 'preact/hooks';
import {signal, Signal} from '@preact/signals';

import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import {useAppState} from '../../app-state';

import {axesList} from '../../util/axis-metadata';

const GoogleFontsModal = () => {
    const appState = useAppState();
    const {googleFontsModalState} = appState;

    const fontsListState = googleFontsModalState.state.value;
    if (fontsListState.state === 'not_loaded') {
        import('./GoogleFontsModalInner').then(
            ({default: ModalComponent, langList}) => {
                const selectedAxes: Record<string, Signal<boolean>> = {};
                for (const axis of axesList) {
                    selectedAxes[axis.tag] = signal(false);
                }
                const selectedLanguages: Record<string, Signal<boolean>> = {};
                for (const lang of langList.languages) {
                    selectedLanguages[lang.id] = signal(false);
                }
                googleFontsModalState.state.value = {
                    state: 'loaded',
                    selectedAxes,
                    selectedLanguages,
                    ModalComponent,
                };
            },
            error => {
                googleFontsModalState.state.value = {state: 'error', error};
            },
        );
    }
    let inner;
    switch (fontsListState.state) {
        case 'loading':
        case 'not_loaded':
            inner = <div className={style.loaderPositioner}><Loader /></div>;
            break;
        case 'error':
            // TODO: pretty error display
            inner = String(fontsListState.error);
            break;
        case 'loaded': {
            const {ModalComponent} = fontsListState;
            inner = <ModalComponent fontsListState={fontsListState} />;
            break;
        }
    }

    const onCloseModal = useCallback(() => {
        googleFontsModalState.open.value = false;
    }, [googleFontsModalState.open]);

    return <Modal onClose={onCloseModal} className={style.fontsModal}>
        {inner}
    </Modal>;
};

export default GoogleFontsModal;
