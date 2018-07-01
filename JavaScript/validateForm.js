function validateForm()
{
if ($("#addContact")[0].checkValidity() === true)
{
    var passwordsMatch = true;
    var foundEmptyField = false;
    var inputForms = document.getElementById("addContact").querySelectorAll("input");


    Array.from(inputForms).forEach(function (field)
    {


        const strValue = "" + field.value;
        if (strValue === null || strValue === '')
        {
            foundEmptyField = true;
            return;
        }

    });

    if (foundEmptyField)
    {
        alert("Please Enter Values for All of the Fields");
    }

    if (document.querySelector('#password').value !== document.querySelector('#confirmPassword').value)
    {
        passwordsMatch = false;
        alert("The Passwords do not match!");
    }

    if (passwordsMatch && !foundEmptyField)
    {
        return true;
    }
}}