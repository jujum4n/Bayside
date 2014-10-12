/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
(function () {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
    navdrawerContainer.classList.add('opened');
  }

  //main.addEventListener('click', closeMenu);
  //menuBtn.addEventListener('click', toggleMenu);
  /*navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });*/
})();
/**
 * Created by juju on 10/12/2014.
 */
var lastcoinbase=0;
var lastbtcebtc=0;
var lastbfin=0;
var lastbitsta=0;
var lastbtceltc=0;
var baysideavg=0.0;
var lastbayside=0.0;
function getBitcoinValues(callback) {
    var origin = 'http://anyorigin.com/get?url=';

    var cbaseapi = 'https://coinbase.com/api/v1/prices/spot_rate?currency=USD&callback=?';
    var btcapi = 'http://btc-e.com/api/2/btc_usd/ticker&callback=?';
    var bfinex = 'https://api.bitfinex.com/v1/pubticker/BTCUSD&callback=?';
    var bitsta = 'https://www.bitstamp.net/api/ticker/&callback=?';
    var ltcusd = 'https://btc-e.com/api/2/ltc_usd/ticker&callback=?';

    $.getJSON(origin + cbaseapi, function (data) {
        document.getElementById("cbase").innerHTML = data.contents.amount + ' USD';
        if (lastcoinbase === 0) {
            lastcoinbase = data.contents.amount;
        }
        if (lastcoinbase > data.contents.amount) {
            document.getElementById("cbase").style.color = "#D9534F";
        }
        if (lastcoinbase < data.contents.amount) {
            document.getElementById("cbase").style.color = "#5CB85C";
        }
        lastcoinbase = data.contents.amount;
    });
    $.getJSON(origin + btcapi, function (data) {

        document.getElementById("btcebtc").innerHTML = data.contents.ticker.avg.toFixed(2) + ' USD';
        if (lastbtcebtc === 0) {
            lastbtcebtc = data.contents.ticker.avg;
        }
        if (lastbtcebtc > data.contents.ticker.avg) {
            document.getElementById("btcebtc").style.color = "#D9534F";
        }
        if (lastbtcebtc < data.contents.ticker.avg) {
            document.getElementById("btcebtc").style.color = "#5CB85C";
        }
        lastbtcebtc = data.contents.ticker.avg;
    });
    $.getJSON(origin + ltcusd, function (data) {
        document.getElementById("btceltc").innerHTML = data.contents.ticker.avg.toFixed(2) + ' USD';
        if (lastbtceltc === 0) {
            lastbtceltc = data.contents.ticker.avg;
        }
        if (lastbtceltc > data.contents.ticker.avg) {
            document.getElementById("btceltc").style.color = "#D9534F";
        }
        if (lastbtceltc < data.contents.ticker.avg) {
            document.getElementById("btceltc").style.color = "#5CB85C";
        }
        lastbtceltc = data.contents.ticker.avg;
    });
    $.getJSON(origin + bfinex, function (data) {
        document.getElementById("bfinx").innerHTML = data.contents.last_price + ' USD';
        if (lastbfin === 0) {
            lastbfin = data.contents.last_price;
        }
        if (lastbfin > data.contents.last_price) {
            document.getElementById("bfinx").style.color = "#D9534F";
        }
        if (lastbfin < data.contents.last_price) {
            document.getElementById("bfinx").style.color = "#5CB85C";
        }
        lastbfin = data.contents.last_price;
    });
    $.getJSON(origin + bitsta, function (data) {
        document.getElementById("bitsta").innerHTML = data.contents.last + ' USD';
        if (lastbitsta === 0) {
            lastbitsta = data.contents.last;
        }
        if (lastbitsta > data.contents.last) {
            document.getElementById("bitsta").style.color = "#D9534F";
        }
        if (lastbitsta < data.contents.last) {
            document.getElementById("bitsta").style.color = "#5CB85C";
        }
        lastbitsta = data.contents.last;
    });
    callback();
}
function getBlockchain()
{
    var origin = 'http://anyorigin.com/get?url=';

    var blockcount = 'https://blockchain.info/q/getblockcount&callback=?';
    var marketcap = 'https://blockchain.info/q/marketcap&callback=?';
    var hashrate = 'https://blockchain.info/q/hashrate&callback=?';
    var totalbc = 'https://blockchain.info/q/totalbc&callback=?';

    $.getJSON(origin + blockcount, function(data){
        document.getElementById("blockcount").innerHTML=data.contents.toLocaleString();
    });
    $.getJSON(origin + marketcap, function(data){
        document.getElementById("marketcap").innerHTML=data.contents.toLocaleString()+' USD';
    });
    $.getJSON(origin + hashrate, function(data){
        temp=data.contents.toFixed(2);
        var t =parseInt(temp);
        document.getElementById("hashrate").innerHTML= t.toLocaleString() +' GH/s';
    });
    $.getJSON(origin + totalbc, function(data){
        var temp=data.contents.toString();
        temp=temp.slice(0,-8);
        var t=parseInt(temp);
        document.getElementById("totalbc").innerHTML=t.toLocaleString()+' BTC';
    });
}
function getbayside()
{
    console.log("Calculating Bayside Value");
    var flcoinbase = parseFloat(lastcoinbase);
    var flbtcebtc = parseFloat(lastbtcebtc);
    var flbfin = parseFloat(lastbfin);
    var flbitsta = parseFloat(lastbitsta);
    var flbaysideavg=(flcoinbase + flbtcebtc + flbfin + flbitsta)/4.0;
    flbaysideavg=((flbaysideavg)*1.05).toFixed(2);
    document.getElementById("bayside").innerHTML= flbaysideavg +' USD';
    if(lastbayside>flbaysideavg)
    {
        document.getElementById("bayside").style.color = "#D9534F";
    }
    if(lastbayside<flbaysideavg)
    {
        document.getElementById("bayside").style.color = "#5CB85C";
    }
    if(lastbayside===0)
    {
        document.getElementById("bayside").style.color = "white";
    }
    console.log("flbayside: " + flbaysideavg);
    console.log("lastbayside: " + lastbayside);
    lastbayside=flbaysideavg;
}

getBitcoinValues(getBlockchain);
setInterval(function()
{
    console.log("Getting Bitcoin Values");
    getBitcoinValues(function()
    {
        getbayside();
    });
}, 16000);
window.onload=function(){
    console.log("Getting Bitcoin Values");
    getBitcoinValues(function()
    {
        getbayside();
    });
};

