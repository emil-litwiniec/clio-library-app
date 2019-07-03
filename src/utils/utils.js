
const utils = {
    convertToSelectOptions: {
        publishers(arr) {
            // tranform response data array of objects to meet
            // with input crieteria of Select component
            if (Array.isArray(arr)) {
                return arr.map(obj => ({
                    value: obj.pub_id,
                    label: obj.name,
                    name: obj.name
                }));
            } else {
                return [];
            }
        },
        genres(arr) {
            if (Array.isArray(arr)) {
                return arr.map(obj => ({
                    value: obj.genre_id,
                    label: obj.genre_name,
                    name: obj.genre_name
                }));
            } else {
                return [];
            }
        },
        authors(arr) {
            if(Array.isArray(arr)) {
                return arr.map(obj => ({
                    value: obj.author_id,
                    label: `${obj.last_name}, ${obj.first_name} |${obj.origin}`,
                    name: `${obj.last_name}, ${obj.first_name} | ${obj.origin}`
                }))
            } else {
                return [];
            }
        },
        translators(arr) {
            if(Array.isArray(arr)) {
                return arr.map(obj => ({
                    value: obj.translator_id,
                    label: `${obj.last_name}, ${obj.first_name}`,
                    name: `${obj.last_name}, ${obj.first_name}`
                }))
            } else {
                return [];
            }
        }
    }
}; 

export default utils;