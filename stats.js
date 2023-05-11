export const getVotersCount = (ages) => {
    return ages.filter(age => {
        return age >= 18
    }).length
}