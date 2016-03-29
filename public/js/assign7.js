// Author: Kewen Gu
// URL: https://kgu-cs4241-main.herokuapp.com

    function operation(postUrl, name) {
      var req = new XMLHttpRequest();
      req.open('POST', postUrl, true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      req.onload = function () {
        makeGet('/movies');
      };
      console.log('name=' + name);
      req.send('name=' + name);
    }

    makeGet('/movies');

    function makeGet(url) {
      var req = new XMLHttpRequest();

      req.onreadystatechange = function() {
        handleRes(req);
      };

      req.open('GET', url);
      req.send();
    }

    function handleRes(req) {
      if( req.readyState !== XMLHttpRequest.DONE )
        return;

      if(req.status === 200) {
        var el = document.querySelector("#movie-list");
        el.innerHTML = "";
        el.innerHTML += req.responseText;
      }
    }
