/**
 * Function: validateForm
 * Programmer:  Brandon L. Campbell
 * Date:        June-July, 2018
 * Purpose:     Checks all of the inputs within the #addContact area to make sure at least something was
 *              input into them.
 * @returns {boolean}
 */
function validateForm()
{
if ($("#addContact")[0].checkValidity() === true)
{
    var foundEmptyField = false;
    var inputForms = document.getElementById("addContact").querySelectorAll("input");


    Array.from(inputForms).forEach(function (field)
    {
        const strValue = "" + field.value;
        if (strValue === null || strValue === '')
        {
            foundEmptyField = true;
        }
    });

    if (foundEmptyField)
    {
        alert("Please Enter Values for All of the Fields");
    }


    if (!foundEmptyField)
    {
        return true;
    }
}}