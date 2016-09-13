
var done_init = false;

function init() {

    if (done_init) { return; }
    done_init = true;
    
    //Set initial state
    chrome.storage.local.set({"isIdle": 0, "report":[]}, function() {});
    
    //Monitor the tab
    chrome.tabs.onActivated.addListener(function(activeInfo){

        chrome.tabs.get(activeInfo.tabId, function(tab){
            chrome.storage.local.set({"url": tab.url, "title": tab.title}, function() {
                // Notify that we saved.
                //alert("save:"+"|url:"+tab.url+"|title:"+tab.title);
            });
        });
    });
    
    var collectActivity = function(){
        chrome.storage.local.get(["url", "title", "isIdle", "report"], function(values) {
            var d = new Date();
            var record = d.toLocaleString() + " | " + values.url + " | " + values.title + " | " + values.isIdle;
            values.report.push(record);
            chrome.storage.local.set({"report": values.report}, function(){
            });
        });
    };
    
    var checkIdle = function(){
        chrome.idle.queryState(60, function(newState){
            if ("active" == newState){
                chrome.storage.local.set({"isIdle": 0}, function() {});
            }else if("idle" == newState){
                chrome.storage.local.set({"isIdle": 1}, function() {});
            }
    });};

    setInterval(checkIdle, 60000);
    setInterval(collectActivity, 10000);
}

document.addEventListener('DOMContentLoaded', init);
