$(document).ready(function() {
    // let editSheet = 'https://docs.google.com/spreadsheets/d/1y2t5XG_PkP_vOl66ghIpP1yk6WuhaZ0u8bPeNA-vo8E/edit#gid=0';
    // let formURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSbvLupB5h6c_Nx_gS9ogQDHt_ZkyrQnjMYi5YTs8fMknZ6dDXZGXy-X4N5_acu6jqxvW5TiOEO-Fql/pub?gid=505107533&single=true&output=csv';
    // let sheetURL = "https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSbvLupB5h6c_Nx_gS9ogQDHt_ZkyrQnjMYi5YTs8fMknZ6dDXZGXy-X4N5_acu6jqxvW5TiOEO-Fql/pub?gid=0&single=true&output=csv"
    // let sheetScript = "https://script.google.com/macros/s/AKfycbzZDoojn0OeYx41eU9vcSJJS0q7MM4yYM4aLnVqnQ/exec"
    // updated deploy let sheetScript = 'https://script.google.com/macros/s/AKfycbxhoWjHri2KtDWyI3bAkv6fZl3i4l2en4GSf6q9qf3ST9HIiyu2nXkooyXyK_zMYc9GOg/exec'
    let sheetScript = "https://script.google.com/macros/s/AKfycbzFhN3mzGtGAel8vfd75M_-Wpu7Q_U7U-kknuoGdovVaN5eYE4pHzJ6BxQAncIiDqZnCw/exec"

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
            url: sheetScript
        
        }).done(function(resultCSV){

            let tapData = parseTapData(resultCSV)
            let tapObject = tapData.onTap;
            let onDeck = tapData.onDeck;
                
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
            url: sheetScript,
            type: "POST",
            data: data,
            contentType: "application/javascript",
            dataType: 'jsonp',
            crossDomain:true,
          })
          .done(function(res) {
            console.log('success')
            // window.location.replace("index.html")
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
        
        let tapsArray = tapCSV.tapData
        let tapsHeader = tapCSV.tapData.shift()
    
        
        let taps = []
        tapsArray.forEach(tap => {
            let tapObject = {};
            
            for (let idx=0; idx<tapsHeader.length; idx++) {
                tapObject[tapsHeader[idx]] = tap[idx]
                
            }
            
            taps.push(tapObject)
        })

        let onDeckArray = tapCSV.formData
        let onDeckHeader = tapCSV.formData.shift()
    
        
        let onDeck = []
        onDeckArray.forEach(tap => {
            let tapObject = {};
            
            for (let idx=0; idx<onDeckHeader.length; idx++) {
                tapObject[onDeckHeader[idx]] = tap[idx]
                
            }
            
            onDeck.push(tapObject)
        })

        return {
            "onTap":taps,
            "onDeck":onDeck
        }
    }

})

