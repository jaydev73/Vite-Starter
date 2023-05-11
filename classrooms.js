//get number of test taken
export function getNumberOfGrades(grades) {
    return  grades.length
}

//get Sum of grades
export const sumOfGrades = grades => {
    return grades.reduce((total, curr) => {
       return  total += curr
    },0)
}

//get Average of grades
export const averageGrades = (grades) => {
    // console.log(sumOfGrades(grades))
    // console.log(getNumberOfGrades(grades))
    
    if (grades !== []){
        return (sumOfGrades(grades)/getNumberOfGrades(grades)).toFixed(2)
    }return "0"
    
}

//get passing grades

export const passingGrades = (grades) => {
    return grades.filter(grade => {
       const pass =  grade >= 10;
       return pass
        
    })
}
// get failing grades
export const failingGrades = (grades) => {
    return grades.filter(grade => {
        return grade <= 10
    })
}

//raised grades
export const raisedGrades = (grades) => {
    
    return grades.map(grade => {
        if(grade > 20) {
           return grade
        }return grade + 1
    })
}