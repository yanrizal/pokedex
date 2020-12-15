export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getImgIndex = (idx) => {
    if (idx < 10) {
        return '00' + idx
    }
    if (idx < 100) {
        return '0' + idx
    }
    return idx
}