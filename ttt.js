var Body = document.body;
var Table = document.createElement('table');

const row_length = 4;
const column_length = 4;

let columns = [];
let rows = [];
let turn = 'X';
let cnt = 0;

function simple_check(r, c) {
    // horizontal
    for (let i = 0; i < column_length; i++) {
        if (rows[r].childNodes[i].textContent !== turn) {
            break;
        } else if (i === column_length - 1) {
            return true
        }
    }

    // vertical
    for (let i = 0; i < row_length; i++) {
        if (rows[i].childNodes[c].textContent !== turn) {
            break;
        } else if (i === row_length - 1) {
            return true
        }
    }

    // diagonal
    for (let i = 0; i < row_length; i++) {
        if (rows[i].childNodes[i].textContent !== turn) {
            break;
        } else if (i === row_length - 1) {
            return true
        }
    }
    for (let i = 0; i < row_length; i++) {
        if (rows[i].childNodes[column_length - i - 1].textContent !== turn) {
            break;
        } else if (i === row_length - 1) {
            return true
        }
    }

    return false;
}

function clearBoard(){
    columns.forEach((r) => {
        r.forEach((c) => {
            c.textContent = "";
        });
    });
}

var column_info = function (e) {
    console.log(e.target);
    console.log(e.target.parentNode);
    console.log(e.target.parentNode.parentNode);

    if (turn === 'O') {
        return;
    }

    let row_idx = rows.indexOf(e.target.parentNode);
    let column_idx = columns[row_idx].indexOf(e.target);
    console.log('row: ', row_idx, ' column: ', column_idx);

    if (columns[row_idx][column_idx].textContent !== '') {
        console.log('not empty');
    } else {
        console.log('empty');
        columns[row_idx][column_idx].textContent = turn;
        cnt++;

        if (simple_check(row_idx, column_idx)) {
            alert(`${turn} WIN!`);
            Table.innerHTML = '';
            main();
        } else {
            if (cnt === row_length * column_length) {
                clearBoard();
            }
            if (turn === 'X') {
                turn = 'O';
            }
            setTimeout(() => {
                console.log('computer');
                let cadi = [];
                let selected = 0;
                columns.forEach((row) => {
                    row.forEach((col) => {
                        cadi.push(col);
                    });
                });
                cadi = cadi.filter((c) => !c.textContent);
                selected = cadi[Math.floor(Math.random() * cadi.length)];
                selected.textContent = turn;
                cnt++;

                let number_row = rows.indexOf(selected.parentNode);
                let number_col = columns[number_row].indexOf(selected);

                if (simple_check(number_row, number_col)) {
                    alert(`${turn} WIN!`);
                    
                    main();
                    return;
                }

                if (cnt === row_length * column_length) {
                    clearBoard();
                }

                turn = 'X';
            }, 500);

        }
    }
}

function main() {
    Table.innerHTML = '';
    columns = [];
    rows = [];
    turn = 'X';
    cnt = 0;

    for (let i = 0; i < row_length; i++) {
        let row = document.createElement('tr');
        rows.push(row);
        columns.push([]);

        for (let j = 0; j < column_length; j++) {
            let column = document.createElement('td');
            column.addEventListener('click', column_info);
            columns[i].push(column);
            row.appendChild(column);
        }
        Table.appendChild(row);
    }

    Body.appendChild(Table);
}

main();