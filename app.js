;
(() => {
    // Init
    var fileElem = document.getElementById("fileElem");
    var imgElem = document.getElementById("imgElem");
    var s2aButton = document.getElementById("s2aButton");
    var saveButton = document.getElementById("saveButton");
    var resetButton = document.getElementById("resetButton");
    var downloadAnchor = document.getElementById("downloadAnchor");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // Events
    window.addEventListener("load", loadImg2Canvas);
    fileElem.addEventListener("change", loadFile2Img);
    imgElem.addEventListener("load", loadImg2Canvas);
    s2aButton.addEventListener("click", s2a);
    saveButton.addEventListener("click", saveImg2File);
    resetButton.addEventListener("click", loadFile2Img);

    function loadFile2Img(file) {
        var file = fileElem.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => imgElem.src = reader.result;
    }

    function loadImg2Canvas() {
        canvas.width = imgElem.width;
        canvas.height = imgElem.height;
        ctx.drawImage(imgElem, 0, 0);
    }

    function loadCanvas2Img() {
        imgMon.src = imgElem.src = canvas.toDataURL();
    }

    function s2a() {
        processImg(() => {
            ctx.fillRect(0, 0, 10, 10);
        });
    }

    function processImg(func) {
        saveButton.value = "Processing...";
        func();
        loadCanvas2Img();
        saveButton.value = "Save";
        saveButton.disabled = false;
        resetButton.disabled = false;
    }

    function saveImg2File() {
        downloadAnchor.href = canvas.toDataURL();
        downloadAnchor.click();
    }
})();
