(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{437:function(e,t,n){},476:function(e,t,n){"use strict";n(437)},500:function(e,t,n){"use strict";n.r(t);var r={name:"ChargeProgress",data:()=>({percent:0}),mounted(){const e=document.querySelector(".power");document.querySelector("#range").addEventListener("input",t=>{this.percent=t.target.value,e.style.setProperty("--power",this.percent)})}},s=(n(476),n(3)),a=Object(s.a)(r,(function(){var e=this._self._c;return e("div",{staticClass:"charge-progress"},[e("div",{staticClass:"power"},[this._v("\n    "+this._s(this.percent)+"%\n  ")]),this._v(" "),e("input",{attrs:{id:"range",type:"range",min:"0",max:"100",value:"0"}})])}),[],!1,null,"32189f68",null);t.default=a.exports}}]);