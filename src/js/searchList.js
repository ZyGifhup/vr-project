import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/searchList.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/img/u137.png');
var viewLoadImg = require('./../asset/img/u115.png');
$(document).ready(function () {
    // 初始化数据
    var pageNum = 1;
    var pageRows = 12;

    // 获取vr类型
    var searchName = localStorage.getItem('search-name');
    var type = localStorage.getItem('modelOrProduct');

    function initList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
            <div class="col-md-3">
                <div class="vr-box">
                    <img class="product-img" src="${element.homeImage}" alt="vr产品图片" width="100%">
                    <p class="name">${element.proname}</p>
                    <p class="id-box">
                        <span>ID:</span>
                        <span class="id">${element.id}</span>
                    </p>
                    <p class="hot-num">
                        <img src="${viewLoadImg}" alt="">
                        <span>${element.lookcount}</span>
                    </p>
                    <p class="hot-num" style="margin-left:20px">
                        <img src="${downLoadImg}" alt="">
                        <span>${element.downamount}</span>
                    </p>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
    }

    // 获取列表数据
    function getDatas() {
        $.ajax({
            url: '/api/searchinfoCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' search_saveinfo',
                searchname: searchName,
                type: type,
                pageNumber: pageNum,
                rows: pageRows
            }),
            success: function (res) {
                if (res.length > 0) {
                    initList(res.result.data);
                    // 总条数
                    $('.total-num').html(res.result.total);
                    // 加载分页
                    var totalPageNum = Math.ceil(res.result.total / pageRows);
                    // 总页数
                    $('.total-PageNum').html(totalPageNum);

                    $('.vr-pagination').simplePaging({
                        allPage: totalPageNum, //总页数
                        showPage: 5, //显示页数
                        startPage: pageNum, //第一页页码数字
                        initPage: pageNum, //加载完毕自动跳转到第n页(初始化激活页)
                        initPageClick: true, //每次页面加载完毕后，是否触发initPage页的绑定事件
                        first: "首页", //首页显示字符
                        last: "尾页", //尾页显示字符
                        prev: "上一页", //上一页显示字符
                        next: "下一页", //下一页显示字符
                        animateType: "animation",
                        animationTime: 100,
                        callBack: function (num) {
                            pageNum = num;
                            $('.page-num').html(pageNum);
                            getDatas()
                        }
                    });
                }
            }
        })
    }
    getDatas();
});