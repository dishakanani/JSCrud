window.alert("hello");

// localdata #1
let records = JSON.parse(localStorage.getItem("localdata")) || [];
let isEdit = -1;

// delete
// step3

const handleDelete = (value) => {
    const deleteData = records.filter((item, index) => { return index !== value });
    console.log(deleteData);
    // localdata2
    localStorage.setItem("localdata", JSON.stringify(deleteData))
    records = deleteData;
    renderHTMLTAble();
}

// edit
// step4

const handleEdit = (abc) => {
    isEdit = abc;
    const Editdata = records.find((item, index) => { return index === abc });
    document.getElementById("FName").value = Editdata.FName;
    document.getElementById("LName").value = Editdata.LName;
    document.getElementById("Email").value = Editdata.Email;
}
const SortData = () => {


    const select = document.getElementById("data").value;

    if (select === "FName") {
        let sorted = records.sort((a, b) => a.FName.localeCompare(b.FName))
        records = sorted;

    } else if (select === "LName") {
        let sorted = records.sort((a, b) => a.LName.localeCompare(b.LName))
        records = sorted;

    } else if (select === "Email") {
        let sorted = records.sort((a, b) => a.Email.localeCompare(b.Email))
        records = sorted;


    }
    renderHTMLTAble();

    // let sorted = records.sort((a, b) => a.LName.localeCompare(b.LName))
    // records = sorted;

}

// search button
function myFunction() {
    let search = document.getElementById("myInput").value;
    let filtereddata = records.filter((item) => { return (item.FName.toLocaleLowerCase() === search.toLocaleLowerCase() || item.LName.toLocaleLowerCase() === search.toLocaleLowerCase()) });
    records = filtereddata;
    renderHTMLTAble();
}


//  CheckboxData
const mainCheckbox = document.getElementById('checkbox-all');
const tableBody = document.getElementById('table-body');
mainCheckbox.addEventListener('change', function () {
    if (this.checked === true)
        tableBody.querySelectorAll('input[type="checkbox"]').forEach(function (element) {
            element.checked = true;
        });
    else
        tableBody.querySelectorAll('input[type="checkbox"]').forEach(function (element) {
            element.checked = false;
        });

});

// renderHTMLTAble
const renderHTMLTAble = () => {
    document.getElementById("table-body").innerHTML = records.map((item, index) => {
        return `<tr>
    <td>${item.FName}</td>
    <td>${item.LName}</td>
    <td>${item.Email}</td>
    <td><input id="checkbox-all" type="checkbox"></td>
    <td><button onclick="handleDelete(${index})">DELETE</button></td>
    <td><button onclick="handleEdit(${index})">EDIT</button></td>
     </tr>`})
}

const CheckboxData = () => {

    const v = document.getElementById("FName").value;
    console.log(v);

    const d = document.getElementById("LName").value;
    console.log(d);

    const vd = document.getElementById("Email").value;
    console.log(vd);

    const disha = { FName: v, LName: d, Email: vd, };
    console.log(disha);

    if (isEdit !== -1) {
        const updated = records.map((item, index) => {
            if (index === isEdit) return disha;
            else return item
        });
        // localdata #2
        localStorage.setItem("localdata", JSON.stringify(updated))
        records = updated;
        renderHTMLTAble()
    }
    else {
        console.log(disha);
        records.push(disha);
        // localdata #0
        localStorage.setItem("localdata", JSON.stringify(records))
        console.log(records);
        renderHTMLTAble();
    }
}




