(function () {

    var limit = 10;
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex, s, listOfUsedValues;

    try{
        listOfUsedValues = JSON.parse(localStorage.getItem("used")) || [];
    }catch(e){
        listOfUsedValues = [];
    }


    function setValue(v) {
        if (typeof(Storage) !== "undefined") {
            listOfUsedValues.push(v);
            localStorage.setItem("used", JSON.stringify(listOfUsedValues));
        } else {
            listOfUsedValues.push(v);
        }
    }


    function generateColor() {
        hex = "#";
        length = 6;
        while (length > 0) {
            hex += chars[(Math.random() * 16) | 0];
            length--
        }
        return hex;
    }

    function getUniqueColor() {
        while (true) {
            rnd = generateColor();
            if (listOfUsedValues.indexOf(rnd) == -1) {
                setValue(rnd);
                return hex;
            }
        }
    }

    function changeBackground() {
        var color = getUniqueColor();
        document.body.style.backgroundColor = color;
        limit--;
    }


    changeBackground();
    s = setInterval(function () {
        changeBackground();
        if (limit < 1) {
            clearInterval(s);
        }
    }, 1000);
})();