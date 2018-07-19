import 'bootcss';
import 'jquery';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './ajax.js';
import './../css/style.css';
import './../css/login.css';
var backgroundImg = require('./../asset/login/u0.jpg');

$(document).ready(function () {
    console.log(sessionStorage.getItem('testKey'));

    $('.login').css('background-image', 'url(' + backgroundImg + ')');
    var params = {
        userName: false,
        password: false
    }
    var fogotPasswordModal = $('[data-remodal-id=fogotPasswordModal]').remodal();
    $('.forgot-password').on('click', function () {
        fogotPasswordModal.open();
    });
    // 登录
    $('.btn-login').on('click', function () {
        var userName = $('.user-name').val();
        var password = $('.password').val();
        $.ajax({
            url: '/api/userCTL',
            method: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'login',
                username: userName,
                password: password
            }),
            success: function (res) {
                if (res.result == '00') {
                    $('.login-msg').html('用户名或密码错误');
                    localStorage.setItem('userName', '')
                    localStorage.setItem('userType', '0')
                } else if (res.result == '01') {
                    window.location.href = '/index.html';
                    localStorage.setItem('userName', '普通会员')
                    localStorage.setItem('userType', '1')
                } else if (res.result == '02') {
                    window.location.href = '/index.html';
                    localStorage.setItem('userName', '个人开发者')
                    localStorage.setItem('userType', '2')
                } else if (res.result == '03') {
                    window.location.href = '/index.html';
                    localStorage.setItem('userName', '企业开发者')
                    localStorage.setItem('userType', '3')
                }
            },
            error: function (res) {}
        })
    });

    function checkParams() {
        if (params.userName && params.password) {
            // 解除禁用 注册按钮
            $('.btn-login').removeAttr('disabled');
        } else {
            // 禁用 注册按钮
            $('.btn-login').attr('disabled', 'disabled');
        }
    }
    // 用户名校验
    $('.user-name').bind('input propertychange', function () {
        if ($(this).val()) {
            params.userName = true;
        } else {
            params.userName = false;
        }
        checkParams();
    });
    // 密码校验
    $('.password').bind('input propertychange', function () {
        if ($(this).val()) {
            params.password = true;
        } else {
            params.password = false;
        }
        checkParams();
    });
});