var globalData;             // Allows the received json data to be used throughout this file.
var dataToSend = {};        // This will hold the updated contact info to be sent (PUT) to the server.
var contactID;              // Holds the ID of the contact to edit.
var preEditedValues = {};   // Holds all the pre-edited values, just in case the user doesn't want to save the changes.

/**
 * Purpose: Loads a contact based on the ID passed in via the URL parameter. Fills in the Forms and the
 *          Display information.
 */
$(document).ready(function ()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    contactID = url.searchParams.get("id");

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {
        document.querySelector('#contentArea').style.marginLeft = '20%';
        document.querySelector('#contentArea').style.marginRight = '20%';
    }

    document.querySelector('#id').value = contactID;
    $.ajax({
        url: 'https://challenge.acstechnologies.com/api/contact/10118',
        dataType: 'json',
        type: 'GET',
        headers: {"X-Auth-Token": "jaLXjbyj5vPfcBhkn8G64sRNs8be6GwRgqPOvGHk"},
        // On success, fill the displays and the input forms.
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
        // On failure, tell the user that the contact wasn't found and prompt to choose one on the viewcontacts.html.
        error: function ()
        {
            document.querySelector('#addContact').remove();
            document.querySelector('#deleteBtn').remove();
            document.querySelector('#contentArea').firstElementChild.innerHTML = "No contact was not found. If you would like " +
                "to edit a contact please choose one on <a href='viewcontacts.html'>this page";
        }
    });
});

/**
 * Function:    editBtnClick
 * Purpose:     Checks to see if there are any currently-open editable rows--if so, check if their data has been
 *              changed. If there is changed data in another open-edit row, ask the user if they want to discard
 *              the changes. If no, do nothing--if so, discard the changes, close the open edit-row and open
 *              the newly selected edit-row. If there are no open rows or changes, simply open up the new edit
 *              row and hide the display-version of the row.
 * @param element
 */
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



    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {
        document.querySelector('#contentArea').style.marginLeft = '0%';
        document.querySelector('#contentArea').style.marginRight = '0%';
    }
    else
    {
        document.querySelector('#contentArea').style.marginLeft = '10%';
        document.querySelector('#contentArea').style.marginRight = '10%';
    }


}

/**
 * Function:    saveBtnClick
 * Purpose:     As suggested by the name, this function fires on clicking one of the save buttons. All of the
 *              values in the Input Fields are taken and PUT to the API to update the designated contact, identified
 *              by the ID in the URL.
 * @param element
 */
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
            //resize the window back to the display-mode.
            window.location.assign("editcontact.html?id=" + contactID);

        },
        error: function ()
        {
            alert("Failed to Edit Contact: " + document.getElementById("first_name").value);
        }
    });
}

/**
 * Function:    cancelBtnClick
 * Purpose:     As the name suggests, this function is called when the user clicks on one of the cancel buttons.
 *              This button will restore the row back to display-mode and revert the input form values back to their
 *              pre-edited versions.
 * @param element
 */
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

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {
        document.querySelector('#contentArea').style.marginLeft = '20%';
        document.querySelector('#contentArea').style.marginRight = '20%';
    }
    else
    {
        document.querySelector('#contentArea').style.marginLeft = '30%';
        document.querySelector('#contentArea').style.marginRight = '30%';
    }


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