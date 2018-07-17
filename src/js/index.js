import 'bootcss';
import "jquery";
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './../css/style.css';
import './../css/index.css';

$(function () {
    var navList = [{
        typeName: 'VR教育',
        typeId: '1',
        list: [{
            typeId: '1.1',
            typeName: '建筑教育'
        }, {
            typeId: '1.2',
            typeName: 'K12教育'
        }]
    }, {
        typeName: 'VR家装',
        typeId: '2',
        list: [{
            typeId: '2.1',
            typeName: '欧式'
        }, {
            typeId: '2.2',
            typeName: '美式'
        }]
    }, {
        typeName: 'VR工业',
        typeId: '3'
    }, {
        typeName: 'VR医疗',
        typeId: '4'
    }, {
        typeName: 'VR交通',
        typeId: '5'
    }, {
        typeName: 'VR军事',
        typeId: '6'
    }, {
        typeName: 'VR展馆',
        typeId: '7'
    }, {
        typeName: 'VR安防',
        typeId: '8'
    }, {
        typeName: '其他',
        typeId: '9'
    }];

    function getNav(list) {
        list.forEach((item, index) => {
            var navDom;
            if (item.list) {
                navDom = `<li class="have-list have-list${index}">
                <span value="${item.typeId}">${item.typeName}</span>
                </li>`
                $(navDom).appendTo('.nav-list');
                var listBox = `<div class="list-unstyled small-box small-box${index}"></div>`;
                $(listBox).appendTo('.have-list' + index);
                item.list.forEach(elemnt => {
                    var smallList = `
                    <p value="${elemnt.typeId}">${elemnt.typeName}</p>
                    `
                    $(smallList).appendTo('.small-box' + index);
                });
            } else {
                navDom = `<li>
                <span value="${item.typeId}">${item.typeName}</span>
                </li>`
                $(navDom).appendTo('.nav-list');
            }
        });
    }


    var indexModal = $('[data-remodal-id=indexModal]').remodal();
    // 获取登录信息
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    if (userType) {
        $('.user-name').html(userName);
        $('.login').hide();
    } else {
        $('.line-one').hide();
    }
    // 点击开发者中心
    $('.developer').on('click', function () {
        if (userType == '1') {
            $('.modal-text').html('普通会员不能进入开发者中心，请注册为开发者');
            indexModal.open();
        } else if (!userType) {
            $('.modal-text').html('请以开发者身份登录');
            indexModal.open();
        } else {
            window.location.href = '/login.html'
        }
    });
    // 点击关键词搜索
    $('.keywords').on('click', 'li', function () {
        $('.search-keyword').val($(this).children().text());
    });

    // 加载列表
    $('.nav-list').on('click', 'li', function () {
        localStorage.setItem('vr-name', $(this).find('span').html());
        localStorage.setItem('vr-type', $(this).find('span').attr('value'));

        if ($(this).find('span').html() == '首页') {
            $('iframe').attr('src', '/rankingList.html');
        } else {
            $('iframe').attr('src', '/classifyList.html');
        }
    });
    // 加载二级列表
    $('.small-box').on('click', 'p', function (event) {
        event.stopPropagation();
        localStorage.setItem('vr-name', $(this).html());
        localStorage.setItem('vr-type', $(this).attr('value'));
        if ($(this).html() == '首页') {
            $('iframe').attr('src', '/rankingList.html');
        } else {
            $('iframe').attr('src', '/classifyList.html');
        }
    });

    // 鼠标移入显示客服联系方式
    $('.first-li').mouseover(function () {
        $('.detail1').css({
            left: '-228px'
        });
    });
    $('.first-li').mouseleave(function () {
        $('.detail1').css({
            left: '0'
        });
    });
    $('.second-li').mouseover(function () {
        $('.detail2').css({
            left: '-228px'
        });
    });
    $('.second-li').mouseleave(function () {
        $('.detail2').css({
            left: '0'
        });
    });

    // 回到顶部
    $('.top-btn').click(function () {
        window.scrollTo(0, 0);
    });

    // 获取导航菜单
    function getNavList() {
        $.ajax({
            url: '/api/productTypeCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'producttype_getall'
            }),
            success: function (res) {

            }
        })
    }
    getNav(navList);
    setTimeout(function () {
        // 鼠标移入nav 显示下拉框
        $('.have-list').mouseover(function () {
            $(this).find('.small-box').show();
        });
        // 鼠标移出nav 隐藏下拉框
        $('.have-list').mouseleave(function () {
            $(this).find('.small-box').hide();
        });
    }, 500)
});