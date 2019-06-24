

const utils = {
    setQueries(dbColumns, newValues) {
        return dbColumns.map((el, idx) => `${el} = ${newValues[idx]}`);
    },
    setColumnsNames(req, cb) {
        const keys = Object.keys(req.body);
        const newKeys = keys.map(el => {
            return cb(el);
        });

        let result = newKeys.filter(el => el !== undefined);


        return result;
    },
    setBooksValuesNames(req) {

        const values = [
            req.body.title ? `'${req.body.title}'` : undefined,
            req.body.authorId || undefined,
            req.body.series ? `'${req.body.series}'` : undefined,
            req.body.edition ? `'${req.body.edition}'` : undefined,
            req.body.genreId || undefined,
            req.body.keywords || undefined,
            req.body.ukd || undefined,
            req.body.lang ?`'${req.body.lang}'` : undefined,
            req.body.pubYear || undefined,
            req.body.translatorId || undefined,
            req.body.pubId || undefined,
            req.body.isbn ? `'${req.body.isbn}'` : undefined

        ];

        let result = values.filter(el => el !== undefined);

        return result;
    },
    setPublishersValuesNames(req) {
        const values = [
            req.body.name ?  `'${req.body.name}'` : undefined,
            req.body.estYear || undefined,
            req.body.address  ? `'${req.body.address}'` : undefined,
            req.body.origin ? `'${req.body.origin.toUpperCase()}'` : undefined
        ];

        let result = values.filter(el => el !== undefined);

        return result;

    }
};

export default utils;