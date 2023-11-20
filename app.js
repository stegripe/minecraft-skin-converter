;
(() => {
    const CI = [
        [55, 16, 1, 32],
        [51, 16, 1, 4],
        [51, 32, 1, 4],
        [47, 16, 8, 32],
        [63, 48, 1, 16],
        [59, 48, 1, 4],
        [55, 48, 8, 16],
        [47, 48, 1, 16],
        [43, 48, 1, 4],
        [39, 48, 8, 16]
    ];
    // Init
    var fileElem = document.getElementById("fileElem");
    var imgElem = document.getElementById("imgElem");
    var s2aSButton = document.getElementById("s2aSButton");
    var s2aCButton = document.getElementById("s2aCButton");
    var a2sFButton = document.getElementById("a2sFButton");
    var a2sSButton = document.getElementById("a2sSButton");
    var saveButton = document.getElementById("saveButton");
    var resetButton = document.getElementById("resetButton");
    var downloadAnchor = document.getElementById("downloadAnchor");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // Events
    window.addEventListener("load", loadImg2Canvas);
    fileElem.addEventListener("change", loadFile2Img);
    imgElem.addEventListener("load", loadImg2Canvas);
    s2aSButton.addEventListener("click", s2aS);
    s2aCButton.addEventListener("click", s2aC);
    a2sFButton.addEventListener("click", a2sF);
    a2sSButton.addEventListener("click", a2sS);
    saveButton.addEventListener("click", saveImg2File);
    resetButton.addEventListener("click", loadFile2Img);

    function classElemEnable(className, enabled = true) { // enables / disables elements of a class
        Array.from(document.getElementsByClassName(className)).forEach((b) => b.disabled = !enabled);
    }

    function loadFile2Img(file) {
        var file = fileElem.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => imgMon.src = imgElem.src = reader.result;
        classElemEnable("procBtn");
        classElemEnable("ActionBtn", false);
    }

    function loadImg2Canvas() {
        canvas.width = imgElem.width;
        canvas.height = imgElem.height;
        ctx.drawImage(imgElem, 0, 0);
    }

    function loadCanvas2Img() {
        imgMon.src = imgElem.src = canvas.toDataURL();
    }

    function s2aS() {
        processImg(() => CI.forEach((v) => shift(v[0], v[1], v[2], v[3], -1)));
    }

    function s2aC() {
        processImg(() => {
            CI.forEach((v) => {
                if (v[2] > 1) shift(v[0] + 1, v[1], v[2] - 1, v[3], -1);
            });
            CI.forEach((v) => {
                if (v[2] == 1) ctx.clearRect(v[0] - 1, v[1], v[2] + 1, v[3]);
            });
        });
    }

    function a2sF() {
        processImg(() => CI.slice().reverse().forEach((v) => shift(v[0] - 1, v[1], v[2], v[3], 1, true)));
    }

    function a2sS() {
        processImg(() => CI.slice().reverse().forEach((v) => shift(v[0] - 2, v[1], v[2] + 1, v[3], 1, true)));
    }

    function processImg(func) {
        saveButton.value = "Processing...";
        func();
        loadCanvas2Img();
        saveButton.value = "Save";
        classElemEnable("procBtn", false);
        classElemEnable("ActionBtn");
    }

    function shift(x, y, w, h, pixelsToMove, copyMode = false) {
        var clearx = x - pixelsToMove + ((pixelsToMove < 0) ? w - 1 : 1);
        var data = ctx.getImageData(x, y, w, h);
        ctx.putImageData(data, x + pixelsToMove, y);
        if (!copyMode) ctx.clearRect(clearx, y, pixelsToMove, h);
    }

    function saveImg2File() {
        downloadAnchor.href = canvas.toDataURL();
        downloadAnchor.click();
    }
})();