const isValid = (object) => {
    object === undefined || object === null || 
    (typeof object === 'object' && Object.keys(object).length === 0) || 
    (typeof object === 'string' && object.trim().length === 0)
}
export default isValid;