(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{442:function(t,e,n){},481:function(t,e,n){"use strict";n(442)},505:function(t,e,n){"use strict";n.r(e);var i={name:"SvgStrokeAnimation",mounted(){this.init(),this.replay()},methods:{init(){!function t(e){if(0===e.children.length)return;for(let n=0;n<e.children.length;n++){let i=e.children[n];"g"===i.tagName?t(i):i.style.setProperty("--l",i.getTotalLength())}}(document.querySelector(".svg-icon"))},replay(){!function t(e){if(0===e.children.length)return;for(let n=0;n<e.children.length;n++){let i=e.children[n];"g"===i.tagName?t(i):(console.log(111),i.classList.remove("stroke-animation"),requestAnimationFrame(()=>{i.classList.add("stroke-animation")}))}}(document.querySelector(".svg-icon"))}}},s=(n(481),n(3)),o=Object(s.a)(i,(function(){var t=this._self._c;return t("div",[t("svg",{staticClass:"svg-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"#000000","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[t("g",{staticClass:"path",attrs:{fill:"none","fill-rule":"evenodd"}},[t("path",{staticClass:"path",attrs:{d:"M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"}})])]),this._v(" "),t("button",{on:{click:this.replay}},[this._v("重新播放")])])}),[],!1,null,"1e2ba362",null);e.default=o.exports}}]);