let object_id = 0;
let spinDuration = 5;
let flat_spin = true;
$(document).ready(async function () {
  await $("#catback-wheel").css("opacity", 0);
  initSpinImage();
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    margin: 10,
    nav: true,
    autoHeight: true,
    navText: [$(".prev"), $(".next")],
    responsive: {
      0: {
        items: 1,
      },
      338: {
        items: 2,
      },
      400: {
        items: 2,
      },
      480: {
        items: 3,
      },
      575: {
        items: 4,
      },
      750: {
        items: 5,
      },
      1000: {
        items: 6,
      },
    },
  });

  owl.on("mousewheel", ".owl-stage", function (e) {
    if (!(e.deltaY > 0)) {
      owl.trigger("next.owl");
    } else {
      owl.trigger("prev.owl");
    }
    e.preventDefault();
  });

  let link_voucher;
  getCount();
  submitForm();
});

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-bottom-left",
  preventDuplicates: false,
  onclick: null,
  showDuration: "10000",
  hideDuration: "1000",
  timeOut: "30000",
  extendedTimeOut: "2000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

function submitForm() {
  var frm = $("#submitPhoneCard");
  frm.submit(function (e) {
    $("#loading").show();
    e.preventDefault();
    $.ajax({
      type: frm.attr("method"),
      url: frm.attr("action"),
      data: frm.serialize(),
      success: function (data) {
        $("#loading").hide();
        $("#trungthuong-card").modal("hide");
        renderShareImg(data.data._id, data.data);
      },
      error: function (data) { },
    });
  });
}

function renderShareImg(gift_id, object) {
  $("#loading").show();
  $.ajax({
    url: `/event/ajax/rotation/getForm?_id=${object._id}`,
    method: "get",
    success: async function (data) {
      const html_canvas = await `<div id="html-content-holder"
                    style="background-image: url('./rotation/assets/img/share-img-bg.png');background-size: cover;width:1200px;height:630px;font-family: 'Roboto'">
                    <div style="position: absolute;margin-top:60px;margin-left:755px;max-width: 450px;">
                        <img id="imgShareAvatar" src="${$(
        " #shareImgAvatar"
      ).val()}" width="120px"
                            style="border-radius: 50%;overflow:hidden">
                    </div>
                    <div style="position: absolute;margin-top:220px;margin-left:520px;width: 600px;text-align: center">
                        <div>
                            <span class="text-uppercase" style="font-size: 33pt;font-weight: bold;color: #fff;line-height: 40pt;">
                                ${object.name}</span>
                        </div>
                        <div class="p-2"></div>
                        <div>
                            <span style="font-size: 23pt;color: #fff;line-height: 28pt;">
                                Chúc mừng bạn đã trúng thẻ cào ${getGiftPhone(
        data.data.gift_id
      )}</span>
                        </div>
                        <div style="padding: 6px"></div>
                        <div>
                            <span style="font-size: 23pt;color: #fff;line-height: 28pt;">
                                Tiếp tục quay để trúng thêm quà nhé</span>
                        </div>
                    </div>
                    <img src="./rotation/assets/img/${getGift(
        data.data.gift_id
      )}.png" width="170px"
                        style="position: absolute;margin-top:440px;margin-left:733px">
                    </div>`;
      $("#append-share").html(html_canvas);
      await showShareDialog(object._id);
      object_id = object._id;
      $("#loading").hide();
    },
  });
}

function showShareDialog(gift_id_specific) {
  $("#loading").show();
  var element = $("#append-share");
  var getCanvas;
  html2canvas(element, {
    useCORS: true,
    onclone: function (clonedDoc) {
      $("#append-share").css("font-family", "Roboto");
      clonedDoc.getElementById("append-share").style.display = "block";
      clonedDoc.getElementById("html-content-holder").style.fontFamily =
        "Roboto";
    },
  }).then((canvas) => {
    getCanvas = canvas;
    var imgageData = getCanvas.toDataURL("image/png");
    // $("#append-canvas").append(canvas); <- debug canvas
    $.ajax({
      url: `/event/share/submitImg`,
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        name: gift_id_specific,
        img: imgageData,
      }),
      success: function (data) {
        $("#loading").hide();
        $("#share-gift-fb").modal("show");
        const imgHtml = `<img class="shadow-sm" src="${data.data.imgUrl}" width="90%" style="border-radius:5px">`;
        $("#img-share-append").html(imgHtml);
      },
      error: function (data) { },
    });
  });
}

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src =
    "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=appid&autoLogAppEvents=1";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function shareOnFB(signStatus, gift_id_specific) {
  gift_id_specific = object_id;
  FB.ui(
    {
      method: "feed",
      display: "touch",
      link: `https://{your-domain}/event/share?id=${gift_id_specific}`,
    },
    function (t) {
      var str = JSON.stringify(t);
      var obj = JSON.parse(str);
    }
  );
}

function sharePage(signStatus) {
  FB.ui(
    {
      method: "feed",
      display: "touch",
      link: `https://{your-domain}/vong-quay-nhan-pham`,
    },
    function (t) {
      var str = JSON.stringify(t);
      var obj = JSON.parse(str);
      if (obj.post_id != "") {
        if (signStatus == "signed") {
          $.ajax({
            url: `/event/rotation/share`,
            method: "get",
            success: function (data) {
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
    }
  );
}

var clipboard = new ClipboardJS("#coupon-go");
clipboard.on("success", function (e) {
  e.clearSelection();
});

function useCoupon() {
  let flat = true;
  let countTimes = 3;
  $("#coupon-direct").show();
  setTimeout(function () {
    $("#coupon-direct").hide();
    $("#trungthuong-voucher").modal("hide");
    window.open(link_voucher, "_blank");
  }, 1500);
}

$(".lich-vq").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#lichvongquay").offset().top,
    },
    300
  );
});
$(".dsach-tg").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#ketquatrungthuong").offset().top,
    },
    300
  );
});
$(".thele-ct").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#thele").offset().top,
    },
    300
  );
});

var rCount;
async function getCount() {
  await $.ajax({
    url: `/event/ajax/rotation/getTurns`,
    method: "get",
    success: function (data) {
      $("#turn-count").text("Quay " + data.data.turns);
      rCount = data.data.turns;
    },
  });
}

let wheelSpinning = false;
let theWheel = new Winwheel({
  numSegments: 6,
  outerRadius: 150,
  drawMode: "image",
  drawText: false,
  responsive: "true",
  segments: [
    { text: "20" },
    { text: "vchrL" },
    { text: "10" },
    { text: "100" },
    { text: "ip" },
    { text: "vchrM" },
  ],
  animation: {
    type: "spinToStop",
    duration: spinDuration,
    spins: 3,
    callbackFinished: alertPrize,
  },
});

let loadedImg = new Image(375, 375);
loadedImg.onload = function () {
  theWheel.wheelImage = loadedImg;
  theWheel.draw();
};

function initSpinImage() {
  const wWidth = $(window).width();
  if (wWidth >= 481) {
    loadedImg.src = "./rotation/assets/img/vqnp_pc.png";
    $("#nhap-nhay").css(
      "background-image",
      "url(" + "./rotation/spinwheel-cb.gif" + ")"
    );
  } else {
    loadedImg.src = "./rotation/assets/img/vqnp_pc.png";
    $("#nhap-nhay").css(
      "background-image",
      "url(" + "/rotation/assets/mobile/blink-mob.png" + ")"
    );
  }
}

async function reponsiveSpinWheel() {
  let spinWidth = await $("#spin-wheel").width();
  await $(".wheel-view").height(spinWidth);
  var wwidth = await $("#spin-wheel").width();
  if (wwidth < 481 && $(window).width() < 500) {
    let spinWidth = await $(window).width();
    let spinBlink = await $("#nhap-nhay").width();
    await $("#nhap-nhay").width(spinWidth - (63 - spinWidth * 0.0001));
    await $("#nhap-nhay").height($("#nhap-nhay").width());
    await $("#nhap-nhay").css("margin-top", 24);
    await $("#catback-wheel").css("opacity", 1);
  } else {
    await $("#nhap-nhay").width(420);
    await $("#nhap-nhay").height(420);
    await $("#nhap-nhay").css("margin-top", 29);
    await $("#catback-wheel").css("opacity", 1);
  }
}

$(window).resize(function () {
  reponsiveSpinWheel();
});

$(window).bind("load", function () {
  reponsiveSpinWheel();
});

function enableFills(status) {
  if (status) {
    $(
      "#nameFill, #emailFill, #nameFill, #phoneFill, #network, #prepaid, #submbtn"
    ).prop("disabled", false);
    $("#modal-card-tutor-bottom, #modal-card-tutor-top").show();
    $("#modal-img-share-append").hide();
    $("#shareBtn").hide();
    $("#submbtn").show();
  } else {
    $(
      "#nameFill, #emailFill, #nameFill, #phoneFill, #network, #prepaid, #submbtn"
    ).prop("disabled", true);
    $("#modal-card-tutor-bottom, #modal-card-tutor-top").hide();
    $("#modal-img-share-append").show();
    $("#shareBtn").show();
    $("#submbtn").hide();
  }
}

function getGift(id) {
  switch (String(id)) {
    case "5f56271607a6402682d902e0": {
      return "ticket-10k";
    }
    case "5f55e50a1c8e287eee105c3d": {
      return "ticket-20k";
    }
    case "5f56270c07a6402682d902df": {
      return "ticket-100k";
    }
    case "5f570053925a6831c2fdb0cf": {
      return "ticket-vouch-lor";
    }
    case "5f6d66be4b421b3ab2552a0e": {
      return "ticket-vouch-may";
    }
    case "5f56feb86f71772e0fb2aaaa": {
      return "ticket-vouch-swift247";
    }
    case "5f56feb86f71772e0fb2c0d9": {
      return "ticket-lucky";
    }
  }
}

function getGiftToast(id) {
  switch (String(id)) {
    case "5f56271607a6402682d902e0": {
      return "thẻ điện thoại trị giá 10.000 VNĐ";
    }
    case "5f55e50a1c8e287eee105c3d": {
      return "thẻ điện thoại trị giá 20.000 VNĐ";
    }
    case "5f56270c07a6402682d902df": {
      return "thẻ điện thoại trị giá 100.000 VNĐ";
    }
    case "5f570053925a6831c2fdb0cf": {
      return "voucher giảm giá từ thương hiệu L'Oréal";
    }
    case "5f6d66be4b421b3ab2552a0e": {
      return "voucher giảm giá từ thương hiệu MAYBELLINE";
    }
    case "5f56feb86f71772e0fb2aaaa": {
      return "voucher giảm giá từ thương hiệu SWIFT247";
    }
    case "5f56feb86f71772e0fb2c0d9": {
      return "iPhone 12 Pro Max";
    }
  }
}

function getGiftPhone(id) {
  switch (String(id)) {
    case "5f56270c07a6402682d902df": {
      return "100.000đ";
    }
    case "5f55e50a1c8e287eee105c3d": {
      return "20.000đ";
    }
    case "5f56271607a6402682d902e0": {
      return "10.000đ";
    }
  }
}

function getFormModal(id) {
  $("#loading").show();
  $.ajax({
    url: `/event/ajax/rotation/getForm?_id=${id}`,
    method: "get",
    success: function (data) {
      $("#loading").hide();
      object_id = id;
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
          $("#shareBtn")
            .unbind()
            .click(function (event) {
              event.preventDefault();
              shareOnFB("signed", id);
            });
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

function changeModalContent(
  giftValue,
  _name,
  _email,
  _phone,
  _network,
  _prepaid
) {
  $(".gift-value").text(giftValue);
  $("#nameFill").val(_name);
  $("#emailFill").val(_email);
  $("#phoneFill").val(_phone);
  $("#network")
    .children('[value="' + _network + '"]')
    .attr("selected", true);
  $("#prepaid")
    .children('[value="' + _prepaid + '"]')
    .attr("selected", true);
}

function openFormModal(id, gift_id, object) {
  switch (String(gift_id)) {
    case "5f56271607a6402682d902e0": {
      $("#gift-id").val(id);
      changeModalContent(
        "10.000 Đ",
        object.name,
        object.email,
        object.phone_number,
        object.network,
        object.prepaid_account
      );
      $("#trungthuong-card").modal("toggle");
      break;
    }
    case "5f55e50a1c8e287eee105c3d": {
      $("#gift-id").val(id);
      changeModalContent(
        "20.000 Đ",
        object.name,
        object.email,
        object.phone_number,
        object.network,
        object.prepaid_account
      );
      $("#trungthuong-card").modal("toggle");
      break;
    }
    case "5f56270c07a6402682d902df": {
      $("#gift-id").val(id);
      changeModalContent(
        "100.000 Đ",
        object.name,
        object.email,
        object.phone_number,
        object.network,
        object.prepaid_account
      );
      $("#trungthuong-card").modal("toggle");
      break;
    }
    case "5f6d66be4b421b3ab2552a0e":
    case "5f56feb86f71772e0fb2aaaa":
    case "5f570053925a6831c2fdb0cf": {
      $("#trungthuong-voucher").modal("toggle");
      $("#coupon-title").html(object.category);
      $("#coupon-desc").html(object.content);
      $("#coupon-brand").html("#" + object.merchant);
      $("#coupon-date").html(object.end_time);
      $("#coupon-code").html(object.code);
      link_voucher = object.link;
      break;
    }
    case "5f56feb86f71772e0fb2c0d9": {
      $("#trungthuong-iphone").modal("toggle");
      break;
    }
  }
}

function startSpinDemo() {
  if (wheelSpinning == false) {
    $("#spin-button").attr("disabled", true);
    theWheel.startAnimation();
    theWheel.rotationAngle = 0;
    wheelSpinning = true;
    setTimeout(function () {
      $("#spin-button").prop("disabled", false);
      resetWheel();
    }, spinDuration * 1000)
  }
}

async function startSpin() {
  enableFills(1);
  let _tm = 500;
  let _tn = 300;
  let _ta = 500;
  let _tl = 600;
  let _ts = 500;
  await getCount();
  $("#spin-it").attr("disabled", true);

  $("#spin-button").prop("disabled", true);
  $.ajax({
    url: `/event/rotation/run`,
    method: "get",
    success: function (data) {
      if (!(data.code === 401)) {
        console.log(data);
        if (data.data.gift_id != "5f56feb86f71772e0fb2c0d9") {
          setTimeout(function () {
            $("#spin-button").prop("disabled", false);
            if (
              data.data.gift_id == "5f570053925a6831c2fdb0cf" ||
              data.data.gift_id == "5f6d66be4b421b3ab2552a0e" ||
              data.data.gift_id == "5f56feb86f71772e0fb2aaaa"
            ) {
              openFormModal(data.data.id, data.data.gift_id, data.data.voucher);
            } else {
              openFormModal(data.data.id, data.data.gift_id, 1);
            }
            $(function () {
              $("html, body").animate(
                {
                  scrollTop: $("#ketquatrungthuong").offset().top,
                },
                500
              );
              $(function () {
                var owlds = $(".owl-carousel").data("owl.carousel");
                $(".owl-carousel").trigger("to.owl.carousel", [
                  owlds._items.length,
                  100,
                  true,
                ]);
                $(function () {
                  $(".owl-carousel")
                    .owlCarousel(
                      "add",
                      `<div class="user-history animate__animated animate__jackInTheBox" style="margin:0 auto;padding:5px">
                                                    <div class="user-history-hv" style="margin:0 auto">
                                                        <div class="user-history-contain"
                                                            onclick="getFormModal('${data.data.id}');">
                                                            <div class=""
                                                                style="color:#6C0B01;font-size:18px;text-align:center;padding-top:10px">
                                                                <b>` +
                      data.data.created_at +
                      `</b>
                                                                <div>
                                                                    <img src="./rotation/assets/img/` +
                      getGift(data.data.gift_id) +
                      `.png"
                                                                        width="55px" style="margin: 0 auto">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="user-history-backshadow"></div>
                                                    </div>
                                                    </div>`
                    )
                    .owlCarousel("update");
                  $(function () {
                    var owlds = $(".owl-carousel").data("owl.carousel");
                    $(".owl-carousel").trigger("to.owl.carousel", [
                      owlds._items.length,
                      300,
                      true,
                    ]);
                  });
                });
              });
            });
          }, spinDuration * 1000);
        } else {
          setTimeout(function () {
            $("#spin-button").prop("disabled", false);
            openFormModal(data.data.id, data.data.gift_id, 1);
          }, (spinDuration - 1) * 1000 + (_tm + _tn + _ta + _tl + _ts));
        }
        $("#loading").hide();
        if (wheelSpinning == false) {
          let stopAt = data.data.result;
          theWheel.animation.stopAngle = stopAt;
          theWheel.startAnimation();
          theWheel.rotationAngle = 0;
          wheelSpinning = true;
        }
      } else {
        $("#spin-button").prop("disabled", false);
        $("#modal-hetluot").modal("toggle");
      }
    },
  });
}

function resetWheel() {
  theWheel.stopAnimation(false);
  theWheel.draw();
  wheelSpinning = false;
}

function alertPrize(indicatedSegment) {
  $("#spin-it").removeAttr("disabled");
  getCount();
  if (rCount > 0) {
    resetWheel();
  }
}
