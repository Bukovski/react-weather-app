(this["webpackJsonpreact-weather-app"]=this["webpackJsonpreact-weather-app"]||[]).push([[0],{10:function(e){e.exports=JSON.parse('[{"id":"1als","theme":"default","bg":"rgba(255, 255, 255, 1)","text":"rgba(73, 87, 88, 1)","primary":"rgba(31, 166, 157, 1)","secondary":"rgba(29, 211, 176, 1)"},{"id":"2als","theme":"warm","bg":"rgba(245, 238, 215, 1)","text":"rgba(115, 106, 81, 1)","primary":"rgba(191, 59, 59, 1)","secondary":"rgba(255, 159, 41, 1)"},{"id":"3als","theme":"dark","bg":"rgba(13, 82, 84, 1)","text":"rgba(241, 241, 241, 1)","primary":"rgba(241, 241, 241, 1)","secondary":"rgba(241, 241, 241, 1)"},{"id":"4als","theme":"tonic","bg":"rgba(253, 255, 252, 1)","text":"rgba(1, 22, 39, 1)","primary":"rgba(187, 13, 36, 1)","secondary":"rgba(4, 80, 142, 1)"},{"id":"5als","theme":"rainy","bg":"rgba(228, 253, 225, 1)","text":"rgba(87, 87, 97, 1)","primary":"rgba(138, 203, 136, 1)","secondary":"rgba(100, 131, 129, 1)"}]')},16:function(e){e.exports=JSON.parse('{"200":{"label":"thunderstorm with light rain","icon":"storm-showers"},"201":{"label":"thunderstorm with rain","icon":"storm-showers"},"202":{"label":"thunderstorm with heavy rain","icon":"storm-showers"},"210":{"label":"light thunderstorm","icon":"storm-showers"},"211":{"label":"thunderstorm","icon":"thunderstorm"},"212":{"label":"heavy thunderstorm","icon":"thunderstorm"},"221":{"label":"ragged thunderstorm","icon":"thunderstorm"},"230":{"label":"thunderstorm with light drizzle","icon":"storm-showers"},"231":{"label":"thunderstorm with drizzle","icon":"storm-showers"},"232":{"label":"thunderstorm with heavy drizzle","icon":"storm-showers"},"300":{"label":"light intensity drizzle","icon":"sprinkle"},"301":{"label":"drizzle","icon":"sprinkle"},"302":{"label":"heavy intensity drizzle","icon":"sprinkle"},"310":{"label":"light intensity drizzle rain","icon":"sprinkle"},"311":{"label":"drizzle rain","icon":"sprinkle"},"312":{"label":"heavy intensity drizzle rain","icon":"sprinkle"},"313":{"label":"shower rain and drizzle","icon":"sprinkle"},"314":{"label":"heavy shower rain and drizzle","icon":"sprinkle"},"321":{"label":"shower drizzle","icon":"sprinkle"},"500":{"label":"light rain","icon":"rain"},"501":{"label":"moderate rain","icon":"rain"},"502":{"label":"heavy intensity rain","icon":"rain"},"503":{"label":"very heavy rain","icon":"rain"},"504":{"label":"extreme rain","icon":"rain"},"511":{"label":"freezing rain","icon":"rain-mix"},"520":{"label":"light intensity shower rain","icon":"showers"},"521":{"label":"shower rain","icon":"showers"},"522":{"label":"heavy intensity shower rain","icon":"showers"},"531":{"label":"ragged shower rain","icon":"showers"},"600":{"label":"light snow","icon":"snow"},"601":{"label":"snow","icon":"snow"},"602":{"label":"heavy snow","icon":"snow"},"611":{"label":"sleet","icon":"sleet"},"612":{"label":"shower sleet","icon":"sleet"},"615":{"label":"light rain and snow","icon":"rain-mix"},"616":{"label":"rain and snow","icon":"rain-mix"},"620":{"label":"light shower snow","icon":"rain-mix"},"621":{"label":"shower snow","icon":"rain-mix"},"622":{"label":"heavy shower snow","icon":"rain-mix"},"701":{"label":"mist","icon":"sprinkle"},"711":{"label":"smoke","icon":"smoke"},"721":{"label":"haze","icon":"day-haze"},"731":{"label":"sand, dust whirls","icon":"cloudy-gusts"},"741":{"label":"fog","icon":"fog"},"751":{"label":"sand","icon":"cloudy-gusts"},"761":{"label":"dust","icon":"dust"},"762":{"label":"volcanic ash","icon":"smog"},"771":{"label":"squalls","icon":"day-windy"},"781":{"label":"tornado","icon":"tornado"},"800":{"label":"clear sky","icon":"sunny"},"801":{"label":"few clouds","icon":"cloudy"},"802":{"label":"scattered clouds","icon":"cloudy"},"803":{"label":"broken clouds","icon":"cloudy"},"804":{"label":"overcast clouds","icon":"cloudy"},"900":{"label":"tornado","icon":"tornado"},"901":{"label":"tropical storm","icon":"hurricane"},"902":{"label":"hurricane","icon":"hurricane"},"903":{"label":"cold","icon":"snowflake-cold"},"904":{"label":"hot","icon":"hot"},"905":{"label":"windy","icon":"windy"},"906":{"label":"hail","icon":"hail"},"951":{"label":"calm","icon":"sunny"},"952":{"label":"light breeze","icon":"cloudy-gusts"},"953":{"label":"gentle breeze","icon":"cloudy-gusts"},"954":{"label":"moderate breeze","icon":"cloudy-gusts"},"955":{"label":"fresh breeze","icon":"cloudy-gusts"},"956":{"label":"strong breeze","icon":"cloudy-gusts"},"957":{"label":"high wind, near gale","icon":"cloudy-gusts"},"958":{"label":"gale","icon":"cloudy-gusts"},"959":{"label":"severe gale","icon":"cloudy-gusts"},"960":{"label":"storm","icon":"thunderstorm"},"961":{"label":"violent storm","icon":"thunderstorm"},"962":{"label":"hurricane","icon":"cloudy-gusts"}}')},26:function(e,t,a){},30:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),c=a(15),s=a.n(c),i=(a(25),a(26),a(3)),o=a(0),l="color-theme",u=function(){if("undefined"!==typeof window&&window.localStorage){var e=window.localStorage.getItem(l);return e||(window.localStorage.setItem(l,"default"),"default")}return"default"},d=n.a.createContext(),m=function(e){e.initialTheme;var t=e.children,a=Object(r.useState)(u),n=Object(i.a)(a,2),c=n[0],s=n[1];Object(r.useEffect)((function(){m(c)}),[c]);var m=function(e){document.body.setAttribute("data-theme",e),localStorage.setItem(l,e)};return Object(o.jsx)(d.Provider,{value:{theme:c,setTheme:s},children:t})},h=a(2),b=a.n(h),p=a(11),j=a(4),f=a(8),w=a(9),y=a(20),x=a(19),v=a(16);function g(e){var t=v[e].icon;return e>699&&e<800||e>899&&e<1e3||(t="day-"+t),"wi wi-"+t}var O=function(e){return Math.round(e-273)},_=a(13),N=a.n(_),k=function(e){var t=new Date(1e3*e);return N()(t).format("ddd, MMMM DD")},S=function(e){var t=new Date(1e3*e);return N()(t).format("HH:MM")};function z(e){return C.apply(this,arguments)}function C(){return(C=Object(j.a)(b.a.mark((function e(t){var a,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if((a=e.sent).ok){e.next=6;break}throw T(a.status);case 6:return e.next=8,a.json();case 8:return r=e.sent,e.abrupt("return",r);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){var t;switch(e){case 401:t="It looks like the API did not authorize your request. Please ensure you have a valid API key.";break;case 404:t="No results found. Check your query again or try searching for a different location.";break;case 429:t="It looks like you've made too many requests to the server. Please wait a while before trying again.";break;default:t="Sorry. Something went wrong, we'll fix it soon"}return new Error(t)}var I=a(17),F=(a(30),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3;return Object(I.a)(e,{timeout:t,type:"error"})}),D="c4158e4f284ca24ba099bf786dc1c69a",L="https://api.openweathermap.org/data/2.5/",E=function(e){var t=e.latitude,a=e.longitude,r=e.cityName,n="&lat=".concat(t,"&lon=").concat(a);r&&(n="&q=".concat(encodeURIComponent(r)));var c="".concat(L,"weather?appid=").concat(D).concat(n),s="".concat(L,"forecast?appid=").concat(D).concat(n),i=function(){var e=Object(j.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z(c);case 3:return t=e.sent,e.abrupt("return",{actualTemperature:O(t.main.temp).toFixed(0),date:k(t.dt),cityName:t.name,windSpeed:t.wind.speed,humidity:t.main.humidity.toFixed(0),pressure:t.main.pressure.toFixed(0),weatherDescription:t.weather[0].description.toUpperCase(),weatherIcon:g(t.weather[0].id)});case 7:return e.prev=7,e.t0=e.catch(0),F("Couldn't get weather data"),e.abrupt("return",{error:!0});case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(j.a)(b.a.mark((function e(){var t,a,r,n,c,i,o,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z(s);case 3:for(t=e.sent,a=[],r=[],n=0;n<5;n++)a[n]=Number(O(t.list[n].main.temp).toFixed(1)),r[n]=S(t.list[n].dt);return c=[].concat(a).sort(),i=[c.pop(),c.shift()],o=i[0],l=i[1],e.abrupt("return",{temperaturesForecast:a,temperaturesForecastLabels:r,maxTemperature:o,minTemperature:l});case 12:return e.prev=12,e.t0=e.catch(0),F("Couldn't get weather data"),e.abrupt("return",{error:!0});case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();return Promise.all([i(),o()]).then((function(e){var t={actualTemperature:"21",cityName:"Tokyo",date:"Mon, September 13",humidity:"42",maxTemperature:23,minTemperature:17,pressure:"1012",temperaturesForecast:[21,20,19,17,23],temperaturesForecastLabels:["21:09","00:09","03:09","06:09","09:09"],weatherDescription:"BROKEN CLOUDS",weatherIcon:"wi wi-day-cloudy",windSpeed:2.32,loaded:!0,error:!1};return e.forEach((function(e){t=Object.assign(t,e)})),t}))},M=function(){var e=Object(j.a)(b.a.mark((function e(){var t,a,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="0,0",e.prev=1,e.next=4,z("https://ipinfo.io/91.214.82.65?token=".concat("1095eea3e02881"));case 4:a=e.sent,t=a.loc,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),F("Your location is not defined");case 11:return r=t.split(","),e.abrupt("return",{latitude:r[0],longitude:r[1]});case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}(),V=function(e){var t=e.cityName,a=e.date;return Object(o.jsxs)("div",{className:"geo",children:[Object(o.jsx)("div",{className:"geo__location",children:t}),Object(o.jsx)("div",{className:"geo__date",children:a})]})},P=a(5),A=a.n(P),U=function(e){var t=e.data,a=t.actualTemperature,r=t.maxTemperature,n=t.minTemperature,c=function(e){return e.toFixed(0)};return Object(o.jsxs)("div",{className:"temperature",children:[Object(o.jsx)("div",{className:"temperature__deg",children:Object(o.jsx)(A.a,{value:parseInt(a),formatValue:c})}),Object(o.jsxs)("div",{className:"temperature__wrap",children:[Object(o.jsx)("div",{className:"temperature__mesure",children:"\xb0C"}),Object(o.jsxs)("div",{className:"temperature__box",children:[Object(o.jsxs)("div",{className:"temperature__max",children:[Object(o.jsx)("span",{className:"temperature__mark",children:"\u2191"}),Object(o.jsx)("p",{className:"temperature__text",children:Object(o.jsx)(A.a,{value:parseInt(r),formatValue:c})}),Object(o.jsx)("span",{className:"temperature__unit",children:"\xb0C"})]}),Object(o.jsxs)("div",{className:"temperature__min",children:[Object(o.jsx)("span",{className:"temperature__mark",children:"\u2193"}),Object(o.jsx)("p",{className:"temperature__text",children:Object(o.jsx)(A.a,{value:parseInt(n),formatValue:c})}),Object(o.jsx)("span",{className:"temperature__unit",children:"\xb0C"})]})]})]})]})},q=function(e){var t=e.data,a=t.weatherDescription,r=t.weatherIcon,n=t.windSpeed,c=t.humidity,s=t.pressure,i=function(e){return e.toFixed(0)};return Object(o.jsxs)("div",{className:"detail",children:[Object(o.jsxs)("div",{className:"detail__wrap",children:[Object(o.jsx)("span",{className:"detail__icon",children:Object(o.jsx)("i",{className:r})}),Object(o.jsx)("div",{className:"detail__description",children:a})]}),Object(o.jsxs)("div",{className:"detail__box",children:[Object(o.jsxs)("div",{className:"detail__indicator",children:[Object(o.jsxs)("div",{className:"detail__info",children:[Object(o.jsx)(A.a,{value:parseFloat(n),formatValue:function(e){return e.toFixed(2)}}),Object(o.jsx)("span",{className:"detail__measure",children:"m/s"})]}),Object(o.jsx)("div",{className:"detail__name",children:"wind speed"})]}),Object(o.jsxs)("div",{className:"detail__indicator",children:[Object(o.jsxs)("div",{className:"detail__info",children:[Object(o.jsx)(A.a,{value:parseInt(c),formatValue:i}),Object(o.jsx)("span",{className:"detail__measure",children:"%"})]}),Object(o.jsx)("div",{className:"detail__name",children:"humidity"})]}),Object(o.jsxs)("div",{className:"detail__indicator",children:[Object(o.jsxs)("div",{className:"detail__info",children:[Object(o.jsx)(A.a,{value:parseInt(s),formatValue:i}),Object(o.jsx)("span",{className:"detail__measure",children:"hpa"})]}),Object(o.jsx)("div",{className:"detail__name",children:"pressure"})]})]})]})},B=a(14),R=a(18),J=a.n(R),K=a(10),Y=function(e){var t=e.data,a=t.temperaturesForecast,n=t.temperaturesForecastLabels,c=t.loaded,s=Object(r.useState)("#fff"),l=Object(i.a)(s,2),u=l[0],m=l[1],h=Object(r.useState)("#495758"),b=Object(i.a)(h,2),p=b[0],j=b[1],f=Object(r.useState)("#1fa69d"),w=Object(i.a)(f,2),y=w[0],x=w[1],v=Object(r.useContext)(d).theme;Object(r.useEffect)((function(){try{var e=K.filter((function(e){return e.theme===v}))[0];m(e.bg),j(e.text),x(e.primary)}catch(r){var t=document.body,a=getComputedStyle(t);m(a.getPropertyValue("--color-bg")),j(a.getPropertyValue("--color-text")),x(a.getPropertyValue("--color-primary"))}}),[c,v]);var g={series:[{name:"Inflation",data:Object(B.a)(a)}],options:{chart:{height:350,type:"bar"},colors:y,plotOptions:{bar:{dataLabels:{position:"center"}}},dataLabels:{enabled:!0,formatter:function(e){return e+"\xb0C"},offsetY:10,style:{fontSize:"1.6rem",colors:[u]}},xaxis:{categories:Object(B.a)(n),position:"bottom",axisBorder:{show:!0},axisTicks:{show:!1},tooltip:{enabled:!1},labels:{style:{colors:p,fontSize:"1.5rem"}}},yaxis:{axisBorder:{show:!0},axisTicks:{show:!1},labels:{show:!0,align:"right",formatter:function(e){return e+"\xb0C"},style:{colors:p,fontSize:"1.5rem"}}}}};return Object(o.jsx)("div",{className:"diagram",children:Object(o.jsx)(J.a,{type:"bar",options:g.options,series:g.series})})},H=function(e){var t=e.onLocationChange,a=void 0===t?function(){}:t,n=Object(r.useRef)(!1),c=Object(r.useState)([]),s=Object(i.a)(c,2),l=s[0],u=s[1],d=Object(r.useState)(""),m=Object(i.a)(d,2),h=m[0],p=m[1],f=Object(r.useState)([]),w=Object(i.a)(f,2),y=w[0],x=w[1],v=Object(r.useState)(-1),g=Object(i.a)(v,2),O=g[0],_=g[1];Object(r.useEffect)((function(){var e=function(){var e=Object(j.a)(b.a.mark((function e(){var t,a,r,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t="https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=".concat(encodeURIComponent(h),"&maxresults=").concat(50,"&apikey=").concat("bi5eUoMwDNyvKhtBWEyMfc5zD6qpsblwPi1OTINYBEg"),e.next=4,z(t);case 4:a=e.sent,r=a.suggestions,(c=N(r))&&u(c),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),F("Sorry, something wrong with input autocomplete"),n.current=!0;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();!n.current&&h.length&&(k(),S(h),e())}),[h]);var N=function(e){return e?e.filter((function(e){return["district","city"].includes(e.matchLevel)})):e},k=function(){-1!==O&&_(-1)},S=function(e){!e.length&&y.length&&x([])},C=function(e){var t=e.address.county||"",a=e.address.district||e.address.city||"";return"".concat(a,", ").concat(t)},T=function(){setTimeout((function(){x([])}),100)};return Object(o.jsx)("div",{className:"search",children:Object(o.jsxs)("div",{className:"search__wrap",children:[Object(o.jsx)("input",{type:"search",role:"search",placeholder:"Search for a location",className:"search__input",onChange:function(e){var t=e.target.value;x(l),p(t)},onBlur:T,onKeyDown:function(e){("ArrowUp"===e.key||" ArrowUp"===e.code)&&O>-1&&_(O-1);var t=y.length-1;"ArrowDown"!==e.key&&" ArrowDown"!==e.code||O===t||_(O+1),"Enter"!==e.key&&" Enter"!==e.code||-1===O||(p(C(y[O])),T())},value:h}),Object(o.jsx)("button",{type:"submit",className:"search__button",onClick:function(e){a(h),k(),T(),p("")},children:Object(o.jsx)("svg",{width:"24",height:"24",fill:"none",className:"search__icon",children:Object(o.jsx)("path",{d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),y.length?Object(o.jsx)("ul",{className:"search__autocomplete",children:y.map((function(e,t){return Object(o.jsx)("li",{className:"search__autocomplete-item "+(O===t?"search__autocomplete-item--color":""),onClick:function(){return function(e){p(e),x([])}(C(e))},children:C(e)},e.locationId)}))}):null]})})};var W=function(e){var t=Object(r.useContext)(d),a=t.theme,n=t.setTheme,c=function(e){var t=Object(r.useState)(e),a=Object(i.a)(t,2),n=a[0],c=a[1],s=Object(r.useRef)(null),o=function(e){s.current&&!s.current.contains(e.target)&&c(!1)};return Object(r.useEffect)((function(){return document.addEventListener("click",o,!0),function(){document.removeEventListener("click",o,!0)}}),[]),{ref:s,isComponentVisible:n,setIsComponentVisible:c}}(!1),s=c.ref,l=c.isComponentVisible,u=c.setIsComponentVisible,m=function(){return u(!l)},h=function(e){return function(t){e.theme!==a&&n(e.theme),m()}};return Object(o.jsxs)("div",{className:"theme-switcher",ref:s,children:[Object(o.jsx)("span",{className:"theme-switcher__main",onClick:m}),Object(o.jsx)("ul",{className:"theme-switcher__dropdown "+(l?"":"theme-switcher__dropdown-hide"),children:K.map((function(e){return Object(o.jsx)("li",{className:"theme-switcher__item",children:Object(o.jsx)("span",{className:"theme-switcher__toggle",style:{boxShadow:"0 0 5px ".concat(e.secondary),border:"2px solid ".concat(e.primary),background:e.bg},onClick:h(e)})},e.id)}))})]})},G=function(e){Object(y.a)(a,e);var t=Object(x.a)(a);function a(e){var r;return Object(f.a)(this,a),(r=t.call(this,e)).handleLocationChange=function(){var e=Object(j.a)(b.a.mark((function e(t){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E({cityName:t});case 2:(a=e.sent).error||r.setState(Object(p.a)({},a));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.state={actualTemperature:"0",maxTemperature:"0",minTemperature:"0",date:"Fri, May 6",cityName:"City Name",windSpeed:"0",humidity:"0",pressure:"0",weatherDescription:"clouds",weatherIcon:"wi wi-day-cloudy",temperaturesForecast:[-10,-5,0,5,10],temperaturesForecastLabels:["09:00","12:00","15:00","18:00","21:00"],loaded:!1,error:!1,theme:"default"},r}return Object(w.a)(a,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getFakeData",value:function(){var e=this;setTimeout((function(){e.setState(Object(p.a)({},{actualTemperature:"22",maxTemperature:24,minTemperature:18,date:"Mon, September 12th",cityName:"Tokyo",windSpeed:3.91,humidity:"43",pressure:"1016",weatherDescription:"OVERCAST CLOUDS",weatherIcon:"wi wi-day-cloudy",temperaturesForecast:[21,24,22,19,18],temperaturesForecastLabels:["12:09","15:09","18:09","21:09","00:09"],loaded:!0}))}),1e3)}},{key:"getData",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M();case 2:return t=e.sent,e.next=5,E(t);case 5:a=e.sent,this.setState(Object(p.a)({},a));case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.cityName,a=e.date,n=e.actualTemperature,c=e.maxTemperature,s=e.minTemperature,i=e.weatherDescription,l=e.weatherIcon,u=e.windSpeed,d=e.humidity,m=e.pressure,h=e.temperaturesForecast,b=e.temperaturesForecastLabels,p=e.loaded;return Object(o.jsx)(r.Fragment,{children:Object(o.jsxs)("div",{className:"main",children:[Object(o.jsxs)("div",{className:"panel",children:[Object(o.jsx)(H,{onLocationChange:this.handleLocationChange}),Object(o.jsx)(W,{})]}),Object(o.jsx)(V,{cityName:t,date:a}),Object(o.jsx)(U,{data:{actualTemperature:n,maxTemperature:c,minTemperature:s}}),Object(o.jsx)(q,{data:{weatherDescription:i,weatherIcon:l,windSpeed:u,humidity:d,pressure:m}}),Object(o.jsx)(Y,{data:{temperaturesForecast:h,temperaturesForecastLabels:b,loaded:p}})]})})}}]),a}(n.a.Component);s.a.render(Object(o.jsx)(n.a.StrictMode,{children:Object(o.jsx)(m,{children:Object(o.jsx)(G,{})})}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.a6c75d41.chunk.js.map