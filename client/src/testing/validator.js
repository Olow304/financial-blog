const isValid = mValue  => (
    mValue === undefined || 
    mValue === null || 
    (typeof mValue === "object" && Object.keys(mValue).length === 0) ||
    (typeof mValue === "string" && mValue.trim().length === 0)
)

export default isValid