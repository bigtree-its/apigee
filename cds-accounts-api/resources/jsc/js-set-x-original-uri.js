var hostName = context.getVariable("request.header.x-origin-hostname");
if (hostName === null || hostName === '' || hostName === undefined){
    hostName = context.getVariable('request.header.Host');
}
var basePath = context.getVariable("proxy.basepath");
var pathSuffix = context.getVariable("proxy.pathsuffix");
var uri = context.getVariable("client.scheme") + "://" + hostName + basePath + pathSuffix;
context.setVariable("request.header.x-original-uri", uri);