function Upload() {
  //Reference the FileUpload element.
  var fileUpload = document.getElementById("fileUpload");

  //Validate whether File is valid Excel file.
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof (FileReader) != "undefined") {
      var reader = new FileReader();

      //For Browsers other than IE.
      if (reader.readAsBinaryString) {
        reader.onload = function (e) {
          ProcessExcel(e.target.result);
        };
        reader.readAsBinaryString(fileUpload.files[0]);
      } else {
        //For IE Browser.
        reader.onload = function (e) {
          var data = "";
          var bytes = new Uint8Array(e.target.result);
          for (var i = 0; i < bytes.byteLength; i++) {
            data += String.fromCharCode(bytes[i]);
          }
          ProcessExcel(data);
        };
        reader.readAsArrayBuffer(fileUpload.files[0]);
      }
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid Excel file.");
  }
};

arr = [];
arr1 = [];

function ProcessExcel(data) {
  //Read the Excel File data.
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  //Fetch the name of First Sheet.
  var firstSheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

  //Create a HTML Table element.
  var table = document.createElement("table");
  table.border = "1";

  //Add the header row.
  var row = table.insertRow(-1);

  //Add the header cells.
  // var headerCell = document.createElement("TH");
  // headerCell.innerHTML = "stt";
  // row.appendChild(headerCell);

  // headerCell = document.createElement("TH");
  // headerCell.innerHTML = "question";
  // row.appendChild(headerCell);

  // headerCell = document.createElement("TH");
  // headerCell.innerHTML = "A";
  // row.appendChild(headerCell);

  // headerCell = document.createElement("TH");
  // headerCell.innerHTML = "B";
  // row.appendChild(headerCell);

  // headerCell = document.createElement("TH");
  // headerCell.innerHTML = "C";
  // row.appendChild(headerCell);

  // headerCell = document.createElement("TH");
  // headerCell.innerHTML = "D";
  // row.appendChild(headerCell);

  // headerCell = document.createElement("TH");
  // headerCell.innerHTML = "answer";
  // row.appendChild(headerCell);

  //Add the data rows from Excel file.
  for (var i = 0; i < excelRows.length; i++) {
    //Add the data row.
    var row = table.insertRow(-1);
    // //Add the data cells.
    // var cell = row.insertCell(-1);
    // cell.innerHTML = excelRows[i].stt;

    cell = row.insertCell(-1);
    cell.innerHTML = excelRows[i].question;
    arr.push(cell.innerHTML = excelRows[i].question);
    cell = row.insertCell(-1);
    cell.innerHTML = excelRows[i].A;
    arr1 = [];
    arr1.push(cell.innerHTML = excelRows[i].A);

    cell = row.insertCell(-1);
    cell.innerHTML = excelRows[i].B;
    arr1.push(cell.innerHTML = excelRows[i].B);

    cell = row.insertCell(-1);
    cell.innerHTML = excelRows[i].C;
    arr1.push(cell.innerHTML = excelRows[i].C);

    cell = row.insertCell(-1);
    cell.innerHTML = excelRows[i].D;
    arr1.push(cell.innerHTML = excelRows[i].D);
    arr.push(arr1);

    cell = row.insertCell(-1);
    cell.innerHTML = excelRows[i].answer;
    arr.push(cell.innerHTML = excelRows[i].answer);
  }
  console.log(arr);

  var dvExcel = document.getElementById("dvExcel");
  dvExcel.innerHTML = "";
  dvExcel.appendChild(table);
  return arr;
};

console.log(ProcessExcel().arr);