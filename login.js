$(document).ready(function() {
    let editSheet = 'https://docs.google.com/spreadsheets/d/1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E/edit#gid=0';

    $('#submit').on('click', goToTaps)
    
    function goToTaps(event) {
        event.preventDefault();

        if (($('#username').val() === 'CIA') && ($('#password').val() === 'CIAlers')) {
            window.open(editSheet)
        }
    }

})

