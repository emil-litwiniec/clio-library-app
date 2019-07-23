

const utils = {
    setColumnsNamesFromEntries(entries, cb) {
        const newEntries = entries.map(entry => {
            return [cb(entry[0]), `'${entry[1]}'`];
        });

        return newEntries;
    }
};

export default utils;