var globalData;
var dataToSend = {};
var contactID;
var preEditedValues = {};

$(document).ready(function ()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    contactID = url.searchParams.get("id");
    document.querySelector('#id').value = contactID;
    $.ajax({
        url: 'https://challenge.acstechnologies.com/api/contact/' + contactID,
        dataType: 'json',
        type: 'GET',
        headers: {"X-Auth-Token": "jaLXjbyj5vPfcBhkn8G64sRNs8be6GwRgqPOvGHk"},
        success: function (data)
        {
            globalData = data;
            document.querySelector('#first_name').value = data.first_name;
            document.querySelector('#last_name').value = data.last_name;
            document.querySelector('#displayName').innerHTML += (data.first_name + " " + data.last_name);
            document.querySelector('#company_name').value = data.company_name;
            document.querySelector('#displayCompany').innerHTML += (data.company_name);
            document.querySelector('#address').value = data.address;
            document.querySelector('#city').value = data.city;
            document.querySelector('#state').value = data.state;
            document.querySelector('#zip').value = data.zip;
            document.querySelector('#displayLocation').innerHTML += (data.address + ", " + data.city + ", " + data.state + " " + data.zip);
            document.querySelector('#phone').value = data.phone;
            document.querySelector('#work_phone').value = data.work_phone;
            document.querySelector('#displayPhone').innerHTML += data.phone;
            document.querySelector('#displayWorkPhone').innerHTML += data.work_phone;
            document.querySelector('#email').value = data.email;
            document.querySelector('#displayEmail').innerHTML += data.email;
            document.querySelector('#url').value = data.url;
            document.querySelector('#displayUrl').innerHTML += "<a href=" + data.url + ">" + data.url + "</a>";
        },
        error: function ()
        {
            document.querySelector('#addContact').remove();
            document.querySelector('#deleteBtn').remove();
            document.querySelector('#contentArea').firstElementChild.innerHTML = "No contact loaded. If you would like " +
                "to edit a contact please choose one on <a href='viewcontacts.html'>this page";
        }
    });

});

function editBtnClick(element)
{
    var anotherEditBoxOpen;
    var unsavedChangesPresent = false;
    var rowToParse = document.getElementById(element.id).parentElement.parentElement;
    var currentlyOpenRow = 'bob';
    var allRows = document.querySelectorAll('tr');

    Array.from(allRows).forEach(function (row)
    {
        if (row.id.includes('edit') && !row.hasAttribute('hidden') && row.id !== rowToParse.id)
        {
            currentlyOpenRow = row;
            anotherEditBoxOpen = true;
        }
    });
    if (anotherEditBoxOpen)
    {
        var currentInputs = currentlyOpenRow.querySelectorAll('input, select');
        Array.from(currentInputs).forEach(function (field)
        {
            if (preEditedValues[field.id] !== field.value)
            {
                unsavedChangesPresent = true;
            }
        });

    }

    if (unsavedChangesPresent)
    {
        if (confirm("If you edit another box without saving, your changes will be lost. Do you wish to continue anyways?"))
        {
            Array.from(currentInputs).forEach(function (field)
            {
                field.value = preEditedValues[field.id];
            });

            var rowToSwap = document.getElementById(element.id).parentElement.parentElement;
            currentlyOpenRow.setAttribute('hidden', 'true');
            var otherReplacementRowID = currentlyOpenRow.id.replace("edit", "display");
            var otherReplacementRow = document.getElementById(otherReplacementRowID);
            otherReplacementRow.removeAttribute('hidden');
            rowToSwap.setAttribute('hidden', 'true');
            var replacementRowID = rowToSwap.id.replace("display", 'edit');
            var replacementRow = document.getElementById(replacementRowID);
            replacementRow.removeAttribute('hidden');

            var activeInputs = replacementRow.querySelectorAll('input, select');
            dataToSend["id"] = contactID;
            Array.from(activeInputs).forEach(function (field)
            {
                preEditedValues[field.id] = field.value;
            });
        }
        else
        {
            //nothing happens.
        }
    }
    else
    {
        if(anotherEditBoxOpen)
        {
            currentlyOpenRow.setAttribute('hidden', 'true');
            var displayCurrentlyOpenRowID = currentlyOpenRow.id.replace("edit", 'display');
            var displayCurrentlyOpenRow = document.getElementById(displayCurrentlyOpenRowID);
            displayCurrentlyOpenRow.removeAttribute('hidden');
        }
        rowToSwap = document.getElementById(element.id).parentElement.parentElement;
        rowToSwap.setAttribute('hidden', 'true');
        replacementRowID = rowToSwap.id.replace("display", 'edit');
        replacementRow = document.getElementById(replacementRowID);
        replacementRow.removeAttribute('hidden');

        activeInputs = replacementRow.querySelectorAll('input, select');
        dataToSend["id"] = contactID;
        Array.from(activeInputs).forEach(function (field)
        {
            preEditedValues[field.id] = field.value;
        });
    }

    document.querySelector('#contentArea').style.marginLeft = '10%';
    document.querySelector('#contentArea').style.marginRight = '10%';

}

function saveBtnClick(element)
{
    var rowToParse = document.getElementById(element.id).parentElement.parentElement;
    var activeInputs = rowToParse.querySelectorAll('input, select');
    dataToSend["id"] = contactID;
    dataToSend['first_name'] = document.querySelector('#first_name').value;
    Array.from(activeInputs).forEach(function (field)
    {
        dataToSend[field.id] = field.value;
    });


    $.ajax({
        url: 'https://challenge.acstechnologies.com/api/contact/' + contactID,
        headers: {"X-Auth-Token": "jaLXjbyj5vPfcBhkn8G64sRNs8be6GwRgqPOvGHk"},
        type: 'PUT',
        dataType: 'json',
            data: {
                first_name: document.querySelector('#first_name').value,
                last_name: document.querySelector('#last_name').value,
                company_name: document.querySelector('#company_name').value,
                address: document.querySelector('#address').value,
                city: document.querySelector('#city').value,
                state: document.querySelector('#state').value,
                zip: document.querySelector('#zip').value,
                phone: document.querySelector('#phone').value,
                work_phone: document.querySelector('#work_phone').value,
                email: document.querySelector('#email').value,
                url: document.querySelector('#url').value
            },
        success: function ()
        {
            window.location.assign("editcontact.html?id=" + contactID);
            document.querySelector('#contentArea').style.marginLeft = '10%';
            document.querySelector('#contentArea').style.marginRight = '10%';

        },
        error: function ()
        {
            alert("Failed to Edit Contact: " + document.getElementById("first_name").value);
        }
    });
}

function cancelBtnClick(element)
{
    var unsavedChangesPresent = false;
    var currentInputs = document.getElementById(element.id).parentElement.parentElement.querySelectorAll('input, select');
    Array.from(currentInputs).forEach(function (field)
    {
        if (preEditedValues[field.id] !== field.value)
        {
            unsavedChangesPresent = true;
        }
    });
    Array.from(currentInputs).forEach(function (field)
    {
        field.value = preEditedValues[field.id];
    });

    var rowToSwap = document.getElementById(element.id).parentElement.parentElement;
    rowToSwap.setAttribute('hidden', 'true');
    var replacementRowID = rowToSwap.id.replace("edit", 'display');
    var replacementRow = document.getElementById(replacementRowID);
    replacementRow.removeAttribute('hidden');

    var activeInputs = replacementRow.querySelectorAll('input, select');
    dataToSend["id"] = contactID;
    Array.from(activeInputs).forEach(function (field)
    {
        preEditedValues[field.id] = field.value;
    });

    document.querySelector('#contentArea').style.marginLeft = '30%';
    document.querySelector('#contentArea').style.marginRight = '30%';

}

function deleteContact()
{
    if(confirm("You are about to DELETE the record of " + globalData.first_name + " " + globalData.last_name + ". " +
        "Are you sure you want to do this?"))
    {


        $.ajax({
            url: 'https://challenge.acstechnologies.com/api/contact/' + contactID,
            type: 'DELETE',
            headers: {"X-Auth-Token": "jaLXjbyj5vPfcBhkn8G64sRNs8be6GwRgqPOvGHk"},
            success: function (data)
            {
                alert("Record successfully deleted");
            },
            error: function ()
            {
                alert("There was an error removing this record. Please try again later.")
            }
        });
    }
    else
    {
        //do nothing.
    }
}