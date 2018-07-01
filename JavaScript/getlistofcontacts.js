var globalData;
var numPages;

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

            const prevBtn = document.createElement('a');
            prevBtn.setAttribute('id', 'page_prev')
            prevBtn.classList.add('page-link', 'pageButton');
            prevBtn.innerHTML = "Prev";
            prevBtn.setAttribute('href', 'javascript:;');
            prevItem.appendChild(prevBtn);


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

            document.querySelector('#pageItem_0').classList.add('active');

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

var currentPage = 0;

document.addEventListener('click', function (e)
{
    e = e || window.event;
    if((e.srcElement.id === "page_prev" && currentPage === 0) || (e.srcElement.id === "page_next" && currentPage === numPages - 1))
    {

    }
else
    {
        if (e.srcElement.classList.contains('pageButton'))
        {
            document.getElementById('pageItem_' + currentPage).classList.remove('active');

            var contactsTableBody = document.getElementById('contactsTableBody');

            while (contactsTableBody.firstChild)
            {
                contactsTableBody.removeChild(contactsTableBody.firstChild);
            }

            if (e.srcElement.id.includes('prev'))
            {
                currentPage = parseInt(currentPage) - 1;
            }
            else if (e.srcElement.id.includes('next'))
            {
                currentPage = parseInt(currentPage) + 1;
            }
            else
            {
                currentPage = e.srcElement.id;
                currentPage = currentPage.replace(/\D/g, '');
                currentPage = parseInt(currentPage);
            }
            if (currentPage > 0)
            {
                document.querySelector('#page_prev').classList.remove('disabled');

                if (currentPage === (numPages - 1))
                {
                    document.querySelector('#page_next').classList.add('disabled');
                }
                else
                {
                    document.querySelector('#page_next').classList.remove('disabled');
                }
            }
            else if (currentPage === 0)
            {
                document.querySelector('#page_next').classList.remove('disabled');

                document.querySelector('#page_prev').classList.add('disabled');
            }


            var listEnd = 10 * (currentPage + 1);
            var numContactsLeft = 0;
            var listBegin = listEnd - 10;
            if (listEnd > globalData.data.length)
            {
                numContactsLeft = 10 - (listEnd - globalData.data.length);
                listEnd = globalData.data.length;
                listBegin = listEnd - numContactsLeft;
            }
            for (var x = listBegin; x < listEnd; x++)
            {
                populatePagination(x, contactsTableBody);
            }

            $('#contactsTableBody tr').click(function ()
            {
                var contactID = $(this).children(".idCell").html();

                window.location.assign("editcontact.html?id=" + contactID);
            });

            document.getElementById('pageItem_' + currentPage).classList.add('active');
        }
    }

}, false);