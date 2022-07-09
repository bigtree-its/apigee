// Generate Zipkin B3 compatible trace and span IDs, taking into account any
// existing trace context passed into the request. See this link for a deeper
// explanation of B3 propagation: https://github.com/openzipkin/b3-propagation

var traceId = context.getVariable("request.header.X-B3-TraceId");
var spanId = context.getVariable("request.header.X-B3-SpanId");

if (!traceId) {
    traceId = generateHexString(32);
}

if (spanId) {
    context.setVariable("request.header.X-B3-ParentSpanId", spanId);
}

context.setVariable("request.header.X-B3-TraceId", traceId);
context.setVariable("request.header.X-B3-SpanId", generateHexString(16));
context.setVariable("request.header.X-B3-Sampled", "1");

function generateHexString(len) {
    const hex = '0123456789abcdef';
    var output = '';
    for (var i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}