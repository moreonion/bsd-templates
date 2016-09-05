// ---------- util functions ----------------------------------------
//
// (taken from socialtools 778e694913fb29aa25fdda5c2cf7810de89dab4c
// utils.js)
//
function parseQueryString(string) {
    if (typeof string !== 'string') {
        string = '';
    }
    var vars = string.split('&');
    var params = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (!pair[0]) {
            continue;
        }
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
}

function addQueryParams(url, params) {
    if (typeof url === 'undefined') {
        return url;
    }
    if (typeof params !== 'object') {
        // nothing to do here
        return url;
    }

    var tmpUrl = document.createElement('a');
    tmpUrl.href = url;

    // add our params to the URLs params
    var newParams = parseQueryString(tmpUrl.search.substring(1));
    for (param in params) { // eslint-disable-line no-undef
        newParams[param] = params[param];  // eslint-disable-line no-undef
    }
    tmpUrl.search = '?' + serializeToQueryString(newParams);
    return tmpUrl.href;
}

function serializeToQueryString(obj) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    return str.join('&');
}

function getQueryStringsAsObject(url) {
    var tmpUrl = document.createElement('a');
    tmpUrl.href = url;
    var params = parseQueryString(tmpUrl.search.substring(1));
    return params;
}


jQuery(document).ready(function($){

// get "config" from page

  var autoRedirect = true;
  if (typeof window.mo_auto_redirect !== 'undefined') {
    autoRedirect = window.mo_auto_redirect;
  }

  var redirectURL = null;
  if (typeof window.mo_redirect_url !== 'undefined') {
    redirectURL = window.mo_redirect_url;
  }

// ---------- letters sent scraping ---------------------------------

// the markup on the landing page of speakout actions is the only location to
// get the data of letters sent (set API does not provide this). so we have to
// scrape it from there.
//
// this assumes the markup from BSD will not change and that clients land on the
// landing page *first* (thus allowing to save the data in the sessionStorage) and
// redirecting  immediately to the speakout form page (the one with the `js`
// GET param set to some string, e.g. `false` or `foo`)

  var $bsdLandingPage = $('div.bsd-speakout.bsd-speakout-landing');
  if ($bsdLandingPage.length > 0) {
    var $recipientsWrapper = $('#stat-0', $bsdLandingPage);
    var $recipientsCurrentCell = $('table tr:eq(0) td:eq(1)', $recipientsWrapper);
    var $recipientsGoalCell = $('table tr:eq(1) td:eq(1)', $recipientsWrapper);
    // format is e.g. 2,000.00
    var recipientsCurrent = parseInt($recipientsCurrentCell.text().replace(/,/, ''));
    var recipientsGoal = parseInt($recipientsGoalCell.text().replace(/,/, ''));

    var $lettersSentWrapper = $('#stat-1', $bsdLandingPage);
    var $lettersSentCurrentCell = $('table tr:eq(0) td:eq(1)', $lettersSentWrapper);
    var $lettersSentGoalCell = $('table tr:eq(1) td:eq(1)', $lettersSentWrapper);
    // format is e.g. 2,000.00
    var lettersSentCurrent = parseInt($lettersSentCurrentCell.text().replace(/,/, ''));
    var lettersSentGoal = parseInt($lettersSentGoalCell.text().replace(/,/, ''));

    if (typeof window.sessionStorage !== 'undefined') {
      var storageKeyPrefix = $("link[rel=canonical]").first().attr('href') + '--';
      sessionStorage.setItem(storageKeyPrefix + 'recipientsCurrent', recipientsCurrent);
      sessionStorage.setItem(storageKeyPrefix + 'recipientsGoal', recipientsGoal);
      sessionStorage.setItem(storageKeyPrefix + 'lettersSentCurrent', lettersSentCurrent);
      sessionStorage.setItem(storageKeyPrefix + 'lettersSentGoal', lettersSentGoal);
    }

    // is redirection enabled?
    if (autoRedirect) {
      // use a URL as-is if provided
      // generate a redirection target otherwise
      if (redirectURL) {
          window.location.href = redirectURL;
      } else {
        var params = getQueryStringsAsObject(window.location.href);
        if (typeof params['js'] === 'undefined') {
          window.location.href = addQueryParams(window.location.href, { 'js': 'false' });
        }
      }
    }
  }
});
