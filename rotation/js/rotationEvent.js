
let object_id = 0; // open facebook gift object id param
let spinDuration = 4; // set for the wheel duration
let flat_spin = true; // flat for the wheel start spin
$(document).ready(function () {

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        margin: 10,
        nav: true,
        autoHeight: true,
        navText: [$('.prev'), $('.next')],
        responsive: {
            0: {
                items: 1
            },
            338: {
                items: 2
            },
            400: {
                items: 2
            },
            480: {
                items: 3
            },
            575: {
                items: 4
            },
            750: {
                items: 5
            },
            1000: {
                items: 6
            }
        }
    })

    owl.on('mousewheel', '.owl-stage', function (e) {
        if (!(e.deltaY > 0)) {
            console.log('right');
            owl.trigger('next.owl');
        } else {
            console.log('right');
            owl.trigger('prev.owl');
        }
        e.preventDefault();
    });

    $('.owl-carousel').on("drag.owl.carousel", function (e) {
        console.log(e.page.count);
    });
    let link_voucher;
    getCount();
    submitForm();

});

function submitForm() {
    var frm = $('#submitPhoneCard');
    frm.submit(function (e) {
        $('#loading').show();
        e.preventDefault();
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                $('#loading').hide();
                $('#trungthuong-card').modal('hide');
                renderShareImg(data.data._id, data.data);

                console.log(data);
                // $.ajax({
                //     url: `/event/ajax/rotation/getForm?_id=${id}`,
                //     method: "get",
                //     success: function (data) {
                //         $('#loading').hide();
                //         if (data.data.voucher) {
                //             openFormModal(id, data.data.gift_id, data.data.voucher);
                //         } else {
                //             openFormModal(id, data.data.gift_id, data.data);
                //             if (data.data.name == null) {
                //             } else {
                //                 enableFills(0);
                //                 renderShareImg(data.data.gift_id, data.data);
                //                 console.log('->> from formModal - data gift id: ', data.data.gift_id);
                //                 console.log('->> from formModal - data: ', data.data);
                //             }
                //         }
                //         if (data.data.name == null) {
                //             enableFills(1);
                //         } else {
                //             enableFills(0);
                //         }
                //     },
                // });
                console.log('Submission was successful.');
            },
            error: function (data) {
                console.log('An error occurred.');
            },
        });
    });
}

(function (b) {
    b.toast = function (a, h, g, l, k) {
        b("#toast-container").length || (b("#tapd").prepend('<div id="toast-container" aria-live="polite" aria-atomic="true"></div>'), b("#toast-container").append('<div id="toast-wrapper"></div>')); var c = "", d = "", e = "text-muted", f = "", m = "object" === typeof a ? a.title || "" : a || "Notice!"; h = "object" === typeof a ? a.subtitle || "" : h || ""; g = "object" === typeof a ? a.content || "" : g || ""; k = "object" === typeof a ? a.delay || 3E3 : k || 3E3; switch ("object" === typeof a ? a.type || "" : l || "info") {
            case "info": c = "bg-info";
                f = e = d = "text-white"; break; case "success": c = "bg-success"; f = e = d = "text-white"; break; case "warning": case "warn": c = "bg-warning"; f = e = d = "text-white"; break; case "error": case "danger": c = "bg-danger", f = e = d = "text-white"
        }a = '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="' + k + '">' + ('<div class="toast-header ' + c + " " + d + '">') + ('<strong class="mr-auto">' + m + "</strong>"); a += '<small class="' + e + '">' + h + "</small>"; a += '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
        a += '<span aria-hidden="true" class="' + f + '">&times;</span>'; a += "</button>"; a += "</div>"; "" !== g && (a += '<div class="toast-body">', a += g, a += "</div>"); a += "</div>"; b("#toast-wrapper").append(a); b("#toast-wrapper .toast:last").toast("show")
    }
})(jQuery);

function show_toast(_title, _content) {
    $.toast({
        title: _title,
        subtitle: 'now',
        content: _content,
        type: 'warning',
        delay: 30000
    });
}

//trigg show toast every 1 second
// setInterval(
//     function () {
//         var width = $(window).width();
//         console.log(width);
//         if (width > 977) {
//             show_toast();
//         }
//         $("#toast-container").animate({ scrollTop: $('#toast-container').prop("scrollHeight")}, 100);
//     }, 1500);
// DOCUMENT READY


function renderShareImg(gift_id, object) {
    console.log(`/event/ajax/rotation/getForm?_id=${object._id}`);
    $('#loading').show();
    $.ajax({
        url: `/event/ajax/rotation/getForm?_id=${object._id}`,
        method: "get",
        success: async function (data) {

            const html_canvas = await `<div id="html-content-holder"
                            style="background-image: url('./rotation/assets/img/share-img-bg.png');background-size: cover;width:1200px;height:630px;font-family: 'Roboto'">
                            <div style="position: absolute;margin-top:65px;margin-left:745px;max-width: 450px;">
                            <img id="imgShareAvatar" src="${$("#shareImgAvatar").val()}" width="120px"
                                style="border-radius: 50%;overflow:hidden">
                            </div>
                            <div
                            style="position: absolute;margin-top:230px;margin-left:520px;width: 600px;text-align: center">
                            <div>
                                <span class="text-uppercase"
                                style="font-size: 28pt;font-weight: bold;color: #fff;line-height: 40pt;">
                                ${object.name} </span>
                            </div>
                            <div class="p-2"></div>
                            <div>
                                <span
                                    style="font-size: 19pt;color: #fff;line-height: 28pt;">
                                    Chúc mừng bạn đã trúng thẻ cào ${getGiftPhone(data.data.gift_id)}</span>
                            </div>
                            <div style="padding: 1px"></div>
                            <div>
                                <span
                                    style="font-size: 19pt;color: #fff;line-height: 28pt;">
                                    Tiếp tục quay để trúng thêm quà nhé</span>
                            </div>
                            </div>
                            <img src="./rotation/assets/img/${getGift(data.data.gift_id)}.png" width="180px"
                            style="position: absolute;margin-top:430px;margin-left:720px">
                            </div>`;
            $("#append-share").html(html_canvas);
            await showShareDialog(object._id);
            object_id = object._id;
            $('#loading').hide();
        },
    });

    console.log(object);
    console.log(gift_id);

}

function showShareDialog(gift_id_specific) {
    $("#loading").show();
    var element = $("#append-share");
    var getCanvas;
    // html2canvas(element, {
    //     onrendered: function (canvas) {
    //         getCanvas = canvas;
    //         var imgageData = getCanvas.toDataURL("image/png");
    //         console.log(imgageData);
    //     },
    // });
    html2canvas(element, {
        useCORS: true,
        onclone: function (clonedDoc) {
            $("#append-share").css("font-family", 'Roboto');
            clonedDoc.getElementById('append-share').style.display = 'block';
            clonedDoc.getElementById('html-content-holder').style.fontFamily = 'Roboto';
        }
    }).then((canvas) => {
        getCanvas = canvas;
        var imgageData = getCanvas.toDataURL("image/png");
        // $("#append-canvas").append(canvas); <- debug canvas
        $.ajax({
            url: `/event/share/submitImg`,
            type: 'POST',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data:
                JSON.stringify({
                    name: gift_id_specific,
                    img: imgageData
                }),
            success: function (data) {
                console.log(data);
                $("#loading").hide();
                $('#share-gift-fb').modal('show');
                const imgHtml = `<img class="shadow-sm" src="${data.data.imgUrl}" width="90%" style="border-radius:5px">`;
                $("#img-share-append").html(imgHtml);
            },
            error: function (data) {
                console.log("error");
            },
        });
    })
}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=588026608509106&autoLogAppEvents=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function shareOnFB(signStatus, gift_id_specific) {
    gift_id_specific = object_id;
    console.log(signStatus);
    FB.ui({
        method: 'feed',
        display: 'touch',
        link: `https://catback.vn/event/share?id=${gift_id_specific}`
    }, function (t) {
        var str = JSON.stringify(t);
        var obj = JSON.parse(str);
        console.log(t);
        if (obj.post_id != '') {
            if (signStatus == 'signed') {
                $.ajax({
                    url: `/event/rotation/share`,
                    method: "get",
                    success: function (data) {
                        console.log(data);
                        if (data.code === 0) {
                            getCount();
                            $("#turn-count").text("Quay " + rCount);
                        } else {
                            alert("HẾT LƯỢT SHARE TRONG NGÀY !");
                        }
                    },
                });
            }
        }
    });
}

var clipboard = new ClipboardJS('#coupon-go');
clipboard.on('success', function (e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});
clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

function useCoupon() {
    let flat = true;
    let countTimes = 3;
    $("#coupon-direct").show();
    //window.open(link_voucher, '_blank');
    setTimeout(function () {
        $("#coupon-direct").hide();
        $('#trungthuong-voucher').modal('hide');
        window.open(link_voucher, '_blank');
    }, 1500);
}

$(window).resize(function () {
    var wwidth = $(window).width();
    console.log(wwidth);
    if (wwidth < 481) {
        let spinWidth = $("#canvas").width();
        let spinBlink = $("#nhap-nhay").width();
        $("#nhap-nhay").width(spinWidth - (43.8 - spinWidth * 0.005));
        $("#nhap-nhay").height(spinWidth - (43.8 - spinWidth * 0.005));
        $("#nhap-nhay").css('margin-top', 20);
        $(".wheel-view").height(spinWidth);
        console.log('vong quay: ' + spinWidth + ' width, ' + spinWidth + ' height' + ' | vong nhap nhay: ' + spinBlink);
    } else {
        $("#nhap-nhay").width(433);
        $("#nhap-nhay").height(433);
        $("#nhap-nhay").css('margin-top', 22);
    }
});


$(".lich-vq").click(function () {
    $('html, body').animate({
        scrollTop: $("#lichvongquay").offset().top
    }, 300);
});
$(".dsach-tg").click(function () {
    $('html, body').animate({
        scrollTop: $("#ketquatrungthuong").offset().top
    }, 300);
});
$(".thele-ct").click(function () {
    $('html, body').animate({
        scrollTop: $("#thele").offset().top
    }, 300);
});

var rCount;
async function getCount() {
    await $.ajax({
        url: `/event/ajax/rotation/getTurns`,
        method: "get",
        success: function (data) {
            console.log('turn' + data.data.turns);
            rCount = data.data.turns;
            console.log(rCount);
        },
    });
    console.log('count left---' + rCount);
    $("#turn-count").text("Quay " + rCount);
    $("#turn-remains").text("BẠN CÒN " + rCount + " LƯỢT QUAY");
    if (rCount > 0) {
        flat_spin = true;
    } else {
        flat_spin = false;
    }
}


let theWheel = new Winwheel({
    'numSegments': 6,
    'outerRadius': 150,
    'drawMode': 'image',
    'drawText': false,
    'textFontSize': 12,
    'textOrientation': 'curved',
    'textDirection': 'reversed',
    'textAlignment': 'outer',
    'textMargin': 5,
    'textFontFamily': 'monospace',
    'textStrokeStyle': 'black',
    'textLineWidth': 2,
    'textFillStyle': 'white',
    'responsive': 'true',
    'segments':
        [
            { 'text': '100' },
            { 'text': 'vchr' },
            { 'text': '20' },
            { 'text': 'vchr' },
            { 'text': '10' },
            { 'text': 'mm' }
        ],
    'animation':
    {
        'type': 'spinToStop',
        'duration': spinDuration,
        'spins': 3,
        'callbackFinished': alertPrize
    }
});


let loadedImg = new Image(375, 375);
loadedImg.onload = function () {
    theWheel.wheelImage = loadedImg;
    theWheel.draw();
}

loadedImg.src = "./rotation/assets/img/vqnp_pc.png";
let wheelPower = 0;
let wheelSpinning = false;

function enableFills(status) {
    if (status) {
        $("#nameFill, #emailFill, #nameFill, #phoneFill, #network, #prepaid, #submbtn").prop('disabled', false);
        $("#modal-card-tutor-bottom, #modal-card-tutor-top").show();
        $("#modal-img-share-append").hide();
        $("#shareBtn").hide();
        $("#submbtn").show();
    } else {
        $("#nameFill, #emailFill, #nameFill, #phoneFill, #network, #prepaid, #submbtn").prop('disabled', true);
        $("#modal-card-tutor-bottom, #modal-card-tutor-top").hide();
        $("#modal-img-share-append").show();
        $("#shareBtn").show();
        $("#submbtn").hide();
    }
}

function getGift(id) {
    switch (String(id)) {
        case "5f55e50a1c8e287eee105c3d": { return "ticket-20k"; break; }
        case "5f56270c07a6402682d902df": { return "ticket-100k"; break; }
        case "5f570053925a6831c2fdb0cf": { return "ticket-vouch"; break; }
        case "5f6d66be4b421b3ab2552a0e": { return "ticket-vouch-may"; break; }
        case "5f56271607a6402682d902e0": { return "ticket-10k"; break; }
        case "5f56feb86f71772e0fb2c0d9": { return "ticket-lucky"; break; }
    }
}

function getGiftPhone(id) {
    switch (String(id)) {
        case "5f56270c07a6402682d902df": { return "100.000đ"; break; }
        case "5f55e50a1c8e287eee105c3d": { return "20.000đ"; break; }
        case "5f56271607a6402682d902e0": { return "10.000đ"; break; }
    }
}


function getFormModal(id) {
    $('#loading').show();
    $.ajax({
        url: `/event/ajax/rotation/getForm?_id=${id}`,
        method: "get",
        success: function (data) {
            $('#loading').hide();
            if (data.data.voucher) {
                openFormModal(id, data.data.gift_id, data.data.voucher);
            } else {
                openFormModal(id, data.data.gift_id, data.data);
                if (data.data.name == null) {

                } else {
                    enableFills(0);
                    $("#modal-card-tutor-bottom, #modal-card-tutor-top").hide();
                    const imgHtml = `<img src="/images/image-share-fb/${id}.jpeg" width="82%" style="border-radius:5px"><div class="p-1"></div>`;
                    $("#modal-img-share-append").html(imgHtml);
                    $("#shareBtn").unbind().click(
                        function (event) {
                            event.preventDefault();
                            shareOnFB('signed', id);
                        }
                    );
                    console.log('->> from formModal - data gift id: ', data.data.gift_id);
                    console.log('->> from formModal - data: ', data.data);
                }
            }
            if (data.data.name == null) {
                enableFills(1);
            } else {
                enableFills(0);
            }
        },
    });
}

function changeModalContent(giftValue, _name, _email, _phone, _network, _prepaid) {
    $('.gift-value').text(giftValue);
    $('#nameFill').val(_name);
    $('#emailFill').val(_email);
    $('#phoneFill').val(_phone);
    $("#network").children('[value="' + _network + '"]').attr('selected', true);
    $("#prepaid").children('[value="' + _prepaid + '"]').attr('selected', true);
}

function openFormModal(id, gift_id, object) {
    let v = getGift(gift_id);
    console.log(v);

    switch (String(gift_id)) {
        case "5f56271607a6402682d902e0": {
            $('#gift-id').val(id);
            changeModalContent('10.000 Đ', object.name, object.email, object.phone_number, object.network, object.prepaid_account);
            $('#trungthuong-card').modal('toggle');
            break;
        }
        case "5f55e50a1c8e287eee105c3d": {
            $('#gift-id').val(id);
            changeModalContent('20.000 Đ', object.name, object.email, object.phone_number, object.network, object.prepaid_account);
            $('#trungthuong-card').modal('toggle');
            break;
        }
        case "5f56270c07a6402682d902df": {
            $('#gift-id').val(id);
            changeModalContent('100.000 Đ', object.name, object.email, object.phone_number, object.network, object.prepaid_account);
            $('#trungthuong-card').modal('toggle');
            break;
        }
        case "5f6d66be4b421b3ab2552a0e":
        case "5f570053925a6831c2fdb0cf": {
            $('#trungthuong-voucher').modal('toggle');
            $('#coupon-title').html(object.category);
            $('#coupon-desc').html(object.content);
            $('#coupon-brand').html("#" + object.merchant);
            $('#coupon-date').html(object.end_time);
            $('#coupon-code').html(object.code);
            link_voucher = object.link;
            break;
        }
        case "5f56feb86f71772e0fb2c0d9": {
            $('#trungthuong-iphone').modal('toggle');
            break;
        }
    }
}

function startSpin() {
    enableFills(1);
    let _tm = 500; // timeout open modal _tm
    let _tn = 300; // timeout jump to new item _tn
    let _ta = 500; // timeout add newitem _ta
    let _tl = 600; // timeout jump to last item _tl
    let _ts = 500; // timeout scroll -> set to _ts
    $("#spin-it").attr("disabled", true);
    if (flat_spin) {
        $("#spin-button").prop('disabled', true)
        // theWheel.animation.stopAngle = 999;
        // theWheel.startAnimation();
        // theWheel.rotationAngle = 0;
        //$('#loading').show();
        $.ajax({
            url: `/event/rotation/run`,
            method: "get",
            success: function (data) {
                console.log(data);
                if (data.data.gift_id != "5f56feb86f71772e0fb2c0d9") {
                    setTimeout(
                        function () {
                            setTimeout(function () {
                                $('html, body').animate({
                                    scrollTop: $("#ketquatrungthuong").offset().top
                                }, 300);
                                setTimeout(function () {
                                    var owlds = $('.owl-carousel').data('owl.carousel');
                                    console.log(owlds._items.length);
                                    $('.owl-carousel').trigger('to.owl.carousel', [owlds._items.length, 100, true]);
                                    setTimeout(function () {
                                        $('.owl-carousel').owlCarousel('add', `<div class="user-history animate__animated animate__jackInTheBox" style="margin:0 auto;padding:5px">
                                                    <div class="user-history-hv" style="margin:0 auto">
                                                        <div class="user-history-contain" {{#if this.name}}
                                                            style="border:3.5px solid #ED8371;transform: rotate(4.1deg);" {{/if}}
                                                            onclick="getFormModal('${data.data.id}');">
                                                            <div class=""
                                                                style="color:#6C0B01;font-size:18px;text-align:center;padding-top:10px">
                                                                <b>`+ data.data.created_at + `</b>
                                                                <div>
                                                                    <img src="./rotation/assets/img/`+ getGift(data.data.gift_id) + `.png"
                                                                        width="55px" style="margin: 0 auto">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="user-history-backshadow"></div>
                                                    </div>
                                                    </div>`).owlCarousel('update');
                                        setTimeout(function () {
                                            var owlds = $('.owl-carousel').data('owl.carousel');
                                            console.log(owlds._items.length);
                                            $('.owl-carousel').trigger('to.owl.carousel', [owlds._items.length, 300, true]);
                                            setTimeout(function () {
                                                //renderShareImg(data.data.gift_id, data.data);
                                                $("#spin-button").prop('disabled', false);
                                                console.log('->> from quay - data gift id: ', data.data.gift_id);
                                                console.log('->> from quay - data: ', data.data);
                                                if (data.data.gift_id == "5f570053925a6831c2fdb0cf" || data.data.gift_id == "5f6d66be4b421b3ab2552a0e") {
                                                    console.log(data.data.voucher);
                                                    openFormModal(data.data.id, data.data.gift_id, data.data.voucher)
                                                } else {
                                                    openFormModal(data.data.id, data.data.gift_id, 1)
                                                };
                                            }, _tm); // timeout open modal _tm
                                        }, _tn) // timeout jump to new item _tn
                                    }, _ta); // timeout add newitem _ta
                                }, _tl); // timeout jump to last item _tl
                            }, _ts); // timeout scroll -> set to _ts
                        }, spinDuration * 1000);
                } else {
                    setTimeout(function () {
                        $("#spin-button").prop('disabled', false);
                        openFormModal(data.data.id, data.data.gift_id, 1)
                    }, (spinDuration - 1) * 1000 + (_tm + _tn + _ta + _tl + _ts))
                }
                $('#loading').hide();
                console.log('------- completed ! -------');

                if (wheelSpinning == false) {
                    //$('#loading').modal('hide');
                    // set ket qua truoc khi quay
                    let stopAt = data.data.result;
                    console.log("stop at: " + stopAt);
                    theWheel.animation.stopAngle = stopAt;
                    theWheel.startAnimation();
                    theWheel.rotationAngle = 0;
                    wheelSpinning = true;
                }
            },
        });
    } else {
        $('.historyUser').empty();
        $('#modal-hetluot').modal('toggle');
    }
}

function resetWheel() {
    theWheel.stopAnimation(false);
    //theWheel.rotationAngle = 0;
    theWheel.draw();
    wheelSpinning = false;
}

function alertPrize(indicatedSegment) {
    // alert("The wheel stopped on " + indicatedSegment.text);
    $("#spin-it").removeAttr("disabled");
    getCount();
    console.log(indicatedSegment.text)
    console.log('count from alert prize: ' + rCount)
    if (rCount > 0) {
        resetWheel()
    }
    //resetWheel()
}

$(window).bind('load', function () {
    setTimeout(function () {
        let spinWidth = $("#canvas").width();
        $(".wheel-view").height(spinWidth);
        var wwidth = $(window).width();
        console.log(wwidth);
        if (wwidth < 481) {
            let spinWidth = $("#canvas").width();
            let spinBlink = $("#nhap-nhay").width();
            $("#nhap-nhay").width(spinWidth - (43.8 - spinWidth * 0.005));
            $("#nhap-nhay").height(spinWidth - (43.8 - spinWidth * 0.005));
            $("#nhap-nhay").css('margin-top', 20);
            console.log('vong quay: ' + spinWidth + ' width, ' + spinWidth + ' height' + ' | vong nhap nhay: ' + spinBlink);
        } else {
            $("#nhap-nhay").width(433);
            $("#nhap-nhay").height(433);
            $("#nhap-nhay").css('margin-top', 22);
        }
        console.log(spinWidth);
    }, 200);
});





$(function () {
    var socket = io();
    socket.on('chat message', function (msg) {
        //nhận data về =>> toast 
        console.log(msg);
        //alert(msg)
    });
});
