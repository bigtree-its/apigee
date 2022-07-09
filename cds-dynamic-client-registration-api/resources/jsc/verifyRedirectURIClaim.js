/*
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * @file
 * verifyRedirectURIClaim.js
 * Checks that the redirect_uris claim in the register JWT meets the following criteria:
 * 1) There are redirect_uris in register JWT found in the SSA redirect_uris - UPDATE; ACCC conformance test suite ignores these in register JWT
 * 2) There are redirect_uris in SSA JWT found in the sector_identifier_uri redirect_uris
 */

function checkElementsinArray(parentArray, subsetArray) {
      var parentArraylen = parentArray.length;
      var subsetArraylen = subsetArray.length;

      if (parentArraylen >= subsetArraylen) {
            //console.log(parentArray);
            for (var i=0; i < subsetArraylen; i++) {
                  //console.log(subsetArray[i]);
                  var found = (parentArray.indexOf(subsetArray[i]) >= 0);
                  if (!found) {
                        return false;
                  }
            }
      }
      else {
            return false;
      }
      return true;
}

function print() {} // unit test fix


var error_msg;
var error_found = false;
var sectorIdURIredirectURIs = [];
var redirectURIsInSSA;
var redirectURIsInSSAtoUse;

try {
      redirectURIsInSSA = JSON.parse(unescape(context.getVariable("ADRDetailsFromSSA.redirect_uris")));
      print("|redirectURIsInSSA = " + JSON.stringify(redirectURIsInSSA));
      redirectURIsInSSAtoUse = redirectURIsInSSA.join();
}
catch(e){
      error_msg = "Error with SSA redirect_uris";
      error_found = true; 
}


if (!error_found) {
      if (context.getVariable("ADRDetailsFromSSA.sector_identifier_uri")) {
            try {
                  sectorIdURIredirectURIs = JSON.parse(context.getVariable("sectorIdUriResponse.content"));
                  print("|sectorIdURIredirectURIs = " + JSON.stringify(sectorIdURIredirectURIs));
            }
            catch(e){
                  error_msg = "Error with sector_identifier_uri response";
                  error_found = true; 
            }
            if (!(Array.isArray(sectorIdURIredirectURIs))) {
                  error_msg = "sector_identifier_uri response must contain an array";
                  error_found = true; 
            } 
            else if (sectorIdURIredirectURIs.length === 0 ) {
                  error_msg = "sector_identifier_uri response must contain a non-empty array";
                  error_found = true; 
            }
      }
      
      if (!error_found) {
            if (redirectURIsInSSA === undefined) {
                  error_msg = "Missing SSA redirect_uris claim";
                  error_found = true;
            } 
            else if (!(Array.isArray(redirectURIsInSSA))) {
                  error_msg = "SSA redirect_uris claim must contain an array";
                  error_found = true; 
            } 
            else if (redirectURIsInSSA.length === 0 ) {
                  error_msg = "SSA redirect_uris claim must contain a non-empty array";
                  error_found = true; 
            } 
            // ignore this condition for ACCC conformance test suite
            // else if (redirectURIsInRequest === undefined)  {
            //       error_msg = "Missing redirect_uris claim";
            //       error_found = true;
            // } 
            // else if (!(Array.isArray(redirectURIsInRequest))) {
            //       error_msg = "redirect_uris claim must contain an array";
            //       error_found = true; 
            // } 
            // else if (redirectURIsInRequest.length === 0 ) {
            //       error_msg = "redirect_uris claim must contain a non-empty array";
            //       error_found = true; 
            // } 
            else {
                  if (sectorIdURIredirectURIs.length > 0 ) {
                        var uriFound = checkElementsinArray(sectorIdURIredirectURIs, redirectURIsInSSA);
                        if (!uriFound) {
                              error_msg = "SSA redirect_uris claim must contain URIs defined in the sector_identifier_uri array";
                              error_found = true;
                        }
                  }
      
                  // ignore this condition for ACCC conformance test suite
                  //var theRedirectURIInReq = redirectURIsInRequest.join();//redirectURIsInRequest[0];
                  // if (!error_found) {       
                  //       uriFound = checkElementsinArray(redirectURIsInSSA, redirectURIsInRequest);
                  //       if (!uriFound) {
                  //             error_msg = "redirect_uris claim must contain URIs defined in the Software Statement Assertion (SSA)";
                  //             error_found = true;
                  //       }
                  // }
                  
            }
      }
}


context.setVariable("errorInRedirectURIs", error_found);
context.setVariable("messageForErrorInRedirectURIs", error_msg);
context.setVariable("redirectURIInRequest", redirectURIsInSSAtoUse);
  
  