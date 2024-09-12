let column = 1;
let content = ['No', 'content', 'to', 'Tabulate'];
let header = false;


document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const tableString = e.target.result;
            content = tableString.split(/[,\n]/g); // / [^ a - zA - Z0 - 9] / g
        };

        reader.onerror = function (e) {
            console.error('Error reading file:', e);
        };

        reader.readAsText(file);
    } else {
        console.error('No file selected.');
    }
});

document.getElementById('logButton').addEventListener('click', function () {

    const columnSize = document.getElementById('numberInput').value;
    if (!isNaN(columnSize)) {
        column = Number(columnSize);
    }
    else {
        console.error('Not a number , please enter number');
    }


});

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        document.getElementById('logButton').click();
    }
}

document.getElementById('myCheckbox').addEventListener('change', function (event) {
    const checkbox = event.target.checked;
    if (checkbox) {
        header = true;
    }
});


document.getElementById('viewTable').addEventListener('click', function () {


    if (column <= 0) {
        console.error("Column size should be atleast 1");
    }
    else {
        start = 0;
        let table = '<table border="1">\n';
        if (header) {
            table += '  <tr>\n';
            for (let i = start; i < column; i++) {
                if (i < content.length) {
                    table += `    <th>${content[i].trim()}</th>\n`;
                }
            }
            table += '  </tr>\n';
            start = column;
        }
        console.log(content);
        for (let i = start; i < content.length; i += column) {
            table += '  <tr>\n';

            for (let j = i; j < i + column; j++) {
                if (j < content.length) {
                    table += `    <td>${content[j].trim()}</td>\n`;
                } else {
                    table += '    <td></td>\n';
                }
            }

            table += '  </tr>\n';
        }

        table += '</table>';

        table += '<p> <button  onclick=" location.reload() " >Reload ! </button> </p>';
        console.log(table);
        document.getElementById('website-content').innerHTML = table;
    }
});


