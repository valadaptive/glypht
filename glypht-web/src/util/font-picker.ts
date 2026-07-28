import showOpenFilePicker from 'valadaptive-lib/util/file-picker';

const showFontPicker = () => showOpenFilePicker({
    accept: '.ttf,.otf,.ttc,.otc,.woff,.woff2',
    multiple: true,
});

export default showFontPicker;
