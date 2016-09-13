function init() {
    chrome.storage.local.get(["report"], function(values) {
        var headers = ["TIMESTAMP", "URL", "TITLE", "IsIdle"];
        var arrayLength = values.report.length;
        
        for (var i = 0; i < headers.length-1; i++) {
            document.write(headers[i]);
            document.write(" | ");
        }
        document.write(headers[headers.length-1]);
        document.write("<br>");
        for (var i = 0; i < arrayLength; i++) {
            document.write(values.report[i]);
            document.write("<br>");
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
