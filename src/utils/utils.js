
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
    },
    selectSearchOptions : {
        titles: [
          {
            value: 'authorAsc',
            label: 'authorAsc',
            name: 'authors ascending'
          },
          {
            value: 'authorDesc',
            label: 'authorDesc',
            name: 'authors descending'
          },
          {
            value: 'titleAsc',
            label: 'titleAsc',
            name: 'titles ascending'
          },
          {
            value: 'titleDesc',
            label: 'titleDesc',
            name: 'titles descending'
          }
        ],
        authors: [
          {
            value: 'authorDesc',
            label: 'authorDesc',
            name: 'authors descending'
          },
          {
            value: 'authorAsc',
            label: 'authorAsc',
            name: 'authors ascending'
          }
        ],
        searchIn: [
          {
            value: 'b',
            label: 'books',
            name: 'books'
          },
          {
            value: 'a',
            label: 'Authors',
            name: 'authors'
          }
        ],
        searchBy: [
          {
            value: 'title',
            label: 'Title',
            name: 'Title'
          },
          {
            value: 'author',
            label: 'Author',
            name: 'Author'
          }
        ]
      }
}; 

export default utils;