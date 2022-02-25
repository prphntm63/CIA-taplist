// let sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbvLupB5h6c_Nx_gS9ogQDHt_ZkyrQnjMYi5YTs8fMknZ6dDXZGXy-X4N5_acu6jqxvW5TiOEO-Fql/pub?gid=0&single=true&output=csv"
// let sheetScript = "https://script.google.com/macros/s/AKfycbzZDoojn0OeYx41eU9vcSJJS0q7MM4yYM4aLnVqnQ/exec"
let sheetScript = "https://script.google.com/macros/s/AKfycbzFhN3mzGtGAel8vfd75M_-Wpu7Q_U7U-kknuoGdovVaN5eYE4pHzJ6BxQAncIiDqZnCw/exec"
// const sheetScript = "https://script.google.com/macros/s/AKfycbwRlxvVL0TYTrGn21coFrOzhsSE0S4GSwh7z8IIQ4Seq5wBY4jE/exec"

// https://cors-anywhere.herokuapp.com/

$(document).ready(function() {
    getAndUpdateTapData(sheetScript)

    setInterval(function() {
        getAndUpdateTapData(sheetScript)
        // console.log('updated')
    }, 30000) // 2.5 min

})

function getAndUpdateTapData(sheetScript) {
    $.ajaxSetup({cache: false})
    $.ajax({
        url: sheetScript
    
    }).done(function(resultCSV){
        // $('#tapList').html('')

        let tapObject = parseTapData(resultCSV)
        let htmlOut = '';
        let htmlOutMobile = '';
        

        tapObject.forEach(tap => {

            tap.OG = String(tap.OG)
            tap.FG = String(tap.FG)
            tap.ABV = String(tap.ABV)
            tap.SRM = String(tap.SRM)
            tap.IBU = String(tap.IBU)

            if (tap.OG && tap.OG.length < 5) {
                tap.OG += '0'.repeat(5 - tap.OG.length)
            } else if (tap.OG.length > 5) {
                tap.OG = tap.OG.slice(0, 5 - tap.OG.length)
            }

            if (tap.FG && tap.FG.length < 5) {
                tap.FG += '0'.repeat(5 - tap.FG.length)
            } else if (tap.FG.length > 5) {
                tap.FG = tap.FG.slice(0, 5 - tap.FG.length)
            }

            let abvDecimal = tap.ABV.split('.')
            if (tap.ABV === '-' || tap.ABV === '') {
                tap.ABV = '-'
            } else if (!abvDecimal[1]) {
                tap.ABV += '.0'
            } else if (abvDecimal[1].length > 1) {
                tap.ABV = tap.ABV.slice(0, 1-abvDecimal[1].length)
            }

            let srmDecimal = tap.SRM.split('.')
            tap.SRM = srmDecimal[0]

            let ibuDecimal = tap.IBU.split('.')
            tap.IBU = ibuDecimal[0]

            htmlOut += `
                <li class="list-group-item brew">
                    <div class="brew-tap">
                        <h5>TAP</h5>
                        <h1 class="tap-number">${tapObject.indexOf(tap) + 1}</h1>
                    </div>
                    <div class="brew-description">
                        <h4>${tap.Beer ? ( tap.Beer === "AllYourMunichAreBelongToUs" ? tap.Beer : tap.Beer.toUpperCase() ) : '-'}</h4>
                        <h5>BREWED BY: ${tap.Brewer ? tap.Brewer.toUpperCase() : '-'}</h5>
                        <p>${tap.Description ? tap.Description : '-'}</p>
                    </div>
                    <div class="brew-stats">
                        <div>
                            <h5>ABV</h5>
                            <h4 class="number">${tap.ABV ? tap.ABV : '-'}</h3>
                        </div>
                        <div>
                            <h5>OG</h5>
                            <h4 class="number">${tap.OG ? tap.OG : '-'}</h3>
                        </div>
                        <div>
                            <h5>FG</h5>
                            <h4 class="number">${tap.FG ? tap.FG : '-'}</h3>
                        </div>
                        <div>
                            <h5>IBU</h5>
                            <h4 class="number">${tap.IBU ? tap.IBU : '-'}</h3>
                        </div>
                        <div>
                            <h5>SRM</h5>
                            <h4 class="number">${tap.SRM ? tap.SRM : '-'}</h3>
                        </div>
                            
                    </div>

                </li>
            `

            htmlOutMobile += `
                <div class="card mobile-card">
                    <div class="card-body">
                        <h5 class="card-title">${tapObject.indexOf(tap) + 1}. ${tap.Beer ? ( tap.Beer === "AllYourMunichAreBelongToUs" ? tap.Beer : tap.Beer.toUpperCase() ) : '-'}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Brewed By: ${tap.Brewer ? tap.Brewer.toUpperCase() : '-'}</h6>
                        <small>${tap.Description ? tap.Description : '-'}</small>
                        <div class="mobile-stat-container">
                            <div class="mobile-stat">
                                <small class="text-muted">ABV</small>
                                <h6>${tap.ABV ? tap.ABV : '-'}</h6>
                            </div>
                            <div class="mobile-stat">
                                <small class="text-muted">OG</small>
                                <h6>${tap.OG ? tap.OG : '-'}</h6>
                            </div>
                            <div class="mobile-stat">
                                <small class="text-muted">FG</small>
                                <h6>${tap.FG ? tap.FG : '-'}</h6>
                            </div>
                            <div class="mobile-stat">
                                <small class="text-muted">IBU</small>
                                <h6>${tap.IBU ? tap.IBU : '-'}</h6>
                            </div>
                            <div class="mobile-stat">
                                <small class="text-muted">SRM</small>
                                <h6>${tap.SRM ? tap.SRM : '-'}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })

        $('#tapList').html(htmlOut)
        $('#tapListMobile').html(htmlOutMobile)
        

    });

}

function parseTapData(tapCSV) {
    // let tapsArray = tapCSV.split('\n')
    // let headerCSV = tapsArray.shift()
    // let header = headerCSV.split(',')
    
    let tapsArray = tapCSV.tapData
    let header = tapCSV.tapData.shift()

    
    let taps = []
    tapsArray.forEach(tap => {
        let tapObject = {};
        // let tapFields = tap.split(',')
        
        for (let idx=0; idx<header.length; idx++) {
            tapObject[header[idx]] = tap[idx]
            
        }
        
        taps.push(tapObject)
    })


    return taps

}
