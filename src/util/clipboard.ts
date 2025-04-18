let fakeClipboard = '';

export const copyText = (text: string) => {
    fakeClipboard = text;
    return navigator.clipboard.writeText(text);
};

export const pasteText = async() => {
    try {
        return await navigator.clipboard.readText();
    } catch (err) {
        if (err instanceof Error && err.name === 'NotAllowedError') {
            return fakeClipboard;
        }
        throw err;
    }
};
