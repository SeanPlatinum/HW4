/* 
Sean Diaz - HW4 - Wenjin Zhou GUI PROGRAMMING 
6/3/24
sean_diaz@student.uml.edu
*/
$(document).ready(function() {
    // Initialize sliders
    $("#start_Row_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#start_Row").val(ui.value);
        }
    });
    $("#end_Row_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#end_Row").val(ui.value);
        }
    });
    $("#start_Col_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#start_Col").val(ui.value);
        }
    });
    $("#end_Col_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#end_Col").val(ui.value);
        }
    });

    // Update sliders when input fields change
    $("#start_Row, #end_Row, #start_Col, #end_Col").on("change", function() {
        var sliderId = '#' + $(this).attr('id') + '_slider';
        var slider = $(sliderId);
        slider.slider("value", $(this).val());
    });

    // Initialize form validation
    $("#tableForm").validate({
        rules: {
            start_Row: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            end_Row: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            start_Col: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            end_Col: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            start_Row: {
                required: "Please enter a start row value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            end_Row: {
                required: "Please enter an end row value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            start_Col: {
                required: "Please enter a start column value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            },
            end_Col: {
                required: "Please enter an end column value.",
                number: "Please enter a valid number.",
                range: "Value must be between -50 and 50."
            }
        },
        submitHandler: function(form) {
            // Form submission handler
            const start_Row = parseInt($('#start_Row').val());
            const end_Row = parseInt($('#end_Row').val());
            const start_Col = parseInt($('#start_Col').val());
            const end_Col = parseInt($('#end_Col').val());
            generateTable(start_Row, end_Row, start_Col, end_Col);
        }
    });
});

document.getElementById('tableForm').addEventListener('submit', function(event)
{ /* function(event) is a call back function, these are like functions that arent real yet but 
    occurs when  the event listener receives the action... */
    event.preventDefault(); //basically stop the page from refreshhing on submit
    const start_Row = parseInt(document.getElementById('start_Row').value); // this function takes the entry in the box and converts it to decimal 
    const end_Row = parseInt(document.getElementById('end_Row').value);
    const start_Col = parseInt(document.getElementById('start_Col').value);
    const end_Col = parseInt(document.getElementById('end_Col').value);
    // Validation for the range -50 to 50
    if (start_Row < -50 || start_Row > 50 || end_Row < -50 || end_Row > 50 ||
        start_Col < -50 || start_Col > 50 || end_Col < -50 || end_Col > 50) {
        document.getElementById('tableContainer').innerHTML = ''; 
        document.getElementById('notification').innerText = 'Number too large. Please enter values between -50 and 50.';
        return;
    }
    if (end_Row < start_Row) {
        document.getElementById('tableContainer').innerHTML = '';
        document.getElementById('notification').innerText = 'End Row must be greater than or equal to Start Row.';
        return;
    }

    if (end_Col < start_Col) {
        document.getElementById('tableContainer').innerHTML = ''; 
        document.getElementById('notification').innerText = 'End Column must be greater than or equal to Start Column.';
        return;
    }
    document.getElementById('notification').innerText = ''; // Clear any previous notifications
    generateTable(start_Row, end_Row, start_Col, end_Col);
});

function generateTable(start_Row, end_Row, start_Col, end_Col) { //start here 5/31/24
    let tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';  // Clear previous table if any/ this allows continous generation without reloading...works for now, not sure if it doesn't actually fully clear in back-end

    let table = document.createElement('table');
    let table_body = document.createElement('tbody'); // groups body content 
    let table_head = document.createElement('thead'); // groups headers
    

    // Create the table headers Sean 6/1/24
    let headerRow = document.createElement('tr'); //first header row with number being multiplied !!!! :))))
    let emptyHeader = document.createElement('th'); // we need this because if not the table is all out of line with the styling so its a trash fix but its works i guess :(
    headerRow.appendChild(emptyHeader);

    for (let col = start_Col; col <= end_Col; col++) {
        let th = document.createElement('th');
        th.innerText = col;
        headerRow.appendChild(th);
    }
    table_head.appendChild(headerRow); // append it to the grouping of header

    // Create table rows
    for (let row = start_Row; row <= end_Row; row++) { //lets make the rows
        let tr = document.createElement('tr');
        let th = document.createElement('th'); // the first element has to be a header to show the table multiplication properly....this confused me so bad at first and I realized I was missing it 
        th.innerText = row;
        tr.appendChild(th);
        for (let col = start_Col; col <= end_Col; col++) { //update:: messed this up so bad at first and put startRow and endRow as conditions and starting, messed me up so bad for 4 hours LOL
            let td = document.createElement('td'); //table data
            td.innerText = row * col; //actual mafs
            tr.appendChild(td);
        }
        table_body.appendChild(tr); //finished? add the whole row to the body container. This seperates it from the thead...AWESOME SAUCE
    }
    //combining everything as nice and neat as possible to prevent styling probz
    table.appendChild(table_head);
    table.appendChild(table_body);
    tableContainer.appendChild(table); //retest if issue from saturday still not fixed 
}
