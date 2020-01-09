(this["webpackJsonplodash-function-finder"]=this["webpackJsonplodash-function-finder"]||[]).push([[0],[,,,,,,,function(t,e,n){t.exports=n(17)},,,,,function(t,e,n){},,,function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(0),u=n.n(a),r=n(5),o=n.n(r),c=(n(12),n(2)),l=n(1),i=n.n(l),p=(n(15),n(16),function(t){var e=t.value,n=t.handleValueChanged,r=t.prefix,o=t.suffix,c=t.error,l=Object(a.useRef)(null);return u.a.createElement("div",{className:"editor",onClick:function(t){l&&l.current&&l.current.focus()}},r||"",u.a.createElement("span",{className:"editor__textarea",ref:l,contentEditable:!0,onKeyUp:function(t){if(l&&l.current){var e=l.current.innerText;n(e)}}},e),o||"",c?u.a.createElement("div",{"aria-live":"polite",className:"editor__error"},c):null)}),s=n(6),f=n(3),h=n.n(f),m=[{input:'["a", "b", "c"], "~"',output:'"a~b~c"'},{input:'["a", "b"], [1, 2], [true, false]',output:'[["a", 1, true], ["b", 2, false]]'},{input:'{ "a": [{ "b": { "c": 3 } }] }, "a[0].b.c"',output:"3"},{input:"[2, 1, 3, 4], [2, 3]",output:"[1, 4]"},{input:'[{ "x": 1 }, { "x": 2 }, { "x": 1 }], "x"',output:'[{ "x": 1 }, { "x": 2 }]'},{input:'["a", "b", "c", "d"], 2',output:'[["a", "b"], ["c", "d"]]'},{input:'[0, 1, false, 2, "", 3]',output:"[1, 2, 3]"},{input:"[1], 2, [3], [[4]]",output:"[1, 2, 3, [4]]"},{input:"[1, 2, 3], 2",output:"[3]"},{input:'[1, 2, 3], "a"',output:'["a", "a", "a"]'},{input:"[1, [2, [3, [4]], 5]]",output:"[1, 2, [3, [4]], 5]"},{input:'[["a", 1], ["b", 2]]',output:'{ "a": 1, "b": 2 }'},{input:"[1, 2, 3]",output:"1"},{input:"[1, 2, 1, 2], 2, 2",output:"3"},{input:"[1, 2, 3]",output:"[1, 2]"},{input:"[1, 2, 1, 2], 2",output:"3"},{input:'["a", "b", "c", "d"], 2',output:'"c"'},{input:'[{ "user": "barney", "active": false }, { "user": "fred", "active": false }], { "user": "barney", "active": false }',output:"false"},{input:'[{ "a": 1 }, { "b": 2 }]',output:'[{ "a": 1 }, { "b": 2 }]'},{input:"[1, 2, 3]",output:"true"},{input:"3, 1",output:"true"},{input:"-10, -5, 5",output:"-5"},{input:'{ "a": { "b": 2 } }, "a"',output:"true"}],d=Object.keys(i.a).filter((function(t){return"function"===typeof i.a[t]})),b=function(){var t=Object(a.useState)(m[0].input),e=Object(c.a)(t,2),n=e[0],r=e[1],o=Object(a.useState)(m[0].output),l=Object(c.a)(o,2),f=l[0],b=l[1],E=Object(a.useState)(null),v=Object(c.a)(E,2),g=v[0],O=v[1],j=Object(a.useState)(null),x=Object(c.a)(j,2),y=x[0],k=x[1],w=Object(a.useState)([]),F=Object(c.a)(w,2),C=F[0],N=F[1];Object(a.useEffect)((function(){var t=function(t,e){var n,a="[".concat(t,"]"),u="".concat(e),r=[];try{r=h.a.parse(a)}catch(o){return{matchingFns:[],inputError:"Problem parsing: ".concat(a),outputError:null}}try{n=h.a.stringify(h.a.parse(u))}catch(o){return{matchingFns:[],inputError:null,outputError:o.toString()}}return{matchingFns:Object.keys(i.a).filter((function(t){var e=i.a[t];if("function"!==typeof e)return!1;try{var a=e.apply(void 0,Object(s.a)(i.a.cloneDeep(r)));return h.a.stringify(a)===n}catch(o){return!1}})),inputError:null,outputError:null}}(n,f);N(t.matchingFns),O(t.inputError),k(t.outputError)}),[n,f,N,O,k]);var S=Object(a.useCallback)((function(t){r(t)}),[r,N,O,k]),L=Object(a.useCallback)((function(t){b(t)}),[r,N,O,k]),_=Object(a.useCallback)((function(){for(var t=n,e=f;n===t&&f===e;){var a=Math.floor(Math.random()*m.length);t=m[a].input,e=m[a].output}r(t),b(e)}),[n,f,r,b]);return u.a.createElement("div",{className:"App"},u.a.createElement("h1",null,"Lodash Function Finder"),u.a.createElement("p",null,"Lodash has about ",d.length," functions and it can be hard to remember all of them."),u.a.createElement("p",null,"Enter the expected ",u.a.createElement("span",{className:"code"},"input")," and"," ",u.a.createElement("span",{className:"code"},"output")," and we'll show Lodash functions that match."),u.a.createElement("p",null,"To see more example inputs and outputs, click the button below."),u.a.createElement("button",{onClick:_},"Random Example"),u.a.createElement("h2",null,"Input"),u.a.createElement(p,{value:n,handleValueChanged:S,prefix:"someLodashFunction(",suffix:");",error:g}),u.a.createElement("h2",null,"Output"),u.a.createElement(p,{value:f,handleValueChanged:L,error:y}),u.a.createElement("h2",null,"Matching Lodash Functions"),C.length>0?u.a.createElement("div",{"aria-live":"polite"},"Found ",C.length," match",C.length>1?"es":"",": ",C.map((function(t,e,n){return u.a.createElement(a.Fragment,null,u.a.createElement("a",{href:"https://lodash.com/docs/#".concat(t),key:t,target:"_blank"},t),e<n.length-1?", ":".")}))," "):"No matching lodash functions :(")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(u.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[7,1,2]]]);
//# sourceMappingURL=main.4d0bb484.chunk.js.map