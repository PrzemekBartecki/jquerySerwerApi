import 'bootstrap'
import './scss/index.scss'


$.ajax({
        url: "http://localhost:4454/servers",
        method: "get",
        dataType: "json"
    })
    .done(res => {
        const $serwersArray = res;

        let $serversNubmer = $serwersArray.length
        const $placeNumberSerwers = $("#numberSerwers span")
        $placeNumberSerwers.append($serversNubmer)

        showSerwers($serwersArray)
    });

function showSerwers(array) {
    array.forEach(el => {
        const $listServers = $(".servers-list")
        const $listServersItem = $(
            `<div class='servers-list-item'>
                    <div class='name'>
                        <p>${el.name}</p>
                    </div>
                    <div class='status'>
                        <p>${el.status}</p>
                    </div>
                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <span></span>
                     <span></span>
                     <span></span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <ul id="${el.id}">

                  </ul>
                    </div>
                  </div>
                </div>`
        );
        $listServers.append($listServersItem);
    });

    addClass();
    checkBtn();
    switchStatus();

}

function addClass() {

    $(".servers-list-item .status p").filter(function () {
        return $(this).text() === "ONLINE"
    }).addClass("online");

    $(".servers-list-item .status p").filter(function () {
        return $(this).text() === "OFFLINE"
    }).addClass("offline")

    $(".servers-list-item .status p").filter(function () {
        return $(this).text() === "REBOOTING"
    }).addClass("rebbooting")
}

function checkBtn() {
    let $btn = $(".dropdown button");
console.log('button isrtnieje ?', $btn);


    $btn.click(function () {

        let $test = $(this).parents(".servers-list-item")

        if ($test.find(".status p").text() === "ONLINE") {
            let $list = $(".dropdown-menu ul")
            $list.find("li").remove();

            $list.append(
                `<li class="turn-off">Turn off</li>
                 <li class="reboot">Reboot</li>`
            );
            switchStatus();

        } else if ($test.find(".status p").text() === "OFFLINE") {
            let $list = $(".dropdown-menu ul")
            $list.find("li").remove();
            $list.append(`<li class="turn-on">Turn on</li>`);
        }
    })


}

function switchStatus() {
    let $offLine = $(".turn-off");
    let $onLine = $(".dropdown-menu .turn-on");

    $onLine.click(function() {
        console.log('działa on',  $(this))
})

    $offLine.click(function() {
        console.log('działa off',  $(this))

        let $id = $(this).parents("ul").attr('id')

        $.ajax({
            url: "http://localhost:4454/servers/" + $id + "/off",
            method: "put",
            dataType: "json",
            contentType: "application/json",
            data: {
                status: "OFFLINE",
            }
        })
        .done(res => {
            console.log(res);
        });

    })

    // $onLine.click(function() {
    //     console.log('działa on',  $(this))

    //     $.ajax({
    //         url: "http://localhost:4454/servers/2/on",
    //         method: "put",
    //         dataType: "json",
    //         contentType: "application/json",
    //         data: {
    //             status: "ONLINE",
    //         }
    //     })
    //     .done(res => {
    //         console.log(res);
    //     });
    // })

}



console.log($().jquery)
