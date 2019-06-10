

const utils = {
    populateColsToSet(req, cb, strInit) {
        const keys = Object.keys(req.body);
        let str = strInit;
        const newKeys = keys.map(el => {
            return cb(el);
        });
        newKeys.forEach(el => {
            if (el !== undefined) {
                str = str.concat(", ", el);
            }
        });

        return str;
    }
};

export default utils;