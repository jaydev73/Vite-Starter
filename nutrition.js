export function renderTableRows(rows) {
    // if we are using forEach() method
    // let html = "";
    // rows.forEach(row => {
    //     html += `
    //         <tr>
    //         <td>${row[0]}</td>
    //         <td>${row[1]}</td>
    //         </tr>`
    // });
    // return html
    return rows.map(row => {
        console.log(row)
          return   `<tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            </tr>`
    }).join("")
}

