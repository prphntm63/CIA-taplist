$(document).ready(function() {
    // let editSheet = 'https://docs.google.com/spreadsheets/d/1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E/edit#gid=0';
    let formURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbvLupB5h6c_Nx_gS9ogQDHt_ZkyrQnjMYi5YTs8fMknZ6dDXZGXy-X4N5_acu6jqxvW5TiOEO-Fql/pub?gid=505107533&single=true&output=csv';
    let sheetURL = "https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSbvLupB5h6c_Nx_gS9ogQDHt_ZkyrQnjMYi5YTs8fMknZ6dDXZGXy-X4N5_acu6jqxvW5TiOEO-Fql/pub?gid=0&single=true&output=csv"


    $('#submit').on('click', goToTaps)
    
    function goToTaps(event) {
        event.preventDefault();

        if (($('#username').val() === 'CIA') && ($('#password').val() === 'CIAlers')) {
            // window.open(editSheet)
            generateTapOptions()
        }
    }

    function generateTapOptions() {
        $('#titleBar').html('Change Taps ...')
        $('#login').hide()

        $.ajax({
            url: sheetURL,
            headers: {
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache"
            }
        
        }).done(function(resultCSV){

            let tapObject = parseTapData(resultCSV)

            $.ajax(formURL).done(function(resultCSV){

                let onDeck = parseTapData(resultCSV)
                
                let htmlOut = ''
                for (let tap=0; tap<8; tap++) {
                    htmlOut += `<div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <label class="input-group-text" for="${'tap'+tap}">Tap ${tap+1}</label>
                                        </div>
                                        <select class="form-control form-control-lg" id="${'tap'+tap}">`
                    onDeck.forEach(brew => {
                        htmlOut += `<option ${(tapObject[tap].Beer === brew['Beer Name']) ? 'selected' : ''}>${brew['Beer Name'] ? brew['Beer Name'] : '-'}</option>`
                    })

                    htmlOut += '</select></div></div>'

                }

                htmlOut += '<button type="button" id="changeTaps">Submit Changes</button>'
                
                $('#listings').html(htmlOut)
                $('#changeTaps').on('click', pushToGoogleSheets)
            })
        })

    }

    function pushToGoogleSheets() {
        let data = {
            "tap1":$('#tap0').val(),
            "tap2":$('#tap1').val(),
            "tap3":$('#tap2').val(),
            "tap4":$('#tap3').val(),
            "tap5":$('#tap4').val(),
            "tap6":$('#tap5').val(),
            "tap7":$('#tap6').val(),
            "tap8":$('#tap7').val(),
        }

        // https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/

        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzZDoojn0OeYx41eU9vcSJJS0q7MM4yYM4aLnVqnQ/exec",
            type: "POST",
            data: data,
            contentType: "application/javascript",
            dataType: 'jsonp',
            crossDomain:true,
          })
          .done(function(res) {
            console.log('success')
            window.location.replace("index.html")
          })
          .fail(function(e) {
            console.log('fail')
            window.location.replace("index.html")
          });
          
          window.receipt = function(res) {
            console.log('We got here boiz')
          }
    }

    function parseTapData(tapCSV) {
        let tapsArray = tapCSV.split('\n')
        let headerCSV = tapsArray.shift()
        let header = headerCSV.split(',')
    
        
        let taps = []
        tapsArray.forEach(tap => {
            let tapObject = {};
            let tapFields = tap.split(',')
            
            for (let idx=0; idx<header.length; idx++) {
                tapObject[header[idx]] = tapFields[idx]
                
            }
            
            taps.push(tapObject)
        })
    
        return taps
    
    }

})

