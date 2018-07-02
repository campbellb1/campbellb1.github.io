/**
 * getlistofcontacts.js
 * Programmer:  Brandon L. Campbell
 * Date:        June-July, 2018
 * Purpose:     The purpose of this file is to load the entire list of contacts that is stored in the Contacts Database.
 *              The functions herein create a pagination system that will become populated with 10 contacts per page,
 *              sorted by Last Name. The rows become clickable, leading to the details and edit-view of the chosen
 *              contact.
 */

var globalData;
var numPages;

/**
 * Function:    populatePagination
 * Purpose:     The purpose of this function is to populate the a row with a specified contact's details.
 * @param x --> The index of the contact to create a row for.
 * @param contactsTableBody --> The table that the rows will be appended to.
 */
function populatePagination(x, contactsTableBody)
{
    const tableRow = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.classList.add('idCell');
    idCell.setAttribute('hidden', true);
    const nameCell = document.createElement('td');
    nameCell.classList.add('nameCell');
    const phoneCell = document.createElement('td');
    phoneCell.classList.add('phoneCell');
    const workPhoneCell = document.createElement('td');
    workPhoneCell.classList.add('workPhoneCell');
    const emailCell = document.createElement('td');
    emailCell.classList.add('emailCell');

    tableRow.style.cursor = 'pointer';
    tableRow.classList.add('contactRow');
    nameCell.style.minWidth = '25%';
    phoneCell.style.minWidth = '25%';
    workPhoneCell.style.minWidth = '25%';
    emailCell.style.minWidth = '25%';


    tableRow.style.backgroundColor = "#FFFFF5"

    idCell.textContent = globalData.data[x].id;
    nameCell.textContent = globalData.data[x].first_name + " " + globalData.data[x].last_name;
    phoneCell.textContent = globalData.data[x].phone;
    workPhoneCell.textContent = globalData.data[x].work_phone;
    emailCell.textContent = globalData.data[x].email;

    contactsTableBody.appendChild(tableRow);
    tableRow.appendChild(idCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(phoneCell);
    tableRow.appendChild(workPhoneCell);
    tableRow.appendChild(emailCell);

}

/**
 * Purpose:     This function queries the Contacts API for a list of all the contacts in the Contacts database. On a
 *              successful GET, the pagination system is built and the first 10 contacts (according to last name)
 *              are loaded onto the page.
 */
$(document).ready(function ()
{
    $.ajax({
        url: 'https://challenge.acstechnologies.com/api/contact/?sort=last_name',
        dataType: 'json',
        type: 'GET',
        headers: {"X-Auth-Token": "jaLXjbyj5vPfcBhkn8G64sRNs8be6GwRgqPOvGHk"},
        success: function (data)
        {
            globalData = data;
            const contentArea = document.querySelector('#contentArea');

            const paginationNav = document.createElement('nav');
            paginationNav.setAttribute('aria-label', 'Contact List');

            const pageList = document.createElement('ul');
            pageList.classList.add('pagination', 'justify-content-center');


            contentArea.appendChild(paginationNav);
            paginationNav.appendChild(pageList);

            // CREATE TABLE ----------------------
            const contactsTable = document.createElement('table');
            contactsTable.classList.add('table', 'table-bordered');
            contactsTable.setAttribute('id', 'contactsTable');

            const contactsTableHead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.style.backgroundColor = '#B1B17A';
            const nameHead = document.createElement('td');
            nameHead.innerHTML = 'Name';
            const phoneHead = document.createElement('td');
            phoneHead.innerHTML = 'Phone';
            const workPhoneHead = document.createElement('td');
            workPhoneHead.innerHTML = 'Work Phone';
            const emailHead = document.createElement('td');
            emailHead.innerHTML = 'Email';

            headerRow.appendChild(nameHead);
            headerRow.appendChild(phoneHead);
            headerRow.appendChild(workPhoneHead);
            headerRow.appendChild(emailHead);

            contactsTableHead.appendChild(headerRow);

            const contactsTableBody = document.createElement('tbody');
            contactsTableBody.classList.add('hoverRows');
            contactsTableBody.setAttribute('id', 'contactsTableBody');

            contentArea.appendChild(contactsTable);
            contactsTable.appendChild(contactsTableHead);
            contactsTable.appendChild(contactsTableBody);

            // CREATE PAGE BUTTONS ---------------------

            numPages = Math.ceil(data.data.length / 10); // Determine needed pages if (10 contacts/page)

            const prevItem = document.createElement('li');
            prevItem.classList.add('page-item', 'disabled');
            prevItem.setAttribute('id', 'page_prev');
            pageList.appendChild(prevItem);

            // Create the "Prev" page button.
            const prevBtn = document.createElement('a');
            prevBtn.setAttribute('id', 'page_prev')
            prevBtn.classList.add('page-link', 'pageButton');
            prevBtn.innerHTML = "Prev";
            prevBtn.setAttribute('href', 'javascript:;');
            prevItem.appendChild(prevBtn);

            // Load in the buttons and links for the 'pages' needed.
            for (var x = 0; x < numPages; x++)
            {
                const pageItem = document.createElement('li');
                pageItem.setAttribute('id', 'pageItem_' + x);
                pageItem.classList.add('page-item');
                pageList.appendChild(pageItem);

                const pageBtn = document.createElement('a');
                pageBtn.classList.add('page-link', 'pageButton');
                pageBtn.setAttribute('href', 'javascript:;');
                pageBtn.setAttribute('id', 'page_' + x);
                pageBtn.innerHTML = (x + 1).toString();
                pageItem.appendChild(pageBtn);
            }

            // The initial page, 0, is the active page.
            document.querySelector('#pageItem_0').classList.add('active');

            //Create the "Next" page button.
            const nextItem = document.createElement('li');
            nextItem.classList.add('page-item');
            nextItem.setAttribute('id', 'page_next');
            pageList.appendChild(nextItem);

            const nextBtn = document.createElement('a');
            nextBtn.setAttribute('id', 'page_next')
            nextBtn.classList.add('page-link', 'pageButton');
            nextBtn.innerHTML = "Next";
            nextBtn.setAttribute('href', 'javascript:;');
            nextItem.appendChild(nextBtn);

            // FILL THE TABLE WITH THE FIRST TEN CONTACTS
            for (x = 0; x < 10; x++)
            {
                populatePagination(x, contactsTableBody);
            }
            $('#contactsTableBody tr').click(function ()
            {
                var contactID = $(this).children(".idCell").html();

                window.location.assign("editcontact.html?id=" + contactID);
            });
        },
        error: function ()
        {
            alert("Failed to load Contact List");
        }
    });

});

var currentPage = 0; // Keeps track of the current page. Start at 0.

/**
 * Purpose:     This function handles all of the buttons in the header of the pagination system: Prev, Next, and the
 *              specific page buttons.
 */
document.addEventListener('click', function (e)
{
    e = e || window.event;
    // if the user pressed an invalid choice, such as the Prev button when the current page is 0, or vice-versa.
    if((e.srcElement.id === "page_prev" && currentPage === 0) || (e.srcElement.id === "page_next" && currentPage === numPages - 1))
    {

    }
else // if the choice was valid, then determine which records need to be loaded.
    {
        // If the button pressed was a pagination button. . .
        if (e.srcElement.classList.contains('pageButton'))
        {
            // remove the active class from the former page.
            document.getElementById('pageItem_' + currentPage).classList.remove('active');

            var contactsTableBody = document.getElementById('contactsTableBody');

            // remove all the currently displayed records.
            while (contactsTableBody.firstChild)
            {
                contactsTableBody.removeChild(contactsTableBody.firstChild);
            }

            // if the user pressed the Previous button . . .
            if (e.srcElement.id.includes('prev'))
            {
                // decrement the current page.
                currentPage = parseInt(currentPage) - 1;
            }
            else if (e.srcElement.id.includes('next')) //if the Next button was pressed . . .
            {
                // increment the current page.
                currentPage = parseInt(currentPage) + 1;
            }
            else // otherwise a specific page button was pressed.
            {
                currentPage = e.srcElement.id;
                currentPage = currentPage.replace(/\D/g, ''); // Grab only the number value of the selected page.
                currentPage = parseInt(currentPage);
            }
            if (currentPage > 0) // if the page number is greater than 0 . . .
            {
                // reactivate the previous page button.
                document.querySelector('#page_prev').classList.remove('disabled');

                // if the current page is the last page . . .
                if (currentPage === (numPages - 1))
                {
                    // disable the next page button.
                    document.querySelector('#page_next').classList.add('disabled');
                }
                else
                {
                    // otherwise make sure the next page button was activated.
                    document.querySelector('#page_next').classList.remove('disabled');
                }
            }
            else if (currentPage === 0) // if the current page is 0 . . .
            {
                // activate the next page button.
                document.querySelector('#page_next').classList.remove('disabled');

                // deactivate the previous page button.
                document.querySelector('#page_prev').classList.add('disabled');
            }


            var listEnd = 10 * (currentPage + 1); // determine where the current list of contacts should end.
            var numContactsLeft = 0; // will hold the number of contacts left to display (if applicable)
            var listBegin = listEnd - 10;   //Provided we aren't less than 10 away from the end, the beginning should be end -10.
            if (listEnd > globalData.data.length) // if we are less than 10 away from the end, recalculate the listEnd and listBegin.
            {
                numContactsLeft = 10 - (listEnd - globalData.data.length);
                listEnd = globalData.data.length;
                listBegin = listEnd - numContactsLeft;
            }
            //populate the page with the contacts as determined by the prior code.
            for (var x = listBegin; x < listEnd; x++)
            {
                populatePagination(x, contactsTableBody);
            }
            // Set up the hyperlinks that will link each contact's row with their edit page.
            $('#contactsTableBody tr').click(function ()
            {
                var contactID = $(this).children(".idCell").html();

                window.location.assign("editcontact.html?id=" + contactID);
            });
            // Make the current page show as active via the pagination button.
            document.getElementById('pageItem_' + currentPage).classList.add('active');
        }
    }

}, false);