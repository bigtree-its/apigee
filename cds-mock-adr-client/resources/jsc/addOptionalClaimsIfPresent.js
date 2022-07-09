  /*
* Copyright 2021 Google LLC
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
 * addOptionalClaimsIfPresent.js
 * Add optional additional claims if query params are present 
 *  */
 
 var additionalClaims = JSON.parse(context.getVariable("additionalClaimsVar"));
 print("Before - Additional Claims = " + JSON.stringify(additionalClaims));
 
 
 const sharing_duration_str = context.getVariable("request.queryparam.sharing_duration");
 const sharing_duration = Number(sharing_duration_str);
 const cdr_arrangement_id = context.getVariable("request.queryparam.cdr_arrangement_id");
 print("sharing_duration_str = " + sharing_duration_str + " - sharing_duration = " + sharing_duration + " - cdr_arrangement_id = " + cdr_arrangement_id);
 if ( (sharing_duration_str !== null) && (sharing_duration_str !== "") && ( !(isNaN(sharing_duration)) ) ) {
     additionalClaims.claims["sharing_duration"] = sharing_duration;
 }
 if ( (cdr_arrangement_id !== null) && ( cdr_arrangement_id !== "" ) ) {
     additionalClaims.claims["cdr_arrangement_id"] = cdr_arrangement_id;
 }

 const userInfoQueryParam = context.getVariable("request.queryparam.userinfo");
 if ( (userInfoQueryParam !== null) && ( userInfoQueryParam !== "" ) ) {
    //issue with object being passed in queryparam so setting test types here
    if (userInfoQueryParam === "essential-name-given_name-family_name-updated_at") {
      additionalClaims.claims["userinfo"] = { 
          given_name: {
            essential: true
          },
          family_name: {
            essential: true
          },
          name: {
            essential: true
          },
          updated_at: {
            essential: true
          }
        };
    }
    if (userInfoQueryParam === "null-name-given_name-family_name-updated_at") {
      additionalClaims.claims["userinfo"] = { 
          given_name: null,
          family_name: null,
          name: null,
          updated_at: null
        };
    }
    if (userInfoQueryParam === "null-name-updated_at") {
      additionalClaims.claims["userinfo"] = { 
          name: null,
          updated_at: null
        };
    }
    if (userInfoQueryParam === "null-given_name-essential-updated_at") {
      additionalClaims.claims["userinfo"] = { 
          given_name: null,
          updated_at: {
            essential: true
          }
        };
    }
    if (userInfoQueryParam === "added_invalid_auth_time_claim_null-name-updated_at") {
      additionalClaims.claims["userinfo"] = { 
          auth_time: {
            essential: true
          },
          name: null,
          updated_at: null
        };
    }
 }


 print("After - Additional Claims = " + JSON.stringify(additionalClaims));
 context.setVariable("additionalClaimsVar", JSON.stringify(additionalClaims));


