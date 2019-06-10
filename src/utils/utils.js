

const utils = {
    setColumnsNames(req, cb) {
        const keys = Object.keys(req.body);
        const newKeys = keys.map(el => {
            return cb(el);
        });
        newKeys.forEach(el => {
            if (el !== undefined) {
                str = str.concat(", ", el);
            }
        });

        let result = newKeys.filter(el => el !== undefined);


        return result;
    },
    setValuesNames(req) {

        const values = [
            `'${req.body.title}'` || undefined,
            req.body.authorId || undefined,
            `'${req.body.series}'` || undefined,
            `'${req.body.edition}'` || undefined,
            req.body.genreId || undefined,
            req.body.keywords || undefined,
            req.body.ukd || undefined,
            `'${req.body.lang}'` || undefined,
            req.body.pubYear || undefined,
            req.body.translatorId || undefined,
            req.body.pubId || undefined,
            `'${req.body.isbn}'` || undefined

        ];
        let result = values.filter(el => el !== undefined);

        return result;
    }
};

export default utils;