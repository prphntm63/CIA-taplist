let sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbvLupB5h6c_Nx_gS9ogQDHt_ZkyrQnjMYi5YTs8fMknZ6dDXZGXy-X4N5_acu6jqxvW5TiOEO-Fql/pub?gid=0&single=true&output=csv"

$(document).ready(function() {
    getAndUpdateTapData(sheetURL)

})

function getAndUpdateTapData(sheetURL) {
    $.ajax(sheetURL).done(function(resultCSV){

        let tapObject = parseTapData(resultCSV)
        let htmlOut = '';

        tapObject.forEach(tap => {
            htmlOut += `
                <li class="list-group-item brew">
                    <div class="brew-tap">
                        <h5>TAP</h5>
                        <h1>${tap.Tap ? tap.Tap : '-'}</h1>
                    </div>
                    <div class="brew-description">
                        <h4>${tap.Beer ? tap.Beer.toUpperCase() : '-'}</h4>
                        <h5>BREWED BY: ${tap.Brewer ? tap.Brewer.toUpperCase() : '-'}</h5>
                        <p>${tap.Description ? tap.Description : '-'}</p>
                    </div>
                    <div class="brew-stats">
                        <div>
                            <h5>ABV</h5>
                            <h4>${tap.ABV ? tap.ABV : '-'}</h3>
                        </div>
                        <div>
                            <h5>OG</h5>
                            <h4>${tap.OG ? tap.OG : '-'}</h3>
                        </div>
                        <div>
                            <h5>FG</h5>
                            <h4>${tap.FG ? tap.FG : '-'}</h3>
                        </div>
                        <div>
                            <h5>IBU</h5>
                            <h4>${tap.IBU ? tap.IBU : '-'}</h3>
                        </div>
                        <div>
                            <h5>SRM</h5>
                            <h4>${tap.SRM ? tap.SRM : '-'}</h3>
                        </div>
                            
                    </div>

                </li>
            `
        })

        $('#tapList').append(htmlOut)
        

    });

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