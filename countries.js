// export function getDropDown(countries) {
    
//     let htmlElement = `<option value="">Please Select</option>`
//     countries.forEach(country => {
//         console.log(country)
        
//         htmlElement += `<option value="${country.toLowerCase()}">${country}</option>`
       
//     });
//     return htmlElement

// }
export const getDropdown = (countries) => 
`<option value="">Please Select</option>
    ${countries.map(country => {
         return `<option value="${country.toLowerCase()}">${country}</option>`
    }).join("")}`;

