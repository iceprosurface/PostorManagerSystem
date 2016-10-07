var nowpositon = "default";

function sidebarRefresh(tlogin) {
    //检测邮件数目使用
    if (tlogin !== "") {
        $.post(
            "/api/get/getOrderNumber",
            tlogin,
            function(data) {
                var json = JSON.parse(data);
                $("#checkedCount").text(json.checkedCount);
                $("#uncheckCount").text(json.uncheckedCount);
                var allCount = json.checkedCount + json.uncheckedCount;
                $("#allCount").text(allCount);
            });
    }
}

//切换到尚未收件列表
function turnUnreceived(page) {
    nowpositon = "Unreceived";
    $("#main").load("/tpl/UncheckedPage.html", function() {
        loadUnchecked(page);
    });
}
//切换到设置页面
function changeToConfig() {
    nowpositon = "Config";
    $("#main").load("/tpl/UsrConfig.html");
}
//切换到已经收件列表
function turnReceived(page) {
    nowpositon = "Received";
    $("#main").load("/tpl/CheckedPage.html", function() {
        loadChecked(page);
    });
}
//切换到垃圾箱
function turnBin() {
    nowpositon = "Bin";
    $("#main").load("/tpl/UsrBin.html", loadBin);
}
//切换到全部收件列表
function turnAll() {
    nowpositon = "All";
    $("#main").load("/tpl/AllTable.html", loadAll);
}
//登出
function loginOut() {
    var tlogin;
    if (tlogin !== "") {
        $.post(
            "/api/login/loginOut",
            tlogin,
            function(data) {
                var json = JSON.parse(data);
                if (json.status == 1) {
                    window.location = "/login.html?respond=1";
                } else {
                    alert('没有成功登出');
                }
            });
    } else {
        window.location = "/login.html?respond=1";
    }

}

function loadChecked(page) {
    if (!page) page = 1;
    $.post(
        "/api/get/getChecked", { 'page': page },
        function(data) {
            data = JSON.parse(data);
            $("#OrderTable").html(""); //清空info内容
            $.each(data.orders, function(i, item) {
                $("#OrderTable").append(
                    "<tr>" +
                    "<td>" +
                    "<label class='input-control checkbox small-check no-margin'>" +
                    "<input type='checkbox' id='checkBox_" + i + "'>" +
                    "<span class='check'></span>" +
                    "</label>" +
                    "</td>" +
                    "<td>" + item.orderid + "</td>" +
                    "<td>" + item.exporttime + "</td>" +
                    "<td>" + item.orderinfo + "</td>" +
                    "<td>" + item.postorid + "</td>" +
                    "</tr>");
            });
            iniPages(data.maxPage);
            loadConvertButton(data);
        }
    );
}

function loadUnchecked(page) {
    if (!page) page = 1;
    $.post(
        "/api/get/getUnchecked", { 'page': page },
        function(data) {
            data = JSON.parse(data);
            $("#OrderTable").html(""); //清空info内容
            $.each(data.orders, function(i, item) {
                var endTime;
                if (item.delay == '1') {
                    endTime = new Date(new Date(item.importtime).valueOf() + 24 * 3600 * 1000);
                } else {
                    endTime = new Date(item.importtime);
                }
                $("#OrderTable").append(
                    "<tr>" +
                    "<td>" +
                    "<label class='input-control checkbox small-check no-margin'>" +
                    "<input type='checkbox' class='uncheck' id='checkBox_" + i + "' data-id='" + item.orderid + "'>" +
                    "<span class='check'></span>" +
                    "</label>" +
                    "</td>" +
                    "<td>" + item.orderid + "</td>" +
                    "<td>" + item.importtime + "</td>" +
                    "<td>" + endTime.getFullYear() + "-" + (endTime.getMonth() + 1) + "-" + endTime.getDate() + " " + endTime.toTimeString() + "</td>" +
                    "<td>" + item.positionid + "</td>" +
                    "<td>" + item.orderinfo + "</td>" +
                    "<td>" + item.postorid + "</td>" +
                    "</tr>");
            });
            iniPages(data.maxPage);
            loadConvertButton(data);
        }
    );
}

function getAllTable() {
    if (!page) page = 1;
    $.post(
        "/api/get/getAll", { 'page': page },
        function(data) {
            data = JSON.parse(data);
            $("#OrderTable").html(""); //清空info内容
            $.each(data.orders, function(i, item) {
                $("#OrderTable").append(
                    "<tr>" +
                    "<td>" +
                    "<label class='input-control checkbox small-check no-margin'>" +
                    "<input type='checkbox' class='uncheck' id='checkBox_" + i + "' data-id='" + item.orderid + "'>" +
                    "<span class='check'></span>" +
                    "</label>" +
                    "</td>" +
                    "<td>" + item.orderid + "</td>" +
                    "<td>" + item.importtime + "</td>" +
                    "<td>" + item.exporttime + "</td>" +
                    "<td>" + item.positionid + "</td>" +
                    "<td>" + item.orderinfo + "</td>" +
                    "<td>" + item.postorid + "</td>" +
                    "</tr>");
            });
            loadConvertButton(data);
        }
    );
}

function loadAll() {
    var page = 1;
    $.post(
        "/api/get/getAll", { 'page': page },
        function(data) {
            data = JSON.parse(data);
            $("#OrderTable").html(""); //清空info内容
            $.each(data.orders, function(i, item) {
                $("#OrderTable").append(
                    "<tr>" +
                    "<td>" +
                    "<label class='input-control checkbox small-check no-margin'>" +
                    "<input type='checkbox' class='uncheck' id='checkBox_" + i + "' data-id='" + item.orderid + "'>" +
                    "<span class='check'></span>" +
                    "</label>" +
                    "</td>" +
                    "<td>" + item.orderid + "</td>" +
                    "<td>" + item.importtime + "</td>" +
                    "<td>" + item.exporttime + "</td>" +
                    "<td>" + item.positionid + "</td>" +
                    "<td>" + item.orderinfo + "</td>" +
                    "<td>" + item.postorid + "</td>" +
                    "</tr>");
            });
            loadConvertButton(data);
        }
    );
}

function loadConvertButton(x) {
    var page = x.page - 0;
    var maxPage = x.maxPage - 0;
    $("#page").html("");
    $("#page").append(page + "/" + maxPage);

    if (page >= 2) {
        $("#previousPage").attr('onclick', '');
        $("#previousPage").attr('onclick', 'loadUnchecked(' + (page - 1) + ')');

    }
    if (maxPage > 1) {
        $("#nextPage").attr('onclick', '');
        $("#nextPage").attr('onclick', 'loadUnchecked(' + (page + 1) + ')');
    }
}

//dialog and swizard
function respondDialog(id, title, text) {
    var dialog = $(id).data('dialog');
    $(id).children().children()[0].innerHTML = text;
    dialog.open();
}

function showDialog(id) {
    var dialog = $(id).data('dialog');
    dialog.open();
}

function closeDialog(id) {
    //questionSub();
    var dialog = $(id).data('dialog');
    dialog.close();
}

function pushMessage(t) {
    var mes = '通知|你已经选择了全部订单';
    $.Notify({
        caption: mes.split("|")[0],
        content: mes.split("|")[1],
        type: 'success'
    });
}

$(function() {
    $('.sidebar').on('click', 'li', function() {
        if (!$(this).hasClass('active')) {
            $('.sidebar li').removeClass('active');
            $(this).addClass('active');
        }
    });
});

function selectCheckBox(t) {
    var mes = '通知|你已经选择了全部订单|你已经取消了全部订单';
    $.Notify({
        caption: mes.split("|")[0],
        content: mes.split("|")[(t == 'true' ? 1 : 2)],
        type: (t == 'true' ? 'info' : 'success')
    });
    var param = document.getElementsByClassName('uncheck');
    $.each(param, function(i, item) {
        item.checked = (t == 'true' ? true : false);
    });
}

function delayOrders() {
    var mes = '通知|你选择的订单已被延期处理';
    $.Notify({
        caption: mes.split("|")[0],
        content: mes.split("|")[1],
        type: 'warning'
    });
    var list = [];
    var param = document.getElementsByClassName('uncheck');
    $.each(param, function(i, item) {
        if (item.checked === true) {
            list.push($(item).data("id"));
        }
    });
    if (list.length === 0) return false;
    $.ajax({
        type: "post",
        url: "/api/get/delay",
        data: { "orderlist": list },
        dataType: "json",
        success: function(data) { turnUnreceived(); }
    });
}

function msg(mes) {
    $.Notify({
        caption: mes.split("|")[0],
        content: mes.split("|")[1],
        type: 'success'
    });
}
$(document).ready(function() {
    $("#tishi").load("/api/get/usrconfig", function() { $("#carousel").carousel(); });
    var tlogin;
    sidebarRefresh(tlogin);
    $.ajax({
        type: 'POST',
        url: '/api/get/getusrname',
        data: {},
        success: function(data) {
            data = JSON.parse(data);
            var name = $('#username');
            name[0].innerHTML = "";
            name.append('<span class="mif-cog"></span><span>' + data["name"] + "</span>");
        },
        dataType: 'json'
    });
    $(window).on('resize', function() {
        if ($(this).width() <= 800) {
            $(".sidebar").addClass('compact');
        } else {
            $(".sidebar").removeClass('compact');
        }
    });
});

function iniPages(maxpage) {
    var pages = $("#pages");
    var settings = {
        cont: $("#pagecont"), //容器。值支持id名、原生dom对象，jquery对象,
        pages: maxpage, //可叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是100
        skip: true, //是否开启跳页
        skin: '#01a0e1', //#16aaff
        groups: 5, //连续显示分页数
        jump: function(obj) {
            var currentPage = obj.curr;
            switch (nowpositon) {
                case 'Unreceived':
                    turnUnreceived(currentPage);
                    break;
                case 'All':
                    turnAll(currentPage);
                    break;
                case 'Received':
                    turnReceived(currentPage);
                    break;
                default:
                    break;
            }
            pages.html('当前：第' + obj.curr + '页，总计：' + obj.pages + '页');
        }
    };
    var infoflows = new infoflow(settings);
}