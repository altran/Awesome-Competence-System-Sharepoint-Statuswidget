﻿'use strict';
var ACSAppPart = window.ACSAppPart || {}

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();
var um;

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    getUserName();
});

// This function prepares, loads, and then executes a SharePoint query to get the current users information
function getUserName() {
   
    context.load(user);

    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// This function is executed if the above call is successful
// It replaces the contents of the 'message' element with the user name
function onGetUserNameSuccess() {   
    um = user.get_email();
    ACSAppPart.ProfileStatusViewModel.load(um);
}

// This function is executed if the above call fails
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}

function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split('?')[1].split('&');
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split('=');
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}