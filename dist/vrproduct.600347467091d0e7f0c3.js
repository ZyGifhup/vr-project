webpackJsonp([10],{1:function(t,e){},2:function(t,e){},37:function(t,e,n){"use strict";(function(t){n(1),n(0),n(2),n(38);t(document).ready(function(){function e(e){t(".title").text(e.proname),t(".softsize").text(e.softsize),t(".collection").text(e.collection),t(".praise").text(e.praise),t(".downamount").text(e.downamount),t(".publishtime").text(new Date(e.publishtime.time).toLocaleString()),t(".name").text(e.user.fullname),t(".qq").text(e.user.qq),t(".wechat").text(e.user.weixin),t(".proIntro").text(e.proIntro),t("#video").children("source").attr("src",e.videourl),t("#video").attr("poster",e.homeImage)}var n=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}("id");t.ajax({url:"/vrproductCTL",type:"post",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"vrproduct_detailed",vrid:n}),success:function(t){e(t)}}),t(".add-praise").click(function(){t.ajax({url:"/tradingCTL",type:"post",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"praise_vr",commodityId:n}),success:function(t){if("00"==t){window.open("_blank").location="./login.html"}else alert(t)}})}),t(".add-collection").click(function(){t.ajax({url:"/tradingCTL",type:"post",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"collect_vr",commodityId:n}),success:function(t){if("00"==t){window.open("_blank").location="./login.html"}else alert(t)}})})})}).call(e,n(0))},38:function(t,e){}},[37]);