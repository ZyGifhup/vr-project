webpackJsonp([9],{1:function(t,e){},2:function(t,e){},3:function(t,e,o){"use strict";(function(t){function n(){t.ajax({url:"/userCTL",type:"post",dataType:"json",contentType:"application/json; charset=utf-8",data:JSON.stringify({method:" isLogin"}),success:function(t){"false"!=t.result?(localStorage.setItem("userName",t.result.username),localStorage.setItem("userType",t.result.usertype),i.status=t.result.usertype):(localStorage.removeItem("userName"),localStorage.removeItem("userType"),i.status="")},error:function(){localStorage.removeItem("userName"),localStorage.removeItem("userType"),i.status=""}})}function a(){var e=t(".content").height();t("iframe",parent.document).css("height",e)}Object.defineProperty(e,"__esModule",{value:!0}),e.setIframeHeight=e.loginStatus=e.checkLoginStatus=void 0,o(0);var i={status:""};e.checkLoginStatus=n,e.loginStatus=i,e.setIframeHeight=a}).call(e,o(0))},34:function(t,e,o){"use strict";(function(t){o(1),o(0),o(2),o(35);var e=o(3);t(document).ready(function(){function o(){a=localStorage.getItem("userType")}function n(e){t(".title").text(e.name),t(".price-num").text(e.price),t(".downamount").text(e.downamount),t(".softsize").text(e.softsize),e.collection?t(".collection").text(e.collection):t(".collection").text(0),e.publishtime&&t(".date").text(new Date(e.publishtime.time).toLocaleString()),e.praise?t(".praise").text(e.praise):t(".praise").text(0),t(".lookcount").text(e.lookcount),t(".text-intro").text(e.intro),e.image.length>0?e.image.map(function(e){var o='\n                    <img src="'+e.imageUrl+'" alt="'+e.imageName+'">\n                ';t(o).appendTo(".img-box")}):t(".img-detail").hide(),t(".home-img").attr("src",e.homeImage).attr("alt",e.name)}(0,e.checkLoginStatus)(),Object.defineProperty(e.loginStatus,"status",{set:function(){o()}}),e.loginStatus.status="";var a=void 0,i=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(e);return null!=o?unescape(o[2]):null}("id");t.ajax({type:"post",url:"/modelCTL",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"model_detailed",modelid:i}),success:function(t){n(t)}}),(0,e.setIframeHeight)(),t(".add-praise").click(function(){t.ajax({url:"/tradingCTL",type:"post",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"praise_model",commodityId:i}),success:function(e){if("00"==e.result){window.open("_blank").location="./login.html"}else e.result>0?t(".praise").text(e.result):"false"==e.result?alert("点赞失败，请稍后重试！"):alert(e)},error:function(t){alert(t)}})}),t(".add-collection").click(function(){a?t.ajax({url:"/tradingCTL",type:"post",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"collect_model",commodityId:i}),success:function(e){if("00"==e.result){window.open("_blank").location="./login.html"}else e.result>0?t(".collection").text(e.result):"false"==e.result?alert("点赞失败，请稍后重试！"):alert(e)},error:function(t){alert(t)}}):alert("登录以后才能收藏")})})}).call(e,o(0))},35:function(t,e){}},[34]);