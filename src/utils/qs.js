export default {
    stringify: (obj) => {
        if (typeof obj !== 'object') return '';
        const keys = Object.keys(obj);

        return keys.reduce((arr, key) => {
            return [...arr, `${key}=${obj[key]}`];
        }, []).join('&');
    }
};