;$(function($) {
    /**
     * 发送短信
     */
    $(".YPGetCode").on("click", function() {
        var wait    = $(this).attr("data-wait");
        if (undefined == wait || 0 == wait)
        {
            var mobile  = $("#mobile").val();
            var type    = $(this).attr("data-type");
            var url     = $(this).attr("data-url");
            if ('' == mobile)
            {
                return showToast("请输入手机号码");
            }
            if (0 == isMobile(mobile))
            {
                return showToast("手机号码格式错误");
            }

            $(this).attr("style", "background: #808080;");
            $(this).attr("data-wait", 1);
            countDown(this, 60);

            var params  = new Object();
            params.mobile   = mobile;
            params.type     = type;
            Ajax.call(url, params, callbackResponse, "POST", "JSON");
        }
    });

    $(".YPLoginBtn").on("click", function() {
        var url         = $(this).attr("data-url");
        var type        = $(this).attr("data-type");
        if ("LoginView" == type)
        {
            window.location.href    = url;
        }
        else if ("DoLogin" == type)
        {
            var mobile      = $("#mobile").val();
            var password    = $("#password").val();
            // var back_act    = $("#back_act").val();
            if ('' == mobile)
            {
                return showToast("请输入手机号码");
            }
            if (0 == isMobile(mobile))
            {
                return showToast("手机号码格式错误");
            }
            if ('' == code)
            {
                return showToast("请输入短信验证码");
            }

            var params  = "mobile=" + mobile + "&password=" + password;
            Ajax.call(url, params, callbackResponse, "POST", "JSON");
        }
        else
        {
            return showToast("按钮类型错误");
        }
    });

    /**
     * 显示、隐藏密码框 
     */
    $(".YPShowHidePwd").on("click", function() {
        var dp  = document.getElementById("password");
        var dt  = document.getElementById("passwd_txt");

        if ($(this).parent().find("i").hasClass("fa fa-eye"))
        {
            $(this).parent().find("i").removeClass().addClass("fa fa-eye-slash");
            dt.style.display    = "";
            dp.style.display    = "none";
        }
        else
        {
            $(this).parent().find("i").removeClass().addClass("fa fa-eye");
            dt.style.display    = "none";
            dp.style.display    = "";
        }
    });

    /**
     * 密码同步输入
     */
    $(".YPPasswdSyn").on("keyup", function() {
        var txt = $(this).val();
        //$("#password").attr("value", txt);
        document.getElementById("password").value   = txt;
        document.getElementById("passwd_txt").value = txt;
    });

    /**
     * 注册账号
     */
    $(".YPRegBtn").on("click", function() {
        var type    = $(this).attr("data-type");
        var url     = $(this).attr("data-url");
        if ("RegView" == type)
        {
            window.location.href    = url;
        }
        else if ("DoReg" == type)
        {
            var mobile      = $("#mobile").val();
            var password    = $("#password").val();

            if ('' == mobile)
            {
                return showToast("请输入手机号码");
            }
            if (0 == isMobile(mobile))
            {
                return showToast("手机号码格式错误");
            }
            if ('' == password)
            {
                return showToast("请输入密码");
            }

            var params  = "mobile=" + mobile + "&password=" + password;
            Ajax.call(url, params, callbackResponse, "POST", "JSON");
        }
        else
        {
            return showToast("按钮类型错误");
        }
    });

    $(".YPWechatMsg").on("click", function() {
        var title   = $(this).attr("data-title");
        var msg     = $(this).attr("data-msg");
        var type    = $(this).attr("data-type");
        var url     = $(this).attr("data-url");

        showWechatMsg(title, msg, url, type);
    });
});

function callbackResponse(result)
{
    if (0 == result.error)
    {
        showToast(result.msg);
        if (undefined != result.callback)
        {
            window.location.href    = result.callback;
        }
    }
    else
    {
        showToast(result.msg);
    }
}

/**
 * countDown 倒计时
 * 
 * @param that $that 
 * @param countdown $countdown 
 * @access public
 * @return void
 */
function countDown(that, countdown)
{
    if (countdown == 0)
    {
        $(that).parent().find("a").text("重新获取验证码");
        $(that).attr("style", "");
        $(that).attr("data-wait", 0);
        return;
    }
    else
    {
        $(that).parent().find("a").text(countdown + " 秒后重新发送");
        countdown--;
    }

    setTimeout(function() {
        countDown(that, countdown);
    }, 1000);
}

/***********************************************/
//-- 公共函数
/***********************************************/
function showToast(a)
{
    if (a)
    {
        var b = $("#toast");
        b.length > 0 && (clearTimeout(b.attr("timeId")), b.remove()), $("body").append('<div id="toast" style="z-index:100000;max-width: 640px;width: 100%;text-align: center;overflow: hidden;position: fixed; bottom: 15%;font-size: 15px; line-height: 20px;color: #ffffff;"><span style="margin-right: 20px; margin-left: 20px;border-radius:30px;-webkit-border-radius: 30px;-moz-border-radius: 30px;display: inline-table;padding: 10px 18px;background: #000000;opacity: 0.9;filter:alpha(opacity=0.9);">' + a + "</span></div>"), $("#toast").fadeIn("slow"), $("#toast").attr("timeId", setTimeout(function() {
            $("#toast").fadeOut("slow")
        }, 3e3))
    }
}

function showWechatToast(a)
{
    if (a)
    {
        var b = $("#toast");
        b.length > 0 && (clearTimeout(b.attr("timeId")), b.remove()), $("body").append("<div id='toast'><div class='weui_mask_transparent'></div><div class='weui_toast'><i class='weui_icon_toast'></i><p class='weui_toast_content'>" + a + "</p></div></div>"), $("#toast").fadeIn("slow"), $("#toast").attr("timeId", setTimeout(function() {
            $("#toast").fadeOut("slow")
        }, 3e3))
    }
}

/**
 * showActionSheet 上拉菜单
 * 
 * @access public
 * @return void
 */
function showActionSheet(position)
{
    //var url     = "/mobile/common/actionsheet";

    //result  = Ajax.call(url, "position=" + position, null, "GET", "JSON", false);
    //if (0 == result.error)
    //{
        var html    = "<div id='actionSheet_wrap'>";
        //html    += "<div class='weui_mask_transition' id='mask'></div>";
        html    += "<div class='weui_mask_transition weui_fade_toggle' id='mask'></div>";
        html    += "<div class='weui_actionsheet' id='weui_actionsheet'>";
        html    += "<div class='weui_actionsheet_menu'>";
        //$(result.data).each(function(i, item) {
        //    html    += "<div class='weui_actionsheet_cell'>" + item.name + "</div>";
        //});
        html    += "<div class='weui_actionsheet_cell YPActionSheetMenu' data-msg='QQ'>QQ</div>";
        html    += "<div class='weui_actionsheet_cell YPActionSheetMenu' data-msg='微信'>微信</div>";
        html    += "<div class='weui_actionsheet_cell YPActionSheetMenu' data-msg='微博'>微博</div>";
        html    += "</div>";
        html    += "<div class='weui_actionsheet_action'>";
        html    += "<div class='weui_actionsheet_cell' id='actionsheet_cancel'>取消</div>";
        html    += "</div>";
        html    += "</div>";
        html    += "</div>";

        var actionsheet = $("#actionSheet_wrap");
        var mask = $('#mask');
        actionsheet.length > 0 && (actionsheet.remove());
        $("body").append($(html)) && $("#mask").fadeIn("slow");

        var weuiActionsheet = $('#weui_actionsheet');
        weuiActionsheet.addClass('weui_actionsheet_toggle');
        mask.show().one('click', function () {
            hideActionSheet();
        });
        $(".weui_mask_transition").one("click", function() {
            $(mask).removeClass().addClass("weui_mask_transition");
            hideActionSheet();
        });
        $('#actionsheet_cancel').one('click', function () {
            $(mask).removeClass().addClass("weui_mask_transition");
            hideActionSheet();
        });
        weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');

        $(".YPActionSheetMenu").on("click", function() {
            var msg = "您点击了 <font color='#F00'>" + $(this).attr("data-msg") + "</font>";
            $(mask).removeClass().addClass("weui_mask_transition");
            hideActionSheet();
            showToast(msg);
        })
    //}
    //else
    //{
    //    showToast(result.msg);
    //}
}

function hideActionSheet()
{
    var mask = $('#mask');
    var weuiActionsheet = $('#weui_actionsheet');

    weuiActionsheet.removeClass('weui_actionsheet_toggle');
    mask.removeClass('weui_fade_toggle');
    weuiActionsheet.on('transitionend', function () {
        mask.hide();
    }).on('webkitTransitionEnd', function () {
        mask.hide();
    });
}

function showWechatMsg(title, msg, url, type)
{
    var html    = "<div class='weui_dialog_" + type + "' id='YPWechat'>";
    html        += "<div class='weui_mask'></div>";
    html        += "<div class='weui_dialog'>";
    html        += "<div class='weui_dialog_hd'><strong class='weui_dialog_title'>" + title + "</strong></div>";
    html        += "<div class='weui_dialog_bd'>" + msg + "</div>";
    html        += "<div class='weui_dialog_ft'>";
    if ("confirm" == type)
    {
        html        += "<a href='javascript:;' class='weui_btn_dialog default YPCancel'>取消</a>";
    }
    html        += "<a href='javascript:;' class='weui_btn_dialog primary YPOK'>确定</a>";
    html        += "</div>";
    html        += "</div>";
    html        += "</div>";

    $("#YPWechat").length > 0 && $("#YPWechat").remove();
    $("div.con").append($(html)) && $("#YPWechat").fadeIn("slow");

    $(".YPCancel").one("click", function() {
        $("#YPWechat").length > 0 && $("#YPWechat").remove();
    });

    $(".YPOK").one("click", function() {
        //Ajax.call(url, "", callbackResponse, "GET", "JSON");
        showToast("已退出系统");
        $("#YPWechat").length > 0 && $("#YPWechat").remove();
    });
}

function isMobile(text)
{
    var _emp = /^\s*|\s*$/g;
    text = text.replace(_emp, "");
    var _d = /^1[3578][01379]\d{8}$/g;
    var _l = /^1[34578][01256]\d{8}$/g;
    var _y = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
    if (_d.test(text))
    {
        return 3;
    }
    else if (_l.test(text))
    {
        return 2;
    }
    else if (_y.test(text))
    {
        return 1;
    }

    return 0;
}

function logout(url)
{
    showWechatMsg("", "您确定退出系统吗？", url, "confirm");
}
