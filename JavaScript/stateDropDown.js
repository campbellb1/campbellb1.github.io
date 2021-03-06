/**
 * Function:    fillStates
 * Programmer:  Brandon L. Campbell
 * Date:        June-July, 2018
 * Purpose:     This function fills an element id'd 'state' dropdown box with a list of all the US states.
 */
function fillStates()
{
    var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
        select = document.getElementById( 'state' );

    for(var state in states )
    {
        select.add(new Option(states[state]));
    }
}
