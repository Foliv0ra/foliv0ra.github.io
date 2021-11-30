var Calender = /** @class */ (function () {
    function Calender(calDate, calDoors) {
        this.calDate = calDate;
        this.calDoors = calDoors;
        this.giftWrap = document.getElementById("giftWrap");
        this.noScroll = document.getElementById("outer");
        this.date = calDate;
        this.doors = calDoors;
        this.fetchJson();
        this.bindEvents();
    }
    Calender.prototype.bindEvents = function () {
        for (var i = 0; i < this.doors.length; i++) {
            this.doors[i].addEventListener("click", this.checkWindow.bind(this, this.doors[i]));
            this.giftWrap.addEventListener("click", this.closeWindow);
        }
    };
    Calender.prototype.fetchJson = function () {
        var _this = this;
        var host = window.location.host;
        console.log(host);
        fetch('gift.json').then(function (response) {
            return response.json();
        }).then(function (data) {
            _this.gifts = data.gifts;
        })["catch"](function (err) {
            console.log(err);
        });
    };
    Calender.prototype.checkWindow = function (door) {
        var subString = door.id.substring(4);
        var thisDate = date.getDate();
        if (subString <= thisDate) {
            console.log('YES');
            door.classList.add('open');
            setTimeout(function () { cal.openWindow(subString); door.classList.add('opened'); }, 2000);
        }
        else {
            console.log('nope');
            door.classList.add('nope');
        }
    };
    Calender.prototype.openWindow = function (openID) {
        var giftSring = "";
        for (var i = 0; i < this.gifts.length; i++) {
            if (this.gifts[i].id == openID) {
                giftSring = "<div id='giftbox' style='font-size:" + this.gifts[i].fontSize + "em;'>" + this.gifts[i].text + "</div>";
                this.giftWrap.classList.add('active');
                this.noScroll.classList.add('noscroll');
                document.body.classList.add('noscroll');
                this.giftWrap.innerHTML = giftSring;
            }
        }
    };
    Calender.prototype.closeWindow = function () {
        this.giftWrap = document.getElementById("giftWrap");
        this.noScroll = document.getElementById("outer");
        this.giftWrap.classList.remove('active');
        this.noScroll.classList.remove('noscroll');
        document.body.classList.remove('noscroll');
    };
    return Calender;
}());
var date = new Date();
var doors = document.getElementsByClassName("door");
var cal = new Calender(date, doors);
