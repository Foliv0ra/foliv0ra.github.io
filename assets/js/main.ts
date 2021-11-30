class Calender {
    date: any;
    doors: any;
    gifts: any;
    giftWrap = document.getElementById("giftWrap");
    noScroll = document.getElementById("outer");
    constructor(public calDate: object, public calDoors: any) {
        this.date = calDate;
        this.doors = calDoors;
        this.fetchJson();
        this.bindEvents();
    }

    bindEvents() {
        for (let i = 0; i < this.doors.length; i++) {
            this.doors[i].addEventListener("click", this.checkWindow.bind(this, this.doors[i]));
            this.giftWrap.addEventListener("click", this.closeWindow);
        }
    }

    fetchJson() {
        let host = window.location.host;
        console.log(host);
        fetch('https://foliv0ra.github.io/gift.json').then(function (response) {
            return response.json();
        }).then(data => {
            this.gifts = data.gifts;
        }).catch(err => {
            console.log(err);
        });
    }

    checkWindow(door: any) {
        let subString: string = door.id.substring(4);
        let thisDate: any = date.getDate();
        if (subString <= thisDate) {
            console.log('YES');
            door.classList.add('open');
            setTimeout(function () { cal.openWindow(subString); door.classList.add('opened') }, 2000);
        } else {
            console.log('nope');
            door.classList.add('nope');
        }

    }

    openWindow(openID: string) {
        let giftSring = "";

        for (let i = 0; i < this.gifts.length; i++) {
            if (this.gifts[i].id == openID) {
                giftSring = "<div id='giftbox' style='font-size:" + this.gifts[i].fontSize + "em;'>" + this.gifts[i].text + "</div>";
                this.giftWrap.classList.add('active');
                this.noScroll.classList.add('noscroll');
                document.body.classList.add('noscroll');
                this.giftWrap.innerHTML = giftSring;

                console.log('check video id');
                console.log(this.gifts[i].videoId);

                if(this.gifts[i].videoId != '') {
                    console.log('got video');
                    this.giftWrap.innerHTML = '<div id="giftbox" style="font-size: ' + this.gifts[i].fontSize + 'em;"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/' + this.gifts[i].videoId +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
                }

            }
        }

    }

    closeWindow() {
        this.giftWrap = document.getElementById("giftWrap");
        this.noScroll = document.getElementById("outer");
        this.giftWrap.classList.remove('active');
        this.noScroll.classList.remove('noscroll');
        document.body.classList.remove('noscroll');
    }
}


let date: any = new Date();
let doors: any = document.getElementsByClassName("door");
let cal = new Calender(date, doors);




