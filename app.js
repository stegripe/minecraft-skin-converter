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
    saveButton.addEventListener("click", saveImg2File);
    resetButton.addEventListener("click", loadFile2Img);

    function loadFile2Img(file) {
        var file = fileElem.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => imgMon.src = imgElem.src = reader.result;
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
        processImg(() => {
            shift(55, 16, 1, 32, -1);
            shift(51, 16, 1, 4, -1);
            shift(51, 32, 1, 4, -1);
            shift(47, 16, 8, 32, -1);
            shift(63, 48, 1, 16, -1);
            shift(59, 48, 1, 4, -1);
            shift(55, 48, 8, 16, -1);
            shift(47, 48, 1, 16, -1);
            shift(43, 48, 1, 4, -1);
            shift(39, 48, 8, 16, -1);
        });
    }

    function processImg(func) {
        saveButton.value = "Processing...";
        func();
        loadCanvas2Img();
        saveButton.value = "Save";
        saveButton.disabled = true;
        resetButton.disabled = true;
    }

    function shift(x, y, w, h, pixelsToMove) {
        var clearx = x - pixelsToMove + ((pixelsToMove < 0) ? w - 1 : 1);
        var data = ctx.getImageData(x, y, w, h);
        ctx.putImageData(data, x + pixelsToMove, y);
        ctx.clearRect(clearx, y, pixelsToMove, h);
    }

    function saveImg2File() {
        downloadAnchor.href = canvas.toDataURL();
        downloadAnchor.click();
    }
})();
