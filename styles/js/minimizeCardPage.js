// set global object so we will be able to access it's api all over the system
var mainPageHandler = null;
var itemWidget = [];
$(function () {
  jQuery.validator.addMethod("prevent-space-only", function (value, element) {
    return this.optional(element) || $(element).val().trim().length > 0;
  });
  jQuery.validator.addMethod("url-without-at", function (value, element) {
    return this.optional(element) || !(value.indexOf("@") !== -1);
  });
  s123IconsPopup.init({
    translations: translations.s123IconsPopup,
    $GLOBALS: $GLOBALS,
  });
  Library.init({
    customClass: "off-canvas-mode",
    translations: {
      imageLibrary: translations.library_imageLibrary,
      close: translations.library_close,
    },
  });
  $("#videoLibrary")
    .add($("#imageLibrary"))
    .on("show.bs.modal", function () {
      var $this = $(this);
      var uploadFileInputId = $this.data("uploadFileInputId");
      switch (uploadFileInputId) {
        case "mainImage":
          $this.data("def-query", "Wallpaper");
          break;
        case "smallImage":
          $this.data("def-query", "Face");
          break;
      }
      if ($this.data(uploadFileInputId + "last-search")) {
        $this.data("def-query", $this.data(uploadFileInputId + "last-search"));
      }
      if ($this.get(0).id == "videoLibrary") {
        if (
          $this.get(0).lastUploadFileInputId &&
          $this.get(0).lastUploadFileInputId != uploadFileInputId
        ) {
          $this
            .find("#videoLibraryModal")
            .get(0)
            .contentWindow.refreshLibrary();
        }
        $this.get(0).lastUploadFileInputId = uploadFileInputId;
      } else if (
        $this.get(0).id == "imageLibrary" &&
        $this.find("#flickrLibraryModal").get(0).contentWindow.refreshLibrary
      ) {
        $this.find("#flickrLibraryModal").get(0).contentWindow.refreshLibrary();
      }
    });
});
function reloadPreview() {
  $("#previewScreen").attr("src", getPreviewHomepageURL());
}
function getPreviewHomepageURL() {
  var url = "/server_cardpage/users/page.php";
  //url = "/{{lang}}?w=" + encodeURIComponent($("#websiteID").val());
  /*if (previewLanguage != $("#language").val()) {
    url = url.replace("{{lang}}", "t-" + previewLanguage + "/");
  } else {
    url = url.replace("{{lang}}", "");
  }*/
  return url;
}
function sendScanSitemapRequest() {
  if (window.isScanSitemapSubmitted) return;
  $.ajax({
    type: "POST",
    url: "/versions/" + versionNUM + "/wizard/scanSitemapRequest.php",
    data: "w=" + $("#id").val(),
    success: function (data) {
      if (data == "succeed") window.isScanSitemapSubmitted = true;
    },
  });
}
var Wizard = (function () {
  var _ = { onInit: null };
  _.init = function (settings) {
    _.onInit = settings.onInit;
    _.$form = $("#wizardForm");
    _.contollersChangeHandler();
    loadCardDataIntoWizard();
    disableTeamMemberWizardSettings();
    _.Preview.init({
      $previewScreen: $("#previewScreen"),
      onUpdate: function (isReloadPreview, isLiveUpdate) {
        _.save(isReloadPreview, isLiveUpdate);
      },
    });
    $(document).on(
      "saveWizard",
      function (event, isPreviewReloadStatus, force, settings) {
        if (settings && ["mainImage", "smallImage"].indexOf(settings.id) != -1)
          return;
        _.save(isPreviewReloadStatus, false);
      }
    );
    $(document).on("upload_file_change.success", function (event, id, s3Obj) {
      if (settings && ["mainImage", "smallImage"].indexOf(id) != -1) return;
      if (id == "logo") {
        $("#logoVersion").val("2");
      }
      _.save(false, false);
    });
    _.Publish.init({ $modal: $("#publishModal") });
    $(".publishWizard").confirmation({
      placement: !isMobile ? intrface_align_reverse : "auto",
      title: translations.publishSure,
      btnOkLabel:
        '<i class="icon-ok-sign icon-white"></i> ' + translations.yes + "",
      btnCancelLabel:
        '<i class="icon-remove-sign"></i> ' + translations.no + "",
      popout: true,
      singleton: true,
      container: "body",
      btnOkClass: "btn-success btn-sm spacing-confirmation-btn",
      btnCancelClass: "btn-default btn-sm spacing-confirmation-btn",
      onConfirm: function (result) {
        _.save(false, false, function () {
          _.Publish.excecute();
        });
      },
    });
    $("#previewBtn").on("click", function (event) {
      event.preventDefault();
      window.open(
        "/?w=" + $("#id").val() + "&disableCache=" + getRandomInt(0, 9999999),
        "_blank"
      );
    });
    _.FormValidator.init({ $form: _.$form });
    mainPageHandler = new MainCardPageHandler({
      languageManagerHtml:
        '<div class="multi-language"><div class="ml-fields"></div></div>',
      $mainCardContainer: $("#mainCardContainer"),
    });
    if (
      window.screen.height <= 800 &&
      $("#cardEditor").data("device") == "computer"
    ) {
      fitty(".nav-btn-icon", { minSize: 4, maxSize: 15 });
      fitty(".nav-btn-txt", { minSize: 4, maxSize: 10 });
    } else {
      fitty(".nav-btn-txt", { minSize: 4, maxSize: 14 });
    }
    if (isMobile) {
      window.top.is_mobilePreview = true;
    }
    if (systemKindNUM == 4) {
      _.TeamCard.init();
    }
    InitializeToolTips();
    if (_.onInit) _.onInit.call(this);
  };
  _.save = function (isReloadPreview, isLiveUpdate, callBack) {
    clearTimeout(_.typingDelay);
    if (isLiveUpdate) {
      _.typingDelay = setTimeout(function () {
        save();
      }, typingTimeout);
    } else {
      save();
    }
    function save() {
      if (!_.$form.valid()) return;
      $("#name").val(mainPageHandler.card.getSetting("ml", "title1"));
      _.ScreenShotHandler.init(function () {
        var fields = _.getWizardSaveFields();
        $.ajax({
          type: "POST",
          url: "/versions/2/card/cardEditorO.php",
          data: fields,
          beforeSend: function () {},
          success: function (data) {
            data = tryParseJSON(data);
            if (data.consoleMessage) {
              console.log(data.consoleMessage);
            }
            if (isReloadPreview) {
              reloadPreview();
            }
            if (callBack) callBack.call(this);
          },
        });
      });
    }
  };
  _.contollersChangeHandler = function () {
    var $editorPreviewBtn = $(".editor-preview-btn");
    $("#cardEditor").on(
      "change.wizard input.wizard",
      ".wizardField",
      function (event) {
        var $controller = $(this);
        switch ($controller.get(0).id) {
          case "mainColor":
            if (
              CPColorsHandlers.isLightDarkColor($("#mainColor").val()) ===
              "light"
            ) {
              _.$form.find(".colorBrightAlert").show();
            } else {
              _.$form.find(".colorBrightAlert").hide();
            }
            Wizard.Preview.updateView($("#bgColor"));
            break;
          case "name":
            if (systemKindNUM == 4) {
              $(".g-h-name").text($controller.val());
            } else {
              $('.g-h-name:not([data-type="parentWebsite"])').text(
                $controller.val()
              );
            }
            $("#wesiteNameChange").val("changed");
            break;
          case "logo":
          case "mainImage":
          case "smallImage":
            var uploadFile = getUploadFileObjectByID($controller.get(0).id);
            var mediaPath = getImageWRV1("normal", $controller.val(), true);
            var newMediaType = UploadFile_GetFileType(
              getImageWRV1("normal", mediaPath, uploadFile.isImgObj)
            );
            if (!newMediaType) {
              newMediaType = isExtrenalVideo(mediaPath) ? "video" : "image";
            }
            $("#" + $controller.get(0).id + "MediaType").data(
              "prev-media-type",
              $("#" + $controller.get(0).id + "MediaType").val()
            );
            $("#" + $controller.get(0).id + "MediaType").val(newMediaType);
            break;
        }
      }
    );
    $(".mobilePreview").on("click", function (e) {
      e.preventDefault();
      _.Preview.setDeviceType("mobile");
    });
    $(".mobileHorizontalPreview").on("click", function (e) {
      e.preventDefault();
      _.Preview.setDeviceType("mobile_horizontal");
    });
    $(".watchPreview").on("click", function (e) {
      e.preventDefault();
      _.Preview.setDeviceType("watch");
    });
    $(".desktopPreview").on("click", function (e) {
      e.preventDefault();
      _.Preview.setDeviceType("desktop");
    });
    if (isMobile) {
      $(document).on("cpTab.change", function (event, tabID) {
        var $controller = $(`.cp-tab-controller[data-tab-id="${tabID}"]`);
        $("#cpTabLinks").hide();
        $(".editorBox").show();
        $(".top-nav #currentTabTitle").text($controller.data("tab-title"));
        $("#cpLogo").hide();
        $("#backBtn").show();
        $("#backBtn").one("click.reset", function (event) {
          $("#cpTabLinks").show();
          $(".editorBox").hide();
          $(".top-nav #currentTabTitle").text("");
          $("#cpLogo").show();
          $("#backBtn").hide();
        });
      });
    }
    _.LayoutSystem.init();
    TabsManager.init();
  };
  _.printSettings = function () {
    console.log(
      "\n" +
        "$x = xxxxxxxx; \n" +
        "$stylesModulesArr[$x] = array(); \n" +
        "$stylesModulesArr[$x]['id']               = $x; \n" +
        "$stylesModulesArr[$x]['order']            = $themeIndex; \n" +
        "$stylesModulesArr[$x]['more_settings']      = '" +
        JSON.stringify(_.getWizardSaveFields()) +
        "'; \n" +
        "$themeIndex++; \n" +
        ""
    );
  };
  _.getWizardSaveFields = function () {
    var fields = [
      "name",
      "language",
      "layout",
      "logo",
      "logo_settings",
      "logoMediaType",
      "mainImage",
      "mainImage_settings",
      "mainImageMediaType",
      "smallImage_settings",
      "smallImageMediaType",
      "smallImage",
      "mainColor",
      "bgColor",
      "goalColor",
      "mainCardJson",
      "countryFlagCode",
      "websiteID",
      "w",
      "saveTemplate",
      "systemKindNUM",
      "screenShot",
      "logoVersion",
    ];
    if (systemKindNUM == 4) {
      fields = fields.concat(_.TeamCard.wizardFields);
    }
    var data = {};
    for (fieldName of fields) {
      let $field = $("#" + fieldName);
      if ($field.length == 0) {
        $field = $('[name="' + fieldName + '"]');
      }
      switch ($field.prop("type")) {
        case "checkbox":
          data[fieldName] = $field.prop("checked") ? "on" : "off";
          break;
        case "radio":
          data[fieldName] = $field.filter(":checked").val();
          break;
        default:
          data[fieldName] = $field.val();
          break;
      }
    }
    return data;
  };
  function loadCardDataIntoWizard() {
    $("#layout")
      .val(settingsJSON["layout"])
      .trigger("change.update_controller");
    $("#logo").val(settingsJSON["logo"]);
    $("#logoMediaType").val(settingsJSON["logoMediaType"]);
    $("#mainImage").val(settingsJSON["mainImage"]);
    $("#mainImageMediaType").val(settingsJSON["mainImageMediaType"]);
    $("#smallImage").val(settingsJSON["smallImage"]);
    $("#smallImageMediaType").val(settingsJSON["smallImageMediaType"]);
    $("#mainColor").val(settingsJSON["mainColor"]);
    $("#bgColor").val(settingsJSON["bgColor"]);
    $("#goalColor").val(settingsJSON["goalColor"]);
    $("#logoVersion").val(settingsJSON["logoVersion"]);
    if (systemKindNUM == 4) {
      _.TeamCard.loadCardDataIntoWizard();
    }
    $("#mainImage_settings").html(settingsJSON["mainImage_settings"]);
    $("#smallImage_settings").html(settingsJSON["smallImage_settings"]);
  }
  function disableTeamMemberWizardSettings() {
    $.each(teamMemberDisabledSettings, function (index, categoryName) {
      const $fieldsCategory = $(
        `.fields-category[data-fields-category-name="${categoryName}"]`
      );
      $fieldsCategory.addClass("tm-disabled-setting");
      $fieldsCategory.attr(
        "title",
        translations.cpWizard.teamCardPage.disabledFields
      );
      $fieldsCategory.tooltip({
        title: translations.cpWizard.teamCardPage.disabledFields,
        trigger: "hover",
        container: "body",
        placement: "auto top",
      });
    });
  }
  _.Preview = (function () {
    var _ = {
      $frame: null,
      window: null,
      $: null,
      isReady: false,
      isKeepPreviewMode: false,
    };
    _.init = function (settings) {
      _.onUpdate = settings.onUpdate;
      _.$previewScreen = settings.$previewScreen;
      _.$previewScreen.on("load", function (event) {
        _.$frame = $(this);
        _.window = _.$frame.get(0).contentWindow;
        _.documentElement = _.$frame.contents().get(0).documentElement;
        _.$ = _.window.$;
        _.isReady = true;
        _.$frame.one("unload", function (event) {
          _.isReady = false;
        });
        if (!_.isKeepPreviewMode) {
          Wizard.Preview.setDeviceType("mobile");
        }
        _.isKeepPreviewMode = false;
        $(document).trigger("preview.loaded");
      });
      $("#cardEditor").on(
        "change.Wizard.Preview input.Wizard.Preview",
        ".wizardField",
        function (event) {
          var $controller = $(this);
          var isReloadPreview = _.updateView($controller);
          if ($controller.hasClass("custom-save")) return;
          if (_.onUpdate)
            _.onUpdate.call(this, isReloadPreview, event.type == "input");
        }
      );
      $(document).on(
        "formValidator.blur.valueRestored",
        function (event, $input) {
          if (!$input.hasClass("wizardField")) return;
          $input.trigger("change.Wizard.Preview");
        }
      );
      $(document).on("preview.loaded.mainCard", function () {
        if (
          $('#cpTabLinks .cp-tab-controller[data-tab-id="cards"].active')
            .length > 0
        )
          return;
        var previewLanguage = _.$("html").data("language");
        if (previewLanguage != mainPageHandler.card.language) {
          mainPageHandler.card.LanguageManager.selectLanguage(
            previewLanguage,
            false
          );
        }
      });
      $(document).on("preview.loaded", function (event) {
        event.preventDefault();
        _.$("#topFreeWebsiteBanner").on("click", function () {
          $("#upgradePackage")
            .data("upgrade-reason", "topFreeWebsiteBanner")
            .modal("show");
        });
        _.$(_.documentElement).on("shown.bs.offcanvas", function (event) {
          preventExternalLinks();
        });
        preventExternalLinks();
      });
    };
    _.setDeviceType = function (deviceType) {
      var ScaleByHeight = { window_height_active: 600, device_height: 750 };
      $(
        ".mobilePreview,.mobileHorizontalPreview,.watchPreview,.desktopPreview"
      ).removeClass("btn-primary");
      switch (deviceType) {
        case "mobile":
          $(".mobilePreview").addClass("btn-primary");
          scaleDestroy();
          var $previewScreenContainer = $(".preview-screen-container");
          var deviceWidth = 400;
          var deviceHeight = ScaleByHeight.device_height;
          var bottom_spacing_offset = 70;
          var iframe_width = deviceWidth;
          var iframe_height = "calc(95vh - 90px)";
          var rate_by_width = $previewScreenContainer.width() / deviceWidth;
          var rate_by_height = $previewScreenContainer.height() / deviceHeight;
          _.$previewScreen.css({
            width: iframe_width,
            height: iframe_height,
            display: "block",
            transform: "", // reset properties we added at desktop
            marginTop: "", // reset properties we added at desktop
            transformOrigin: "", // reset properties we added at desktop
            position: "", // reset properties we added at desktop
          });
          if (
            $(window).height() < ScaleByHeight.window_height_active &&
            rate_by_height < 1.0
          ) {
            iframe_width = deviceWidth * (1 / rate_by_height);
            iframe_height = deviceHeight - bottom_spacing_offset;
            _.$previewScreen.css({
              width: iframe_width,
              height: iframe_height,
              marginTop: top_spacing_offset,
              transform: "scale(" + rate_by_height + ")",
              transformOrigin: "top",
              position: "static",
            });
          }
          break;
        case "mobile_horizontal":
          $(".mobileHorizontalPreview").addClass("btn-primary");
          _.$previewScreen.css({
            width: "800px",
            height: "400px",
            marginTop: "", // reset properties we added at desktop
            transform: "", // reset properties we added at desktop
            transformOrigin: "", // reset properties we added at desktop
            position: "", // reset properties we added at desktop
          });
          break;
        case "watch":
          $(".watchPreview").addClass("btn-primary");
          _.$previewScreen.css({
            width: "348px",
            height: "268px",
            marginTop: "", // reset properties we added at desktop
            transform: "", // reset properties we added at desktop
            transformOrigin: "", // reset properties we added at desktop
            position: "", // reset properties we added at desktop
          });
          break;
        case "desktop":
          $(".desktopPreview").addClass("btn-primary");
          scaleDestroy();
          var $previewScreenContainer = $(".preview-screen-container");
          var deviceWidth = 1100;
          var deviceHeight = ScaleByHeight.device_height;
          var border_spacing = 0;
          var horizontal_spacing_offset = 40;
          var top_spacing_offset = 0;
          var bottom_spacing_offset = 40;
          var iframe_width = deviceWidth + border_spacing;
          var iframe_height = "calc(95vh - 90px)";
          var rate_by_width = $previewScreenContainer.width() / deviceWidth;
          var rate_by_height = $previewScreenContainer.height() / deviceHeight;
          _.$previewScreen.css({
            width: iframe_width,
            height: iframe_height,
            marginTop: top_spacing_offset,
            display: "block",
            transform: "",
            top: "",
            left: "",
            position: "static",
          });
          if (rate_by_width < 1.0) {
            iframe_width =
              deviceWidth - horizontal_spacing_offset + border_spacing;
            iframe_height =
              ($previewScreenContainer.height() -
                top_spacing_offset -
                bottom_spacing_offset) *
              (1 / rate_by_width);
            _.$previewScreen.css({
              width: iframe_width,
              height: iframe_height,
              marginTop: top_spacing_offset,
              transform: "scale(" + rate_by_width + ")",
              transformOrigin: "top",
              position: "static",
            });
          } else if (
            $(window).height() < ScaleByHeight.window_height_active &&
            rate_by_height < 1.0
          ) {
            iframe_width =
              ($previewScreenContainer.width() -
                horizontal_spacing_offset +
                border_spacing) *
              (1 / rate_by_height);
            iframe_height =
              deviceHeight -
              top_spacing_offset -
              bottom_spacing_offset +
              border_spacing;
            _.$previewScreen.css({
              width: iframe_width,
              height: iframe_height,
              marginTop: top_spacing_offset,
              transform: "scale(" + rate_by_height + ")",
              transformOrigin: "top",
              position: "static",
            });
          }
          break;
      }
      if (!_.isReady) return;
      function scaleDestroy() {
        _.$previewScreen.css({
          width: "",
          height: "",
          margin: "",
          display: "",
          top: "",
          left: "",
          transform: "",
          position: "",
        });
      }
      _.$(_.documentElement).trigger("deviceType.change", [deviceType]);
    };
    _.updateView = function ($controller) {
      if (!_.isReady) return false;
      var controllerID = $controller.get(0).id;
      var isReloadPreview = $controller.hasClass("previewReload");
      var $previewElement = _.$("#cE_" + controllerID);
      switch (controllerID) {
        case "layout":
          if (event.type == "input") return;
          break;
        case "title1":
          if ($controller.val().length == 0) return;
          if ($controller.closest("#mainCardContainer").length > 0) {
            $("#name").val($controller.val()).trigger("change");
          }
          $previewElement.find(".cp-text").text($controller.val());
          break;
        case "title2":
        case "about":
          $previewElement.find(".cp-text").text($controller.val());
          $previewElement.show();
          if ($controller.val().length == 0) {
            $previewElement.hide();
          }
          break;
        case "logo":
        case "mainImage":
        case "smallImage":
          var mediaPath = getImageWRV1("normal", $controller.val(), true);
          var newMediaType = UploadFile_GetFileType(mediaPath);
          if (!newMediaType) {
            newMediaType = isExtrenalVideo(mediaPath) ? "video" : "image";
          }
          isReloadPreview =
            $("#" + controllerID + "MediaType").data("prev-media-type") !=
            newMediaType;
          if (
            ["smallImage", "logo"].indexOf(controllerID) != -1 &&
            ($previewElement.length == 0 || mediaPath.length == 0)
          ) {
            isReloadPreview = true;
          }
          if (controllerID == "smallImage" || controllerID == "mainImage") {
            if ($previewElement.is("video")) {
              if ($controller.data("inf-loop") == "true") {
                $previewElement[0].loop = true;
                $previewElement[0].play();
              } else {
                $previewElement[0].loop = false;
              }
            }
          }
          if (!isReloadPreview) {
            switch (newMediaType) {
              case "video":
                $previewElement.find("source").attr("src", mediaPath);
                $previewElement.trigger("load");
                break;
              case "smallImage":
                $previewElement.attr("src", getImageWRV1(800, mediaPath));
                $previewElement.attr(
                  "srcset",
                  `${getImageWRV1(800, mediaPath)} 800w, ${getImageWRV1(
                    2000,
                    mediaPath
                  )} 2000w`
                );
                break;
              default:
                $previewElement.attr("src", getImageWRV1(800, mediaPath), true);
                $previewElement.attr(
                  "srcset",
                  `${getImageWRV1(800, mediaPath)} 2x, ${getImageWRV1(
                    2000,
                    mediaPath
                  )} 3x`
                );
                $previewElement.css({
                  aspectRatio: getImageWRV1Propery(mediaPath, "r"),
                });
                break;
            }
          }
          break;
        case "mainImage_settings":
          var settingsObj = tryParseJSON($controller.val());
          if (settingsObj.focusPoint) {
            $previewElement = _.$("#cE_mainImage");
            const mobileImageFocusPoint =
              imageFocusPoint_GetBgPositionFromString(
                JSON.stringify(settingsObj.focusPoint.mobile)
              );
            const desktopImageFocusPoint =
              imageFocusPoint_GetBgPositionFromString(
                JSON.stringify(settingsObj.focusPoint.desktop)
              );
            _.documentElement.style.setProperty(
              "--main-image-mobile-focus-point",
              mobileImageFocusPoint
            );
            _.documentElement.style.setProperty(
              "--main-image-desktop-focus-point",
              desktopImageFocusPoint
            );
          }
          break;
        case "smallImage_settings":
          var settingsObj = tryParseJSON($controller.val());
          if (settingsObj.focusPoint) {
            $previewElement = _.$("#cE_smallImage");
            $previewElement.css(
              "object-position",
              imageFocusPoint_GetBgPositionFromString(
                JSON.stringify(settingsObj.focusPoint)
              )
            );
          }
          break;
        case "mainColor":
          var color = $controller.val();
          var lightColor = tinycolor(color).toRgb();
          lightColor = tinycolor(lightColor).toHsl();
          lightColor.l = 0.9;
          lightColor = tinycolor(lightColor).toRgb();
          lightColor = tinycolor(lightColor).toHexString();
          var darkColor = tinycolor(color).toRgb();
          darkColor = tinycolor(darkColor).toHsl();
          darkColor.l = 0.2;
          darkColor = tinycolor(darkColor).toRgb();
          darkColor = tinycolor(darkColor).toHexString();
          _.documentElement.style.setProperty("--" + controllerID, color);
          _.documentElement.style.setProperty("--lightColor", lightColor);
          _.documentElement.style.setProperty("--darkColor", darkColor);
          _.updateView($("#goalColor"));
          break;
        case "pagesJSON":
          $previewElement.val($controller.val());
          break;
        case "bgColor":
          var $body = _.$("body");
          $controller.children().each(function () {
            $body.removeClass("bg-color-" + $(this).val());
          });
          if ($controller.val().length > 0) {
            $body.addClass("bg-color-" + $controller.val());
          }
          if ($controller.val() == "dark") {
            _.documentElement.style.setProperty("--white", "#000000");
            _.documentElement.style.setProperty("--black", "#ffffff");
            _.documentElement.style.setProperty("--background", "#000");
            _.documentElement.style.setProperty("--color", "#fff");
            _.documentElement.style.setProperty(
              "--action-buttons-text",
              "#fff"
            );
          } else {
            _.documentElement.style.setProperty("--white", "#ffffff");
            _.documentElement.style.setProperty("--black", "#000000");
            _.documentElement.style.setProperty("--background", "#f9f9f9");
            _.documentElement.style.setProperty("--color", "#212529");
            _.documentElement.style.setProperty(
              "--action-buttons-text",
              "#000"
            );
          }
          autoSetGoalButtonsColors();
          break;
        case "goalColor":
          var colors = { background: "", text: "" };
          var lightColor = tinycolor($("#mainColor").val()).toRgb();
          lightColor = tinycolor(lightColor).toHsl();
          lightColor.l = 0.9;
          lightColor = tinycolor(lightColor).toRgb();
          lightColor = tinycolor(lightColor).toHexString();
          var darkColor = tinycolor($("#mainColor").val()).toRgb();
          darkColor = tinycolor(darkColor).toHsl();
          darkColor.l = 0.2;
          darkColor = tinycolor(darkColor).toRgb();
          darkColor = tinycolor(darkColor).toHexString();
          if ($controller.val() == "") {
            autoSetGoalButtonsColors();
          } else {
            if ($controller.val() == "black") {
              colors.background = "#000";
              colors.text = "#fff";
            } else if ($controller.val() == "white") {
              colors.background = "#fff";
              colors.text = "#000";
            } else if ($controller.val() == "grey") {
              colors.background = "#ebedf0";
              colors.text = "#000";
            } else if ($controller.val() == "darkMain") {
              colors.background = darkColor;
              colors.text = "#fff";
            } else if ($controller.val() == "lightMain") {
              colors.background = lightColor;
              colors.text = "#000";
            } else if ($controller.val() == "main") {
              colors.background = $("#mainColor").val();
              colors.text = "#fff";
            }
            _.documentElement.style.setProperty(
              "--theme-floating",
              colors.background
            );
            _.documentElement.style.setProperty(
              "--theme-floating-text",
              colors.text
            );
          }
          break;
        case "forceSubCardsLogo":
          if ($controller.is(":checked")) {
            if ($("#logoRedirectType").val() == "custom") {
              _.$("#cE_logo")
                .closest("a")
                .attr("href", $("#redirectLogoToUrl").val());
            } else if ($("#logoRedirectType").val() == "noRedirect") {
              _.$("#cE_logo").closest("a").removeAttr("href");
            }
          } else {
            _.$("#cE_logo").closest("a").attr("href", getPreviewHomepageURL());
          }
          break;
        case "redirectLogoToUrl":
          _.$("#cE_logo").closest("a").attr("href", $controller.val());
          break;
        case "logoRedirectType":
          if ($controller.val() == "custom") {
            _.$("#cE_logo")
              .closest("a")
              .attr("href", $("#redirectLogoToUrl").val());
          } else if ($controller.val() == "noRedirect") {
            _.$("#cE_logo").closest("a").removeAttr("href");
          } else {
            _.$("#cE_logo").closest("a").attr("href", getPreviewHomepageURL());
          }
          break;
      }
      if (!isReloadPreview) {
        _.window.wizardChanged(controllerID);
      }
      return isReloadPreview;
      function autoSetGoalButtonsColors() {
        if ($("#goalColor").val() != "") return;
        if ($("#bgColor").val() == "dark") {
          _.documentElement.style.setProperty("--theme-floating", "#fff");
          _.documentElement.style.setProperty("--theme-floating-text", "#000");
        } else {
          _.documentElement.style.setProperty("--theme-floating", "#000");
          _.documentElement.style.setProperty("--theme-floating-text", "#fff");
        }
      }
    };
    function preventExternalLinks() {
      var host = new RegExp("/" + window.location.host + "/");
      _.$("a")
        .not('[data-allow-external-link="true"]')
        .each(function () {
          if (
            this.href &&
            !host.test(this.href) &&
            this.href.toLowerCase() !== "javascript:void(0);"
          ) {
            $(this)
              .off("click.previewExternalLinks")
              .on("click.previewExternalLinks", function (event) {
                openInNewTab(event, this.href);
              });
          }
        });
      _.$('a[target="_parent"], a[target="_top"]').each(function () {
        $(this).attr("target", "_self");
      });
      function openInNewTab(event, link) {
        event.preventDefault();
        event.stopPropagation();
        window.open(link, "_blank");
      }
    }
    return _;
  })();
  _.Publish = (function () {
    var _ = { $modal: null, $controller: null, teamCacheFields: {} };
    _.init = function (settings) {
      _.$modal = settings.$modal;
      getTeamCacheFields();
    };
    _.excecute = function () {
      _.show();
      if (window.gtag && gtag) {
        gtag("event", "userMakePublish_digitalCard");
      }
      const data = {
        w: $("#id").val(),
        id: $("#id").val(),
        wesiteNameChange: $("#wesiteNameChange").val(),
      };
      data.restrictTeamMembersAccess =
        Wizard.TeamCard.isTeamMembersRestricted();
      data.clearTeamCache = false;
      const wizardFields = Wizard.getWizardSaveFields();
      data.subCardsDomainActive = wizardFields.subCardsDomainActive;
      $.each(wizardFields, function (fieldName, value) {
        if (!_.teamCacheFields[fieldName]) return;
        if (_.teamCacheFields[fieldName] != value || value == "on") {
          data.clearTeamCache = true;
          return false;
        }
      });
      $.ajax({
        type: "POST",
        url: "/server_cardpage/publish.php",
        data: data,
        error: function(){
          alert('aaaaaaaaaaaaaaaaaaaa');
        },
        success: function (data) {
          if (data == "Admin User") {
            bootbox.alert({
              title:
                '<span class="text-danger"><b>Admin user can not update user website. Sorry :)</b></span>',
              message: "Admin user can not update user website. Sorry :)",
            });
          } else {
            alert('aaaaaaaaaaaaaaa');
            var json = tryParseJSON(data);
            if (!json) return;
            var websitePassword = json.websitePassword;
            var websiteDomain = json.websiteDomain;
            var publishPackageNUM = json.publishPackageNUM;
            var qrImgUrl =
              "https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=" +
              decodeURIComponent(websiteDomain) +
              "&chld=H|0";
            _.$modal.find("#publishModal_url").html(websiteDomain);
            _.$modal
              .find("#publishQRcode .qr")
              .html('<img src="' + qrImgUrl + '">');
            _.$modal.find("#publishModal_url_qr_code").on("click", function () {
              _.$modal.find(".publish_MessageAlert").hide();
              _.$modal.find("#publishQRcode").show();
            });
            _.$modal.find("#publishQRcode .close").on("click", function () {
              _.$modal.find("#publishQRcode").hide();
              _.$modal.find(".publish_MessageAlert").show();
            });
            _.share(websiteDomain);
            _.publishDomain(json.subDomainFreeAsDomain);
            _.back();
            _.downloadQR(qrImgUrl);
            _.publishOptions();
            _.copy();
            _.$modal
              .find(".publishModal_close")
              .off("click")
              .on("click", (event) => {
                _.hide();
              });
            _.$modal.find(".loadingMessage").hide();
            _.$modal.find(".successScreen").show();
            sendScanSitemapRequest();
            getTeamCacheFields();
            $("#wesiteNameChange").val("");
          }
        },
      });
    };
    _.publishOptions = function () {
      _.$modal.find(".publishModal_back").trigger("click");
      _.$modal.find(".publishModal_option").on("click", function () {
        _.$modal.find(".publishModal_ele").hide();
        _.$modal.find(".publishModal_" + $(this).data("id")).show();
        _.$modal.find(".publishModal_back").show();
        _.$modal.find(".publishModal_title").hide();
      });
    };
    _.publishDomain = function (subDomainFreeAsDomain) {
      if (subDomainFreeAsDomain == "0" || subDomainFreeAsDomain == "NULL") {
        subDomainFreeAsDomain = "";
      }
      if (subDomainFreeAsDomain == "") {
        subDomainFreeAsDomain = $("#title1").val().replace(/ /g, "-");
      }
      _.$modal.find("#publishModal_checkDomainAvailability").show();
      if (
        _.$modal.find(
          "#showSearchDomainIframe #SetDomainQuickSearchWidget_gg03h12g3f2_publish"
        ).length === 0
      ) {
        _.$modal
          .find("#showSearchDomainIframe")
          .html(
            '<div id="SetDomainQuickSearchWidget_gg03h12g3f2_publish" class="SetDomainQuickSearchWidget" data-publish="1" data-website-id="' +
              websiteID +
              '" data-design-style="light" data-load-domain="' +
              subDomainFreeAsDomain +
              '" data-upgrade-reason="multiSearchPublishModal"></div>'
          );
        SearchDomain.init();
      }
      $(".publishModal_domain_more").on("click", () => {
        $("#domainMoreOptions").modal("show");
      });
      $("#domainMoreOptions").on("show.bs.modal", function (event) {
        var modal = $(this);
        var button = $(event.relatedTarget);
        var heighestHeightNUM = isMobile
          ? $(window).outerHeight(true) - 300
          : $(window).outerHeight(true) - 200;
        modal
          .find(".modal-body")
          .html(
            '<iframe id="domainOptionsModuleIframe" name="domainOptionsModuleIframe" src="/manager/domain/getDomainMoreOptionsHTML.php?w=' +
              websiteID +
              "&domain=" +
              $(".SearchDomain_sDomainName").val() +
              "&tld=" +
              $(".SearchDomain_sDomainTlds").val() +
              "&packageNUM=" +
              packageNUM +
              '&from=1&isIframe=true" style="width:100%;margin:0;padding:0;border:0;height:' +
              heighestHeightNUM +
              'px;"></iframe>'
          );
      });
    };
    _.share = function (websiteDomain) {
      _.$modal
        .find("#publishModal_url")
        .off("click")
        .on("click", () => {
          window.open("https://" + websiteDomain, "_blank");
        });
      _.$modal
        .find("#publishModal_url_facebook")
        .attr(
          "href",
          "https://www.facebook.com/sharer/sharer.php?u=http://" +
            websiteDomain +
            ""
        );
      _.$modal
        .find("#publishModal_url_twitter")
        .attr(
          "href",
          'https://twitter.com/share?text="Check out my digital card created by CardPage"&url=http://' +
            websiteDomain +
            "&hashtags=CardPage,DigitalCard"
        );
      _.$modal
        .find("#publishModal_url_linkedin")
        .attr(
          "href",
          "https://www.linkedin.com/shareArticle?mini=true&url=http://" +
            websiteDomain +
            ""
        );
      _.$modal
        .find("#publishModal_url_telegram")
        .attr(
          "href",
          "https://telegram.me/share/url?text=&amp;url=http://" +
            websiteDomain +
            ""
        );
      let whatsAppLink = isMobile
        ? " https://wa.me/?text=%20"
        : "https://web.whatsapp.com/send?text=%20";
      _.$modal
        .find("#publishModal_url_whatsapp")
        .attr("href", whatsAppLink + websiteDomain + "");
      _.$modal.find("#copyLinkInput").val(websiteDomain);
      _.$modal.find("#publishModal_url").val(websiteDomain);
    };
    _.copy = function () {
      _.$modal
        .find(".copy-link-btn")
        .off("click")
        .on("click", function (event) {
          var copyText =
            $(this).data("link") == "top"
              ? $("#publishModal_url").get(0)
              : $("#copyLinkInput").get(0);
          copyText.select();
          copyText.setSelectionRange(0, 99999);
          document.execCommand("copy");
          $.gritter.add({
            title: "Link copied to clipboard",
            class_name: "gritter-success",
            time: 6000,
          });
        });
    };
    _.downloadQR = function (qrImgUrl) {
      if ($(".publishQRcode_download .pro-feature-label").length == 0) {
        ProFeature_addLabel({
          websiteID: websiteID,
          packageNUM: packageNUM,
          toolType: "cp_publishDownloadQR",
          $element: $(".publishQRcode_download"),
          limitedToPackageNUM: "1",
        });
      }
      if (
        ProFeature_isLimit({
          websiteID: websiteID,
          packageNUM: packageNUM,
          toolType: "cp_publishDownloadQR",
          limitedToPackageNUM: "1",
        })
      ) {
        $(".publishQRcode_download")
          .off("click")
          .on("click.pro", function (event) {
            event.preventDefault();
            event.stopPropagation();
            ProFeature_limit({
              websiteID: websiteID,
              packageNUM: packageNUM,
              toolType: "cp_publishDownloadQR",
              featureID: "publishDownloadQR",
              limitedToPackageNUM: "1",
            });
          });
      } else {
        _.$modal
          .find(".publishQRcode_download")
          .off("click")
          .on("click", function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", qrImgUrl, true);
            xhr.responseType = "blob";
            xhr.onload = function () {
              var urlCreator = window.URL || window.webkitURL;
              var imageUrl = urlCreator.createObjectURL(this.response);
              var tag = document.createElement("a");
              tag.href = imageUrl;
              tag.download = "qrImage.png";
              document.body.appendChild(tag);
              tag.click();
              document.body.removeChild(tag);
            };
            xhr.send();
          });
      }
    };
    _.back = function () {
      _.$modal
        .find(".publishModal_back")
        .off("click")
        .on("click", function () {
          _.$modal.find(".publishModal_ele").hide();
          _.$modal.find(".publishModal_options").show();
          _.$modal.find(".publishModal_back").hide();
          _.$modal.find(".publishModal_title").show();
        });
    };
    _.show = function () {
      _.$modal.find(".loadingMessage").show();
      _.$modal.find(".successScreen").hide();
      _.$modal.modal("show");
    };
    _.hide = function () {
      _.$modal.modal("hide");
    };
    function getTeamCacheFields() {
      $.each(Wizard.getWizardSaveFields(), function (fieldName, value) {
        if (
          !Wizard.$form
            .find("#" + fieldName)
            .hasClass("team-member-inheritance")
        )
          return;
        _.teamCacheFields[fieldName] = value;
      });
    }
    return _;
  })();
  _.FormValidator = (function () {
    var _ = { validator: null, $form: null };
    _.init = function (settings) {
      _.$form = settings.$form;
      _.$form.submit(function (e) {
        e.preventDefault();
      });
      _.validator = _.$form.validate({
        errorElement: "div",
        errorClass: "help-block",
        focusInvalid: true,
        ignore: ".ignore",
        highlight: function (e) {
          $(e)
            .closest(".form-group")
            .removeClass("has-info")
            .addClass("has-error");
        },
        success: function (e) {
          $(e).closest(".form-group").removeClass("has-error");
          $(e).remove();
        },
        errorPlacement: function (error, element) {
          if (
            element.is("input[type=checkbox]") ||
            element.is("input[type=radio]")
          ) {
            var controls = element.closest('div[class*="col-"]');
            if (controls.find(":checkbox,:radio").length > 1)
              controls.append(error);
            else error.insertAfter(element.nextAll(".lbl:eq(0)").eq(0));
          } else if (element.is(".select2")) {
            error.insertAfter(
              element.siblings('[class*="select2-container"]:eq(0)')
            );
          } else if (element.is(".chosen-select")) {
            error.insertAfter(
              element.siblings('[class*="chosen-container"]:eq(0)')
            );
          } else {
            error.appendTo(element.closest(".form-group"));
          }
        },
      });
      _.refresh();
    };
    _.refresh = function () {
      _.$form
        .find("[required]:is(input,textarea)")
        .each(function (index, input) {
          var $this = $(this);
          $this
            .on("focus.disallowEmpty", function () {
              $this.data("value", $this.val());
            })
            .on("blur.disallowEmpty", function () {
              if ($this.val().trim().length == 0) {
                $this.val($this.data("value"));
                _.validator.element('[name="' + $this.attr("name") + '"]');
                $(document).trigger("formValidator.blur.valueRestored", [
                  $this,
                ]);
              }
            });
        });
    };
    return _;
  })();
  _.LayoutSystem = (function () {
    var _ = { layoutID: "" };
    _.init = function (settings) {
      _.layoutID = $("#layout").val();
      $("#allLayouts").on(
        "click.update_controller",
        ".layout-item",
        function (event) {
          event.preventDefault();
          $("#layout").val($(this).data("value")).trigger("change");
        }
      );
      $("#layout").on("change.update_controller", function (event) {
        event.preventDefault();
        _.layoutID = $(this).val();
        $('#allLayouts .layout-item[data-value="' + _.layoutID + '"]')
          .addClass("active")
          .siblings()
          .removeClass("active");
        _.disableEnableFields();
        Wizard.Preview.isKeepPreviewMode = true;
      });
      $(document).on("layoutSystem.refresh", function () {
        _.disableEnableFields();
      });
    };
    _.disableEnableFields = function () {
      var $selectedLayout = $(
        '#allLayouts .layout-item[data-value="' + _.layoutID + '"]'
      );
      $(".inactive-layout-field").removeClass("inactive-layout-field");
      if ($selectedLayout.data("disabled-fields")) {
        $($selectedLayout.data("disabled-fields")).addClass(
          "inactive-layout-field"
        );
      }
    };
    _.isFieldDisabled = function (fieldSelector) {
      return $(fieldSelector).hasClass("inactive-layout-field");
    };
    return _;
  })();
  _.ScreenShotHandler = (function () {
    var _ = {};
    _.init = function (clalback) {
      var profileImage = getUploadFileObjectByID("smallImage");
      var mainImage = getUploadFileObjectByID("mainImage");
      if (profileImage.input.val().length > 0) {
        setScreenShot(profileImage.input.val(), clalback);
      } else if (!Wizard.LayoutSystem.isFieldDisabled(".mainImageBox")) {
        if ($(".mainImageBox").hasClass("tm-disabled-setting")) {
          setScreenShot(
            $(".mainImageBox .dummy-tool").data("original"),
            clalback
          );
        } else {
          setScreenShot(
            getImageWRV1("normal", mainImage.input.val(), true),
            clalback
          );
        }
      } else {
        setScreenShot("", clalback);
      }
    };
    function setScreenShot(mediaPath, clalback) {
      var mediaType = UploadFile_GetFileType(mediaPath);
      if (!mediaType) {
        mediaType = isExtrenalVideo(mediaPath) ? "video" : "image";
      }
      if (mediaType == "video") {
        $.ajax({
          type: "POST",
          url: "/versions/" + versionNUM + "/wizard/getVideoThumbeURL.php",
          data: "w=" + $("#id").val() + "&videoURL=" + mediaPath,
          success: function (url) {
            $("#wizardForm #screenShot").val(url);
            if (clalback) clalback.call(this);
          },
        });
      } else {
        $("#wizardForm #screenShot").val(mediaPath);
        if (clalback) clalback.call(this);
      }
    }
    return _;
  })();
  _.TeamCard = (function () {
    const _ = {
      wizardFields: [
        "forceSubCardsLogo",
        "forceSubCardsColor",
        "allowMembersCardEdit",
        "logoRedirectType",
        "redirectLogoToUrl",
        "forceSubCardsBackground",
        "subCardsLayout",
        "forceSubCardsLayout",
        "subCardsDomainActive",
      ],
    };
    _.init = function () {
      forceLogoHandler();
      $("#subCardsDomainActive").on("change", function () {
        if ($("#subCardsDomainActive").is(":checked")) {
          checkDomainCname();
        } else {
          showHideSubCardsDomainMSG(false);
        }
      });
      $("#logoRedirectType").on("change", function () {
        showHideLogoRedirect($("#logoRedirectType").val() == "custom");
      });
      showHideLogoRedirect($("#logoRedirectType").val() == "custom");
      $('[name="forceSubCardsLayout"]').on("change", function () {
        showHideSubCardsLayouts($(this).val() == "1");
      });
      showHideSubCardsLayouts(settingsJSON["forceSubCardsLayout"] == "1");
      ProFeature_addLabel({
        websiteID: websiteID,
        packageNUM: packageNUM,
        toolType: "cp_subCardsDomainActive",
        $element: $(".s-c-d-a-label"),
        limitedToPackageNUM: "1",
      });
      if (
        ProFeature_isLimit({
          websiteID: websiteID,
          packageNUM: packageNUM,
          toolType: "cp_subCardsDomainActive",
          limitedToPackageNUM: "1",
        })
      ) {
        $("#subCardsDomainActive")
          .off("click")
          .on("click.pro", function (event) {
            event.preventDefault();
            event.stopPropagation();
            ProFeature_limit({
              websiteID: websiteID,
              packageNUM: packageNUM,
              toolType: "cp_subCardsDomainActive",
              featureID: "subCardsDomainActive",
              limitedToPackageNUM: "1",
            });
          });
      } else {
        if (unique_domain.length == 0) {
          $("#subCardsDomainActive")
            .closest(".s-c-d-container")
            .addClass("tm-disabled-setting");
          $("#subCardsDomainActive").closest(".s-c-d-container").tooltip({
            title: translations.cpWizard.teamCardPage.subDomainDisabledTooltip,
            trigger: "hover",
            container: "body",
            placement: "auto top",
          });
        } else {
          if ($("#subCardsDomainActive").is(":checked")) {
            $(document).on("cpTab.change.team_check_cname", (event, tabID) => {
              if (tabID != "cardsSettings") {
                return;
              }
              checkDomainCname();
            });
          }
        }
      }
    };
    _.loadCardDataIntoWizard = function () {
      if (settingsJSON["forceSubCardsLogo"] == "on") {
        $("#forceSubCardsLogo").prop("checked", true);
      }
      if (settingsJSON["subCardsDomainActive"] == "on") {
        $("#subCardsDomainActive").prop("checked", true);
      }
      if (settingsJSON["forceSubCardsColor"] == "on") {
        $("#forceSubCardsColor").prop("checked", true);
      }
      if (settingsJSON["allowMembersCardEdit"] == "on") {
        $("#allowMembersCardEdit").prop("checked", true);
      }
      if (settingsJSON["forceSubCardsBackground"] == "on") {
        $("#forceSubCardsBackground").prop("checked", true);
      }
      $(
        '[name="forceSubCardsLayout"][value="' +
          settingsJSON["forceSubCardsLayout"] +
          '"]'
      ).prop("checked", true);
      $("#logoRedirectType").val(settingsJSON["logoRedirectType"]);
      $("#redirectLogoToUrl").val(settingsJSON["redirectLogoToUrl"]);
      $("#subCardsLayout").val(settingsJSON["subCardsLayout"]);
    };
    _.isTeamMembersRestricted = function () {
      return !$("#allowMembersCardEdit").is(":checked");
    };
    function showHideLogoRedirectType(showSetting) {
      if (showSetting) {
        $(".redirect-logo-url-type").fadeIn();
      } else {
        $(".redirect-logo-url-type").fadeOut();
      }
    }
    function showHideSubCardsDomainMSG(showSetting) {
      if (showSetting) {
        $(".sub-cards-domain-msg").fadeIn();
      } else {
        $(".sub-cards-domain-msg").fadeOut(function () {
          $(".sub-cards-domain-msg").html("");
        });
      }
    }
    function showHideLogoRedirect(showSetting) {
      if (showSetting) {
        $(".redirect-logo-custom-card").fadeIn();
      } else {
        $(".redirect-logo-custom-card").fadeOut();
      }
    }
    function showHideSubCardsLayouts(showSetting) {
      if (showSetting) {
        $(".sub-cards-layouts").fadeIn();
      } else {
        $(".sub-cards-layouts").fadeOut();
      }
    }
    function checkDomainCname() {
      if (
        ProFeature_isLimit({
          websiteID: websiteID,
          packageNUM: packageNUM,
          toolType: "cp_subCardsDomainActive",
          limitedToPackageNUM: "2",
        })
      ) {
        return;
      }
      $.ajax({
        type: "POST",
        url:
          "/versions/" +
          versionNUM +
          "/card/teamCardPage/interface/teamCardCnameValidation.php",
        data: { w: $("#id").val() },
        success: (data) => {
          data = tryParseJSON(data);
          if (!data.isValid) {
            $(".sub-cards-domain-msg").html(
              `<div class="alert alert-warning">${data.errrMSG}</div>`
            );
            showHideSubCardsDomainMSG(true);
          }
          $(document).off("cpTab.change.team_check_cname");
        },
      });
    }
    function forceLogoHandler() {
      $("#forceSubCardsLogo").on("change", function () {
        showHideLogoRedirectType($("#forceSubCardsLogo").is(":checked"));
      });
      showHideLogoRedirectType(settingsJSON["forceSubCardsLogo"] == "on");
      if ($("#logo").val().length == 0) {
        disablForceLogoBox();
      }
      $("#logo").on("change", function (event, s3Obj) {
        if (s3Obj) {
          enableForceLogoBox();
        } else {
          disablForceLogoBox();
        }
      });
      function enableForceLogoBox() {
        $(".force-logo-box").removeClass("tm-disabled-setting");
        $(".force-logo-box").tooltip("destroy");
      }
      function disablForceLogoBox() {
        $(".force-logo-box").addClass("tm-disabled-setting");
        $(".force-logo-box").tooltip({
          title: translations.cpWizard.teamCardPage.disabledFroceLogo,
          trigger: "hover",
          container: "body",
          placement: "auto top",
        });
        InitializeToolTips();
        $("#forceSubCardsLogo").prop("checked", false);
        showHideLogoRedirectType(false);
      }
    }
    return _;
  })();
  return _;
})();
var LanguageManager = (function () {
  var _ = { supportedFields: ["title1", "title2", "about", "pagesJSON"] };
  _.getDefaultStructure = function (languageObj) {
    var def = new Data();
    var defaultPages = ["phone", "whatsApp", "email"];
    def[$("#language").val()] = new Language(languageObj);
    def[$("#language").val()].fields.title2 =
      translations.cpWizard.wizardFields.subTitleDef;
    def[$("#language").val()].fields.about =
      translations.cpWizard.wizardFields.aboutDef;
    def[$("#language").val()].fields.pagesJSON = {};
    for (var i = 0; i < defaultPages.length; i++) {
      for (var j = 0; j < itemWidget.length; j++) {
        if (itemWidget[j].type == defaultPages[i]) {
          var item = itemWidget[j];
          item.id = uniqid();
          def[$("#language").val()].fields.pagesJSON[item.id] = item;
          break;
        }
      }
    }
    def[$("#language").val()].fields.pagesJSON = JSON.stringify(
      def[$("#language").val()].fields.pagesJSON
    );
    return def;
  };
  _.getInstance = function (settings) {
    return new Instance(settings);
  };
  function Language(data) {
    var def = {
      isStatic: false,
      language: "",
      countryCode: "",
      uniqueDomain: "",
      languageCode: "",
      languageName: "",
      languageCustomName: "",
      fields: new WizardFields(),
    };
    data = objectAssign(def, data);
    return data;
  }
  function Data(data) {
    function Def() {
      return {};
    }
    var def = new Def();
    if (data) {
      data = objectAssign(new Def(), data); // (objectAssign overwrite objects)
    } else {
      data = def;
    }
    return data;
  }
  function WizardFields(data) {
    var def = {};
    $.each(_.supportedFields, function (index, fieldID) {
      switch (fieldID) {
        case "pagesJSON":
          def[fieldID] = JSON.stringify({});
          break;
        default:
          def[fieldID] = "";
          break;
      }
    });
    data = objectAssign(def, data);
    return data;
  }
  function Instance(settings) {
    var _ = {
      animatesDuration: 600,
      supportedFields: LanguageManager.supportedFields,
      cardPage: settings.cardPage,
      $fieldsContainer: $(settings.fieldsContainer),
      onSave: settings.onSave,
      onRender: settings.onRender,
      onControllerRender: settings.onControllerRender,
      onChange: settings.onChange,
      data: new Data(tryParseJSON(settings.settingsJSON)),
      isRTL: settings.isRTL,
      rootButtonsContainer: settings.rootButtonsContainer,
      itemsContainer: settings.itemsContainer,
      mainItemsContainer: settings.mainItemsContainer,
      firstLoad: true,
    };
    _.init = function () {
      renderWizardFields(true);
      reRenderLanguageController();
    };
    _.getAllSettings = function () {
      return _.data;
    };
    _.countLanguages = function () {
      return Object.values(_.data).filter((language) => !language.isStatic)
        .length;
    };
    _.selectLanguage = function (selectLanguage, isPreviewReload) {
      if (!_.data[selectLanguage]) {
        selectLanguage = _.cardPage.getMainLanguageCode();
        isPreviewReload = true;
      }
      _.$controller
        .find(".lang-c")
        .val(selectLanguage)
        .trigger("change", [isPreviewReload]);
    };
    function getCurrentFields() {
      var wizardFields = {};
      $.each(_.supportedFields, function (index, fieldID) {
        wizardFields[fieldID] = _.$fieldsContainer.find("#" + fieldID).val();
      });
      return wizardFields;
    }
    function getLanguageJson(languageCode) {
      var json = {};
      $.each(languagesList, function (index, language) {
        if (language.short == languageCode) {
          json = language;
          return false;
        }
      });
      return json;
    }
    function reRenderLanguageController() {
      if (Object.keys(_.data).length > 1) {
        renderListController();
      } else {
        renderIconController();
      }
      InitializeToolTips();
      if (_.onControllerRender) _.onControllerRender.call(this, _);
    }
    function renderIconController() {
      if (_.$controller) _.$controller.remove();
      var html = "";
      html +=
        '<a id="selectLanguage" href="#" class="lang-c" data-rel="tooltip" data-html="true" data-trigger="hover" title="' +
        escapeHtml(translations.cpWizard.lm.iconToolTip) +
        '">';
      html +=
        '<i class="is-loading ace-icon fal fa-spinner fa-solid fa-spin"></i> ';
      html += '<i class="menu-icon fal fa-language"></i>';
      html += "</a>";
      _.$controller = $(html);
      _.$controller.on("click", function (event) {
        event.preventDefault();
        showModal();
      });
      _.$fieldsContainer.find(".title1Box").prepend(_.$controller);
      InitializeToolTips();
    }
    function renderListController() {
      if (_.$controller) _.$controller.remove();
      var html = '<div class="languageBox cardEditBox">';
      html += getLanguagesPremiumMsg();
      html += "<div>";
      html += "<label>" + translations.cpWizard.lm.title;
      html +=
        ' <a href="#" onclick="return false;" data-rel="tooltip" data-html="true" data-trigger="hover" title="' +
        escapeHtml(translations.cpWizard.lm.titleToolTip) +
        '"><i class="fa fa-question-circle"></i></a>';
      html += "</label>";
      html += "</div>";
      html += '<div class="input-group">';
      html += '<select class="form-control lang-c">';
      $.each(_.data, function (indx, value) {
        var language = getLanguageJson(value.language);
        html +=
          '<option value="' +
          language.short +
          '" ' +
          (_.cardPage.getMainLanguageCode() == language.short
            ? "selected"
            : "") +
          ">" +
          language.name +
          "</option>";
      });
      html += "</select>";
      html += '<div class="input-group-btn">';
      html +=
        '<button id="selectLanguage" type="button" class="btn btn-sm btn-primary">';
      html += translations.cpWizard.lm.manageLanguages;
      html +=
        ' <i class="is-loading ace-icon fal fa-spinner fa-solid fa-spin white"></i>';
      html += "</button>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
      _.$controller = $(html);
      _.$controller
        .find(".lang-c")
        .on("change", function (event, isReloadPreview, isReloadButtons) {
          event.preventDefault();
          var $this = $(this);
          if (!_.cardPage.$form.valid()) return;
          if (typeof isReloadButtons == "undefined") {
            isReloadButtons = true;
          }
          if (typeof isReloadPreview == "undefined") isReloadPreview = true;
          previewLanguage = $this.val();
          _.cardPage.setSetting("language", $this.val());
          renderWizardFields(isReloadButtons);
          if (isReloadPreview) reloadPreview();
          if (_.onChange) _.onChange.call(this, _);
        });
      _.$controller
        .find("#selectLanguage")
        .add(_.$controller.find(".language-upgrade-msg"))
        .on("click", function (event) {
          showModal();
          selectMainLanguage(true);
        });
      _.$fieldsContainer.parent().prepend(_.$controller);
    }
    function showModal() {
      _.LanguagesModal.init({
        list: tryParseJSON(JSON.stringify(_.data)),
        supportedFields: _.supportedFields,
        cardPage: _.cardPage,
        onSave: function (mainLanguageSettings, newCardLanguages) {
          var newData = new Data();
          var previusMainLanguageCode = _.cardPage.getMainLanguageCode();
          var newLanguageCodes = [];
          var translateFrom = mainLanguageSettings.languageCode;
          if (_.cardPage.getSetting("", "uniqueID") == "mainCard") {
            $("#language").val(mainLanguageSettings.languageCode);
          }
          previewLanguage = mainLanguageSettings.languageCode;
          var mainLanguageFields = {};
          if (_.data[mainLanguageSettings.languageCode]) {
            mainLanguageFields =
              _.data[mainLanguageSettings.languageCode].fields;
          } else {
            mainLanguageFields = _.data[previusMainLanguageCode].fields;
            translateFrom = previusMainLanguageCode;
            newLanguageCodes.push(mainLanguageSettings.languageCode);
          }
          newData[mainLanguageSettings.languageCode] = new Language({
            isStatic: true,
            language: mainLanguageSettings.languageCode,
            languageCode: mainLanguageSettings.languageCode,
            countryCode: mainLanguageSettings.countryCode,
            languageName: mainLanguageSettings.languageName,
            languageCustomName: mainLanguageSettings.languageCustomName,
            fields: mainLanguageFields,
          });
          $.each(newCardLanguages, function (index, allSettings) {
            var newFields = {};
            if (_.data[allSettings.languageCode]) {
              newFields = _.data[allSettings.languageCode].fields;
            } else {
              newLanguageCodes.push(allSettings.languageCode);
              $.each(_.supportedFields, function (index, fieldID) {
                newFields[fieldID] =
                  newData[mainLanguageSettings.languageCode].fields[fieldID];
              });
            }
            newData[allSettings.languageCode] = new Language({
              isStatic: false,
              language: allSettings.languageCode,
              countryCode: allSettings.countryCode,
              uniqueDomain: "",
              languageCode: allSettings.languageCode,
              languageName: allSettings.languageName,
              languageCustomName: allSettings.languageCustomName,
              fields: new WizardFields(newFields),
            });
          });
          if (newLanguageCodes.length > 0) {
            _.$controller.addClass("translation");
            _.cardPage.isLoading(true);
            $.ajax({
              type: "POST",
              url:
                "/versions/" +
                versionNUM +
                "/card/languageSystem/autoTranslateJob.php",
              data: {
                websiteID: $("#id").val(),
                w: $("#id").val(),
                tf: translateFrom,
                tt: JSON.stringify(newLanguageCodes),
                newData: JSON.stringify(newData),
              },
              success: (data) => {
                data = tryParseJSON(data);
                _.$controller.removeClass("translation");
                _.data = data.newData;
                reRenderLanguageController();
                setFieldsDirection(previewLanguage);
                _.cardPage.isLoading(false);
                if (_.onSave) _.onSave.call(this, _.data, mainLanguageSettings);
                selectMainLanguage(false);
              },
            });
          } else {
            _.data = newData;
            reRenderLanguageController();
            setFieldsDirection(previewLanguage);
            if (_.onSave) _.onSave.call(this, _.data, mainLanguageSettings);
            selectMainLanguage(false);
          }
        },
      });
    }
    function renderWizardFields(isReloadButtons) {
      if (_.firstLoad && !isReloadButtons) {
        isReloadButtons = true;
        _.firstLoad = false;
      }
      var html = "";
      html += '<div class="cardEditBox">';
      html += '<div class="form-group title1Box">';
      html +=
        '<label class="editor-title editor-title-color" for="title1">' +
        escapeHtml(translations.cpWizard.wizardFields.title);
      html += "</label>";
      html +=
        '<input type="text" class="form-control wizardField custom-save ml-dir-support editor-field" id="title1" name="title1" placeholder="' +
        escapeHtml(translations.cpWizard.wizardFields.titlePlaceholder) +
        '" value="' +
        escapeHtml(getFieldVal("title1")) +
        '" required maxlength="50" data-rule-prevent-space-only="true" data-msg-prevent-space-only="' +
        escapeHtml(translations.fieldRequired) +
        '" data-hj-allow>';
      html += "</div>";
      html +=
        '<div class="form-group suggestText title2Box" data-suggest-tool="cardPage">';
      html +=
        '<label class="editor-title editor-title-color" for="title2">' +
        escapeHtml(translations.cpWizard.wizardFields.subTitle);
      html += "</label>";
      html +=
        '<input type="text" data-suggest-field="subtitle" class="suggestTextfield form-control wizardField custom-save ml-dir-support editor-field" id="title2" placeholder="' +
        escapeHtml(translations.cpWizard.wizardFields.subTitlePlaceholder) +
        '" value="' +
        escapeHtml(getFieldVal("title2")) +
        '" maxlength="100" data-hj-allow>';
      html += "</div>";
      html +=
        '<div class="form-group suggestText aboutBox" data-suggest-tool="cardPage">';
      html +=
        '<label class="editor-title editor-title-color" for="about">' +
        escapeHtml(translations.cpWizard.wizardFields.about);
      html += "</label>";
      html +=
        '<textarea class="suggestTextfield form-control wizardField custom-save ml-dir-support fancy-scrollbar editor-field" data-suggest-field="about" id="about" placeholder="' +
        escapeHtml(translations.cpWizard.wizardFields.aboutPlaceholder) +
        '" maxlength="200" style="height: 100px;" data-hj-allow>' +
        escapeHtml(getFieldVal("about")) +
        "</textarea>";
      html += "</div>";
      html += "</div>";
      html +=
        '<input type="hidden" id="pagesJSON" class="wizardField custom-save pages-json" value="' +
        escapeHtml(getFieldVal("pagesJSON")) +
        '">';
      _.$fieldsContainer.html(html);
      _.$fieldsContainer.attr(
        "data-dir",
        IsRTL(_.cardPage.getSetting("", "language")) ? "rtl" : "ltr"
      );
      _.$fieldsContainer
        .find(".suggestText")
        .attr("data-suggest-lang", _.cardPage.getSetting("", "language"));
      $(_.rootButtonsContainer)
        .find(".ml-dir-support")
        .attr(
          "data-dir",
          IsRTL(_.cardPage.getSetting("", "language")) ? "rtl" : "ltr"
        );
      let PagesTool = new ActionButtonsHandler({
        $container: $(_.rootButtonsContainer),
        $itemsContainer: $(_.itemsContainer),
        $mainItemsContainer: $(_.mainItemsContainer),
        $json: _.$fieldsContainer.find("#pagesJSON"),
        language: _.cardPage.getSetting("", "language"),
        isReloadButtons: isReloadButtons,
      });
      _.$fieldsContainer
        .off("change.Wizard.LanguageManager input.Wizard.LanguageManager")
        .on(
          "change.Wizard.LanguageManager input.Wizard.LanguageManager",
          ".wizardField",
          function (event) {
            var $this = $(this);
            if (!_.cardPage.$form.valid()) return;
            if (_.supportedFields.indexOf($this.get(0).id) == -1) return;
            setFieldVal($this.get(0).id, $this.val());
            clearTimeout(_.typingDelay);
            if (event.type == "input") {
              $this.removeClass("skip-change-event");
              _.typingDelay = setTimeout(function () {
                save($this);
                $this.addClass("skip-change-event");
              }, typingTimeout);
            } else {
              save($this);
            }
            function save($el) {
              if ($el.hasClass("skip-change-event")) {
                $el.removeClass("skip-change-event");
                return;
              }
              _.data = new Data(_.data);
              _.data[_.cardPage.getSetting("", "language")].fields =
                new WizardFields(getCurrentFields());
              if (_.onSave) _.onSave.call(this, _.data, false);
            }
          }
        );
      BuildInputFields();
      if (_.cardPage.getSetting("", "uniqueID") == "mainCard")
        Wizard.FormValidator.refresh();
      if (_.onRender) _.onRender.call(this);
      function setFieldVal(fieldName, fieldVal) {
        if (!_.data[_.cardPage.getSetting("", "language")]) return;
        _.data[_.cardPage.getSetting("", "language")].fields[fieldName] =
          fieldVal;
      }
      function getFieldVal(fieldName) {
        if (!_.data[_.cardPage.getSetting("", "language")]) return "";
        return _.data[_.cardPage.getSetting("", "language")].fields[fieldName];
      }
    }
    function setFieldsDirection(language) {
      $("#mlFields").attr("data-dir", IsRTL(previewLanguage) ? "rtl" : "ltr");
      $("#mlFields")
        .find(".suggestText")
        .attr("data-suggest-lang", previewLanguage);
    }
    function selectMainLanguage(forceReloadButtons) {
      let isReloadButtons =
        _.cardPage.getMainLanguageCode() !=
        _.cardPage.getSetting("", "language");
      if (forceReloadButtons) isReloadButtons = true;
      _.$controller
        .find(".lang-c")
        .val(_.cardPage.getMainLanguageCode())
        .trigger("change", [false, isReloadButtons]);
    }
    function getLanguagesPremiumMsg() {
      var html = "";
      var maxAmount =
        PremiumFeaturesHandler.languages[systemKindNUM][packageNUM];
      if (packageNUM == 1) {
        if (!isFreeNoneTrail() && !isTrialPeriodHasExpired) maxAmount = false;
      }
      if (!$.isNumeric(maxAmount)) return html;
      if (maxAmount == 0) {
        html += '<div class="form-group">';
        html +=
          '<span class="label label-warning language-upgrade-msg">' +
          escapeHtml(translations.cpWizard.lm.proMessageNoLanguages) +
          "</span>";
        html += "</div>";
      } else if ([1, 2].includes(parseInt(packageNUM))) {
        if (
          PremiumFeaturesHandler.isLimited(
            "languages",
            {
              countLanguages: function () {
                return _.countLanguages();
              },
            },
            false
          )
        ) {
          html += '<div class="form-group">';
          html +=
            '<span class="label label-warning language-upgrade-msg">' +
            escapeHtml(translations.cpWizard.lm.proMessageLanguagesNotVisible) +
            "</span>";
          html += "</div>";
        }
      } else if (
        PremiumFeaturesHandler.isLimited(
          "languages",
          {
            countLanguages: function () {
              return _.countLanguages() - 1;
            },
          },
          false
        )
      ) {
        html += '<div class="form-group">';
        html +=
          '<span class="label label-warning language-upgrade-msg">' +
          escapeHtml(translations.cpWizard.lm.proMessageUserExceeded) +
          "</span>";
        html += "</div>";
      }
      return html;
    }
    _.LanguagesModal = (function () {
      var _ = {};
      _.init = function (settings) {
        _.list = settings.list;
        _.onSave = settings.onSave;
        _.supportedFields = settings.supportedFields;
        _.cardPage = settings.cardPage;
        _.$html = $(generateHTML());
        _.$languagesList = _.$html.find(".language-list");
        var $bootbox = bootbox
          .dialog({
            title: translations.cpWizard.lm.modalTitle,
            message: _.$html,
            backdrop: true,
            closeButton: true,
            onEscape: true,
            show: false,
            className: "s123-modal select-language modal-close-weight-100",
            buttons: {
              cancel: { label: translations.Cancel, className: "btn-default" },
              save: {
                label: translations.Save,
                className: "btn-primary",
                callback: function () {
                  var languages = {};
                  _.$html
                    .find("tbody > tr:not(.is-static)")
                    .each(function (index, language) {
                      var $this = $(this);
                      var allSettings = tryParseJSON(
                        $this.find(".all-settings").val()
                      );
                      allSettings.languageCode = $this
                        .find(".chosen-select")
                        .val();
                      allSettings.countryCode = "";
                      allSettings.languageName = $this
                        .find(".chosen-select option:selected")
                        .text();
                      allSettings.languageCustomName = $this
                        .find(".chosen-select option:selected")
                        .text();
                      languages[$this.find(".chosen-select").val()] =
                        allSettings;
                    });
                  if (_.onSave)
                    _.onSave.call(
                      this,
                      {
                        languageCode: _.$html
                          .find("tbody > tr.is-static .chosen-select")
                          .val(),
                        countryCode: "",
                        languageName: _.$html
                          .find(
                            "tbody > tr.is-static .chosen-select option:selected"
                          )
                          .text(),
                        languageCustomName: _.$html
                          .find(
                            "tbody > tr.is-static .chosen-select option:selected"
                          )
                          .text(),
                      },
                      languages
                    );
                },
              },
            },
          })
          .on("show.bs.modal", function () {
            addEvents();
            _.selectHandler.disableEnableOptions();
            disableEnabeMainLanguageControlelrs();
            initilizeModuleItemConfirmDelete();
            BuildInputFields();
            _.$languagesList.find("tr").show();
            showHideProBtnLabel();
          })
          .modal("show");
      };
      function generateHTML() {
        var html = "";
        html += '<div class="language-container">';
        html += "<div>";
        html += getLanguagesPremiumMsg();
        html += "<div>";
        html += '<div class="language-section">';
        html += '<div class="language-table table-responsive">';
        html +=
          '<table class="modules-items-table table table-bordered language-list">';
        html += "<thead>";
        html += "<tr>";
        html +=
          '<th width="70%">' +
          translations.cpWizard.lm.languageNametableTh +
          "</th>";
        html +=
          '<th width="30%" class="text-center">' +
          translations.cpWizard.lm.languageActiontableTh +
          "</th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";
        $.each(_.list, function (index, value) {
          html += generateSingleLanguageHTML(new Language(value));
        });
        html += "</tbody>";
        html += "</table>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
        html +=
          '<button type="button" class="btn btn-sm btn-primary language-add-btn">';
        html += '<i class="ace-icon fa fa-plus hidden-xs"></i>&nbsp;';
        html += escapeHtml(translations.cpWizard.lm.addLanguage);
        html += "</button>";
        html +=
          '<textarea id="multiLanguageSettings" name="multiLanguageSettings" data-always-enable="true" class="hidden"></textarea>';
        html += "</div>";
        return html;
      }
      function showHideLanguagesTable(forceShow) {
        if (
          _.$html.find(".table.language-list tbody").children().length > 0 ||
          forceShow
        ) {
          _.$html.find(".table.language-list").fadeIn(_.animatesDuration);
        } else {
          _.$html.find(".table.language-list").fadeOut(_.animatesDuration);
        }
      }
      function addLanguage() {
        showHideLanguagesTable(true);
        addLanguageRowHTML();
        _.selectHandler.disableEnableOptions();
        showHideProBtnLabel();
      }
      function addEvents() {
        _.$html.find(".language-add-btn").on("click", function (event) {
          if (
            PremiumFeaturesHandler.isLimited(
              "languages",
              {
                countLanguages: function () {
                  return _.$languagesList.find(
                    ".language-record:not(.is-static)"
                  ).length;
                },
              },
              true
            )
          )
            return;
          addLanguage();
        });
        _.$languagesList.on("click", ".language-remove-btn", function () {
          var $language = $(this).closest("tr");
          $language.find(".remove-lang-icon").tooltip("destroy");
          $language.find(".language-drag-btn > i").tooltip("destroy");
          var promise = new Promise(function (resolve) {
            $language.fadeOut(_.animatesDuration, function () {
              resolve($(this).remove());
              showHideLanguagesTable(false);
              _.selectHandler.disableEnableOptions();
              showHideProBtnLabel();
            });
          });
        });
        _.$languagesList.find("tbody").sortable({
          opacity: 0.8,
          revert: true,
          delay: 100,
          forceHelperSize: true,
          placeholder: "draggable-placeholder",
          forcePlaceholderSize: true,
          tolerance: "pointer",
          handle: ".language-drag-btn",
          helper: function (event, item) {
            return '<div style="display:none;">&nbsp;</div>';
          },
          update: function (event, ui) {
            _.$languagesList.find("tbody tr").removeClass("is-static");
            _.$languagesList.find("tbody tr").first().addClass("is-static");
            disableEnabeMainLanguageControlelrs();
          },
        });
      }
      function generateSingleLanguageHTML(item) {
        var html = "";
        html +=
          '<tr style="display: none;" class="language-record ' +
          (item.isStatic ? "is-static" : "") +
          '">';
        html += '<td class="noLongText">';
        html += _.selectHandler.generateSelectHtml(item);
        html +=
          '<input class="all-settings" type="hidden" value="' +
          escapeHtml(JSON.stringify(item)) +
          '">';
        html += "</td>";
        html += '<td class="language-action">';
        html += '<span class="input-group-btn text-center">';
        html +=
          '<button type="button" data-module-item-confirm="delete" class="btn btn-link language-remove-btn">';
        html +=
          '<i class="ace-icon fa fa-trash-can bigger-130 red remove-lang-icon" data-rel="tooltip-desk" title="' +
          escapeHtml(translations.cpWizard.lm.removeLanguage) +
          '"></i>';
        html += "</button>";
        html += '<a href="#" class="btn btn-link language-drag-btn">';
        html +=
          '<i class="ace-icon fa fa-arrows bigger-130" data-rel="tooltip-desk" title="' +
          escapeHtml(translations.cpWizard.lm.changeLanguagePlace) +
          '"></i>';
        html += "</a>";
        html += "</span>";
        html += "</td>";
        html += "</tr>";
        return html;
      }
      function addLanguageRowHTML() {
        _.$languagesList
          .find("tbody")
          .append(generateSingleLanguageHTML(new Language()));
        _.$languagesList.find("tbody tr:last-child").fadeIn(_.animatesDuration);
        _.$languagesList.find(".language-title:last-child").focus();
        disableEnabeMainLanguageControlelrs();
        initilizeModuleItemConfirmDelete();
      }
      function disableEnabeMainLanguageControlelrs() {
        _.$languagesList
          .find("tbody > tr .language-remove-btn")
          .prop("disabled", false);
        _.$languagesList
          .find("tbody > tr.is-static .language-remove-btn")
          .prop("disabled", true);
      }
      function getUnAvailibleLanguages() {
        var unAvailibleLanguages = [];
        $.each(_.list, function (index, item) {
          $.each(languagesList, function (index, language) {
            if (item.languageCode == language.short) {
              unAvailibleLanguages.push(language.short);
              return false;
            }
          });
        });
        return unAvailibleLanguages;
      }
      function showHideProBtnLabel() {
        _.$html.find(".pro-feature-label").remove();
        if (
          PremiumFeaturesHandler.isLimited(
            "languages",
            {
              countLanguages: function () {
                return _.$languagesList.find(".language-record:not(.is-static)")
                  .length;
              },
            },
            false
          )
        ) {
          ProFeature_addLabel({
            websiteID: websiteID,
            packageNUM: packageNUM,
            toolType: "cp_languages",
            upgradeReason: "languages",
            $element: _.$html,
            clickable: !isSubWebsite,
          });
          if (isSubWebsite) {
            _.$html.find(".pro-feature-label").on("click", function (event) {
              event.preventDefault();
              Swal.fire({
                icon: "warning",
                title: translations.cpWizard.teamCardPage.subWebsiteProMessage,
              }).then((result) => {});
            });
          }
        }
      }
      _.selectHandler = {
        addEvents: function () {
          var self = this;
          BuildInputFields();
          _.$languagesList
            .find(".chosen-select")
            .off("change")
            .on("change", function (event) {
              self.disableEnableOptions();
            });
          _.$languagesList
            .find(".chosen-select")
            .on("chosen:showing_dropdown", function (event, instance) {
              $(instance.chosen.search_field)
                .off("keyup.multi_language")
                .on("keyup.multi_language", function (event) {
                  self.addTollTipsToDisabled(instance);
                });
              self.addTollTipsToDisabled(instance);
            });
        },
        disableEnableOptions: function () {
          var self = this;
          _.$languagesList.find(".chosen-select").chosen("destroy");
          _.$languagesList
            .find(".chosen-select")
            .each(function (index, select) {
              var value = $(this).val();
              var html = self.generateSelectHtml(
                new Language({ languageCode: value })
              );
              $(this).replaceWith($(html));
            });
          self.addEvents();
        },
        generateSelectHtml: function (item) {
          var html = "";
          var unAvailibleLanguages = getUnAvailibleLanguages();
          html +=
            '<select class="is-new chosen-select form-control ' +
            (_.isRTL ? "chosen-rtl" : "") +
            '">';
          $.each(languagesList, function (index, value) {
            var isDisabled = unAvailibleLanguages.indexOf(value.short) != -1;
            var isSelected = item.languageCode == value.short;
            html +=
              '<option value="' +
              value.short +
              '" ' +
              (isSelected ? "selected" : "") +
              " " +
              (!isSelected && isDisabled ? "disabled" : "") +
              ">" +
              value.name +
              "</option>";
          });
          html += "</select>";
          return html;
        },
        addTollTipsToDisabled: function (instance) {
          var $disabledOptions =
            instance.chosen.dropdown.find(".disabled-result");
          $disabledOptions.attr("data-rel", "tooltip");
          $disabledOptions.attr(
            "title",
            escapeHtml(translations.cpWizard.lm.disabledLanguageToolTip)
          );
          $disabledOptions
            .off("shown.bs.tooltip")
            .on("shown.bs.tooltip", function (event) {
              var toolTipID = $(this).attr("aria-describedby");
              $("#" + toolTipID).addClass("multi-language");
            });
          InitializeToolTips();
        },
      };
      return _;
    })();
    _.init();
    return _;
  }
  return _;
})();
class ActionButtonsHandler {
  $json = null;
  json = {};
  buttons = {};
  $container = null;
  $itemsContainer = null;
  maxAmount = 16;
  maxMainBtnsAmount = 2;
  language = "";
  isReloadButtons = false;
  constructor(settings) {
    this.$json = settings.$json;
    if (tryParseJSON(this.$json.val())) {
      this.json = tryParseJSON(this.$json.val());
    }
    this.$container = settings.$container;
    this.$itemsContainer = settings.$itemsContainer;
    this.$mainItemsContainer = settings.$mainItemsContainer;
    this.language = settings.language;
    this.isReloadButtons = settings.isReloadButtons;
    this.$itemsContainer.empty();
    this.$mainItemsContainer.empty();
    $.each(this.json, (buttonID, buttonsSettings) => {
      this.buttons[buttonID] = this.getButtonInstance(buttonsSettings);
      this.buttons[buttonID].render();
    });
    this.completeMainBtns();
    this.initAddButtons();
    this.initRemoveButtons();
    this.initSortable();
    this.setSortableListsConnection();
    this.showHideNoItemsMsg();
    this.enableDisableController();
  }
  initSortable() {
    this.$itemsContainer.add(this.$mainItemsContainer).sortable({
      distance: 20,
      delay: 100,
      forceHelperSize: true,
      placeholder: "page-box-item draggable-placeholder",
      forcePlaceholderSize: true,
      tolerance: "pointer",
      handle: '.sort-controller:not([data-controller-type="skeleton"])',
      appendTo: "body",
      helper: "clone",
      cursorAt: isMobile ? false : { left: 15 },
      start: (event, ui) => {
        if (isMobile) {
          if (IsRTL(this.language)) {
            ui.helper.css("direction", "rtl");
            ui.helper.attr("data-dir", "rtl");
          }
        }
      },
      update: (event, ui) => {
        this.save();
      },
      stop: (event, ui) => {
        this.setSortableListsConnection();
      },
    });
    this.$itemsContainer
      .add(this.$mainItemsContainer)
      .off("sortchange")
      .on("sortchange", (event, ui) => {
        let buttonID = ui.item.get(0).id.replace("page_", "");
        if (
          ui.placeholder.closest('.ac-i-container [data-id="mainACB"]').length >
          0
        ) {
          if (!isMobile) {
            ui.placeholder.attr("data-is-main", true);
            ui.placeholder.css({ width: "" });
            ui.helper.attr("data-is-main", true);
            ui.helper.css({
              width: ui.placeholder.siblings().first().width() + "px",
              height: ui.placeholder.siblings().first().height() + "px",
            });
          }
          ui.item.attr("data-is-main", true);
          this.buttons[buttonID].isMain = true;
          const mainButtons = this.getMainButtons("skeleton");
          if (mainButtons.length > 0) {
            this.removeButton(mainButtons[0].id);
          }
        } else if (
          ui.placeholder.closest('.ac-i-container [data-id="simpleACB"]')
            .length > 0
        ) {
          if (!isMobile) {
            ui.placeholder.attr("data-is-main", false);
            ui.placeholder.css({ width: "" });
            ui.helper.attr("data-is-main", false);
            ui.helper.css({
              width: ui.placeholder.siblings().first().width() + "px",
            });
          }
          ui.item.attr("data-is-main", false);
          this.buttons[buttonID].isMain = false;
          this.completeMainBtns();
        }
      });
  }
  setSortableListsConnection() {
    if (this.isLimited("mainBtn")) {
      this.$itemsContainer.sortable("option", "connectWith", false);
    } else {
      this.$itemsContainer.sortable(
        "option",
        "connectWith",
        '.ac-i-container [data-id="mainACB"]'
      );
    }
    if (this.isLimited("simple")) {
      this.$mainItemsContainer.sortable("option", "connectWith", false);
    } else {
      this.$mainItemsContainer.sortable(
        "option",
        "connectWith",
        '.ac-i-container [data-id="simpleACB"]'
      );
    }
  }
  getButtonInstance(buttonsSettings) {
    let buttonInstance = null;
    if (buttonsSettings.isMain) {
      buttonsSettings.$container = this.$mainItemsContainer;
    } else {
      buttonsSettings.$container = this.$itemsContainer;
    }
    buttonsSettings.onEditorSave = () => {
      this.save();
      this.initRemoveButtons();
    };
    buttonsSettings.removeButtonAction = (instance) => {
      this.removeButton(instance.id);
      this.save();
    };
    switch (buttonsSettings.type) {
      case "phone":
      case "whatsApp":
        buttonInstance = new Phone(buttonsSettings);
        break;
      case "telegram":
        buttonInstance = new Telegram(buttonsSettings);
        break;
      case "free_text":
        buttonInstance = new FreeText(buttonsSettings);
        break;
      case "gallery":
        buttonInstance = new Gallery(buttonsSettings);
        break;
      case "map":
      case "googleMaps":
      case "waze":
      case "moovit":
        buttonInstance = new Maps(buttonsSettings);
        break;
      case "facebookTimeline":
        buttonInstance = new FacebookTimeline(buttonsSettings);
        break;
      case "twitterTimeline":
        buttonInstance = new TwitterTimeline(buttonsSettings);
        break;
      case "url":
        buttonInstance = new Link(buttonsSettings);
        break;
      case "email":
        buttonInstance = new Email(buttonsSettings);
        break;
      case "mailingList":
        buttonInstance = new MailingList(buttonsSettings);
        break;
      case "video":
        buttonInstance = new Video(buttonsSettings);
        break;
      case "youtube":
        buttonInstance = new Youtube(buttonsSettings);
        break;
      case "vimeo":
        buttonInstance = new Vimeo(buttonsSettings);
        break;
      case "embed":
        buttonInstance = new Embed(buttonsSettings);
        break;
      case "addToContact":
        buttonInstance = new AddToContact(buttonsSettings);
        break;
      case "share":
        buttonInstance = new Share(buttonsSettings);
        break;
      case "uploadVideo":
        buttonInstance = new UploadVideo(buttonsSettings);
        break;
      case "skeleton":
        buttonsSettings.$rootContainer = this.$container;
        buttonInstance = new Skeleton(buttonsSettings);
        break;
      default:
        buttonInstance = new ActionButton(buttonsSettings);
        break;
    }
    return buttonInstance;
  }
  showHideNoItemsMsg() {
    if (this.$itemsContainer.children().length == 0) {
      this.$container.find(".no-pages").show();
    } else {
      this.$container.find(".no-pages").hide();
    }
  }
  initAddButtons() {
    this.$itemsWidgetContainer = $(`<div class="items-widget-container">
<div class="item-widget-search-container">
<input type="text" maxlength="50" class="search-tool form-control editor-field" placeholder="${translations.search}">
<i class="fal fa-search form-control-feedback search"></i>
<i class="fal fa-home form-control-feedback reset-search" style="display: none;"></i>
</div>
<div id="itemWidgetList" class="fancy-scrollbar mt-3">
<div class="category" data-type="popular">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.mostPopular}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="social">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.social}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="calendar">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.calendarAndBooking}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="payments">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.payments}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="music">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.musicAndPodcast}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="phone">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.phoneAndMessaging}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="store">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.storeAndMarketplace}</span>
<div class="categry-items mt-3"></div>
</div>
<div class="category mt-5" data-type="other">
<span class="category-title">${translations.cpWizard.actionButtonsHandler.moreOptions}</span>
<div class="categry-items mt-3"></div>
</div>
<!-- No Results Message -->
<div class="no-widgets-msg" style="display: none;">
<h5>${translations.cpWizard.actionButtonsHandler.noResults}</h5>
</div>
<!-- No Results Buttons -->
<div class="category mt-5" data-type="noResults" style="display: none;">
<div class="categry-items mt-3"></div>
</div>
</div>
</div>`);
    this.$container
      .find(".addNewItem_action")
      .off("click")
      .on("click", (e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const language = this.language;
        if ($this.hasClass("disabled")) return;
        $this.addClass("loading-items");
        this.$itemsWidgetContainer.attr(
          "data-buttons-type",
          $this.data("type")
        );
        if ($this.data("type") == "mainBtn") {
          const mainButtons = this.getMainButtons("skeleton");
          mainButtons[0].setAsActive();
        }
        if (!this.isReloadButtons) {
          $this.removeClass("loading-items");
          this.modalShowAction();
        } else {
          $.ajax({
            type: "POST",
            url:
              "/versions/" +
              versionNUM +
              "/card/interface/getActionButtons.php",
            data: { language: this.language, websiteID: $("#id").val() },
            success: (data) => {
              data = tryParseJSON(data);
              itemWidget = data.buttons;
              $this.removeClass("loading-items");
              this.isReloadButtons = false;
              this.modalShowAction();
            },
          });
        }
      });
  }
  modalShowAction() {
    const $bootbox = bootbox
      .dialog({
        title: translations.cpWizard.actionButtonsHandler.addNewButton,
        message: this.$itemsWidgetContainer,
        backdrop: true,
        closeButton: true,
        onEscape: true,
        show: false,
        className: "s123-modal add-new-item",
      })
      .attr("id", "addNewItem")
      .on("show.bs.modal", (e) => {
        var limitVisibleItems = 8;
        this.$itemsWidgetContainer
          .find("#itemWidgetList .category .categry-items")
          .empty();
        var buttonsType = $(e.target).attr("data-buttons-type");
        var categories = {};
        itemWidget.map(function (page) {
          if (!categories[page.category]) {
            categories[page.category] = [];
          }
          categories[page.category].push(page);
        });
        $.each(categories, (categoryName, categoryItems) => {
          if (0 && categoryItems.length > limitVisibleItems) {
            categoryItems.splice([limitVisibleItems], 0, {
              title: translations.cpWizard.actionButtonsHandler.showMore,
              icon: "system-svg-icons eye",
              type: "showMore",
              info: "",
              category: categoryName,
              tags: [],
            });
          }
          $.each(categoryItems, (index, page) => {
            if (
              buttonsType == "simple" &&
              ["addToContact", "share"].indexOf(page.type) != -1
            )
              return;
            var boxHTML =
              '<div class="itemWidget" data-title="' +
              escapeHtml(page.title) +
              '" data-tags="' +
              escapeHtml(page.tags) +
              '" data-icon="' +
              escapeHtml(page.icon) +
              '" data-type="' +
              escapeHtml(page.type) +
              '">';
            boxHTML +=
              '<img class="page-icon" data-img-type="svg" style="' +
              getIconPath(page.icon) +
              '" src="' +
              getIconFullPath(page.icon) +
              '">';
            boxHTML +=
              '<span class="page-title">' + escapeHtml(page.title) + "</span>";
            boxHTML += "</div>";
            var $boxHTML = $(boxHTML);
            $boxHTML.data("info", page.info);
            if (this.isPhone($boxHTML.data("type"))) {
              $boxHTML.data("country-data", page.countryData);
            } else if (this.isMap($boxHTML.data("type"))) {
              $boxHTML.data("lat", page.geometry.lat);
              $boxHTML.data("lng", page.geometry.lng);
            }
            this.$itemsWidgetContainer
              .find(
                '#itemWidgetList .category[data-type="' +
                  page.category +
                  '"] .categry-items'
              )
              .append($boxHTML);
          });
        });
        this.$itemsWidgetContainer
          .find(".item-widget-search-container .search-tool")
          .off("input")
          .on("input", (event) => {
            var $input = $(event.currentTarget);
            var eventKey = event.which;
            if ($input.val().length == 0) {
              this.resetSearch();
            } else {
              this.showSearchResult($input.val());
            }
          });
        this.$itemsWidgetContainer
          .find(".reset-search")
          .off("click")
          .on("click", (event) => {
            this.$itemsWidgetContainer
              .find(".item-widget-search-container .search-tool")
              .val("");
            this.resetSearch();
          });
        this.$itemsWidgetContainer
          .find('.itemWidget:not([data-type="showMore"])')
          .off("click")
          .on("click", (e) => {
            e.preventDefault();
            const $this = $(e.currentTarget);
            const buttonsSettings = {
              id: Math.random().toString(16).slice(2),
              title: $this.data("title"),
              icon: $this.data("icon"),
              type: $this.data("type"),
              info: $this.data("info"),
            };
            if (this.isPhone(buttonsSettings.type)) {
              buttonsSettings.countryData = $this.data("country-data");
            } else if (this.isMap(buttonsSettings.type)) {
              buttonsSettings.geometry = {
                lat: $this.data("lat"),
                lng: $this.data("lng"),
              };
            }
            buttonsSettings.isMain =
              this.$itemsWidgetContainer.attr("data-buttons-type") == "mainBtn";
            this.buttons[buttonsSettings.id] =
              this.getButtonInstance(buttonsSettings);
            if (buttonsSettings.isMain) {
              const mainBtnID = this.$mainItemsContainer
                .find(".active .pageBox")
                .data("id");
              this.buttons[buttonsSettings.id].$html =
                this.buttons[mainBtnID].$html;
              $bootbox.one("hidden.bs.modal", (event) => {
                this.buttons[buttonsSettings.id].render();
                this.buttons[buttonsSettings.id].openEditor();
                this.initRemoveButtons();
                this.removeButton(mainBtnID);
                this.setSortableListsConnection();
                this.save();
              });
            } else {
              $bootbox.one("hidden.bs.modal", (event) => {
                this.buttons[buttonsSettings.id].render();
                this.buttons[buttonsSettings.id].openEditor();
                this.initRemoveButtons();
                this.setSortableListsConnection();
                this.save();
              });
            }
            $bootbox.modal("hide");
          });
        this.$itemsWidgetContainer
          .find('.itemWidget[data-type="showMore"]')
          .off("click")
          .on("click", (e) => {
            var $this = $(e.currentTarget);
            var $container = $this.closest(".categry-items");
            $container.toggleClass("show-more-item-widget");
            if ($container.hasClass("show-more-item-widget")) {
              $this
                .find(".page-icon")
                .attr("style", getIconPath("system-svg-icons eye-slash"));
              $this
                .find(".page-title")
                .text(translations.cpWizard.actionButtonsHandler.hideMore);
            } else {
              $this
                .find(".page-icon")
                .attr("style", getIconPath("system-svg-icons eye"));
              $this
                .find(".page-title")
                .text(translations.cpWizard.actionButtonsHandler.showMore);
            }
          });
        function getIconPath(icon) {
          return (
            "mask: url('" +
            getIconFullPath(icon) +
            "'); -webkit-mask: url('" +
            getIconFullPath(icon) +
            "')"
          );
        }
      })
      .on("hidden.bs.modal", (e) => {
        this.$itemsWidgetContainer
          .find(".item-widget-search-container .search-tool")
          .val("");
        this.resetSearch();
      })
      .modal("show");
  }
  initRemoveButtons() {
    if (isMobile) {
      this.$itemsContainer
        .add(this.$mainItemsContainer)
        .find(".pageBox .deleteMe")
        .on("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const $this = $(event.currentTarget);
          Swal.fire({
            icon: "warning",
            title: translations.areYouSure,
            showCancelButton: true,
            confirmButtonColor: "#FF523A",
            cancelButtonColor: "#9E9E9E",
            confirmButtonText: translations.yes,
            cancelButtonText: translations.no,
          }).then((result) => {
            if (result.isConfirmed) {
              this.removeButton($this.closest(".pageBox").data("id"));
              this.save();
            }
          });
        });
    } else {
      const _ = this;
      this.$itemsContainer
        .add(this.$mainItemsContainer)
        .find(".pageBox .deleteMe")
        .confirmation({
          placement: intrface_align_reverse,
          title: translations.areYouSure,
          btnOkLabel:
            '<i class="icon-ok-sign icon-white"></i> ' + translations.yes,
          btnCancelLabel: '<i class="icon-remove-sign"></i> ' + translations.no,
          popout: true,
          singleton: true,
          container: "body",
          btnOkClass: "btn-danger btn-sm spacing-confirmation-btn",
          btnCancelClass: "btn-default btn-sm spacing-confirmation-btn",
          delay: 0,
          onConfirm: function () {
            $(this).confirmation("destroy");
            _.removeButton($(this).closest(".pageBox").data("id"));
            _.save();
          },
        });
    }
  }
  removeButton(buttonID) {
    this.buttons[buttonID].destroy();
    delete this.buttons[buttonID];
    this.completeMainBtns();
    this.setSortableListsConnection();
  }
  resetSearch() {
    this.$itemsWidgetContainer.removeClass("search-active");
    this.$itemsWidgetContainer
      .find(".category")
      .each(function (index, category) {
        if ($(this).find(".itemWidget").length > 0) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    this.$itemsWidgetContainer.find(".itemWidget").show();
    this.$itemsWidgetContainer.find(".itemWidget").removeClass("active").show();
    this.$itemsWidgetContainer.find(".no-widgets-msg").hide();
    this.$itemsWidgetContainer.find('.category[data-type="noResults"]').hide();
    this.$itemsWidgetContainer
      .find('.category[data-type="noResults"] .itemWidget')
      .removeClass("active")
      .hide();
    this.$itemsWidgetContainer
      .find("#itemWidgetList")
      .removeAttr("data-items-amount");
  }
  showSearchResult(query) {
    this.$itemsWidgetContainer.find(".category").hide();
    this.$itemsWidgetContainer.addClass("search-active");
    this.$itemsWidgetContainer.find(".itemWidget").each(function () {
      var $this = $(this);
      $this.hide();
      $this.removeClass("active");
      if ($this.data("tags").toLowerCase().indexOf(query.toLowerCase()) != -1) {
        $this.closest(".category").show();
        $this.addClass("active");
        $this.show();
      }
    });
    const activeButtons =
      this.$itemsWidgetContainer.find(".itemWidget.active").length;
    this.$itemsWidgetContainer
      .find("#itemWidgetList")
      .attr("data-items-amount", activeButtons);
    if (activeButtons == 0) {
      this.$itemsWidgetContainer
        .find('.category[data-type="noResults"]')
        .show();
      this.$itemsWidgetContainer
        .find('.category[data-type="noResults"] .itemWidget')
        .addClass("active")
        .show();
      this.$itemsWidgetContainer.find(".no-widgets-msg").show();
    }
  }
  save() {
    this.showHideNoItemsMsg();
    const jsonARR = {};
    this.$container.find(".page-box-item").each((index, page) => {
      var $page = $(page);
      var id = $page.find(".pageBox").data("id");
      if (!this.buttons[id].isSkeleton) {
        jsonARR[id] = this.buttons[id].getAllSettings();
      }
    });
    this.$json.val(JSON.stringify(jsonARR));
    this.enableDisableController();
    this.$json.trigger("change.Wizard.LanguageManager");
    this.$json.trigger("change.Wizard.Preview");
    $(document).trigger("actionButtonsHandler.change", [jsonARR]);
  }
  isPhone(type) {
    return ["phone", "whatsApp", "telegram"].indexOf(type) != -1;
  }
  isMap(type) {
    return ["map", "googleMaps", "waze", "moovit"].indexOf(type) != -1;
  }
  enableDisableController() {
    if (this.isLimited("simple")) {
      if (
        !this.$container
          .find('.addNewItem_action[data-type="simple"]')
          .hasClass("disabled")
      ) {
        this.$container
          .find('.addNewItem_action[data-type="simple"]')
          .addClass("disabled");
        this.$container
          .find('.addNewItem_action[data-type="simple"]')
          .attr("data-rel", "tooltip");
        this.$container
          .find('.addNewItem_action[data-type="simple"]')
          .attr("data-trigger", "hover");
        this.$container
          .find('.addNewItem_action[data-type="simple"]')
          .attr(
            "title",
            escapeHtml(
              translations.cpWizard.wizardFields.pagesControllerDisabled.replace(
                "{{buttonsAmount}}",
                this.maxAmount
              )
            )
          );
        InitializeToolTips();
      }
    } else {
      this.$container
        .find('.addNewItem_action[data-type="simple"]')
        .removeClass("disabled");
      this.$container
        .find('.addNewItem_action[data-type="simple"]')
        .removeAttr("data-trigger");
      this.$container
        .find('.addNewItem_action[data-type="simple"]')
        .removeAttr("data-rel");
      this.$container
        .find('.addNewItem_action[data-type="simple"]')
        .removeAttr("title");
      this.$container
        .find('.addNewItem_action[data-type="simple"]')
        .tooltip("destroy");
    }
    if (this.isLimited("mainBtn")) {
      if (
        !this.$container
          .find('.addNewItem_action[data-type="mainBtn"]')
          .hasClass("disabled")
      ) {
        this.$container
          .find('.addNewItem_action[data-type="mainBtn"]')
          .addClass("disabled");
        this.$container
          .find('.addNewItem_action[data-type="mainBtn"]')
          .attr("data-rel", "tooltip");
        this.$container
          .find('.addNewItem_action[data-type="mainBtn"]')
          .attr("data-trigger", "hover");
        this.$container
          .find('.addNewItem_action[data-type="mainBtn"]')
          .attr(
            "title",
            escapeHtml(
              translations.cpWizard.wizardFields.pagesControllerDisabled.replace(
                "{{buttonsAmount}}",
                this.maxMainBtnsAmount
              )
            )
          );
        InitializeToolTips();
      }
    } else {
      this.$container
        .find('.addNewItem_action[data-type="mainBtn"]')
        .removeClass("disabled");
      this.$container
        .find('.addNewItem_action[data-type="mainBtn"]')
        .removeAttr("data-trigger");
      this.$container
        .find('.addNewItem_action[data-type="mainBtn"]')
        .removeAttr("data-rel");
      this.$container
        .find('.addNewItem_action[data-type="mainBtn"]')
        .removeAttr("title");
      this.$container
        .find('.addNewItem_action[data-type="mainBtn"]')
        .tooltip("destroy");
    }
  }
  isLimited(type) {
    switch (type) {
      case "simple":
        return (
          Object.values(this.buttons).filter((btn) => !btn.isMain).length >=
          this.maxAmount
        );
        break;
      case "mainBtn":
        return (
          Object.values(this.buttons).filter(
            (btn) => btn.isMain && btn.type != "skeleton"
          ).length >= this.maxMainBtnsAmount
        );
        break;
    }
  }
  completeMainBtns() {
    const mainButtons = this.getMainButtons("");
    for (let i = 1; i <= this.maxMainBtnsAmount - mainButtons.length; i++) {
      const buttonID = uniqid("skeleton-");
      this.buttons[buttonID] = this.getButtonInstance({
        id: buttonID,
        title: "",
        icon: "system-svg-icons plus",
        type: "skeleton",
        info: "",
        isMain: true,
      });
      this.buttons[buttonID].render();
    }
  }
  getMainButtons(type) {
    return Object.values(this.buttons).filter((btn) => {
      if (type) {
        return btn.isMain && btn.type == type;
      }
      return btn.isMain;
    });
  }
}
var CPColorsHandlers = (function () {
  var _ = {};
  _.isLightDarkColor = function (c) {
    var c = c.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma > 210 ? "light" : "dark";
  };
  return _;
})();
class MainCardPageHandler {
  card = null;
  languageManagerHtml = "";
  constructor(settings) {
    this.languageManagerHtml = settings.languageManagerHtml;
    this.$mainCardContainer = settings.$mainCardContainer;
    this.$json = this.$mainCardContainer.find("#mainCardJson");
    const cardSettings = this.getCardSettingsStructure(
      tryParseJSON(this.$json.val())
    );
    cardSettings.allSettings = tryParseJSON(cardSettings.allSettings);
    this.card = new CardPage({
      uniqueID: "mainCard",
      globalSettings: cardSettings.allSettings.globalSettings,
      multiLanguagesSettings: cardSettings.allSettings.multiLanguagesSettings,
      onLanguageRender: (langaugeManager) => {
        const allLanguages = Object.values(langaugeManager.data);
        const rootLanguage = allLanguages.filter((lang) => lang.isStatic).pop();
        this.showHideGoalButtonsDesign(
          tryParseJSON(rootLanguage.fields.pagesJSON)
        );
        $("#mlClone").empty();
        if (allLanguages.filter((lang) => !lang.isStatic).length == 0) return;
        this.$lmController = langaugeManager.$controller.clone();
        this.$lmController.find(".lang-c").on("change", function (event) {
          langaugeManager.$controller
            .find(".lang-c")
            .val($(this).val())
            .trigger("change", [true]);
        });
        this.$lmController
          .find("#selectLanguage")
          .add(this.$lmController.find(".language-upgrade-msg"))
          .on("click", function (event) {
            langaugeManager.$controller
              .find("#selectLanguage")
              .trigger("click");
          });
        $("#mlClone").append(this.$lmController);
      },
      onLanguageChange: (langaugeManager) => {
        const currentLanguage = langaugeManager.$controller
          .find(".lang-c")
          .val();
        this.$lmController.find(".lang-c").val(currentLanguage);
        this.showHideGoalButtonsDesign(
          tryParseJSON(langaugeManager.data[currentLanguage].fields.pagesJSON)
        );
      },
      onSave: (isReloadPreview) => {
        this.save(isReloadPreview);
      },
    });
    if (!isMobile) {
      $(document).on("cpTab.change", (event, tabID) => {
        if (!Wizard.Preview.isReady) return;
        if (tabID == "content") {
          if (Wizard.Preview.$("#uniqueID").val() == "mainCard") return;
          reloadPreview();
        }
      });
    }
    $(document).on("actionButtonsHandler.change", (event, allButtons) => {
      this.showHideGoalButtonsDesign(allButtons);
    });
    this.render();
  }
  render() {
    this.$mainCardContainer.append(
      '<div class="card-item">' + this.languageManagerHtml + "</div>"
    );
    this.card.render();
  }
  reBuildJson() {
    this.$json.val(
      JSON.stringify(
        this.getCardSettingsStructure({
          allSettings: JSON.stringify({
            multiLanguagesSettings: this.card.getSetting(
              "",
              "multiLanguagesSettings"
            ),
            globalSettings: this.card.getSetting("", "globalSettings"),
          }),
        })
      )
    );
  }
  save(isReloadPreview) {
    this.reBuildJson();
    Wizard.save(isReloadPreview);
  }
  getCardSettingsStructure(settings) {
    return new Data(settings);
    function Data(data) {
      function Def() {
        return {
          allSettings: JSON.stringify({
            globalSettings: JSON.stringify({}),
            multiLanguagesSettings: JSON.stringify({}),
          }),
          languageManagerHtml: "",
        };
      }
      var def = new Def();
      if (data) {
        data = objectAssign(new Def(), data); // (objectAssign overwrite objects)
      } else {
        data = def;
      }
      return data;
    }
  }
  showHideGoalButtonsDesign(allButtons) {
    const goalButtons = Object.values(allButtons).filter(
      (button) => button.isMain
    );
    if (goalButtons.length == 0) {
      $(".goal-color").hide();
    } else {
      $(".goal-color").show();
    }
  }
}
class CardPage {
  language = "";
  title = "";
  onSave = null;
  uniqueID = "";
  multiLanguagesSettings = "";
  url = "";
  $form = null;
  onLanguageChange = null;
  constructor(settings) {
    this.uniqueID = settings.uniqueID;
    this.title = settings.title;
    this.multiLanguagesSettings = settings.multiLanguagesSettings;
    this.globalSettings = tryParseJSON(settings.globalSettings);
    this.onSave = settings.onSave;
    this.url = settings.url;
    this.$form = Wizard.$form;
    this.language = this.getMainLanguageCode();
    this.onLanguageRender = settings.onLanguageRender;
    this.onLanguageChange = settings.onLanguageChange;
  }
  getSetting(type, settingName) {
    let setting = "";
    switch (type) {
      case "ml":
        const multiLanguagesSettings = tryParseJSON(
          this.multiLanguagesSettings
        );
        if (!multiLanguagesSettings) return "";
        setting =
          multiLanguagesSettings[this.getMainLanguageCode()].fields[
            settingName
          ];
        break;
      default:
        setting = this[settingName];
        break;
    }
    return setting;
  }
  setSetting(settingName, newValue) {
    this[settingName] = newValue;
  }
  isLanguagesChanged(oldLmSettings, newLmSettings) {
    oldLmSettings = tryParseJSON(oldLmSettings);
    newLmSettings = tryParseJSON(newLmSettings);
    return (
      JSON.stringify(Object.keys(oldLmSettings)) !=
      JSON.stringify(Object.keys(newLmSettings))
    );
  }
  render() {
    this.LanguageManager = LanguageManager.getInstance({
      cardPage: this,
      fieldsContainer: "#mainCardContainer .multi-language .ml-fields",
      rootButtonsContainer: '[data-id="allACBContainer"]',
      itemsContainer: '.ac-i-container [data-id="simpleACB"]',
      mainItemsContainer: '.ac-i-container [data-id="mainACB"]',
      settingsJSON: this.multiLanguagesSettings,
      onControllerRender: (langaugeManager) => {
        if (this.onLanguageRender)
          this.onLanguageRender.call(this, langaugeManager);
      },
      onChange: (langaugeManager) => {
        if (this.onLanguageChange)
          this.onLanguageChange.call(this, langaugeManager);
      },
      onSave: (newMlSettings) => {
        const oldLmSettings = this.getSetting("", "multiLanguagesSettings");
        this.setSetting(
          "multiLanguagesSettings",
          JSON.stringify(newMlSettings)
        );
        this.onSave(
          this.isLanguagesChanged(
            oldLmSettings,
            this.getSetting("", "multiLanguagesSettings")
          ),
          newMlSettings
        );
      },
    });
  }
  getMainLanguageCode() {
    const multiLanguagesSettings = tryParseJSON(this.multiLanguagesSettings);
    let mainLanguageCode = "";
    $.each(multiLanguagesSettings, function (index, language) {
      if (language.isStatic) {
        mainLanguageCode = language.languageCode;
        return false;
      }
    });
    return mainLanguageCode;
  }
  isLoading() {}
}
var PremiumFeaturesHandler = (function () {
  var _ = {
    languages: {
      2: {
        1: 1, // maximum allowed amount
        2: 1, // maximum allowed amount
        3: 1, // maximum allowed amount
        4: false, // not limited
        5: false, // not limited
        6: false, // not limited
      },
      4: {
        1: 1, // maximum allowed amount
        2: 1, // maximum allowed amount
        3: 1, // maximum allowed amount
        4: 3, // maximum allowed amount
        5: 5, // maximum allowed amount
        6: false, // not limited
      },
    },
  };
  _.init = (function () {
    $(document).on("preview.loaded", function () {
      _.refresh();
    });
  })();
  _.refresh = function () {
    if (!Wizard.Preview.isReady) return;
    if (isSubWebsite) {
      Wizard.Preview.$(".upgrade-to-remove").attr("href", "");
    }
    Wizard.Preview.$(".w-upgrade")
      .off("click.premiumFeaturesHandler")
      .on("click.premiumFeaturesHandler", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var $this = $(this);
        if (isSubWebsite) {
          Swal.fire({
            icon: "warning",
            title: translations.cpWizard.teamCardPage.subWebsiteProMessage,
          }).then((result) => {});
        } else {
          window.open(
            "/manager/upgrade/index.php?w=" +
              websiteID +
              "&ur=" +
              $this.data("feature-id"),
            "_blank"
          );
        }
      });
  };
  _.isLimited = function (featureID, customInstance, showMessage) {
    var validator = {
      languages: function () {
        var isLimited = false;
        var maxAmount = _.languages[systemKindNUM][packageNUM];
        if (packageNUM == 1) {
          if (!isFreeNoneTrail() && !isTrialPeriodHasExpired) maxAmount = false;
        }
        if ($.isNumeric(maxAmount)) {
          isLimited = customInstance.countLanguages() >= maxAmount;
        }
        return {
          message:
            "<p>" + escapeHtml(translations.cpWizard.lm.proMessage) + "</p>",
          action: function () {
            window.open(
              "/manager/upgrade/index.php?w=" + websiteID + "&ur=languages",
              "_blank"
            );
          },
          isLimited: isLimited,
        };
      },
      teamCards: function () {
        var isLimited = false;
        if (
          (packageNUM == 1 || packageNUM == 2) &&
          teamPagesHandler.cards.length >= 10
        )
          isLimited = true;
        if (packageNUM == 3 && teamPagesHandler.cards.length >= 25)
          isLimited = true;
        if (packageNUM == 4 && teamPagesHandler.cards.length >= 100)
          isLimited = true;
        if (packageNUM == 5 && teamPagesHandler.cards.length >= 500)
          isLimited = true;
        if (packageNUM == 6 && teamPagesHandler.cards.length >= 1000)
          isLimited = true;
        return {
          message:
            "<p>" +
            escapeHtml(
              translations.cpWizard.cardPagesHandler.proMessage.replace(
                "{{cardsNum}}",
                teamPagesHandler.cards.length
              )
            ) +
            "</p>",
          action: function () {
            window.open(
              "/manager/upgrade/index.php?w=" + websiteID + "&ur=teamCards",
              "_blank"
            );
          },
          isLimited: isLimited,
        };
      },
    };
    var result = validator[featureID] ? validator[featureID].call(this) : false;
    if (result.isLimited) {
      if (showMessage) {
        if (!isSubWebsite) {
          var $bootbox = bootbox
            .dialog({
              title: translations.freePagesLimitMessage_GO_PREMIUM,
              message:
                '<div class="pro-features-text-container">' +
                result.message +
                "</div>",
              backdrop: false,
              closeButton: true,
              onEscape: true,
              show: false,
              className: "s123-modal pro-features",
              buttons: {
                save: {
                  label: translations.upgrade,
                  className: "btn-primary",
                  callback: function () {
                    result.action.call(this);
                  },
                },
                cancel: {
                  label: translations.Cancel,
                  className: "btn-default",
                },
              },
            })
            .on("show.bs.modal", function (event) {
              var $backdrop = $(
                '<div class="backdropManaul pro-features"></div>'
              );
              $("body").append($backdrop);
              $bootbox.one("hide.bs.modal", function (event) {
                $backdrop.remove();
              });
            });
          $bootbox.modal("show");
        } else {
          Swal.fire({
            icon: "warning",
            title: translations.cpWizard.teamCardPage.subWebsiteProMessage,
          }).then((result) => {});
        }
      }
    }
    return result.isLimited;
  };
  return _;
})();
class GmapAutocomplete {
  $input = null;
  autocomplete = null;
  constructor(settings) {
    this.$input = settings.$input;
    this.initAutocomplete();
    settings.$input.data("gmap-a-c", this);
  }
  destroy() {
    google.maps.event.clearListeners(this.autocomplete, "place_changed");
    this.$input.data("gmap-a-c", null);
    this.$input = null;
  }
  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$input.get(0),
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", () => {
      var place = this.autocomplete.getPlace();
      this.$input.data("lat", place.geometry.location.lat());
      this.$input.data("lng", place.geometry.location.lng());
      if (place.name || place.formatted_address) {
        var address = place.formatted_address
          ? place.formatted_address
          : place.name;
        var src =
          '<?=$GLOBALS["maps-display-domain"]?>/include/globalMapDisplay.php?q=' +
          encodeURI(address) +
          "&z=16&disableDefaultUI=true&hideButton=1&l=<?=urlencode($t_language)?>";
        var html =
          '<iframe id="eventGoogleMaps" width="100%" height="100%" src="' +
          src +
          '" frameborder="0"></iframe>';
        var $html = $(html);
        $("#" + this.$input.attr("data-map-id"))
          .empty()
          .show()
          .append($html);
      } else {
        var html =
          '<div style="border: 1px solid #e1e6ef; text-align: center; padding: 50px">';
        html += "<span>" + translations.locationNotTranslated + "</span>";
        html += "</div>";
        var $html = $(html);
        $("#" + this.$input.attr("data-map-id"))
          .empty()
          .show()
          .append($html);
      }
    });
  }
}
function OpenTakePhotoAndVideoModal(fieldID, isTakePhoto, isTakeVideo) {
  var $modal = $("#takePhotoAndVideo");
  var $tabsContainer = $modal.find(".t-p-tabs-container");
  var $takePhotoContainer = $modal.find(".t-p-container");
  var $takeVideoContainer = $modal.find(".t-v-container");
  var $videoContainer = $modal.find(".t-p-video-container");
  var $imageContainer = $modal.find(".t-p-image-container");
  var $recordContainer = $modal.find(".t-v-record-container");
  var $playContainer = $modal.find(".t-v-play-container");
  var $noCameraContainer = $modal.find(".no-camera-container");
  var stream = "";
  var streamSettings = "";
  var mediaRecorder = "";
  var recordedBlobs = [];
  var imageAI = null;
  var processing = {};
  var photo = { url: { image: "" }, imageWidth: 320, imageHeight: 0 };
  var timer = { hours: 0, mins: 0, seconds: 0, obj: null };
  var cartoonsTypes = [0, 1, 2, 3, 4];
  $modal.one("show.bs.modal", async function (event) {
    var $backdrop = $(
      '<div class="backdropManaul take-photo-and-video"></div>'
    );
    $("body").append($backdrop);
    $modal.one("hide.bs.modal", function (event) {
      $backdrop.remove();
    });
    if (isTakePhoto && isTakeVideo) {
      $tabsContainer.show();
      $tabsContainer
        .find("button")
        .off("click")
        .on("click", function () {
          var $this = $(this);
          if ($this.hasClass("btn-primary")) return;
          resetTakePhotoVideo();
          $tabsContainer.find("button").removeClass("btn-primary");
          $this.addClass("btn-primary");
          if ($this.data("tool-name") == "photo") {
            initializeTakePhoto();
            $takePhotoContainer.show();
            $takeVideoContainer.hide();
          } else {
            initializeTakeVideo();
            $takePhotoContainer.hide();
            $takeVideoContainer.show();
          }
        });
      $tabsContainer.find('button[data-tool-name="photo"]').trigger("click");
      initializeTakePhoto();
      $takePhotoContainer.show();
      $takeVideoContainer.hide();
    } else {
      $tabsContainer.hide();
      if (isTakePhoto) {
        initializeTakePhoto();
        $takePhotoContainer.show();
        $takeVideoContainer.hide();
      } else {
        initializeTakeVideo();
        $takePhotoContainer.hide();
        $takeVideoContainer.show();
      }
    }
  });
  $modal.one("hide.bs.modal", function (event) {
    resetTakePhotoVideo();
  });
  async function initializeTakePhoto() {
    var $photoMirrorVideo = $modal.find("#t-p-video");
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1024 }, height: { ideal: 576 } },
        audio: false,
      });
      streamSettings = stream.getVideoTracks()[0].getSettings();
    } catch (err) {
      var msg = "";
      if (err.name == "NotReadableError" || err.name == "TrackStartError") {
        msg = translations.cameraInuse;
      } else if (
        err.name == "NotAllowedError" ||
        err.name == "PermissionDeniedError"
      ) {
        msg = translations.cameraDenied;
      } else {
        msg = translations.cameraNotDetected;
      }
      $noCameraContainer.find(".error-message").html(msg);
      $tabsContainer.find("button").attr("disabled", true);
      $noCameraContainer.addClass("show-msg");
      $noCameraContainer.show();
      return;
    }
    $photoMirrorVideo[0].srcObject = stream;
    $videoContainer.show();
    $imageContainer.hide();
    $modal
      .find("#t-p-take-btn")
      .off("click")
      .on("click", async function () {
        var videoWidth = $modal.find("#t-p-video").width();
        var videoHeight = $modal.find("#t-p-video").height();
        var $canvas = $(
          '<canvas width="' +
            videoWidth +
            '" height="' +
            videoHeight +
            '" data-img-type="image"></canvas>'
        );
        $canvas[0]
          .getContext("2d")
          .drawImage(
            $photoMirrorVideo[0],
            0,
            0,
            $canvas[0].width,
            $canvas[0].height
          );
        photo.url.image = $canvas[0].toDataURL("image/png");
        photo.imageWidth = $canvas[0].width;
        photo.imageHeight = $canvas[0].height;
        $videoContainer.hide();
        $imageContainer.show();
        $modal.find(".t-p-priviews").get(0).scrollTop = 0;
        imageAI = new ImageAI({
          $el: $modal.find(".t-p-priviews"),
          fieldID: fieldID,
          $saveBtn: $modal.find("#t-p-save-btn"),
          callback: function () {
            $modal.modal("hide");
          },
          websiteID: websiteID,
          isHorizontal: videoWidth > videoHeight,
          imageB64: photo.url.image,
          isDisaplyOriginalImage: true,
        });
      });
    $modal
      .find("#t-p-reset-btn")
      .off("click")
      .on("click", async function () {
        $videoContainer.show();
        $imageContainer.hide();
        abortPhotoRequests();
      });
  }
  async function initializeTakeVideo() {
    var $startRecordBtn = $modal.find("#t-v-start-record-btn");
    var $stopRecordBtn = $modal.find("#t-v-stop-record-btn");
    var constraints = {
      audio: false,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
    };
    var video = {};
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      var msg = "";
      if (err.name == "NotReadableError" || err.name == "TrackStartError") {
        msg = translations.cameraInuse;
      } else if (
        err.name == "NotAllowedError" ||
        err.name == "PermissionDeniedError"
      ) {
        msg = translations.cameraDenied;
      } else {
        msg = translations.cameraNotDetected;
      }
      $noCameraContainer.find(".error-message").html(msg);
      $tabsContainer.find("button").attr("disabled", true);
      $noCameraContainer.addClass("show-msg");
      $noCameraContainer.show();
      return;
    }
    $recordContainer.show();
    $playContainer.hide();
    $startRecordBtn.show();
    $stopRecordBtn.hide();
    $modal.find("#t-v-live-video")[0].srcObject = stream;
    console.dir($modal.find("#t-v-live-video")[0].srcObject);
    $modal
      .find("#t-v-start-record-btn")
      .off("click")
      .on("click", function () {
        var mimeType = "video/mp4";
        var options = { mimeType };
        recordedBlobs = [];
        try {
          mediaRecorder = new MediaRecorder(stream, { options });
          startTimer();
        } catch (e) {
          return;
        }
        mediaRecorder.ondataavailable = function (event) {
          if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
          }
        };
        mediaRecorder.onstop = function () {
          if (0) {
            var superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
            var formData = new FormData();
            formData.append("w", $("#id").val());
            formData.append("file", superBuffer, "video.webm");
            formData.append("pathType", "0");
            var ajax = $.ajax({
              type: "POST",
              url: "/versions/" + versionNUM + "/wizard/uploadFile.php",
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              success: function (data) {
                data = jQuery.parseJSON(data);
                var videoURL = data.n + "?v=" + $GLOBALS["v-cache-long"];
                video.url = videoURL;
                $.ajax({
                  type: "POST",
                  url: "/files/vendor/image-ai-tools/sendVideo.php",
                  data: { w: $("#id").val(), videoURL: videoURL },
                  success: function (response) {
                    response = tryParseJSON(response);
                    if (response && response.code == 0) {
                      checkIfVideoReady(response.data.taskFlag, video);
                    }
                  },
                });
              },
            });
          }
          clearTimeout(timer.obj);
          timer.hours = 0;
          timer.mins = 0;
          timer.seconds = 0;
          $modal
            .find(".t-v-play-video-timer .t-v-play-video-seconds")
            .html("00");
          $modal.find(".t-v-play-video-timer .t-v-play-video-mins").html("00:");
          $modal
            .find(".t-v-play-video-timer .t-v-play-video-hours")
            .html("00:");
          $modal.find("#t-v-play-video")[0].src = null;
          $modal.find("#t-v-play-video")[0].srcObject = null;
          superBuffer = new Blob(recordedBlobs, { type: "video/mp4" });
          $modal.find("#t-v-play-video")[0].src =
            window.URL.createObjectURL(superBuffer);
          $modal.find("#t-v-play-video")[0].play();
          $recordContainer.hide();
          $playContainer.show();
        };
        mediaRecorder.start();
        $startRecordBtn.hide();
        $stopRecordBtn.show();
      });
    $modal
      .find("#t-v-stop-record-btn")
      .off("click")
      .on("click", function () {
        mediaRecorder.stop();
      });
    $modal
      .find("#t-v-save-btn")
      .off("click")
      .on("click", async function () {
        var url = "";
        var superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
        var reader = new FileReader();
        reader.readAsDataURL(superBuffer);
        reader.onloadend = function () {
          var base64String = reader.result;
          window.top.UploadPixabayLibraryVideo(
            $("#websiteID").val(),
            fieldID,
            base64String,
            true,
            "takeVideo"
          );
          if ($modal.find(".video-inf-loop").is(":checked")) {
            window.top.$("#" + fieldID).data("inf-loop", "true");
          } else {
            window.top.$("#" + fieldID).data("inf-loop", "false");
          }
          $modal.modal("toggle");
        };
      });
    $modal
      .find("#t-v-reset-btn")
      .off("click")
      .on("click", async function () {
        $recordContainer.show();
        $playContainer.hide();
        $startRecordBtn.show();
        $stopRecordBtn.hide();
        $modal.find("#rmv-bg").find("i.fa").show();
        $modal.find("#rmv-bg video").remove();
      });
    $modal
      .find(".t-v-priview-container")
      .off("click")
      .on("click", async function () {
        return;
        var $this = $(this);
        var type = $this.data("video-type");
        var isValidURL = false;
        if (type == "withoutBG" && video.urlWithoutBG) {
          isValidURL = true;
        } else if (type == "video" && video.url) {
          isValidURL = true;
        }
        if (isValidURL) {
          $modal.find(".t-v-priview-container").removeClass("active");
          $(this).addClass("active");
        }
      });
  }
  function startTimer() {
    timer.obj = setTimeout(function () {
      timer.seconds++;
      if (timer.seconds > 59) {
        timer.seconds = 0;
        timer.mins++;
        if (timer.mins > 59) {
          timer.mins = 0;
          timer.hours++;
        }
        if (timer.hours < 10) {
          $modal
            .find(".t-v-play-video-timer .t-v-play-video-hours")
            .text("0" + timer.hours + ":");
        } else {
          $modal
            .find(".t-v-play-video-timer .t-v-play-video-hours")
            .text(timer.hours + ":");
        }
      }
      if (timer.mins < 10) {
        $modal
          .find(".t-v-play-video-timer .t-v-play-video-mins")
          .text("0" + timer.mins + ":");
      } else {
        $modal
          .find(".t-v-play-video-timer .t-v-play-video-mins")
          .text(timer.mins + ":");
      }
      if (timer.seconds < 10) {
        $modal
          .find(".t-v-play-video-timer .t-v-play-video-seconds")
          .text("0" + timer.seconds);
      } else {
        $modal
          .find(".t-v-play-video-timer .t-v-play-video-seconds")
          .text(timer.seconds);
      }
      startTimer();
    }, 1000);
  }
  function resetTakePhotoVideo() {
    $videoContainer.hide();
    $imageContainer.hide();
    $recordContainer.hide();
    $playContainer.hide();
    $noCameraContainer.hide();
    $noCameraContainer.removeClass("show-msg");
    $tabsContainer.find("button").attr("disabled", false);
    mediaRecorder = "";
    recordedBlobs = [];
    if (stream != "") {
      stream.getTracks().forEach((track) => track.stop());
      stream = "";
    }
    abortPhotoRequests();
    $modal.find("#rmv-bg").find("i.fa").show();
    $modal.find("#rmv-bg video").remove();
  }
  function abortPhotoRequests() {
    if (imageAI && typeof imageAI != "undefined") {
      imageAI.abortRequests();
      imageAI = null;
    }
  }
  function checkIfVideoReady(taskFlag, video) {
    var counter = 0;
    var processingVideoInterval = setInterval(function () {
      $.ajax({
        type: "POST",
        url: "/files/vendor/image-ai-tools/getVideoWithoutBG.php",
        data: { w: $("#id").val(), taskFlag: taskFlag },
        success: function (response) {
          response = tryParseJSON(response);
          counter++;
          if (response.data.status == "success") {
            clearInterval(processingVideoInterval);
            var $html = $(
              '<video src="' +
                response.data.resultUrl +
                '" width="320" height="180" playsinline loop></video>'
            );
            $modal.find("#rmv-bg").find("i.fa").hide();
            $modal.find("#rmv-bg").append($html);
            $html[0].play();
            video.urlWithoutBG = response.data.resultUrl;
          } else if (counter > 9) {
            clearInterval(processingVideoInterval);
          }
        },
      });
    }, 5000);
  }
  $modal.modal("show");
}
class ActionButton {
  id = "";
  title = "";
  icon = "";
  type = "";
  info = "";
  $html = null;
  $container = null;
  onRender = null;
  onEditorOpen = null;
  onEditorSave = null;
  isMain = false;
  constructor(settings) {
    this.id = settings.id;
    this.title = settings.title;
    this.icon = settings.icon;
    this.type = settings.type;
    this.info = settings.info;
    this.$container = settings.$container;
    this.onRender = settings.onRender;
    this.onEditorOpen = settings.onEditorOpen;
    this.onEditorSave = settings.onEditorSave;
    this.removeButtonAction = settings.removeButtonAction;
    this.isMain = settings.isMain;
  }
  openEditor() {
    this.$form = $(`<form id="pageContentForm">
<div class="widget-body" style="display: block;">
<div class="widget-main">
<div class="item-settings-container fancy-scrollbar">
</div>
</div>
</div>
</form>`);
    this.$editor = bootbox
      .dialog({
        title: translations.cpWizard.cardPagesHandler.editPage,
        message: this.$form,
        backdrop: true,
        closeButton: true,
        onEscape: true,
        show: false,
        className: "s123-modal edit-action-btn",
        buttons: {
          cancel: { label: translations.Cancel, className: "btn-default" },
          save: {
            label: translations.saveChanges,
            className: "btn-primary edit-action-save-btn",
            callback: () => {
              if (!this.$form.valid()) return false;
              this.$form.submit();
              return false;
            },
          },
        },
      })
      .on("show.bs.modal", () => {
        this.$form
          .find(".item-settings-container")
          .html(this.getEditorFields());
        this.$form.find("#page-id").val(this.id);
        this.$form.find("#page-type").val(this.type);
        UploadSingleFilesInitialize();
        InitializeToolTips();
        this.$form.off("submit.ActionButton").on("submit.ActionButton", (e) => {
          e.preventDefault();
          const type = this.$form.find("#page-type").val();
          const info = this.$form.find("#info").val();
          this.title = this.$form.find("#page-title").val();
          this.icon = this.$form.find("#cE_PageIcon").val();
          this.info = this.$form.find("#info").val();
          if (!this.isFormCustomSave) {
            $(".edit-action-btn").modal("hide");
            this.render();
            if (this.onEditorSave) this.onEditorSave.call(this);
          }
        });
        this.$form.validate({
          errorElement: "div",
          errorClass: "help-block",
          focusInvalid: true,
          ignore:
            ':hidden:not(.file-upload-input-field,[data-editor="froala"]),.fileUploadBox:hidden .file-upload-input-field,.form-tool-builder .form-control,.form-tool-builder input,[contenteditable="true"]:not([name])',
          highlight: function (e) {
            $(e)
              .closest(".form-group")
              .removeClass("has-info")
              .addClass("has-error");
          },
          success: function (e) {
            $(e).closest(".form-group").removeClass("has-error");
            $(e).remove();
          },
          errorPlacement: function (error, element) {
            if (
              element.is("input[type=checkbox]") ||
              element.is("input[type=radio]")
            ) {
              var controls = element.closest('div[class*="col-"]');
              if (controls.find(":checkbox,:radio").length > 1)
                controls.append(error);
              else error.insertAfter(element.nextAll(".lbl:eq(0)").eq(0));
            } else if (element.is(".select2")) {
              error.insertAfter(
                element.siblings('[class*="select2-container"]:eq(0)')
              );
            } else if (element.is(".chosen-select")) {
              error.insertAfter(
                element.siblings('[class*="chosen-container"]:eq(0)')
              );
            } else {
              error.appendTo(element.closest(".form-group"));
            }
          },
        });
        if (this.onEditorOpen) this.onEditorOpen.call(this);
      })
      .on("shown.bs.modal", () => {})
      .modal("show");
    this.$form.onEnterKey((event) => {
      event.preventDefault();
      this.$editor.find(".edit-action-save-btn").trigger("click");
    });
  }
  getEditorFields() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="page-title" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.title);
    html += "</label>";
    html +=
      '<input type="text" class="form-control" id="page-title" maxlength="50" value="' +
      this.title +
      '" required  data-rule-prevent-space-only="true" data-msg-prevent-space-only="' +
      escapeHtml(translations.fieldRequired) +
      '" data-rule-not-url="true">';
    html += "</div>";
    html += '<div id="pageIcon" class="form-group">';
    html +=
      '<div class="input-file-upload" id="cE_PageIcon" data-website-id="' +
      websiteID +
      '" data-mb="30" data-file-kind="5" data-value="' +
      this.icon +
      '" data-text="' +
      escapeHtml(translations.actionButtons.icon.text) +
      '" data-icons="true" data-icons-filter="glyph" data-no-drop-down="true"></div>';
    html += "</div>";
    html += this.getInfoField();
    return html;
  }
  render() {
    let html = "";
    html +=
      '<li id="page_' +
      this.id +
      '" data-type="' +
      this.type +
      '" data-is-main="' +
      this.isMain +
      '" class="page-box-item">';
    html += '<div class="pageBox" data-id="' + this.id + '">';
    html +=
      '<div class="dragMe"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>';
    html += '<div class="editMe">';
    html += '<div class="page-icon-container">';
    html +=
      '<img class="page-icon" data-img-type="svg" style="mask: url(\'' +
      getIconFullPath(this.icon) +
      "'); -webkit-mask: url('" +
      getIconFullPath(this.icon) +
      '\')" src="' +
      getIconFullPath(this.icon) +
      '">';
    html += "</div>";
    html += '<span class="page-title">' + this.title + "</span>";
    html += "</div>";
    html += '<div class="deleteMe">';
    html += '<i class="fal fa-regular fa-trash-can"></i>';
    html += "</div>";
    html += "</div>";
    html += "</li>";
    const $html = $(html);
    if (this.$html) {
      this.$html.replaceWith($html);
      this.$html = $html;
    } else {
      this.$html = $html;
      this.$container.append(this.$html);
    }
    this.$html
      .find(".pageBox")
      .off("click.editMe")
      .on("click.editMe", (e) => {
        e.preventDefault();
        if ($(event.target).closest(".dragMe").length > 0) return;
        this.openEditor();
      });
    if (isMobile) {
      this.$html
        .find(".dragMe")
        .addClass("sort-controller")
        .attr("data-controller-type", this.type);
    } else {
      this.$html
        .find(".pageBox")
        .addClass("sort-controller")
        .attr("data-controller-type", this.type);
    }
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    switch (this.type) {
      case "phone":
      case "whatsApp":
        html += escapeHtml(translations.cpWizard.wizardFields.pageInfoPhone);
        break;
      case "map":
      case "googleMaps":
      case "waze":
      case "moovit":
        html += escapeHtml(translations.cpWizard.wizardFields.pageInfoAddress);
        break;
    }
    html += "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '" required>';
    html += "</div>";
    return html;
  }
  destroy() {
    this.$html.remove();
  }
  getAllSettings() {
    const allSettings = {
      id: this.id,
      title: this.title,
      icon: this.icon,
      type: this.type,
      info: this.info,
      isMain: this.isMain,
    };
    switch (this.type) {
      case "phone":
      case "whatsApp":
        allSettings.countryData = this.countryData;
        break;
      case "map":
      case "googleMaps":
      case "waze":
      case "moovit":
        allSettings.geometry = this.geometry;
        break;
      case "email":
        allSettings.conversionCode = this.conversionCode;
        break;
    }
    return allSettings;
  }
  getPropFromUserSettings(userSettings, propName) {
    return userSettings[propName] ? userSettings[propName] : "";
  }
}
class Phone extends ActionButton {
  countryData = {};
  isFormCustomSave = true;
  constructor(settings) {
    settings.onEditorOpen = () => {
      const $pageInfoSimple = $(".edit-action-btn #info");
      const countryData = this.countryData ? this.countryData : null;
      $pageInfoSimple.intlTelInput({
        autoHideDialCode: true,
        autoPlaceholder: true,
        initialCountry: countryData?.iso2
          ? this.countryData.iso2.toLowerCase()
          : "auto",
        nationalMode: true,
        formatOnInit: false,
        numberType: "MOBILE",
        utilsScript: "/files/frameworks/intl-tel-input-8.5.2/build/js/utils.js",
      });
      $pageInfoSimple.removeAttr("autocomplete");
      this.$form.off("submit.Phone").one("submit.Phone", (e) => {
        e.preventDefault();
        const countryData = tryParseJSON(
          JSON.stringify($pageInfoSimple.intlTelInput("getSelectedCountryData"))
        );
        countryData.dialCode = "+" + countryData.dialCode;
        this.countryData = countryData;
        if (this.onEditorSave) {
          $(".edit-action-btn").modal("hide");
          this.render();
          this.onEditorSave.call(this);
        }
      });
      if (settings.subButtonOnEditorOpen)
        settings.subButtonOnEditorOpen.call(this);
    };
    super(settings);
    this.countryData = settings.countryData;
  }
  isPhoneNumber() {
    return /^[0-9-+*() ]+$/i.test(this.$form.find("#info").val());
  }
}
class Telegram extends Phone {
  constructor(settings) {
    settings.subButtonOnEditorOpen = () => {
      this.$form.find("#info").on("input", (event) => {
        this.disableEnableFlags();
      });
      this.disableEnableFlags();
    };
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(
      translations.cpWizard.wizardFields.pageInfoPhoneUserName
    );
    html += "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '" required>';
    html += "</div>";
    return html;
  }
  getAllSettings() {
    const allSettings = {
      id: this.id,
      title: this.title,
      icon: this.icon,
      type: this.type,
      info: this.info,
      isMain: this.isMain,
      countryData: this.countryData,
    };
    return allSettings;
  }
  disableEnableFlags() {
    if (this.$form.find("#info").val().length === 0) return;
    if (!this.isPhoneNumber()) {
      this.$form
        .find("#info")
        .closest(".intl-tel-input")
        .find(".flag-container")
        .addClass("disabled");
    } else {
      this.$form
        .find("#info")
        .closest(".intl-tel-input")
        .find(".flag-container")
        .removeClass("disabled");
    }
  }
}
class FreeText extends ActionButton {
  isFormCustomSave = true;
  constructor(settings) {
    settings.onEditorOpen = () => {
      s123EditorInit();
      this.$form.off("submit.FreeText").one("submit.FreeText", (e) => {
        e.preventDefault();
        this.info = $("#pageContentForm #info").val();
        if (this.onEditorSave) {
          $(".edit-action-btn").modal("hide");
          this.render();
          this.onEditorSave.call(this);
        }
      });
    };
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.enterInfo);
    html += "</label>";
    html +=
      '<textarea class="form-control" name="info" id="info" data-editor="froala" data-froala-height="200" data-website-id="' +
      websiteID +
      '" data-froala-buttons="cardPage" placeholder="' +
      escapeHtml(translations.cpWizard.wizardFields.enterInfo) +
      '" data-max-chars-length="10000">' +
      this.info +
      "</textarea>";
    html += "</div>";
    return html;
  }
}
class Maps extends ActionButton {
  geometry = { lat: "", lng: "" };
  isFormCustomSave = true;
  constructor(settings) {
    settings.onEditorOpen = () => {
      const gmapAutocomplete = new GmapAutocomplete({
        $input: $(".edit-action-btn #info"),
      });
      $(".edit-action-btn #info").data("lat", this.geometry.lat);
      $(".edit-action-btn #info").data("lng", this.geometry.lng);
      this.$form.off("submit.Maps").one("submit.Maps", (e) => {
        e.preventDefault();
        this.geometry = {
          lat: $("#pageContentForm #info").data("lat"),
          lng: $("#pageContentForm #info").data("lng"),
        };
        if (this.onEditorSave) {
          $(".edit-action-btn").modal("hide");
          this.render();
          this.onEditorSave.call(this);
        }
      });
    };
    super(settings);
    if (settings.geometry) {
      this.geometry = settings.geometry;
    }
  }
}
class Gallery extends ActionButton {
  isFormCustomSave = true;
  constructor(settings) {
    settings.onEditorOpen = () => {
      this.initInterface();
    };
    super(settings);
  }
  initInterface() {
    UploadMultipleFilesInitialize();
    InitializeToolTips();
    const uploadFile = getUploadFileObjectByID("gallery_" + this.id);
    this.$form.off("submit.Gallery").one("submit.Gallery", (e) => {
      const newInfo = tryParseJSON(this.info);
      newInfo.images = uploadFile.input.val();
      this.info = JSON.stringify(newInfo);
      if (this.onEditorSave) {
        $(".edit-action-btn").modal("hide");
        this.render();
        this.onEditorSave.call(this);
      }
    });
  }
  getInfoField() {
    let html = "";
    html +=
      '<input type="hidden" value="' +
      escapeHtml(tryParseJSON(this.info).images) +
      '" id="gallery_' +
      escapeHtml(this.id) +
      '" class="multiple-images-upload" data-website-id="' +
      websiteID +
      '" data-mb="10" data-file-kind="1" data-text="' +
      escapeHtml(translations.cpWizard.wizardFields.pagesInfoGallery) +
      '" data-library="true" data-max-amount="50" data-max-amount-error-msg="' +
      escapeHtml(
        translations.cpWizard.wizardFields.maxAmountErrorMsg.replace(
          "{{mediaAmount}}",
          50
        )
      ) +
      '">';
    html +=
      '<input type="hidden" class="form-control" name="info" id="info" value="' +
      escapeHtml(this.info) +
      '">';
    return html;
  }
}
class Link extends ActionButton {
  isFormCustomSave = true;
  constructor(settings) {
    settings.onEditorOpen = () => {
      this.$form.off("submit.Link").on("submit.Link", (e) => {
        e.preventDefault();
        this.info = this.$form.find("#info").val();
        $(".edit-action-btn").modal("hide");
        this.render();
        this.onEditorSave.call(this);
        return;
        $(".edit-action-btn .edit-action-save-btn").append(
          '&nbsp;<i class="is-loading ace-icon fal fa-spinner fa-solid fa-spin"></i>'
        );
        $.ajax({
          type: "POST",
          url:
            "/versions/" +
            versionNUM +
            "/wizard/modules/externalLink/checkUrlStatusAjax.php",
          data: { w: $("#id").val(), url: this.info },
          success: (data) => {
            const dataObj = tryParseJSON(data);
            if (dataObj.status == "ok") {
              if (this.onEditorSave) {
                $(".edit-action-btn").modal("hide");
                this.render();
                this.onEditorSave.call(this);
              }
            } else {
              const $input = this.$form.find("#info");
              const $container = $input.closest(".form-group");
              $container.addClass("has-error");
              var $msg = $(
                '<div id="link-error" class="help-block">' +
                  translations.cpWizard.actionButtonsHandler.link.inactiveURL +
                  "</div>"
              );
              $container.append($msg);
              $input.off("input").one("input", function () {
                $msg.remove();
                $container.removeClass("has-error");
              });
            }
            $(".edit-action-btn .edit-action-save-btn .is-loading").remove();
          },
        });
      });
    };
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.pageInfoUrl);
    html += "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '" required data-rule-url-https="true" placeholder="https://example.com">';
    html += "</div>";
    if (this.type == "facebookTimeline") {
      html += '<div class="fb-timeline-container"></div>';
    } else if (this.type == "twitterTimeline") {
      html += '<div class="twitter-timeline-container"></div>';
    }
    return html;
  }
}
class FacebookTimeline extends Link {
  constructor(settings) {
    settings.onEditorOpen = () => {
      this.$form
        .find("#info")
        .on("input.FacebookTimeline change.FacebookTimeline", (e) => {
          clearTimeout(this.typingDelay);
          if (e.type == "input") {
            this.typingDelay = setTimeout(() => {
              this.renderTimeLine(this.$form.find("#info").val());
            }, typingTimeout);
          } else {
            this.renderTimeLine(this.$form.find("#info").val());
          }
        });
      this.renderTimeLine(this.$form.find("#info").val());
    };
    super(settings);
  }
  renderTimeLine(pagePath) {
    let url =
      pagePath.trim().length > 0
        ? pagePath
        : "https://www.facebook.com/facebook";
    this.$form
      .find(".fb-timeline-container")
      .html(
        '<iframe class="fb-timeline" scrolling="no" frameborder="no" allow="autoplay" src="/include/globalEmbedTool.php?t=3&embedURL=' +
          encodeURIComponent(url) +
          "&l=" +
          $("#language").val() +
          '"></iframe>'
      );
  }
}
class TwitterTimeline extends Link {
  constructor(settings) {
    settings.onEditorOpen = () => {
      this.$form
        .find("#info")
        .on("input.TwitterTimeline change.TwitterTimeline", (e) => {
          clearTimeout(this.typingDelay);
          if (e.type == "input") {
            this.typingDelay = setTimeout(() => {
              this.renderTimeLine(this.$form.find("#info").val());
            }, typingTimeout);
          } else {
            this.renderTimeLine(this.$form.find("#info").val());
          }
        });
      this.renderTimeLine(this.$form.find("#info").val());
    };
    super(settings);
  }
  renderTimeLine(pagePath) {
    let url =
      pagePath.trim().length > 0 ? pagePath : "https://www.twitter.com/twitter";
    this.$form
      .find(".twitter-timeline-container")
      .html(
        '<iframe class="twitter-timeline" scrolling="no" frameborder="no" allow="autoplay" src="/include/globalEmbedTool.php?t=2&embedURL=' +
          encodeURIComponent(url) +
          "&l=" +
          $("#language").val() +
          '"></iframe>'
      );
  }
}
class MailingList extends ActionButton {
  constructor(settings) {
    super(settings);
  }
  getInfoField() {
    return "";
  }
}
class Video extends ActionButton {
  constructor(settings) {
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.pageInfoVideo);
    html += "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '"  data-rule-youtube-vimeo-pattern="true" required>';
    html += "</div>";
    return html;
  }
}
class Youtube extends Video {
  constructor(settings) {
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.pageInfoVideo);
    html += "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '" data-rule-youtube-pattern="true" required>';
    html += "</div>";
    return html;
  }
}
class Vimeo extends Video {
  constructor(settings) {
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.pageInfoVideo);
    html += "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '" data-rule-vimeo-pattern="true" required>';
    html += "</div>";
    return html;
  }
}
class Embed extends ActionButton {
  isFormCustomSave = true;
  constructor(settings) {
    settings.onEditorOpen = () => {
      this.$form.off("submit.Embed").one("submit.Embed", (e) => {
        e.preventDefault();
        this.info = this.$form.find("#info").val();
        if (this.onEditorSave) {
          $(".edit-action-btn").modal("hide");
          this.render();
          this.onEditorSave.call(this);
        }
      });
    };
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html += '<label for="info" class="col-form-label">';
    html += escapeHtml(translations.cpWizard.wizardFields.enterInfo);
    html += "</label>";
    html +=
      '<textarea class="form-control" name="info" id="info" placeholder="' +
      escapeHtml(translations.cpWizard.wizardFields.enterInfo) +
      '" style="height: 200px;">' +
      this.info +
      "</textarea>";
    html += "</div>";
    return html;
  }
}
class AddToContact extends ActionButton {
  constructor(settings) {
    super(settings);
  }
  getInfoField() {
    return "";
  }
}
class Share extends ActionButton {
  constructor(settings) {
    super(settings);
  }
  getInfoField() {
    return "";
  }
}
class Skeleton extends ActionButton {
  isSkeleton = true;
  $rootContainer = null;
  constructor(settings) {
    super(settings);
    this.$rootContainer = settings.$rootContainer;
  }
  openEditor() {
    this.setAsActive();
    $(document).one("actionButtonsHandler.button_selected", (event) => {
      this.setAsInActive();
    });
    this.$rootContainer
      .find('.addNewItem_action[data-type="mainBtn"]')
      .trigger("click");
  }
  getInfoField() {
    return "";
  }
  setAsActive() {
    this.$html.addClass("active");
  }
  setAsInActive() {
    this.$html.removeClass("active");
  }
}
class Email extends ActionButton {
  isFormCustomSave = true;
  conversionCode = "";
  constructor(settings) {
    settings.onEditorOpen = () => {
      this.$form.off("submit.Email").one("submit.Email", (e) => {
        e.preventDefault();
        this.info = this.$form.find("#info").val();
        this.conversionCode = this.$form.find("#conv_code").val();
        if (this.onEditorSave) {
          $(".edit-action-btn").modal("hide");
          this.render();
          this.onEditorSave.call(this);
        }
      });
      this.$form.append(this.getConvCodeField());
      this.$form.find("#showConvCode").on("click", (e) => {
        e.preventDefault();
        this.$form.find("#convCodeContainer").toggleClass("conv-active");
        this.showHideConvCode();
      });
      this.showHideConvCode();
      ProFeature_addLabel({
        websiteID: $("#websiteID").val(),
        packageNUM: packageNUM,
        limitedToPackageNUM: 2,
        toolType: "cp_contactConvCode",
        $element: $("#scriptsBox .widget-header"),
        clickable: true,
      });
      ProFeature_addBlockDiv({
        websiteID: $("#websiteID").val(),
        packageNUM: packageNUM,
        limitedToPackageNUM: 2,
        toolType: "cp_contactConvCode",
        $element: $("#scriptsBox .widget-main"),
        featureID: "contactConvCode",
      });
    };
    super(settings);
    this.conversionCode = this.getPropFromUserSettings(
      settings,
      "conversionCode"
    );
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html +=
      '<label for="info" class="col-form-label">' +
      escapeHtml(translations.cpWizard.wizardFields.pageInfoEmail) +
      "</label>";
    html +=
      '<input type="text" class="form-control" name="info" id="info" value="' +
      this.info +
      '" required>';
    html += "</div>";
    return html;
  }
  getConvCodeField() {
    let html = "";
    html += '<div style="margin-top: 16px;">';
    html +=
      '<a href="#" id="showConvCode">' +
      escapeHtml(translations.cpWizard.wizardFields.conversionCode) +
      "</a>";
    html +=
      '<div id="convCodeContainer" class="' +
      (this.conversionCode ? "conv-active" : "") +
      '" style="display: none;">';
    html +=
      '<div id="scriptsBox" class="widget-box advance-settings-box" style="display: block;">';
    html += '<div class="widget-header">';
    html +=
      '<h5 class="widget-title">' +
      escapeHtml(
        translations.cpWizard.wizardFields.conversionCodeMainBoxTitle
      ) +
      "</h5>";
    html += "</div>";
    html += '<div class="widget-body" style="display: block;">';
    html += '<div class="widget-main">';
    html += '<div class="row">';
    html += '<div class="col-xs-12">';
    html += '<div class="form-group">';
    html +=
      '<label for="conv_code">' +
      escapeHtml(translations.cpWizard.wizardFields.conversionCodeBoxTitle);
    html +=
      ' <a href="#" onclick="return false;" data-rel="tooltip" data-html="true" data-trigger="hover" title="" data-original-title="' +
      escapeHtml(translations.cpWizard.wizardFields.conversionCodeBoxToltip) +
      '">';
    html += '<i class="fal fa-solid fa-question-circle"></i>';
    html += "</a>";
    html += "</label>";
    html +=
      '<textarea class="form-control" name="conv_code" id="conv_code" placeholder="' +
      escapeHtml(translations.cpWizard.wizardFields.conversionCodePlaceHolder) +
      '" style="height:150px;direction:ltr;">' +
      escapeHtml(this.conversionCode) +
      "</textarea>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
  }
  showHideConvCode() {
    if (this.$form.find("#convCodeContainer").hasClass("conv-active")) {
      this.$form.find("#convCodeContainer").stop().fadeIn();
    } else {
      this.$form.find("#convCodeContainer").stop().fadeOut();
    }
  }
}
class UploadVideo extends ActionButton {
  constructor(settings) {
    settings.onEditorOpen = () => {
      UploadSingleFilesInitialize();
      ColorboxInitial('[data-rel="colorbox"]');
    };
    super(settings);
  }
  getInfoField() {
    let html = "";
    html += '<div class="form-group">';
    html +=
      '<div class="input-file-upload" id="info" data-website-id="' +
      websiteID +
      '" data-mb="30" data-file-kind="2" data-value="' +
      this.info +
      '" data-text="' +
      escapeHtml(translations.cpWizard.wizardFields.uploadVideo) +
      '" data-hide-remove-btn="true"></div>';
    html += "</div>";
    return html;
  }
}
function libraryLivePreviewUpdate(uploadFileInputId, mediaPath) {
  var mediaType = UploadFile_GetFileType(mediaPath);
  if (!mediaType) {
    mediaType = isExtrenalVideo(mediaPath) ? "video" : "image";
  }
  $("#" + uploadFileInputId)
    .val(mediaPath)
    .trigger("change.wizard");
  var isReloadPreview = Wizard.Preview.updateView($("#" + uploadFileInputId));
  $(document).trigger("saveWizard", [isReloadPreview, false]);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isFreeNoneTrail() {
  return packageNUM == 1 && !trialBOO;
}
const TabsManager = (function () {
  var _ = {};
  _.init = function (settings) {
    $("#cpTabLinks").on(
      "click",
      ".cp-tab-controller:not(.tm-disabled-setting)",
      function (event) {
        event.preventDefault();
        if (typeof $(this).data("tab-id") == "undefined") return;
        $(this).addClass("active").siblings().removeClass("active");
        $("#" + $(this).data("tab-id") + ".cp-tab-content")
          .addClass("active")
          .siblings()
          .removeClass("active");
        $(document).trigger("cpTab.change", [$(this).data("tab-id")]);
      }
    );
  };
  return _;
})();
var Library = (function () {
  var L = {};
  L.init = function (settings) {
    Translation.init(settings.translations);
    L.$body = $("body");
    L.customClass = settings.customClass ? settings.customClass : "";
    L.$body.append(L.generateHTML());
    L.$modal = L.$body.find("#imageLibrary");
    L.events.init();
  };
  L.generateHTML = function () {
    var html = "";
    html += "<!-- imageLibrary Modal -->";
    html +=
      '<div class="modal s123-modal fade bs-example-modal-lg ' +
      L.customClass +
      '" id="imageLibrary" tabindex="-1" role="dialog" aria-labelledby="imageLibrary">';
    html += '<div class="modal-dialog modal-lg" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html +=
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    html += '<h4 class="modal-title">' + L.translate.imageLibrary + "</h4>";
    html += "</div>";
    html += '<div class="modal-body"></div>';
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
  };
  L.events = (function () {
    var E = {};
    E.init = function () {
      L.$modal.on("show.bs.modal", function (event) {
        var liveUpdate = L.$modal.data("liveUpdate");
        var minlibraryWidth = L.$modal.data("minlibraryWidth");
        var reload = true;
        if (!topWindow.uploadFiles) topWindow.uploadFiles = {};
        var uploadFile =
          topWindow.uploadFiles[L.$modal.data("uploadFileInputId")];
        if (uploadFile) {
          if (!uploadFile.imagesType) uploadFile.imagesType = "images";
          if (L.$modal.data("lastImagesType") === uploadFile.imagesType)
            reload = false;
          if (
            !L.$modal
              .find("#flickrLibraryModal")
              .hasClass("imageLibrary_live_" + liveUpdate)
          )
            reload = true;
          if (
            L.$modal.data("lastLibraryOrientation") !=
            uploadFile.libraryOrientation
          )
            reload = true;
          L.$modal.data("lastImagesType", uploadFile.imagesType);
          L.$modal.data(
            "lastLibraryOrientation",
            uploadFile.libraryOrientation
          );
        } else {
          L.$modal.data("lastImagesType", null);
        }
        var src =
          "/versions/" +
          versionNUM +
          "/wizard/imagesLibrary/pixabayV_beta_V4.php?w=" +
          websiteID +
          "&liveUpdate=" +
          liveUpdate;
        if (minlibraryWidth == "1200") {
          src += "&orientation=horizontal&min_width=1600&min_height=800";
        }
        if (reload) {
          L.$modal
            .find(".modal-body")
            .html(
              '<iframe id="flickrLibraryModal" class="libraryIframe imageLibrary_live_' +
                liveUpdate +
                '" src="' +
                src +
                '" style="width:100%;height:500px;margin:0;padding:0;border:none;"></iframe>'
            );
        }
      });
    };
    return E;
  })();
  function objectAssign(target, sources) {
    if (Object.assign) {
      sources = Object.assign(target, sources);
    } else {
      for (var prop in target)
        if (!sources.hasOwnProperty(prop)) sources[prop] = target[prop];
    }
    return sources;
  }
  function escapeHtml(text) {
    if (!text) return text;
    var map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.toString().replace(/[&<>"']/g, function (m) {
      return map[m];
    });
  }
  var Translation = {
    def: { imageLibrary: "Image Library", close: "Close" },
    init: function (translations) {
      var t = translations ? objectAssign(this.def, translations) : this.def;
      $.each(t, function (key, value) {
        t[key] = escapeHtml(value);
      });
      L.translate = t;
    },
  };
  return L;
})();
function _extends() {
  return (_extends =
    Object.assign ||
    function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
      }
      return t;
    }).apply(this, arguments);
}
function _typeof(t) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            "function" == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? "symbol"
            : typeof t;
        })(t);
}
!(function (t, e) {
  "object" ===
    ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
  "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.LazyLoad = e());
})(this, function () {
  "use strict";
  var t = "undefined" != typeof window,
    e =
      (t && !("onscroll" in window)) ||
      ("undefined" != typeof navigator &&
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
    n = t && "IntersectionObserver" in window,
    o = t && "classList" in document.createElement("p"),
    r = {
      elements_selector: "img",
      container: e || t ? document : null,
      threshold: 300,
      thresholds: null,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      data_bg: "bg",
      class_loading: "loading",
      class_loaded: "loaded",
      class_error: "error",
      load_delay: 0,
      auto_unobserve: !0,
      callback_enter: null,
      callback_exit: null,
      callback_reveal: null,
      callback_loaded: null,
      callback_error: null,
      callback_finish: null,
      use_native: !1,
    },
    a = function (t, e) {
      var n,
        o = new t(e);
      try {
        n = new CustomEvent("LazyLoad::Initialized", {
          detail: { instance: o },
        });
      } catch (t) {
        (n = document.createEvent("CustomEvent")).initCustomEvent(
          "LazyLoad::Initialized",
          !1,
          !1,
          { instance: o }
        );
      }
      window.dispatchEvent(n);
    };
  var i = function (t, e) {
      return t.getAttribute("data-" + e);
    },
    s = function (t, e, n) {
      var o = "data-" + e;
      null !== n ? t.setAttribute(o, n) : t.removeAttribute(o);
    },
    c = function (t) {
      return "true" === i(t, "was-processed");
    },
    l = function (t, e) {
      return s(t, "ll-timeout", e);
    },
    u = function (t) {
      return i(t, "ll-timeout");
    },
    d = function (t, e) {
      t && t(e);
    },
    f = function (t, e) {
      (t._loadingCount += e),
        0 === t._elements.length &&
          0 === t._loadingCount &&
          d(t._settings.callback_finish);
    },
    _ = function (t) {
      for (var e, n = [], o = 0; (e = t.children[o]); o += 1)
        "SOURCE" === e.tagName && n.push(e);
      return n;
    },
    v = function (t, e, n) {
      n && t.setAttribute(e, n);
    },
    g = function (t, e) {
      v(t, "sizes", i(t, e.data_sizes)),
        v(t, "srcset", i(t, e.data_srcset)),
        v(t, "src", i(t, e.data_src));
    },
    m = {
      IMG: function (t, e) {
        var n = t.parentNode;
        n &&
          "PICTURE" === n.tagName &&
          _(n).forEach(function (t) {
            g(t, e);
          });
        g(t, e);
      },
      IFRAME: function (t, e) {
        v(t, "src", i(t, e.data_src));
      },
      VIDEO: function (t, e) {
        _(t).forEach(function (t) {
          v(t, "src", i(t, e.data_src));
        }),
          v(t, "src", i(t, e.data_src)),
          t.load();
      },
    },
    b = function (t, e) {
      var n,
        o,
        r = e._settings,
        a = t.tagName,
        s = m[a];
      if (s)
        return (
          s(t, r),
          f(e, 1),
          void (e._elements =
            ((n = e._elements),
            (o = t),
            n.filter(function (t) {
              return t !== o;
            })))
        );
      !(function (t, e) {
        var n = i(t, e.data_src),
          o = i(t, e.data_bg);
        n && (t.style.backgroundImage = 'url("'.concat(n, '")')),
          o && (t.style.backgroundImage = o);
      })(t, r);
    },
    h = function (t, e) {
      o ? t.classList.add(e) : (t.className += (t.className ? " " : "") + e);
    },
    p = function (t, e, n) {
      t.addEventListener(e, n);
    },
    y = function (t, e, n) {
      t.removeEventListener(e, n);
    },
    E = function (t, e, n) {
      y(t, "load", e), y(t, "loadeddata", e), y(t, "error", n);
    },
    w = function (t, e, n) {
      var r = n._settings,
        a = e ? r.class_loaded : r.class_error,
        i = e ? r.callback_loaded : r.callback_error,
        s = t.target;
      !(function (t, e) {
        o
          ? t.classList.remove(e)
          : (t.className = t.className
              .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
              .replace(/^\s+/, "")
              .replace(/\s+$/, ""));
      })(s, r.class_loading),
        h(s, a),
        d(i, s),
        f(n, -1);
    },
    I = function (t, e) {
      var n = function n(r) {
          w(r, !0, e), E(t, n, o);
        },
        o = function o(r) {
          w(r, !1, e), E(t, n, o);
        };
      !(function (t, e, n) {
        p(t, "load", e), p(t, "loadeddata", e), p(t, "error", n);
      })(t, n, o);
    },
    k = ["IMG", "IFRAME", "VIDEO"],
    A = function (t, e) {
      var n = e._observer;
      z(t, e), n && e._settings.auto_unobserve && n.unobserve(t);
    },
    L = function (t) {
      var e = u(t);
      e && (clearTimeout(e), l(t, null));
    },
    x = function (t, e) {
      var n = e._settings.load_delay,
        o = u(t);
      o ||
        ((o = setTimeout(function () {
          A(t, e), L(t);
        }, n)),
        l(t, o));
    },
    z = function (t, e, n) {
      var o = e._settings;
      (!n && c(t)) ||
        (k.indexOf(t.tagName) > -1 && (I(t, e), h(t, o.class_loading)),
        b(t, e),
        (function (t) {
          s(t, "was-processed", "true");
        })(t),
        d(o.callback_reveal, t),
        d(o.callback_set, t));
    },
    O = function (t) {
      return (
        !!n &&
        ((t._observer = new IntersectionObserver(
          function (e) {
            e.forEach(function (e) {
              return (function (t) {
                return t.isIntersecting || t.intersectionRatio > 0;
              })(e)
                ? (function (t, e) {
                    var n = e._settings;
                    d(n.callback_enter, t), n.load_delay ? x(t, e) : A(t, e);
                  })(e.target, t)
                : (function (t, e) {
                    var n = e._settings;
                    d(n.callback_exit, t), n.load_delay && L(t);
                  })(e.target, t);
            });
          },
          {
            root: (e = t._settings).container === document ? null : e.container,
            rootMargin: e.thresholds || e.threshold + "px",
          }
        )),
        !0)
      );
      var e;
    },
    N = ["IMG", "IFRAME"],
    C = function (t, e) {
      return (function (t) {
        return t.filter(function (t) {
          return !c(t);
        });
      })(
        ((n =
          t ||
          (function (t) {
            return t.container.querySelectorAll(t.elements_selector);
          })(e)),
        Array.prototype.slice.call(n))
      );
      var n;
    },
    M = function (t, e) {
      (this._settings = (function (t) {
        return _extends({}, r, t);
      })(t)),
        (this._loadingCount = 0),
        O(this),
        this.update(e);
    };
  return (
    (M.prototype = {
      update: function (t) {
        var n,
          o = this,
          r = this._settings;
        ((this._elements = C(t, r)), !e && this._observer)
          ? ((function (t) {
              return t.use_native && "loading" in HTMLImageElement.prototype;
            })(r) &&
              ((n = this)._elements.forEach(function (t) {
                -1 !== N.indexOf(t.tagName) &&
                  (t.setAttribute("loading", "lazy"), z(t, n));
              }),
              (this._elements = C(t, r))),
            this._elements.forEach(function (t) {
              o._observer.observe(t);
            }))
          : this.loadAll();
      },
      destroy: function () {
        var t = this;
        this._observer &&
          (this._elements.forEach(function (e) {
            t._observer.unobserve(e);
          }),
          (this._observer = null)),
          (this._elements = null),
          (this._settings = null);
      },
      load: function (t, e) {
        z(t, this, e);
      },
      loadAll: function () {
        var t = this;
        this._elements.forEach(function (e) {
          A(e, t);
        });
      },
    }),
    t &&
      (function (t, e) {
        if (e)
          if (e.length) for (var n, o = 0; (n = e[o]); o += 1) a(t, n);
          else a(t, e);
      })(M, window.lazyLoadOptions),
    M
  );
});
var s123IconsPopup = (function () {
  var _ = {
    selectedItem: false,
    isLoading: false,
    uploadFile: null,
    categories: [],
    illustrationCategories: [],
    defFilters: [],
    query: "",
  };
  _.init = function (settings) {
    _.translations = settings.translations;
    _.$GLOBALS = settings.$GLOBALS;
    _.onIconChange = settings.onIconChange;
    loadDefData();
    _.$el = $(generateHtml());
  };
  _.show = function (inputID, library, filters) {
    if (!topWindow.uploadFiles[inputID]) return;
    filters = filters.split(",");
    if (filters.length == 1 && filters[0] == "auto") {
      filters = _.defFilters;
    } else {
      for (var i = 0; i < filters.length; i++) {
        filters[i] = _.defFilters.find(
          (defFilter) => filters[i] == defFilter.value
        );
      }
    }
    _.inputID = inputID;
    _.libraryType = library;
    _.$el.find(".modal-body").html(generateModalContent(filters));
    _.$el.one("show.bs.modal", function () {
      _.$itemsContainer = _.$el.find(
        ".s123-icons-svg-items-container .all-items"
      );
      _.$searchContainer = _.$el.find(".s123-icons-svg-search-container");
      _.$itemsFilterContainer = _.$el.find(".icon-filter-container");
      _.items = {};
      _.$el.find(".search").on("keydown", function (event) {
        var $this = $(this);
        var eventKey = event.which;
        if (_.query == $this.val()) return;
        _.$itemsFilterContainer
          .find(".style-filter")
          .siblings()
          .removeClass("active");
        _.$itemsFilterContainer
          .find(".style-filter")
          .first()
          .addClass("active");
        clearTimeout(this.searchLibraryInputFinished);
        if (eventKey == 13) {
          loadItems(
            $this.val(),
            _.$itemsFilterContainer.find(".style-filter").first().data("filter")
          );
        } else {
          this.searchLibraryInputFinished = setTimeout(function () {
            loadItems(
              $this.val(),
              _.$itemsFilterContainer
                .find(".style-filter")
                .first()
                .data("filter")
            );
          }, 1000);
        }
      });
      _.$itemsContainer.on(
        "click.save_icon",
        ".s123-icons-svg-item",
        function (event) {
          if (!_.items[$(this).get(0).id]) return;
          var url = _.items[$(this).get(0).id].icon_link;
          _.uploadFile = topWindow.uploadFiles[_.inputID];
          UpdateImagePreview(_.inputID, { normal: url, tiny: url });
          if (
            _.inputID != "siteLogo" &&
            _.libraryType != "illustrations_library"
          ) {
            var brandFlolder = "";
            if (url.indexOf("/brand-1/") != -1) {
              brandFlolder = "brand-1";
            }
            _.uploadFile.input
              .val(
                "site123-image-icon system-svg-icons " +
                  brandFlolder +
                  " " +
                  url.split("/").pop().replace(".svg", "")
              )
              .trigger("change");
          } else {
            $("#logoIconStyle").val(_.items[$(this).get(0).id].style);
            _.uploadFile.input.val(url).trigger("change");
          }
          if (_.onIconChange) _.onIconChange.call(this, _.inputID, url);
          _.hide();
          if (
            _.libraryType == "illustrations_library" &&
            !_.uploadFile.input.hasClass("promo-widget")
          ) {
            $("#active_illustration").val(_.items[$(this).get(0).id].uniqueID);
          }
          if (_.libraryType == "icon_library") {
            _.uploadFile.input.attr(
              "data-icon-style",
              _.items[$(this).get(0).id].style
            );
            _.uploadFile.settings.set(
              "icon",
              { style: _.items[$(this).get(0).id].style },
              true
            );
          }
        }
      );
      _.$itemsContainer.on("click", ".illustrations-credits", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var $thisCredit = $(this);
        var popoverContent = "";
        popoverContent += '<div class="form-group" style="margin-bottom:5px">';
        popoverContent += '<div class="popover-custom-title">';
        popoverContent += '<a class="popover-close">';
        popoverContent += '<i class="fa fa-times" aria-hidden="true"></i>';
        popoverContent += "</a>";
        popoverContent += "</div>";
        popoverContent +=
          "<div><b>" +
          translations.homepageRI.creditsPhotographerName +
          "</b> " +
          $thisCredit.data("name") +
          "</div>";
        popoverContent +=
          "<div><b>" +
          translations.homepageRI.creditsProvider +
          "</b> " +
          $thisCredit.data("provider");
        popoverContent += "<div>";
        popoverContent +=
          '<a target="_blank" href="' +
          $thisCredit.find("a").data("href") +
          '">' +
          translations.homepageRI.creditsSeeMoreDetails +
          "</a>";
        popoverContent += "</div>";
        popoverContent += "</div>";
        var $popoverContent = $(popoverContent);
        $popoverContent
          .find(".popover-close")
          .on("click.close_credits", function () {
            destroyPopover();
          });
        $thisCredit
          .popover({
            container: "#s123IconsPopup",
            content: $popoverContent,
            html: true,
            trigger: "manual",
            template:
              '<div class="popover r-i-popover-credits" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
            placement: ace.vars["touch"] ? "auto" : intrface_align_reverse,
          })
          .on("shown.bs.popover", function () {
            $(document).on(
              "mousedown.credits_destroy_popover",
              function (event) {
                if (
                  $(event.target).closest(".popover.r-i-popover-credits")
                    .length === 0
                ) {
                  destroyPopover();
                }
              }
            );
            $(window).one("blur.credits_destroy_popover", function (event) {
              destroyPopover();
            });
            _.$itemsContainer.one(
              "scroll.credits_destroy_popover",
              function (event) {
                destroyPopover();
              }
            );
          })
          .popover("show");
        function destroyPopover() {
          $thisCredit.removeClass("active");
          $thisCredit.popover("destroy");
          $(document).off("mousedown.credits_destroy_popover");
          $(window).off("blur.credits_destroy_popover");
          $(window).off("scroll.credits_destroy_popover");
        }
      });
      _.$itemsFilterContainer.on("click", ".style-filter", function (event) {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        loadItems(_.query, $(this).data("filter"));
      });
      _.$searchContainer
        .find(".searchStylesIconRemove")
        .on("click", function () {
          loadItems("", "");
          _.$el.find(".search").focus();
        });
      _.$el.find(".s123-icons-svg-cat-item").on("click", function () {
        _.$el.find(".search").val($(this).data("query"));
        _.$itemsFilterContainer
          .find(".style-filter")
          .siblings()
          .removeClass("active");
        _.$itemsFilterContainer
          .find(".style-filter")
          .first()
          .addClass("active");
        loadItems(
          $(this).data("query"),
          _.$itemsFilterContainer.find(".style-filter").first().data("filter")
        );
      });
      if (_.$itemsFilterContainer.find(".style-filter").length == 1) {
        _.$itemsFilterContainer.addClass("hidden");
      } else {
        _.$itemsFilterContainer.removeClass("hidden");
      }
      showByLibraryType();
    });
    _.$el.modal("show");
  };
  _.hide = function () {
    _.$el.modal("hide");
  };
  _.reset = function () {
    _.$searchContainer.find(".searchStylesIconRemove").hide();
    _.$searchContainer.find(".search").val("");
    if (_.libraryType == "illustrations_library") {
      loadItems("illustration_no_category", "");
    } else {
      showCategories();
    }
  };
  function generateHtml() {
    var html = "";
    html +=
      '<div id="s123IconsPopup" class="modal s123-modal fade bs-example-modal-lg s123-icons-svg-modal" tabindex="-1" role="dialog">';
    html += '<div class="modal-dialog modal-lg" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html +=
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    html +=
      '<h4 class="modal-title">' +
      escapeHtml(_.translations.modalTitle) +
      "</h4>";
    html += "</div>";
    html += '<div class="modal-body">';
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    return html;
  }
  function generateModalContent(filters) {
    var html = "";
    var categoryImageType = getCategoryImagesByActiveFilter(filters);
    html += '<div class="s123-icons-svg-search-container">';
    html += "<div>";
    html +=
      '<input type="text" maxlength="50" class="search form-control search-query" placeholder="' +
      escapeHtml(_.translations.searchIcons) +
      '">';
    html +=
      '<span class="fa fa-search form-control-feedback searchStylesIconDemo"></span>';
    html +=
      '<span class="fa fa-home searchStylesIconRemove" style="display: none;"></span>';
    html += "</div>";
    html += "</div>";
    html +=
      '<div class="s123-icons-svg-categories-container shown icons-categories">';
    for (var i = 0; i < _.categories.length; i++) {
      html +=
        '<div class="s123-icons-svg-cat-item" data-query="' +
        escapeHtml(_.categories[i].title) +
        '">';
      html += '<div class="s123-icons-svg-cat-icon">';
      html +=
        '<img src="' +
        escapeHtml(_.categories[i].src[categoryImageType]) +
        '">';
      html += "</div>";
      html +=
        '<span class="s123-icons-svg-cat-title">' +
        escapeHtml(_.categories[i].title) +
        "</span>";
      html += "</div>";
    }
    html += "</div>";
    html +=
      '<div class="s123-icons-svg-categories-container illustrations-categories">';
    for (var i = 0; i < _.illustrationCategories.length; i++) {
      html +=
        '<div class="s123-icons-svg-cat-item" data-query="' +
        escapeHtml(_.illustrationCategories[i].title) +
        '">';
      html += '<div class="s123-icons-svg-cat-icon">';
      html += '<img src="' + escapeHtml(_.illustrationCategories[i].src) + '">';
      html += "</div>";
      html +=
        '<span class="s123-icons-svg-cat-title">' +
        escapeHtml(_.illustrationCategories[i].title) +
        "</span>";
      html += "</div>";
    }
    html += "</div>";
    html +=
      '<div class="s123-icons-svg-items-container" style="display: none;">';
    html += '<div class="icon-filter-container">';
    html += '<div class="s123-icons-filters">';
    $.each(filters, function (index, filter) {
      html +=
        '<div class="style-filter" data-filter="' +
        filter.value +
        '">' +
        filter.title +
        "</div>";
    });
    html += "</div>";
    html += "</div>";
    html += '<div class="all-items fancy-scrollbar"></div>';
    html += "</div>";
    html +=
      '<div class="s123-icons-svg-no-items-container" style="display: none;">';
    html += "<h1>" + _.translations.noItems + "</h1>";
    html += "</div>";
    return html;
  }
  function getItemHtml(item) {
    var html = "";
    var ext = item.icon_link.split(".").pop();
    var image =
      ext === "mp4"
        ? item.icon_link
            .replace("." + ext, "-thumbnail.jpg")
            .replace("normal_", "400_")
        : item.icon_link;
    var type = ext === "mp4" ? "video" : "image";
    var illustration_class =
      _.libraryType == "illustrations_library" ? "illustration-img" : "";
    if (type == "image" && ext != "svg") {
      image = image.replace("normal_", "400_");
      illustration_class += " not-svg-illlustration";
    }
    html +=
      '<div id="' +
      item.uniqueID +
      '" class="s123-icons-svg-item ' +
      illustration_class +
      '" data-media-type="' +
      type +
      '">';
    html += '<img src="' + image + '">';
    if (item.media_info && _.libraryType == "illustrations_library") {
      html += generatePhotoCredits(item.media_info, item.provider);
    }
    html += "</div>";
    return html;
  }
  function generatePhotoCredits(info, provider) {
    var html = "";
    if (info) {
      var credit = tryParseJSON(info);
      if (!credit["photoInfo"]) return "";
      credit = credit["photoInfo"];
      html +=
        '<div class="illustrations-credits" data-name="' +
        credit["photographer"] +
        '" data-provider="' +
        provider +
        '">';
      html += '<a data-href="' + credit["profileLink"] + '">';
      if ($("html").data("device") == "computer") {
        html += credit["photographer"];
      } else {
        html += '<i class="fa fa-info-circle" aria-hidden="true"></i>';
      }
      html += "</a>";
      html += "</div>";
    }
    return html;
  }
  function loadItems(query, filter) {
    if (
      query.length == 0 &&
      query != "illustration_no_category" &&
      filter.length == 0
    ) {
      _.reset();
      return;
    }
    if (query == "illustration_no_category") {
      query = "";
    }
    if (_.isLoading) return;
    _.isLoading = true;
    _.$itemsContainer.empty();
    _.$searchContainer.find(".searchStylesIconRemove").show();
    _.$el.find(".s123-icons-svg-categories-container").removeClass("shown");
    _.$el.find(".s123-icons-svg-items-container").show();
    _.$el.find(".s123-icons-svg-no-items-container").hide();
    _.query = query;
    if (_.s123InfiniteScroll) _.s123InfiniteScroll.destroy();
    var type =
      _.libraryType == "illustrations_library" ? "illustrations" : "icons";
    _.s123InfiniteScroll = new s123InfiniteScroll({
      isMobile: false, // we don't want to add "load more button" but we have other tools that do need that feature
      $container: _.$itemsContainer,
      ajax: {
        type: "POST",
        url: "/files/vendor/s123IconsPopup/getIcons.php",
        data: {
          w: topWindow.websiteID,
          q: query,
          limit: 50,
          type: type,
          siteLogo: _.inputID == "siteLogo",
          filter: filter,
        },
        buildItemCallback: function (index, item) {
          var $item = $(getItemHtml(item));
          $item.find("img").one("load", function () {
            $item.addClass("loaded");
          });
          _.$itemsContainer.append($item);
          _.items[item.uniqueID] = item;
        },
        success: function (data) {
          _.$el.find(".wizard-pagination").removeClass("full-size");
          _.$searchContainer.show();
          _.isLoading = false;
          if (
            data.items.length == 0 &&
            _.$itemsContainer.children(".s123-icons-svg-item").length === 0
          ) {
            _.$el.find(".s123-icons-svg-items-container").hide();
            _.$el.find(".s123-icons-svg-no-items-container").show();
          }
        },
      },
    });
    _.$el.find(".wizard-pagination").addClass("full-size");
    _.$el.find(".loading-icon i").removeClass("fa-2x").addClass("blue fa-4x");
  }
  function showCategories() {
    showByLibraryType();
    _.$el.find(".s123-icons-svg-items-container").hide();
    _.$el.find(".s123-icons-svg-no-items-container").hide();
  }
  function showByLibraryType() {
    if (_.libraryType == "illustrations_library") {
      _.$el.find(".icons-categories").removeClass("shown");
      _.$itemsFilterContainer.hide();
      _.$itemsContainer.addClass("full");
      loadItems("illustration_no_category", "");
      _.$el.find(".s123-icons-svg-items-container").show();
    } else {
      _.$itemsContainer.removeClass("full");
      _.$itemsFilterContainer.show();
      _.$el.find(".icons-categories").addClass("shown");
      _.$el.find(".s123-icons-svg-items-container").hide();
      _.$searchContainer.find(".search").val("");
    }
  }
  function loadDefData() {
    _.categories = [
      {
        title: _.translations.categories.men,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/men_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/men.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.women,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/women_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/women.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.cities,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/cities_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/cities.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.music,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/music_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/music.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.foodAndDrink,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/foodAndDrink_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/foodAndDrink.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.business,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/business_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/business.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.sports,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/sports_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/sports.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.animals,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/animals_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/animals.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.nature,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/nature_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/nature.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.architecture,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/architecture_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/architecture.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.party,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/party_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/party.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.artsAndCulture,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/artsAndCulture_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/artsAndCulture.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.building,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/building_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/building.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.health,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/health_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/health.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.people,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/people_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/people.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.shopping,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/shopping_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/shopping.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.travel,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/travel_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/travel.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
      {
        title: _.translations.categories.wallpapers,
        src: {
          color:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/wallpapers_color.svg?v=" +
            _.$GLOBALS["v-cache"],
          glyph:
            _.$GLOBALS["cdn-system-files"] +
            "/files/vendor/s123IconsPopup/categoryIcons/wallpapers.svg?v=" +
            _.$GLOBALS["v-cache"],
        },
      },
    ];
    _.illustrationCategories = [
      {
        title: _.translations.categories.men,
        src:
          _.$GLOBALS["cdn-system-files"] +
          "/files/vendor/s123IconsPopup/categoryIcons/men.svg?v=" +
          _.$GLOBALS["v-cache"],
      },
    ];
    _.defFilters = [
      { title: _.translations.filter.all, value: "" },
      { title: _.translations.filter.outline, value: "outline" },
      { title: _.translations.filter.colored, value: "colored" },
      { title: _.translations.filter.glyph, value: "glyph" },
    ];
  }
  function getCategoryImagesByActiveFilter(filters) {
    if (filters.length == 1 && filters[0].value == "glyph") return "glyph";
    return "color";
  }
  return _;
})();
// TinyColor v1.4.2
// https://github.com/bgrins/TinyColor
// 2020-09-25, Brian Grinstead, MIT License
!(function (a) {
  function b(a, d) {
    if (((a = a ? a : ""), (d = d || {}), a instanceof b)) return a;
    if (!(this instanceof b)) return new b(a, d);
    var e = c(a);
    (this._originalInput = a),
      (this._r = e.r),
      (this._g = e.g),
      (this._b = e.b),
      (this._a = e.a),
      (this._roundA = P(100 * this._a) / 100),
      (this._format = d.format || e.format),
      (this._gradientType = d.gradientType),
      this._r < 1 && (this._r = P(this._r)),
      this._g < 1 && (this._g = P(this._g)),
      this._b < 1 && (this._b = P(this._b)),
      (this._ok = e.ok),
      (this._tc_id = O++);
  }
  function c(a) {
    var b = { r: 0, g: 0, b: 0 },
      c = 1,
      e = null,
      g = null,
      i = null,
      j = !1,
      k = !1;
    return (
      "string" == typeof a && (a = K(a)),
      "object" == typeof a &&
        (J(a.r) && J(a.g) && J(a.b)
          ? ((b = d(a.r, a.g, a.b)),
            (j = !0),
            (k = "%" === String(a.r).substr(-1) ? "prgb" : "rgb"))
          : J(a.h) && J(a.s) && J(a.v)
          ? ((e = G(a.s)),
            (g = G(a.v)),
            (b = h(a.h, e, g)),
            (j = !0),
            (k = "hsv"))
          : J(a.h) &&
            J(a.s) &&
            J(a.l) &&
            ((e = G(a.s)),
            (i = G(a.l)),
            (b = f(a.h, e, i)),
            (j = !0),
            (k = "hsl")),
        a.hasOwnProperty("a") && (c = a.a)),
      (c = z(c)),
      {
        ok: j,
        format: a.format || k,
        r: Q(255, R(b.r, 0)),
        g: Q(255, R(b.g, 0)),
        b: Q(255, R(b.b, 0)),
        a: c,
      }
    );
  }
  function d(a, b, c) {
    return { r: 255 * A(a, 255), g: 255 * A(b, 255), b: 255 * A(c, 255) };
  }
  function e(a, b, c) {
    (a = A(a, 255)), (b = A(b, 255)), (c = A(c, 255));
    var d,
      e,
      f = R(a, b, c),
      g = Q(a, b, c),
      h = (f + g) / 2;
    if (f == g) d = e = 0;
    else {
      var i = f - g;
      switch (((e = h > 0.5 ? i / (2 - f - g) : i / (f + g)), f)) {
        case a:
          d = (b - c) / i + (c > b ? 6 : 0);
          break;
        case b:
          d = (c - a) / i + 2;
          break;
        case c:
          d = (a - b) / i + 4;
      }
      d /= 6;
    }
    return { h: d, s: e, l: h };
  }
  function f(a, b, c) {
    function d(a, b, c) {
      return (
        0 > c && (c += 1),
        c > 1 && (c -= 1),
        1 / 6 > c
          ? a + 6 * (b - a) * c
          : 0.5 > c
          ? b
          : 2 / 3 > c
          ? a + (b - a) * (2 / 3 - c) * 6
          : a
      );
    }
    var e, f, g;
    if (((a = A(a, 360)), (b = A(b, 100)), (c = A(c, 100)), 0 === b))
      e = f = g = c;
    else {
      var h = 0.5 > c ? c * (1 + b) : c + b - c * b,
        i = 2 * c - h;
      (e = d(i, h, a + 1 / 3)), (f = d(i, h, a)), (g = d(i, h, a - 1 / 3));
    }
    return { r: 255 * e, g: 255 * f, b: 255 * g };
  }
  function g(a, b, c) {
    (a = A(a, 255)), (b = A(b, 255)), (c = A(c, 255));
    var d,
      e,
      f = R(a, b, c),
      g = Q(a, b, c),
      h = f,
      i = f - g;
    if (((e = 0 === f ? 0 : i / f), f == g)) d = 0;
    else {
      switch (f) {
        case a:
          d = (b - c) / i + (c > b ? 6 : 0);
          break;
        case b:
          d = (c - a) / i + 2;
          break;
        case c:
          d = (a - b) / i + 4;
      }
      d /= 6;
    }
    return { h: d, s: e, v: h };
  }
  function h(b, c, d) {
    (b = 6 * A(b, 360)), (c = A(c, 100)), (d = A(d, 100));
    var e = a.floor(b),
      f = b - e,
      g = d * (1 - c),
      h = d * (1 - f * c),
      i = d * (1 - (1 - f) * c),
      j = e % 6,
      k = [d, h, g, g, i, d][j],
      l = [i, d, d, h, g, g][j],
      m = [g, g, i, d, d, h][j];
    return { r: 255 * k, g: 255 * l, b: 255 * m };
  }
  function i(a, b, c, d) {
    var e = [F(P(a).toString(16)), F(P(b).toString(16)), F(P(c).toString(16))];
    return d &&
      e[0].charAt(0) == e[0].charAt(1) &&
      e[1].charAt(0) == e[1].charAt(1) &&
      e[2].charAt(0) == e[2].charAt(1)
      ? e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0)
      : e.join("");
  }
  function j(a, b, c, d, e) {
    var f = [
      F(P(a).toString(16)),
      F(P(b).toString(16)),
      F(P(c).toString(16)),
      F(H(d)),
    ];
    return e &&
      f[0].charAt(0) == f[0].charAt(1) &&
      f[1].charAt(0) == f[1].charAt(1) &&
      f[2].charAt(0) == f[2].charAt(1) &&
      f[3].charAt(0) == f[3].charAt(1)
      ? f[0].charAt(0) + f[1].charAt(0) + f[2].charAt(0) + f[3].charAt(0)
      : f.join("");
  }
  function k(a, b, c, d) {
    var e = [
      F(H(d)),
      F(P(a).toString(16)),
      F(P(b).toString(16)),
      F(P(c).toString(16)),
    ];
    return e.join("");
  }
  function l(a, c) {
    c = 0 === c ? 0 : c || 10;
    var d = b(a).toHsl();
    return (d.s -= c / 100), (d.s = B(d.s)), b(d);
  }
  function m(a, c) {
    c = 0 === c ? 0 : c || 10;
    var d = b(a).toHsl();
    return (d.s += c / 100), (d.s = B(d.s)), b(d);
  }
  function n(a) {
    return b(a).desaturate(100);
  }
  function o(a, c) {
    c = 0 === c ? 0 : c || 10;
    var d = b(a).toHsl();
    return (d.l += c / 100), (d.l = B(d.l)), b(d);
  }
  function p(a, c) {
    c = 0 === c ? 0 : c || 10;
    var d = b(a).toRgb();
    return (
      (d.r = R(0, Q(255, d.r - P(255 * -(c / 100))))),
      (d.g = R(0, Q(255, d.g - P(255 * -(c / 100))))),
      (d.b = R(0, Q(255, d.b - P(255 * -(c / 100))))),
      b(d)
    );
  }
  function q(a, c) {
    c = 0 === c ? 0 : c || 10;
    var d = b(a).toHsl();
    return (d.l -= c / 100), (d.l = B(d.l)), b(d);
  }
  function r(a, c) {
    var d = b(a).toHsl(),
      e = (d.h + c) % 360;
    return (d.h = 0 > e ? 360 + e : e), b(d);
  }
  function s(a) {
    var c = b(a).toHsl();
    return (c.h = (c.h + 180) % 360), b(c);
  }
  function t(a) {
    var c = b(a).toHsl(),
      d = c.h;
    return [
      b(a),
      b({ h: (d + 120) % 360, s: c.s, l: c.l }),
      b({ h: (d + 240) % 360, s: c.s, l: c.l }),
    ];
  }
  function u(a) {
    var c = b(a).toHsl(),
      d = c.h;
    return [
      b(a),
      b({ h: (d + 90) % 360, s: c.s, l: c.l }),
      b({ h: (d + 180) % 360, s: c.s, l: c.l }),
      b({ h: (d + 270) % 360, s: c.s, l: c.l }),
    ];
  }
  function v(a) {
    var c = b(a).toHsl(),
      d = c.h;
    return [
      b(a),
      b({ h: (d + 72) % 360, s: c.s, l: c.l }),
      b({ h: (d + 216) % 360, s: c.s, l: c.l }),
    ];
  }
  function w(a, c, d) {
    (c = c || 6), (d = d || 30);
    var e = b(a).toHsl(),
      f = 360 / d,
      g = [b(a)];
    for (e.h = (e.h - ((f * c) >> 1) + 720) % 360; --c; )
      (e.h = (e.h + f) % 360), g.push(b(e));
    return g;
  }
  function x(a, c) {
    c = c || 6;
    for (
      var d = b(a).toHsv(), e = d.h, f = d.s, g = d.v, h = [], i = 1 / c;
      c--;

    )
      h.push(b({ h: e, s: f, v: g })), (g = (g + i) % 1);
    return h;
  }
  function y(a) {
    var b = {};
    for (var c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
    return b;
  }
  function z(a) {
    return (a = parseFloat(a)), (isNaN(a) || 0 > a || a > 1) && (a = 1), a;
  }
  function A(b, c) {
    D(b) && (b = "100%");
    var d = E(b);
    return (
      (b = Q(c, R(0, parseFloat(b)))),
      d && (b = parseInt(b * c, 10) / 100),
      a.abs(b - c) < 1e-6 ? 1 : (b % c) / parseFloat(c)
    );
  }
  function B(a) {
    return Q(1, R(0, a));
  }
  function C(a) {
    return parseInt(a, 16);
  }
  function D(a) {
    return "string" == typeof a && -1 != a.indexOf(".") && 1 === parseFloat(a);
  }
  function E(a) {
    return "string" == typeof a && -1 != a.indexOf("%");
  }
  function F(a) {
    return 1 == a.length ? "0" + a : "" + a;
  }
  function G(a) {
    return 1 >= a && (a = 100 * a + "%"), a;
  }
  function H(b) {
    return a.round(255 * parseFloat(b)).toString(16);
  }
  function I(a) {
    return C(a) / 255;
  }
  function J(a) {
    return !!V.CSS_UNIT.exec(a);
  }
  function K(a) {
    a = a.replace(M, "").replace(N, "").toLowerCase();
    var b = !1;
    if (T[a]) (a = T[a]), (b = !0);
    else if ("transparent" == a)
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    var c;
    return (c = V.rgb.exec(a))
      ? { r: c[1], g: c[2], b: c[3] }
      : (c = V.rgba.exec(a))
      ? { r: c[1], g: c[2], b: c[3], a: c[4] }
      : (c = V.hsl.exec(a))
      ? { h: c[1], s: c[2], l: c[3] }
      : (c = V.hsla.exec(a))
      ? { h: c[1], s: c[2], l: c[3], a: c[4] }
      : (c = V.hsv.exec(a))
      ? { h: c[1], s: c[2], v: c[3] }
      : (c = V.hsva.exec(a))
      ? { h: c[1], s: c[2], v: c[3], a: c[4] }
      : (c = V.hex8.exec(a))
      ? {
          r: C(c[1]),
          g: C(c[2]),
          b: C(c[3]),
          a: I(c[4]),
          format: b ? "name" : "hex8",
        }
      : (c = V.hex6.exec(a))
      ? { r: C(c[1]), g: C(c[2]), b: C(c[3]), format: b ? "name" : "hex" }
      : (c = V.hex4.exec(a))
      ? {
          r: C(c[1] + "" + c[1]),
          g: C(c[2] + "" + c[2]),
          b: C(c[3] + "" + c[3]),
          a: I(c[4] + "" + c[4]),
          format: b ? "name" : "hex8",
        }
      : (c = V.hex3.exec(a))
      ? {
          r: C(c[1] + "" + c[1]),
          g: C(c[2] + "" + c[2]),
          b: C(c[3] + "" + c[3]),
          format: b ? "name" : "hex",
        }
      : !1;
  }
  function L(a) {
    var b, c;
    return (
      (a = a || { level: "AA", size: "small" }),
      (b = (a.level || "AA").toUpperCase()),
      (c = (a.size || "small").toLowerCase()),
      "AA" !== b && "AAA" !== b && (b = "AA"),
      "small" !== c && "large" !== c && (c = "small"),
      { level: b, size: c }
    );
  }
  var M = /^\s+/,
    N = /\s+$/,
    O = 0,
    P = a.round,
    Q = a.min,
    R = a.max,
    S = a.random;
  (b.prototype = {
    isDark: function () {
      return this.getBrightness() < 128;
    },
    isLight: function () {
      return !this.isDark();
    },
    isValid: function () {
      return this._ok;
    },
    getOriginalInput: function () {
      return this._originalInput;
    },
    getFormat: function () {
      return this._format;
    },
    getAlpha: function () {
      return this._a;
    },
    getBrightness: function () {
      var a = this.toRgb();
      return (299 * a.r + 587 * a.g + 114 * a.b) / 1e3;
    },
    getLuminance: function () {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = this.toRgb();
      return (
        (b = h.r / 255),
        (c = h.g / 255),
        (d = h.b / 255),
        (e = 0.03928 >= b ? b / 12.92 : a.pow((b + 0.055) / 1.055, 2.4)),
        (f = 0.03928 >= c ? c / 12.92 : a.pow((c + 0.055) / 1.055, 2.4)),
        (g = 0.03928 >= d ? d / 12.92 : a.pow((d + 0.055) / 1.055, 2.4)),
        0.2126 * e + 0.7152 * f + 0.0722 * g
      );
    },
    setAlpha: function (a) {
      return (this._a = z(a)), (this._roundA = P(100 * this._a) / 100), this;
    },
    toHsv: function () {
      var a = g(this._r, this._g, this._b);
      return { h: 360 * a.h, s: a.s, v: a.v, a: this._a };
    },
    toHsvString: function () {
      var a = g(this._r, this._g, this._b),
        b = P(360 * a.h),
        c = P(100 * a.s),
        d = P(100 * a.v);
      return 1 == this._a
        ? "hsv(" + b + ", " + c + "%, " + d + "%)"
        : "hsva(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")";
    },
    toHsl: function () {
      var a = e(this._r, this._g, this._b);
      return { h: 360 * a.h, s: a.s, l: a.l, a: this._a };
    },
    toHslString: function () {
      var a = e(this._r, this._g, this._b),
        b = P(360 * a.h),
        c = P(100 * a.s),
        d = P(100 * a.l);
      return 1 == this._a
        ? "hsl(" + b + ", " + c + "%, " + d + "%)"
        : "hsla(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")";
    },
    toHex: function (a) {
      return i(this._r, this._g, this._b, a);
    },
    toHexString: function (a) {
      return "#" + this.toHex(a);
    },
    toHex8: function (a) {
      return j(this._r, this._g, this._b, this._a, a);
    },
    toHex8String: function (a) {
      return "#" + this.toHex8(a);
    },
    toRgb: function () {
      return { r: P(this._r), g: P(this._g), b: P(this._b), a: this._a };
    },
    toRgbString: function () {
      return 1 == this._a
        ? "rgb(" + P(this._r) + ", " + P(this._g) + ", " + P(this._b) + ")"
        : "rgba(" +
            P(this._r) +
            ", " +
            P(this._g) +
            ", " +
            P(this._b) +
            ", " +
            this._roundA +
            ")";
    },
    toPercentageRgb: function () {
      return {
        r: P(100 * A(this._r, 255)) + "%",
        g: P(100 * A(this._g, 255)) + "%",
        b: P(100 * A(this._b, 255)) + "%",
        a: this._a,
      };
    },
    toPercentageRgbString: function () {
      return 1 == this._a
        ? "rgb(" +
            P(100 * A(this._r, 255)) +
            "%, " +
            P(100 * A(this._g, 255)) +
            "%, " +
            P(100 * A(this._b, 255)) +
            "%)"
        : "rgba(" +
            P(100 * A(this._r, 255)) +
            "%, " +
            P(100 * A(this._g, 255)) +
            "%, " +
            P(100 * A(this._b, 255)) +
            "%, " +
            this._roundA +
            ")";
    },
    toName: function () {
      return 0 === this._a
        ? "transparent"
        : this._a < 1
        ? !1
        : U[i(this._r, this._g, this._b, !0)] || !1;
    },
    toFilter: function (a) {
      var c = "#" + k(this._r, this._g, this._b, this._a),
        d = c,
        e = this._gradientType ? "GradientType = 1, " : "";
      if (a) {
        var f = b(a);
        d = "#" + k(f._r, f._g, f._b, f._a);
      }
      return (
        "progid:DXImageTransform.Microsoft.gradient(" +
        e +
        "startColorstr=" +
        c +
        ",endColorstr=" +
        d +
        ")"
      );
    },
    toString: function (a) {
      var b = !!a;
      a = a || this._format;
      var c = !1,
        d = this._a < 1 && this._a >= 0,
        e =
          !b &&
          d &&
          ("hex" === a ||
            "hex6" === a ||
            "hex3" === a ||
            "hex4" === a ||
            "hex8" === a ||
            "name" === a);
      return e
        ? "name" === a && 0 === this._a
          ? this.toName()
          : this.toRgbString()
        : ("rgb" === a && (c = this.toRgbString()),
          "prgb" === a && (c = this.toPercentageRgbString()),
          ("hex" === a || "hex6" === a) && (c = this.toHexString()),
          "hex3" === a && (c = this.toHexString(!0)),
          "hex4" === a && (c = this.toHex8String(!0)),
          "hex8" === a && (c = this.toHex8String()),
          "name" === a && (c = this.toName()),
          "hsl" === a && (c = this.toHslString()),
          "hsv" === a && (c = this.toHsvString()),
          c || this.toHexString());
    },
    clone: function () {
      return b(this.toString());
    },
    _applyModification: function (a, b) {
      var c = a.apply(null, [this].concat([].slice.call(b)));
      return (
        (this._r = c._r),
        (this._g = c._g),
        (this._b = c._b),
        this.setAlpha(c._a),
        this
      );
    },
    lighten: function () {
      return this._applyModification(o, arguments);
    },
    brighten: function () {
      return this._applyModification(p, arguments);
    },
    darken: function () {
      return this._applyModification(q, arguments);
    },
    desaturate: function () {
      return this._applyModification(l, arguments);
    },
    saturate: function () {
      return this._applyModification(m, arguments);
    },
    greyscale: function () {
      return this._applyModification(n, arguments);
    },
    spin: function () {
      return this._applyModification(r, arguments);
    },
    _applyCombination: function (a, b) {
      return a.apply(null, [this].concat([].slice.call(b)));
    },
    analogous: function () {
      return this._applyCombination(w, arguments);
    },
    complement: function () {
      return this._applyCombination(s, arguments);
    },
    monochromatic: function () {
      return this._applyCombination(x, arguments);
    },
    splitcomplement: function () {
      return this._applyCombination(v, arguments);
    },
    triad: function () {
      return this._applyCombination(t, arguments);
    },
    tetrad: function () {
      return this._applyCombination(u, arguments);
    },
  }),
    (b.fromRatio = function (a, c) {
      if ("object" == typeof a) {
        var d = {};
        for (var e in a)
          a.hasOwnProperty(e) && ("a" === e ? (d[e] = a[e]) : (d[e] = G(a[e])));
        a = d;
      }
      return b(a, c);
    }),
    (b.equals = function (a, c) {
      return a && c ? b(a).toRgbString() == b(c).toRgbString() : !1;
    }),
    (b.random = function () {
      return b.fromRatio({ r: S(), g: S(), b: S() });
    }),
    (b.mix = function (a, c, d) {
      d = 0 === d ? 0 : d || 50;
      var e = b(a).toRgb(),
        f = b(c).toRgb(),
        g = d / 100,
        h = {
          r: (f.r - e.r) * g + e.r,
          g: (f.g - e.g) * g + e.g,
          b: (f.b - e.b) * g + e.b,
          a: (f.a - e.a) * g + e.a,
        };
      return b(h);
    }),
    (b.readability = function (c, d) {
      var e = b(c),
        f = b(d);
      return (
        (a.max(e.getLuminance(), f.getLuminance()) + 0.05) /
        (a.min(e.getLuminance(), f.getLuminance()) + 0.05)
      );
    }),
    (b.isReadable = function (a, c, d) {
      var e,
        f,
        g = b.readability(a, c);
      switch (((f = !1), (e = L(d)), e.level + e.size)) {
        case "AAsmall":
        case "AAAlarge":
          f = g >= 4.5;
          break;
        case "AAlarge":
          f = g >= 3;
          break;
        case "AAAsmall":
          f = g >= 7;
      }
      return f;
    }),
    (b.mostReadable = function (a, c, d) {
      var e,
        f,
        g,
        h,
        i = null,
        j = 0;
      (d = d || {}), (f = d.includeFallbackColors), (g = d.level), (h = d.size);
      for (var k = 0; k < c.length; k++)
        (e = b.readability(a, c[k])), e > j && ((j = e), (i = b(c[k])));
      return b.isReadable(a, i, { level: g, size: h }) || !f
        ? i
        : ((d.includeFallbackColors = !1),
          b.mostReadable(a, ["#fff", "#000"], d));
    });
  var T = (b.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32",
    }),
    U = (b.hexNames = y(T)),
    V = (function () {
      var a = "[-\\+]?\\d+%?",
        b = "[-\\+]?\\d*\\.\\d+%?",
        c = "(?:" + b + ")|(?:" + a + ")",
        d =
          "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?",
        e =
          "[\\s|\\(]+(" +
          c +
          ")[,|\\s]+(" +
          c +
          ")[,|\\s]+(" +
          c +
          ")[,|\\s]+(" +
          c +
          ")\\s*\\)?";
      return {
        CSS_UNIT: new RegExp(c),
        rgb: new RegExp("rgb" + d),
        rgba: new RegExp("rgba" + e),
        hsl: new RegExp("hsl" + d),
        hsla: new RegExp("hsla" + e),
        hsv: new RegExp("hsv" + d),
        hsva: new RegExp("hsva" + e),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      };
    })();
  "undefined" != typeof module && module.exports
    ? (module.exports = b)
    : "function" == typeof define && define.amd
    ? define(function () {
        return b;
      })
    : (window.tinycolor = b);
})(Math);
