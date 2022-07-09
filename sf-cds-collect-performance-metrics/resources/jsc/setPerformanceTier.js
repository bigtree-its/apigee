var isPublicEndpoint = (context.getVariable("isPublicEndpoint") === 'true');
var isAuthEndpoint = (context.getVariable("isAuthEndpoint") === 'true');
var isCustomerPresent = context.getVariable("isCustomerPresent") === true;
var basepath = context.getVariable("proxy.basepath");
var pathsuffix = context.getVariable("proxy.pathsuffix");

var performanceTier = "";
var highPriority = "highPriority";
var lowPriority = "lowPriority";
var largePayload = "largePayload";
var unauthenticated = "unauthenticated";
var unattended = "unattended";

checkPublicEndpoint();
checkAuthEndpoint();
checkDcrOrDisovery();
checkCustomers();
checkAccounts();
checkOtherCases();

context.setVariable("performanceTier", performanceTier);

function checkPublicEndpoint() {
    if(tierProcessed()) {
        return;
    }
    if(isPublicEndpoint) {
        performanceTier = unauthenticated;
    }
}

function checkAuthEndpoint() {
    if(tierProcessed()) {
        return;
    }
    if(isAuthEndpoint) {
        performanceTier = highPriority;
    }
}

function checkDcrOrDisovery() {
    if(tierProcessed()) {
        return;
    }
    if(basepath === "/*/register" || basepath === "/*/cds-au/v1/discovery") {
        performanceTier = highPriority;
    }
}

function checkCustomers() {
    if(tierProcessed()) {
        return;
    }
    if(basepath === "/*/cds-au/v1/common"){
        if(isCustomerPresent) {
            performanceTier = highPriority;
        }else {
            performanceTier = unattended;
        }
    }
}

function checkAccounts() {
    if(tierProcessed()) {
        return;
    }
    if(basepath === "/*/cds-au/v1/banking/accounts"){
        if(pathsuffix === "") {
            if(isCustomerPresent) {
                performanceTier = highPriority;
            }else {
                performanceTier = unattended;
            }
        } else if(pathsuffix === "/direct-debits"){
            if(isCustomerPresent) {
               performanceTier = lowPriority;
            }else {
                performanceTier = largePayload;
            }
        }
    }
}

function checkOtherCases() {
    if(tierProcessed()) {
        return;
    }
    if(isCustomerPresent) {
        performanceTier = lowPriority;
    }else {
        performanceTier = unattended;
    }

}

function tierProcessed(){
    return performanceTier !== "";
}

