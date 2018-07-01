/**
 *
 */
$(function ()
{
    $('#submitButton').on('click', function ()
    {
        //     if ($("#addContact")[0].checkValidity() === true)
        //     {
        //         var passwordsMatch = true;
        //         var foundEmptyField = false;
        //         var inputForms = document.getElementById("addContact").querySelectorAll("input");
        //
        //
        //         Array.from(inputForms).forEach(function (field)
        //         {
        //
        //
        //             const strValue = "" + field.value;
        //             if (strValue === null || strValue === '')
        //             {
        //                 foundEmptyField = true;
        //                 return;
        //             }
        //
        //         });
        //
        //         if(foundEmptyField)
        //         {
        //             alert("Please Enter Values for All of the Fields");
        //         }
        //
        //         if (document.querySelector('#password').value !== document.querySelector('#confirmPassword').value)
        //         {
        //             passwordsMatch = false;
        //             alert("The Passwords do not match!");
        //         }
        //
        //         if(passwordsMatch && !foundEmptyField)
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
 *
 */
$('.form-control').on('blur', function ()
{
    var current_value = $.trim($(this).val());
    $(this).attr('value', current_value);
    this.value = current_value;
});

const submitButton = document.forms['addContact'];

submitButton.addEventListener('submit', function (e)
{
    e.preventDefault();
});