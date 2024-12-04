export function isNumber( data ){
    const number = Number(data)
    return  number || !isNaN(number)
}