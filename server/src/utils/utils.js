

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

        // console.log('results: ', result)
        return result;
    },
    setColumnsNamesFromEntries(entries, cb) {
        const newEntries = entries.map(entry => {
            return [cb(entry[0]), `'${entry[1]}'`];
        });

        return newEntries;
    },
    setBooksValuesNames(req) {
        const reqValues = Object.values(req.body);
        const reqKeys = Objecy.values
        // console.log('obj keys:', Object.keys(req.body));
        // console.log('obj values:', Object.values(req.body))
        // const values = [
        //     req.body.title ? `'${req.body.title}'` : undefined,
        //     req.body.authorId ? `'${req.body.authorId}'` : undefined,
        //     req.body.pubYear ? `'${req.body.pubYear}'` : undefined,
        //     req.body.series ? `'${req.body.series}'` : undefined,
        //     req.body.edition ? `'${req.body.edition}'` : undefined,
        //     req.body.genreId ? `'${req.body.genreId}'`: undefined,
        //     req.body.keywords ? `'${req.body.keywords}'` : undefined,
        //     req.body.ukd  ? `${req.body.ukd}` : undefined,
        //     req.body.lang ?`'${req.body.lang}'` : undefined,
        //     req.body.translatorId ? `'${req.body.translatorId}'` : undefined,
        //     req.body.pubId ? `'${req.body.pubId}'` : undefined,
        //     req.body.isbn ? `'${req.body.isbn}'` : undefined

        // ];

        // console.log(req.body);


        let result = values.filter(el => el !== undefined);
        // console.log('setValues: ', result);
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