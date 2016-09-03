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
function turnUnreceived() {
    $("#main").load("/tpl/UncheckedPage.html", function() { loadUnchecked(1); });
}
//切换到设置页面
function changeToConfig() {
    $("#main").load("/tpl/UsrConfig.html");
}
//切换到已经收件列表
function turnReceived() {
    $("#main").load("/tpl/CheckedPage.html", function() { loadChecked(); });
}
//切换到垃圾箱
function turnBin() {
    $("#main").load("/tpl/UsrBin.html");
}
//切换到全部收件列表
function turnAll() {
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

function loadChecked() {
    $.post(
        "/api/get/getChecked", { 'page': '1' },
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
            loadConvertButton(data);
        }
    );
}

function loadUnchecked(page) {
    $.post(
        "/api/get/getUnchecked", { 'page': page },
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
                    "<td>" + item.positionid + "</td>" +
                    "<td>" + item.orderinfo + "</td>" +
                    "<td>" + item.postorid + "</td>" +
                    "</tr>");
            });
            loadConvertButton(data);
        }
    );
}

function getAllTable() {
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
$(function() {
    $("#carousel").carousel();
});
$(function() {
    $(window).on('resize', function() {
        if ($(this).width() <= 800) {
            $(".sidebar").addClass('compact');
        } else {
            $(".sidebar").removeClass('compact');
        }
    });
});

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
});