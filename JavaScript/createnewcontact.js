/**
 * createnewcontact.js
 * Programmer:  Brandon L. Campbell
 * Date:        June-July, 2018
 * Purpose:     This function sits on the #submitButton and handles the 'click' function.
 *              Once clicked, the information will be validated, and if all of the forms
 *              have input, POST the information to the Contacts API as a json object.
 */
$(function ()
{
    $('#submitButton').on('click', function ()
    {
        if (validateForm())
        {
            $.ajax({
                url: 'https://challenge.acstechnologies.com/api/contact/',
                type: 'POST',
                dataType: 'json',
                data: {
                    first_name: document.querySelector('#firstName').value,
                    last_name: document.querySelector('#lastName').value,
                    company_name: document.querySelector('#company').value,
                    address: document.querySelector('#address').value,
                    city: document.querySelector('#city').value,
                    state: document.querySelector('#state').value,
                    zip: document.querySelector('#zip').value,
                    phone: document.querySelector('#phone').value,
                    work_phone: document.querySelector('#work-phone').value,
                    email: document.querySelector('#email').value,
                    url: document.querySelector('#url').value
                },
                headers: {"X-Auth-Token": "jaLXjbyj5vPfcBhkn8G64sRNs8be6GwRgqPOvGHk"},

                // On Success, hide the input forms and prompt the user as to whether or not
                // they want to create another contact.
                success: function ()
                {
                    document.getElementById("newContactHeader").style.display = "none";
                    document.getElementById("addContact").style.display = "none";

                    var contentArea = document.querySelector('#contentArea');

                    const anotherPrompt = document.createElement('h2');

                    const yesNoForm = document.createElement('form');
                    yesNoForm.setAttribute('action', 'addnewcontact.html');

                    const yesButton = document.createElement('button');
                    yesButton.classList.add('btn', 'btn-primary');
                    yesButton.innerHTML = "Yes";

                    const noButton = document.createElement('button');
                    noButton.classList.add('btn', 'btn-primary');
                    noButton.setAttribute('formaction', 'index.html');
                    noButton.innerHTML = "No";

                    anotherPrompt.innerHTML = "You have successfully added the contact " + document.querySelector('#firstName').value +
                        " " + document.querySelector('#lastName').value + "! Would you like to add another contact?";

                    contentArea.appendChild(anotherPrompt);
                    contentArea.appendChild(yesNoForm);
                    yesNoForm.appendChild(yesButton);
                    yesNoForm.appendChild(noButton);
                },
                error: function ()
                {
                    alert("Failed to create a New Contact with the name: " + document.getElementById("firstName").value);
                }
            });
        }
    })
    ;
})
;


/**
 * Trim any excess whitespace when a user inputs into a form.
 */
$('.form-control').on('blur', function ()
{
    var current_value = $.trim($(this).val());
    $(this).attr('value', current_value);
    this.value = current_value;
});

const submitButton = document.forms['addContact'];

// Prevent button from causing a PostBack.
submitButton.addEventListener('submit', function (e)
{
    e.preventDefault();
});