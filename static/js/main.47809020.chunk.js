(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{22:function(e,t,n){},42:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(16),r=n.n(i),o=(n(22),n(3)),s=n(6),u=n.n(s),l=n(4),d=n(17),j=n(7),p=n.n(j),h=(n(42),n(0)),v=function(e,t,n){return"https://api.foursquare.com/v2/search/recommendations?&client_id=".concat("5L1DNILRTLOPNADTDC33O4TA2ZOC0L0FYKUALH2ELTPFKCER","&client_secret=").concat("GWGIGIHDQ0E23T41PVGIUT1PYUJKLXCTL3TL3WDQ1ZJA20UH","&v=").concat("20190425","&ll=").concat(e,",").concat(t,"&intent=coffee&radius=").concat(n,"&limit=14&openNow=true")},O=function(){var e=Object(d.a)(u.a.mark((function e(t,n,c){var a,i,r,o,s,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.get(v(t,n,c));case 3:return a=e.sent,e.next=6,a.data;case 6:return i=e.sent,r=[],o={},i.response.group.results.map((function(e){var t;o[e.venue.id]=e,r.push(p.a.get((t=e.venue.id,"https://api.foursquare.com/v2/venues/".concat(t,"?client_secret=").concat("GWGIGIHDQ0E23T41PVGIUT1PYUJKLXCTL3TL3WDQ1ZJA20UH","&v=").concat("20190425","&client_id=").concat("5L1DNILRTLOPNADTDC33O4TA2ZOC0L0FYKUALH2ELTPFKCER"))))})),e.next=12,Promise.all(r);case 12:return s=e.sent,d=s.map((function(e){var t,n;return Object(l.a)(Object(l.a)({},o[e.data.response.venue.id]),{},{name:e.data.response.venue.name,photo:null===(t=e.data.response.venue.photos.groups[0])||void 0===t?void 0:t.items[0],isOpen:(null===(n=e.data.response.venue.hours)||void 0===n?void 0:n.isOpen)||!1,price:e.data.response.venue.price.message})})),e.abrupt("return",d);case 17:return e.prev=17,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 21:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(t,n,c){return e.apply(this,arguments)}}(),b=function(e){var t=e.latitude,n=e.longitude,a=Object(c.useState)([]),i=Object(o.a)(a,2),r=i[0],s=i[1],u=Object(c.useState)(!1),l=Object(o.a)(u,2),d=l[0],j=l[1],p=Object(c.useState)("distance"),v=Object(o.a)(p,2),b=v[0],f=v[1],m=Object(c.useState)(1e3),g=Object(o.a)(m,2),x=g[0],L=g[1],N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;j(!0),O(t,n,e).then((function(e){j(!1),s(e)}))};Object(c.useEffect)((function(){N()}),[]);return Object(h.jsxs)("div",{id:"main",className:"container",children:[Object(h.jsxs)("div",{className:"header",children:[Object(h.jsx)("h1",{children:"Coffee Shop Finder"}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("select",{name:"",onChange:function(e){N(Number(e.target.value)),L(Number(e.target.value))},value:x,children:[Object(h.jsx)("option",{value:"1000",children:"1000"}),Object(h.jsx)("option",{value:"10000",children:"10000"}),Object(h.jsx)("option",{value:"100000",children:"100000"})]}),Object(h.jsxs)("select",{style:{marginLeft:"10px"},onChange:function(e){f(e.target.value)},value:b,children:[Object(h.jsx)("option",{value:"distance",children:"Distance"}),Object(h.jsx)("option",{value:"name",children:"Price"})]})]})]}),d?Object(h.jsx)("div",{children:"Loading... "}):Object(h.jsx)(h.Fragment,{children:r.length>0?Object(h.jsx)("div",{className:"main",children:null===r||void 0===r?void 0:r.sort((function(e,t){return("distance"===b?e.venue.location.distance>t.venue.location.distance:e.price>t.price)?1:-1})).map((function(e,t){return Object(h.jsxs)("div",{className:"card-container",children:[Object(h.jsx)("div",{className:"img-container",children:e.photo?Object(h.jsx)("img",{className:"w-100",src:"".concat(e.photo.prefix).concat(e.photo.height).concat(e.photo.width).concat(e.photo.suffix),alt:""}):Object(h.jsx)("img",{className:"w-100",src:"https://www.history.com/.image/t_share/MTU3ODc4NjA0MDUwNTQwMjU1/image-placeholder-title.jpg",alt:""})}),Object(h.jsxs)("div",{className:"card-info",children:[e.venue.name&&Object(h.jsxs)("h4",{children:["Name: ",Object(h.jsx)("strong",{children:e.venue.name})]}),e.venue.location.distance&&Object(h.jsxs)("p",{children:["Distance: ",e.venue.location.distance,"m"]}),Object(h.jsxs)("p",{children:["Price: ",e.price]})]})]},"a".concat(t))}))}):Object(h.jsx)("div",{children:Object(h.jsx)("p",{children:"No Coffee Shop Found"})})})]})};n(44);var f=function(){var e=function(){var e=Object(c.useState)({latitude:0,longitude:0}),t=Object(o.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)(""),r=Object(o.a)(i,2),s=r[0],u=r[1],d=function(e){var t=e.coords;a({latitude:t.latitude,longitude:t.longitude})},j=function(e){u(e.message)};return Object(c.useEffect)((function(){var e=navigator.geolocation;if(e){var t=e.watchPosition(d,j);return function(){return e.clearWatch(t)}}u("Geolocation is not supported")}),[]),Object(l.a)(Object(l.a)({},n),{},{error:s})}();return Object(h.jsx)(h.Fragment,{children:e.error?Object(h.jsx)("div",{className:"error-alert",children:Object(h.jsx)("p",{children:e.error})}):Object(h.jsx)(b,{longitude:e.longitude,latitude:e.latitude})})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};r.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(f,{})}),document.getElementById("root")),m()}},[[45,1,2]]]);
//# sourceMappingURL=main.47809020.chunk.js.map