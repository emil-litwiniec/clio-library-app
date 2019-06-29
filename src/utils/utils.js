
const utils = {
    convertToSelectOptions (arr) {
        // tranform response data array of objects to meet
        // with input crieteria of Select component
        if (Array.isArray(arr)){
            return  arr.map(obj => ({ 
                 value: obj.pub_id,
                 label: obj.name,
                 name: obj.name }))
        } else {
            return []
        }
    }
} 

export default utils;