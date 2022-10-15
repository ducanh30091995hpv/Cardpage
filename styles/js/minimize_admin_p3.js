(function(d){if("function"===typeof define&&define.amd)define(["jquery","moment"],d);else if("object"===typeof exports)module.exports=d(require("jquery"),require("moment"));else{if("undefined"===typeof jQuery)throw"bootstrap-datetimepicker requires jQuery to be loaded first";if("undefined"===typeof moment)throw"bootstrap-datetimepicker requires Moment.js to be loaded first";d(jQuery,moment)}})(function(d,z){if(!z)throw Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var sa=
function(g,b){var e={},C=!0,r=!1,h=!1,D,F=0,x,J,B,O=[{clsName:"days",navFnc:"M",navStep:1},{clsName:"months",navFnc:"y",navStep:1},{clsName:"years",navFnc:"y",navStep:10},{clsName:"decades",navFnc:"y",navStep:100}],V=["days","months","years","decades"],Z=["top","bottom","auto"],aa=["left","right","auto"],ba=["default","top","bottom"],ca={up:38,38:"up",down:40,40:"down",left:37,37:"left",right:39,39:"right",tab:9,9:"tab",escape:27,27:"escape",enter:13,13:"enter",pageUp:33,33:"pageUp",pageDown:34,34:"pageDown",
shift:16,16:"shift",control:17,17:"control",space:32,32:"space",t:84,84:"t","delete":46,46:"delete"},P={},W=function(){return void 0!==z.tz&&void 0!==b.timeZone&&null!==b.timeZone&&""!==b.timeZone},E=function(a){a=void 0===a||null===a?z():z.isDate(a)||z.isMoment(a)?z(a):W()?z.tz(a,J,b.useStrict,b.timeZone):z(a,J,b.useStrict);W()&&a.tz(b.timeZone);return a},y=function(a){if("string"!==typeof a||1<a.length)throw new TypeError("isEnabled expects a single character string parameter");switch(a){case "y":return-1!==
x.indexOf("Y");case "M":return-1!==x.indexOf("M");case "d":return-1!==x.toLowerCase().indexOf("d");case "h":case "H":return-1!==x.toLowerCase().indexOf("h");case "m":return-1!==x.indexOf("m");case "s":return-1!==x.indexOf("s");default:return!1}},Q=function(){return y("h")||y("m")||y("s")},R=function(){return y("y")||y("M")||y("d")},ka=function(){var a=d("<thead>").append(d("<tr>").append(d("<th>").addClass("prev").attr("data-action","previous").append(d("<span>").addClass(b.icons.previous))).append(d("<th>").addClass("picker-switch").attr("data-action",
"pickerSwitch").attr("colspan",b.calendarWeeks?"6":"5")).append(d("<th>").addClass("next").attr("data-action","next").append(d("<span>").addClass(b.icons.next)))),c=d("<tbody>").append(d("<tr>").append(d("<td>").attr("colspan",b.calendarWeeks?"8":"7")));return[d("<div>").addClass("datepicker-days").append(d("<table>").addClass("table-condensed").append(a).append(d("<tbody>"))),d("<div>").addClass("datepicker-months").append(d("<table>").addClass("table-condensed").append(a.clone()).append(c.clone())),
d("<div>").addClass("datepicker-years").append(d("<table>").addClass("table-condensed").append(a.clone()).append(c.clone())),d("<div>").addClass("datepicker-decades").append(d("<table>").addClass("table-condensed").append(a.clone()).append(c.clone()))]},la=function(){var a=d("<div>").addClass("timepicker-hours").append(d("<table>").addClass("table-condensed")),c=d("<div>").addClass("timepicker-minutes").append(d("<table>").addClass("table-condensed")),f=d("<div>").addClass("timepicker-seconds").append(d("<table>").addClass("table-condensed")),
k=d("<tr>"),l=d("<tr>"),t=d("<tr>");y("h")&&(k.append(d("<td>").append(d("<a>").attr({href:"#",tabindex:"-1",title:b.tooltips.incrementHour}).addClass("btn").attr("data-action","incrementHours").append(d("<span>").addClass(b.icons.up)))),l.append(d("<td>").append(d("<span>").addClass("timepicker-hour").attr({"data-time-component":"hours",title:b.tooltips.pickHour}).attr("data-action","showHours"))),t.append(d("<td>").append(d("<a>").attr({href:"#",tabindex:"-1",title:b.tooltips.decrementHour}).addClass("btn").attr("data-action",
"decrementHours").append(d("<span>").addClass(b.icons.down)))));y("m")&&(y("h")&&(k.append(d("<td>").addClass("separator")),l.append(d("<td>").addClass("separator").html(":")),t.append(d("<td>").addClass("separator"))),k.append(d("<td>").append(d("<a>").attr({href:"#",tabindex:"-1",title:b.tooltips.incrementMinute}).addClass("btn").attr("data-action","incrementMinutes").append(d("<span>").addClass(b.icons.up)))),l.append(d("<td>").append(d("<span>").addClass("timepicker-minute").attr({"data-time-component":"minutes",
title:b.tooltips.pickMinute}).attr("data-action","showMinutes"))),t.append(d("<td>").append(d("<a>").attr({href:"#",tabindex:"-1",title:b.tooltips.decrementMinute}).addClass("btn").attr("data-action","decrementMinutes").append(d("<span>").addClass(b.icons.down)))));y("s")&&(y("m")&&(k.append(d("<td>").addClass("separator")),l.append(d("<td>").addClass("separator").html(":")),t.append(d("<td>").addClass("separator"))),k.append(d("<td>").append(d("<a>").attr({href:"#",tabindex:"-1",title:b.tooltips.incrementSecond}).addClass("btn").attr("data-action",
"incrementSeconds").append(d("<span>").addClass(b.icons.up)))),l.append(d("<td>").append(d("<span>").addClass("timepicker-second").attr({"data-time-component":"seconds",title:b.tooltips.pickSecond}).attr("data-action","showSeconds"))),t.append(d("<td>").append(d("<a>").attr({href:"#",tabindex:"-1",title:b.tooltips.decrementSecond}).addClass("btn").attr("data-action","decrementSeconds").append(d("<span>").addClass(b.icons.down)))));D||(k.append(d("<td>").addClass("separator")),l.append(d("<td>").append(d("<button>").addClass("btn btn-primary").attr({"data-action":"togglePeriod",
tabindex:"-1",title:b.tooltips.togglePeriod}))),t.append(d("<td>").addClass("separator")));k=[d("<div>").addClass("timepicker-picker").append(d("<table>").addClass("table-condensed").append([k,l,t]))];y("h")&&k.push(a);y("m")&&k.push(c);y("s")&&k.push(f);return k},ma=function(){var a=[];b.showTodayButton&&(b.icons.todayText?a.push(d("<td>").append(d("<a>").attr({"data-action":"today",title:b.tooltips.today}).append(d("<span>"+b.icons.todayText+"</span>")))):a.push(d("<td>").append(d("<a>").attr({"data-action":"today",
title:b.tooltips.today}).append(d("<span>").addClass(b.icons.today)))));!b.sideBySide&&R()&&Q()&&a.push(d("<td>").append(d("<a>").attr({"data-action":"togglePicker",title:b.tooltips.selectTime}).append(d("<span>").addClass(b.icons.time))));b.showClear&&a.push(d("<td>").append(d("<a>").attr({"data-action":"clear",title:b.tooltips.clear}).append(d("<span>").addClass(b.icons.clear))));b.showClose&&(b.icons.closeText?a.push(d("<td>").append(d("<a>").attr({"data-action":"close",title:b.tooltips.close}).append(d("<span>"+
b.icons.closeText+"</span>")))):a.push(d("<td>").append(d("<a>").attr({"data-action":"close",title:b.tooltips.close}).append(d("<span>").addClass(b.icons.close)))));d.each(a,function(c,f){var k=d(f);k.width(100/a.length+"%");k.find("a").css({maxWidth:"100px",display:"inline-block",overflow:"hidden",textOverflow:"ellipsis"})});return d("<table>").addClass("table-condensed").append(d("<tbody>").append(d("<tr>").append(a)))},na=function(){var a=d("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
c=d("<div>").addClass("datepicker").append(ka()),f=d("<div>").addClass("timepicker").append(la()),k=d("<ul>").addClass("list-unstyled"),l=d("<li>").addClass("picker-switch"+(b.collapse?" accordion-toggle":"")).append(ma());b.inline&&a.removeClass("dropdown-menu");D&&a.addClass("usetwentyfour");y("s")&&!D&&a.addClass("wider");if(b.sideBySide&&R()&&Q())return a.addClass("timepicker-sbs"),"top"===b.toolbarPlacement&&a.append(l),a.append(d("<div>").addClass("row").append(c.addClass("col-md-6")).append(f.addClass("col-md-6"))),
"bottom"===b.toolbarPlacement&&a.append(l),a;"top"===b.toolbarPlacement&&k.append(l);R()&&k.append(d("<li>").addClass(b.collapse&&Q()?"collapse in":"").append(c));"default"===b.toolbarPlacement&&k.append(l);Q()&&k.append(d("<li>").addClass(b.collapse&&R()?"collapse":"").append(f));"bottom"===b.toolbarPlacement&&k.append(l);return a.append(k)},X=function(){var a=(r||g).position(),c=(r||g).offset(),f=b.widgetPositioning.vertical,k=b.widgetPositioning.horizontal;if(b.widgetParent)var l=b.widgetParent.append(h);
else if(g.is("input"))l=g.after(h).parent();else{if(b.inline){l=g.append(h);return}l=g;g.children().first().after(h)}"auto"===f&&(f=c.top+1.5*h.height()>=d(window).height()+d(window).scrollTop()&&h.height()+g.outerHeight()<c.top?"top":"bottom");"auto"===k&&(k=l.width()<c.left+h.outerWidth()/2&&c.left+h.outerWidth()>d(window).width()?"right":"left");"top"===f?h.addClass("top").removeClass("bottom"):h.addClass("bottom").removeClass("top");"right"===k?h.addClass("pull-right"):h.removeClass("pull-right");
"static"===l.css("position")&&(l=l.parents().filter(function(){return"static"!==d(this).css("position")}).first());if(0===l.length)throw Error("datetimepicker component should be placed within a non-static positioned container");b.s123PositionFix?h.css({top:"top"===f?"auto":c.top+g.outerHeight(),bottom:"top"===f?l.outerHeight()-(l===g?0:c.top):"auto",left:"left"===k?l===g?0:c.left:"auto",right:"left"===k?"auto":l.outerWidth()-g.outerWidth()-(l===g?0:c.left)}):h.css({top:"top"===f?"auto":a.top+g.outerHeight(),
bottom:"top"===f?l.outerHeight()-(l===g?0:a.top):"auto",left:"left"===k?l===g?0:a.left:"auto",right:"left"===k?"auto":l.outerWidth()-g.outerWidth()-(l===g?0:a.left)})},I=function(a){"dp.change"===a.type&&(a.date&&a.date.isSame(a.oldDate)||!a.date&&!a.oldDate)||g.trigger(a)},L=function(a){"y"===a&&(a="YYYY");I({type:"dp.update",change:a,viewDate:n.clone()})},M=function(a){h&&(a&&(B=Math.max(F,Math.min(3,B+a))),h.find(".datepicker > div").hide().filter(".datepicker-"+O[B].clsName).show())},oa=function(){var a=
d("<tr>"),c=n.clone().startOf("w").startOf("d");for(!0===b.calendarWeeks&&a.append(d("<th>").addClass("cw").text("#"));c.isBefore(n.clone().endOf("w"));)a.append(d("<th>").addClass("dow").text(c.format("dd"))),c.add(1,"d");h.find(".datepicker-days thead").append(a)},u=function(a,c){if(!a.isValid()||b.disabledDates&&"d"===c&&!0===b.disabledDates[a.format("YYYY-MM-DD")]||b.enabledDates&&"d"===c&&!0!==b.enabledDates[a.format("YYYY-MM-DD")]||b.minDate&&a.isBefore(b.minDate,c)||b.maxDate&&a.isAfter(b.maxDate,
c)||b.daysOfWeekDisabled&&"d"===c&&-1!==b.daysOfWeekDisabled.indexOf(a.day())||b.disabledHours&&("h"===c||"m"===c||"s"===c)&&!0===b.disabledHours[a.format("H")]||b.enabledHours&&("h"===c||"m"===c||"s"===c)&&!0!==b.enabledHours[a.format("H")])return!1;if(b.disabledTimeIntervals&&("h"===c||"m"===c||"s"===c)){var f=!1;d.each(b.disabledTimeIntervals,function(){if(a.isBetween(this[0],this[1]))return f=!0,!1});if(f)return!1}return!0},pa=function(){for(var a=[],c=n.clone().startOf("y").startOf("d");c.isSame(n,
"y");)a.push(d("<span>").attr("data-action","selectMonth").addClass("month").text(c.format("MMM"))),c.add(1,"M");h.find(".datepicker-months td").empty().append(a)},qa=function(){var a=h.find(".datepicker-months"),c=a.find("th"),f=a.find("tbody").find("span");c.eq(0).find("span").attr("title",b.tooltips.prevYear);c.eq(1).attr("title",b.tooltips.selectYear);c.eq(2).find("span").attr("title",b.tooltips.nextYear);a.find(".disabled").removeClass("disabled");u(n.clone().subtract(1,"y"),"y")||c.eq(0).addClass("disabled");
c.eq(1).text(n.year());u(n.clone().add(1,"y"),"y")||c.eq(2).addClass("disabled");f.removeClass("active");m.isSame(n,"y")&&!C&&f.eq(m.month()).addClass("active");f.each(function(k){u(n.clone().month(k),"M")||d(this).addClass("disabled")})},N=function(){var a=h.find(".datepicker-days"),c=a.find("th"),f=[],k;if(R()){c.eq(0).find("span").attr("title",b.tooltips.prevMonth);c.eq(1).attr("title",b.tooltips.selectMonth);c.eq(2).find("span").attr("title",b.tooltips.nextMonth);a.find(".disabled").removeClass("disabled");
c.eq(1).text(n.format(b.dayViewHeaderFormat));u(n.clone().subtract(1,"M"),"M")||c.eq(0).addClass("disabled");u(n.clone().add(1,"M"),"M")||c.eq(2).addClass("disabled");c=n.clone().startOf("M").startOf("w").startOf("d");for(k=0;42>k;k++){if(0===c.weekday()){var l=d("<tr>");b.calendarWeeks&&l.append('<td class="cw">'+c.week()+"</td>");f.push(l)}var t=["day"];c.isBefore(n,"M")&&t.push("old");c.isAfter(n,"M")&&t.push("new");c.isSame(m,"d")&&!C&&t.push("active");u(c,"d")||t.push("disabled");c.isSame(E(),
"d")&&t.push("today");0!==c.day()&&6!==c.day()||t.push("weekend");I({type:"dp.classify",date:c,classNames:t});l.append('<td data-action="selectDay" data-day="'+c.format("L")+'" class="'+t.join(" ")+'">'+c.date()+"</td>");c.add(1,"d")}a.find("tbody").empty().append(f);qa();a=h.find(".datepicker-years");f=a.find("th");l=n.clone().subtract(5,"y");c=n.clone().add(6,"y");t="";f.eq(0).find("span").attr("title",b.tooltips.prevDecade);f.eq(1).attr("title",b.tooltips.selectDecade);f.eq(2).find("span").attr("title",
b.tooltips.nextDecade);a.find(".disabled").removeClass("disabled");b.minDate&&b.minDate.isAfter(l,"y")&&f.eq(0).addClass("disabled");f.eq(1).text(l.year()+"-"+c.year());for(b.maxDate&&b.maxDate.isBefore(c,"y")&&f.eq(2).addClass("disabled");!l.isAfter(c,"y");)t+='<span data-action="selectYear" class="year'+(l.isSame(m,"y")&&!C?" active":"")+(u(l,"y")?"":" disabled")+'">'+l.year()+"</span>",l.add(1,"y");a.find("td").html(t);a=h.find(".datepicker-decades");f=a.find("th");l=z({y:n.year()-n.year()%100-
1});c=l.clone().add(100,"y");t=l.clone();var K="";f.eq(0).find("span").attr("title",b.tooltips.prevCentury);f.eq(2).find("span").attr("title",b.tooltips.nextCentury);a.find(".disabled").removeClass("disabled");(l.isSame(z({y:1900}))||b.minDate&&b.minDate.isAfter(l,"y"))&&f.eq(0).addClass("disabled");f.eq(1).text(l.year()+"-"+c.year());for((l.isSame(z({y:2E3}))||b.maxDate&&b.maxDate.isBefore(c,"y"))&&f.eq(2).addClass("disabled");!l.isAfter(c,"y");){var G=l.year()+12;k=b.minDate&&b.minDate.isAfter(l,
"y")&&b.minDate.year()<=G;var S=b.maxDate&&b.maxDate.isAfter(l,"y")&&b.maxDate.year()<=G;K+='<span data-action="selectDecade" class="decade'+(m.isAfter(l)&&m.year()<=G?" active":"")+(u(l,"y")||k||S?"":" disabled")+'" data-selection="'+(l.year()+6)+'">'+(l.year()+1)+" - "+(l.year()+12)+"</span>";l.add(12,"y")}K+="<span></span><span></span><span></span>";a.find("td").html(K);f.eq(1).text(t.year()+1+"-"+l.year())}},v=function(){if(h){N();var a=h.find(".timepicker span[data-time-component]");if(!D){var c=
h.find(".timepicker [data-action=togglePeriod]");var f=m.clone().add(12<=m.hours()?-12:12,"h");c.text(m.format("A"));u(f,"h")?c.removeClass("disabled"):c.addClass("disabled")}a.filter("[data-time-component=hours]").text(m.format(D?"HH":"hh"));a.filter("[data-time-component=minutes]").text(m.format("mm"));a.filter("[data-time-component=seconds]").text(m.format("ss"));c=h.find(".timepicker-hours table");f=n.clone().startOf("d");a=[];var k=d("<tr>");for(11<n.hour()&&!D&&f.hour(12);f.isSame(n,"d")&&(D||
12>n.hour()&&12>f.hour()||11<n.hour());)0===f.hour()%4&&(k=d("<tr>"),a.push(k)),k.append('<td data-action="selectHour" class="hour'+(u(f,"h")?"":" disabled")+'">'+f.format(D?"HH":"hh")+"</td>"),f.add(1,"h");c.empty().append(a);c=h.find(".timepicker-minutes table");f=n.clone().startOf("h");a=[];k=d("<tr>");for(var l=1===b.stepping?5:b.stepping;n.isSame(f,"h");)0===f.minute()%(4*l)&&(k=d("<tr>"),a.push(k)),k.append('<td data-action="selectMinute" class="minute'+(u(f,"m")?"":" disabled")+'">'+f.format("mm")+
"</td>"),f.add(l,"m");c.empty().append(a);c=h.find(".timepicker-seconds table");f=n.clone().startOf("m");a=[];for(k=d("<tr>");n.isSame(f,"m");)0===f.second()%20&&(k=d("<tr>"),a.push(k)),k.append('<td data-action="selectSecond" class="second'+(u(f,"s")?"":" disabled")+'">'+f.format("ss")+"</td>"),f.add(5,"s");c.empty().append(a)}},q=function(a){var c=C?null:m;if(a){a=a.clone().locale(b.locale);W()&&a.tz(b.timeZone);if(1!==b.stepping)for(a.minutes(Math.round(a.minutes()/b.stepping)*b.stepping).seconds(0);b.minDate&&
a.isBefore(b.minDate);)a.add(b.stepping,"minutes");u(a)?(m=a,n=m.clone(),p.val(m.format(x)),g.data("date",m.format(x)),C=!1,v(),I({type:"dp.change",date:m.clone(),oldDate:c})):(b.keepInvalid?I({type:"dp.change",date:a,oldDate:c}):p.val(C?"":m.format(x)),I({type:"dp.error",date:a,oldDate:c}))}else C=!0,p.val(""),g.data("date",""),I({type:"dp.change",date:!1,oldDate:c}),v()},w=function(){var a=!1;if(!h)return e;h.find(".collapse").each(function(){var c=d(this).data("collapse");return c&&c.transitioning?
(a=!0,!1):!0});if(a)return e;r&&r.hasClass("btn")&&r.toggleClass("active");h.hide();d(window).off("resize",X);h.off("click","[data-action]");h.off("mousedown",!1);h.remove();h=!1;I({type:"dp.hide",date:m.clone()});p.blur();n=m.clone();return e},da=function(){q(null)},H=function(a){if(void 0===b.parseInputDate){if(!z.isMoment(a)||a instanceof Date)a=E(a)}else a=b.parseInputDate(a);return a},T={next:function(){var a=O[B].navFnc;n.add(O[B].navStep,a);N();L(a)},previous:function(){var a=O[B].navFnc;n.subtract(O[B].navStep,
a);N();L(a)},pickerSwitch:function(){M(1)},selectMonth:function(a){a=d(a.target).closest("tbody").find("span").index(d(a.target));n.month(a);B===F?(q(m.clone().year(n.year()).month(n.month())),b.inline||w()):(M(-1),N());L("M")},selectYear:function(a){a=parseInt(d(a.target).text(),10)||0;n.year(a);B===F?(q(m.clone().year(n.year())),b.inline||w()):(M(-1),N());L("YYYY")},selectDecade:function(a){a=parseInt(d(a.target).data("selection"),10)||0;n.year(a);B===F?(q(m.clone().year(n.year())),b.inline||w()):
(M(-1),N());L("YYYY")},selectDay:function(a){var c=n.clone();d(a.target).is(".old")&&c.subtract(1,"M");d(a.target).is(".new")&&c.add(1,"M");q(c.date(parseInt(d(a.target).text(),10)));Q()||b.keepOpen||b.inline||w()},incrementHours:function(){var a=m.clone().add(1,"h");u(a,"h")&&q(a)},incrementMinutes:function(){var a=m.clone().add(b.stepping,"m");u(a,"m")&&q(a)},incrementSeconds:function(){var a=m.clone().add(1,"s");u(a,"s")&&q(a)},decrementHours:function(){var a=m.clone().subtract(1,"h");u(a,"h")&&
q(a)},decrementMinutes:function(){var a=m.clone().subtract(b.stepping,"m");u(a,"m")&&q(a)},decrementSeconds:function(){var a=m.clone().subtract(1,"s");u(a,"s")&&q(a)},togglePeriod:function(){q(m.clone().add(12<=m.hours()?-12:12,"h"))},togglePicker:function(a){a=d(a.target);var c=a.closest("ul"),f=c.find(".in");c=c.find(".collapse:not(.in)");if(f&&f.length){var k=f.data("collapse");k&&k.transitioning||(f.collapse?(f.collapse("hide"),c.collapse("show")):(f.removeClass("in"),c.addClass("in")),a.is("span")?
a.toggleClass(b.icons.time+" "+b.icons.date):a.find("span").toggleClass(b.icons.time+" "+b.icons.date))}},showPicker:function(){h.find(".timepicker > div:not(.timepicker-picker)").hide();h.find(".timepicker .timepicker-picker").show()},showHours:function(){h.find(".timepicker .timepicker-picker").hide();h.find(".timepicker .timepicker-hours").show()},showMinutes:function(){h.find(".timepicker .timepicker-picker").hide();h.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){h.find(".timepicker .timepicker-picker").hide();
h.find(".timepicker .timepicker-seconds").show()},selectHour:function(a){a=parseInt(d(a.target).text(),10);D||(12<=m.hours()?12!==a&&(a+=12):12===a&&(a=0));q(m.clone().hours(a));T.showPicker.call(e)},selectMinute:function(a){q(m.clone().minutes(parseInt(d(a.target).text(),10)));T.showPicker.call(e)},selectSecond:function(a){q(m.clone().seconds(parseInt(d(a.target).text(),10)));T.showPicker.call(e)},clear:da,today:function(){var a=E();u(a,"d")&&q(a)},close:w},ra=function(a){if(d(a.currentTarget).is(".disabled"))return!1;
T[d(a.currentTarget).data("action")].apply(e,arguments);return!1},A=function(){var a={year:function(f){return f.month(0).date(1).hours(0).seconds(0).minutes(0)},month:function(f){return f.date(1).hours(0).seconds(0).minutes(0)},day:function(f){return f.hours(0).seconds(0).minutes(0)},hour:function(f){return f.seconds(0).minutes(0)},minute:function(f){return f.seconds(0)}};if(p.prop("disabled")||!b.ignoreReadonly&&p.prop("readonly")||h)return e;if(void 0!==p.val()&&0!==p.val().trim().length)q(H(p.val().trim()));
else if(C&&b.useCurrent&&(b.inline||p.is("input")&&0===p.val().trim().length)){var c=E();"string"===typeof b.useCurrent&&(c=a[b.useCurrent](c));q(c)}h=na();oa();pa();h.find(".timepicker-hours").hide();h.find(".timepicker-minutes").hide();h.find(".timepicker-seconds").hide();v();M();d(window).on("resize",X);h.on("click","[data-action]",ra);h.on("mousedown",!1);r&&r.hasClass("btn")&&r.toggleClass("active");X();h.show();b.focusOnShow&&!p.is(":focus")&&p.focus();I({type:"dp.show"});return e},Y=function(){return h?
w():A()},ea=function(a){var c=null,f,k,l=[],t={},K=a.which;P[K]="p";for(f in P)P.hasOwnProperty(f)&&"p"===P[f]&&(l.push(f),parseInt(f,10)!==K&&(t[f]=!0));for(f in b.keyBinds)if(b.keyBinds.hasOwnProperty(f)&&"function"===typeof b.keyBinds[f]){var G=f.split(" ");if(G.length===l.length&&ca[K]===G[G.length-1]){var S=!0;for(k=G.length-2;0<=k;k--)if(!(ca[G[k]]in t)){S=!1;break}if(S){c=b.keyBinds[f];break}}}c&&(c.call(e,h),a.stopPropagation(),a.preventDefault())},fa=function(a){P[a.which]="r";a.stopPropagation();
a.preventDefault()},ha=function(a){var c=d(a.target).val().trim();c=c?H(c):null;q(c);a.stopImmediatePropagation();return!1},ia=function(a){var c={};d.each(a,function(){var f=H(this);f.isValid()&&(c[f.format("YYYY-MM-DD")]=!0)});return Object.keys(c).length?c:!1},ja=function(a){var c={};d.each(a,function(){c[this]=!0});return Object.keys(c).length?c:!1},U=function(){var a=b.format||"L LT";x=a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(c){return(m.localeData().longDateFormat(c)||
c).replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,function(f){return m.localeData().longDateFormat(f)||f})});J=b.extraFormats?b.extraFormats.slice():[];0>J.indexOf(a)&&0>J.indexOf(x)&&J.push(x);D=1>x.toLowerCase().indexOf("a")&&1>x.replace(/\[.*?\]/g,"").indexOf("h");y("y")&&(F=2);y("M")&&(F=1);y("d")&&(F=0);B=Math.max(F,B);C||q(m)};e.destroy=function(){w();p.off({change:ha,blur:blur,keydown:ea,keyup:fa,focus:b.allowInputToggle?w:""});g.is("input")?p.off({focus:A}):r&&(r.off("click",Y),r.off("mousedown",
!1));g.removeData("DateTimePicker");g.removeData("date")};e.toggle=Y;e.show=A;e.hide=w;e.disable=function(){w();r&&r.hasClass("btn")&&r.addClass("disabled");p.prop("disabled",!0);return e};e.enable=function(){r&&r.hasClass("btn")&&r.removeClass("disabled");p.prop("disabled",!1);return e};e.s123PositionFix=function(a){if(0===arguments.length)return b.s123PositionFix;if("boolean"!==typeof a)throw new TypeError("s123PositionFix () expects a boolean parameter");b.s123PositionFix=a;return e};e.ignoreReadonly=
function(a){if(0===arguments.length)return b.ignoreReadonly;if("boolean"!==typeof a)throw new TypeError("ignoreReadonly () expects a boolean parameter");b.ignoreReadonly=a;return e};e.options=function(a){if(0===arguments.length)return d.extend(!0,{},b);if(!(a instanceof Object))throw new TypeError("options() options parameter should be an object");d.extend(!0,b,a);d.each(b,function(c,f){if(void 0!==e[c])e[c](f);else throw new TypeError("option "+c+" is not recognized!");});return e};e.date=function(a){if(0===
arguments.length)return C?null:m.clone();if(!(null===a||"string"===typeof a||z.isMoment(a)||a instanceof Date))throw new TypeError("date() parameter must be one of [null, string, moment or Date]");q(null===a?null:H(a));return e};e.format=function(a){if(0===arguments.length)return b.format;if("string"!==typeof a&&("boolean"!==typeof a||!1!==a))throw new TypeError("format() expects a string or boolean:false parameter "+a);b.format=a;x&&U();return e};e.timeZone=function(a){if(0===arguments.length)return b.timeZone;
if("string"!==typeof a)throw new TypeError("newZone() expects a string parameter");b.timeZone=a;return e};e.dayViewHeaderFormat=function(a){if(0===arguments.length)return b.dayViewHeaderFormat;if("string"!==typeof a)throw new TypeError("dayViewHeaderFormat() expects a string parameter");b.dayViewHeaderFormat=a;return e};e.extraFormats=function(a){if(0===arguments.length)return b.extraFormats;if(!1!==a&&!(a instanceof Array))throw new TypeError("extraFormats() expects an array or false parameter");
b.extraFormats=a;J&&U();return e};e.disabledDates=function(a){if(0===arguments.length)return b.disabledDates?d.extend({},b.disabledDates):b.disabledDates;if(!a)return b.disabledDates=!1,v(),e;if(!(a instanceof Array))throw new TypeError("disabledDates() expects an array parameter");b.disabledDates=ia(a);b.enabledDates=!1;v();return e};e.enabledDates=function(a){if(0===arguments.length)return b.enabledDates?d.extend({},b.enabledDates):b.enabledDates;if(!a)return b.enabledDates=!1,v(),e;if(!(a instanceof
Array))throw new TypeError("enabledDates() expects an array parameter");b.enabledDates=ia(a);b.disabledDates=!1;v();return e};e.daysOfWeekDisabled=function(a){if(0===arguments.length)return b.daysOfWeekDisabled.splice(0);if("boolean"===typeof a&&!a)return b.daysOfWeekDisabled=!1,v(),e;if(!(a instanceof Array))throw new TypeError("daysOfWeekDisabled() expects an array parameter");b.daysOfWeekDisabled=a.reduce(function(f,k){k=parseInt(k,10);if(6<k||0>k||isNaN(k))return f;-1===f.indexOf(k)&&f.push(k);
return f},[]).sort();if(b.useCurrent&&!b.keepInvalid){for(var c=0;!u(m,"d");){m.add(1,"d");if(31===c)throw"Tried 31 times to find a valid date";c++}q(m)}v();return e};e.maxDate=function(a){if(0===arguments.length)return b.maxDate?b.maxDate.clone():b.maxDate;if("boolean"===typeof a&&!1===a)return b.maxDate=!1,v(),e;"string"!==typeof a||"now"!==a&&"moment"!==a||(a=E());var c=H(a);if(!c.isValid())throw new TypeError("maxDate() Could not parse date parameter: "+a);if(b.minDate&&c.isBefore(b.minDate))throw new TypeError("maxDate() date parameter is before options.minDate: "+
c.format(x));b.maxDate=c;b.useCurrent&&!b.keepInvalid&&m.isAfter(a)&&q(b.maxDate);n.isAfter(c)&&(n=c.clone().subtract(b.stepping,"m"));v();return e};e.minDate=function(a){if(0===arguments.length)return b.minDate?b.minDate.clone():b.minDate;if("boolean"===typeof a&&!1===a)return b.minDate=!1,v(),e;"string"!==typeof a||"now"!==a&&"moment"!==a||(a=E());var c=H(a);if(!c.isValid())throw new TypeError("minDate() Could not parse date parameter: "+a);if(b.maxDate&&c.isAfter(b.maxDate))throw new TypeError("minDate() date parameter is after options.maxDate: "+
c.format(x));b.minDate=c;b.useCurrent&&!b.keepInvalid&&m.isBefore(a)&&q(b.minDate);n.isBefore(c)&&(n=c.clone().add(b.stepping,"m"));v();return e};e.defaultDate=function(a){if(0===arguments.length)return b.defaultDate?b.defaultDate.clone():b.defaultDate;if(!a)return b.defaultDate=!1,e;"string"===typeof a&&(a="now"===a||"moment"===a?E():E(a));var c=H(a);if(!c.isValid())throw new TypeError("defaultDate() Could not parse date parameter: "+a);if(!u(c))throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
b.defaultDate=c;(b.defaultDate&&b.inline||""===p.val().trim())&&q(b.defaultDate);return e};e.locale=function(a){if(0===arguments.length)return b.locale;if(!z.localeData(a))throw new TypeError("locale() locale "+a+" is not loaded from moment locales!");b.locale=a;m.locale(b.locale);n.locale(b.locale);x&&U();h&&(w(),A());return e};e.stepping=function(a){if(0===arguments.length)return b.stepping;a=parseInt(a,10);if(isNaN(a)||1>a)a=1;b.stepping=a;return e};e.useCurrent=function(a){var c=["year","month",
"day","hour","minute"];if(0===arguments.length)return b.useCurrent;if("boolean"!==typeof a&&"string"!==typeof a)throw new TypeError("useCurrent() expects a boolean or string parameter");if("string"===typeof a&&-1===c.indexOf(a.toLowerCase()))throw new TypeError("useCurrent() expects a string parameter of "+c.join(", "));b.useCurrent=a;return e};e.collapse=function(a){if(0===arguments.length)return b.collapse;if("boolean"!==typeof a)throw new TypeError("collapse() expects a boolean parameter");if(b.collapse===
a)return e;b.collapse=a;h&&(w(),A());return e};e.icons=function(a){if(0===arguments.length)return d.extend({},b.icons);if(!(a instanceof Object))throw new TypeError("icons() expects parameter to be an Object");d.extend(b.icons,a);h&&(w(),A());return e};e.tooltips=function(a){if(0===arguments.length)return d.extend({},b.tooltips);if(!(a instanceof Object))throw new TypeError("tooltips() expects parameter to be an Object");d.extend(b.tooltips,a);h&&(w(),A());return e};e.useStrict=function(a){if(0===
arguments.length)return b.useStrict;if("boolean"!==typeof a)throw new TypeError("useStrict() expects a boolean parameter");b.useStrict=a;return e};e.sideBySide=function(a){if(0===arguments.length)return b.sideBySide;if("boolean"!==typeof a)throw new TypeError("sideBySide() expects a boolean parameter");b.sideBySide=a;h&&(w(),A());return e};e.viewMode=function(a){if(0===arguments.length)return b.viewMode;if("string"!==typeof a)throw new TypeError("viewMode() expects a string parameter");if(-1===V.indexOf(a))throw new TypeError("viewMode() parameter must be one of ("+
V.join(", ")+") value");b.viewMode=a;B=Math.max(V.indexOf(a),F);M();return e};e.toolbarPlacement=function(a){if(0===arguments.length)return b.toolbarPlacement;if("string"!==typeof a)throw new TypeError("toolbarPlacement() expects a string parameter");if(-1===ba.indexOf(a))throw new TypeError("toolbarPlacement() parameter must be one of ("+ba.join(", ")+") value");b.toolbarPlacement=a;h&&(w(),A());return e};e.widgetPositioning=function(a){if(0===arguments.length)return d.extend({},b.widgetPositioning);
if("[object Object]"!=={}.toString.call(a))throw new TypeError("widgetPositioning() expects an object variable");if(a.horizontal){if("string"!==typeof a.horizontal)throw new TypeError("widgetPositioning() horizontal variable must be a string");a.horizontal=a.horizontal.toLowerCase();if(-1===aa.indexOf(a.horizontal))throw new TypeError("widgetPositioning() expects horizontal parameter to be one of ("+aa.join(", ")+")");b.widgetPositioning.horizontal=a.horizontal}if(a.vertical){if("string"!==typeof a.vertical)throw new TypeError("widgetPositioning() vertical variable must be a string");
a.vertical=a.vertical.toLowerCase();if(-1===Z.indexOf(a.vertical))throw new TypeError("widgetPositioning() expects vertical parameter to be one of ("+Z.join(", ")+")");b.widgetPositioning.vertical=a.vertical}v();return e};e.calendarWeeks=function(a){if(0===arguments.length)return b.calendarWeeks;if("boolean"!==typeof a)throw new TypeError("calendarWeeks() expects parameter to be a boolean value");b.calendarWeeks=a;v();return e};e.showTodayButton=function(a){if(0===arguments.length)return b.showTodayButton;
if("boolean"!==typeof a)throw new TypeError("showTodayButton() expects a boolean parameter");b.showTodayButton=a;h&&(w(),A());return e};e.showClear=function(a){if(0===arguments.length)return b.showClear;if("boolean"!==typeof a)throw new TypeError("showClear() expects a boolean parameter");b.showClear=a;h&&(w(),A());return e};e.widgetParent=function(a){if(0===arguments.length)return b.widgetParent;"string"===typeof a&&(a=d(a));if(null!==a&&"string"!==typeof a&&!(a instanceof d))throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
b.widgetParent=a;h&&(w(),A());return e};e.keepOpen=function(a){if(0===arguments.length)return b.keepOpen;if("boolean"!==typeof a)throw new TypeError("keepOpen() expects a boolean parameter");b.keepOpen=a;return e};e.focusOnShow=function(a){if(0===arguments.length)return b.focusOnShow;if("boolean"!==typeof a)throw new TypeError("focusOnShow() expects a boolean parameter");b.focusOnShow=a;return e};e.inline=function(a){if(0===arguments.length)return b.inline;if("boolean"!==typeof a)throw new TypeError("inline() expects a boolean parameter");
b.inline=a;return e};e.clear=function(){da();return e};e.keyBinds=function(a){if(0===arguments.length)return b.keyBinds;b.keyBinds=a;return e};e.getMoment=function(a){return E(a)};e.debug=function(a){if("boolean"!==typeof a)throw new TypeError("debug() expects a boolean parameter");b.debug=a;return e};e.allowInputToggle=function(a){if(0===arguments.length)return b.allowInputToggle;if("boolean"!==typeof a)throw new TypeError("allowInputToggle() expects a boolean parameter");b.allowInputToggle=a;return e};
e.showClose=function(a){if(0===arguments.length)return b.showClose;if("boolean"!==typeof a)throw new TypeError("showClose() expects a boolean parameter");b.showClose=a;return e};e.keepInvalid=function(a){if(0===arguments.length)return b.keepInvalid;if("boolean"!==typeof a)throw new TypeError("keepInvalid() expects a boolean parameter");b.keepInvalid=a;return e};e.datepickerInput=function(a){if(0===arguments.length)return b.datepickerInput;if("string"!==typeof a)throw new TypeError("datepickerInput() expects a string parameter");
b.datepickerInput=a;return e};e.parseInputDate=function(a){if(0===arguments.length)return b.parseInputDate;if("function"!==typeof a)throw new TypeError("parseInputDate() sholud be as function");b.parseInputDate=a;return e};e.disabledTimeIntervals=function(a){if(0===arguments.length)return b.disabledTimeIntervals?d.extend({},b.disabledTimeIntervals):b.disabledTimeIntervals;if(!a)return b.disabledTimeIntervals=!1,v(),e;if(!(a instanceof Array))throw new TypeError("disabledTimeIntervals() expects an array parameter");
b.disabledTimeIntervals=a;v();return e};e.disabledHours=function(a){if(0===arguments.length)return b.disabledHours?d.extend({},b.disabledHours):b.disabledHours;if(!a)return b.disabledHours=!1,v(),e;if(!(a instanceof Array))throw new TypeError("disabledHours() expects an array parameter");b.disabledHours=ja(a);b.enabledHours=!1;if(b.useCurrent&&!b.keepInvalid){for(var c=0;!u(m,"h");){m.add(1,"h");if(24===c)throw"Tried 24 times to find a valid date";c++}q(m)}v();return e};e.enabledHours=function(a){if(0===
arguments.length)return b.enabledHours?d.extend({},b.enabledHours):b.enabledHours;if(!a)return b.enabledHours=!1,v(),e;if(!(a instanceof Array))throw new TypeError("enabledHours() expects an array parameter");b.enabledHours=ja(a);b.disabledHours=!1;if(b.useCurrent&&!b.keepInvalid){for(var c=0;!u(m,"h");){m.add(1,"h");if(24===c)throw"Tried 24 times to find a valid date";c++}q(m)}v();return e};e.viewDate=function(a){if(0===arguments.length)return n.clone();if(!a)return n=m.clone(),e;if(!("string"===
typeof a||z.isMoment(a)||a instanceof Date))throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");n=H(a);L();return e};if(g.is("input"))var p=g;else if(p=g.find(b.datepickerInput),0===p.length)p=g.find("input");else if(!p.is("input"))throw Error('CSS class "'+b.datepickerInput+'" cannot be applied to non input element');g.hasClass("input-group")&&(r=0===g.find(".datepickerbutton").length?g.find(".input-group-addon"):g.find(".datepickerbutton"));if(!b.inline&&!p.is("input"))throw Error("Could not initialize DateTimePicker without an input element");
var m=E();var n=m.clone();d.extend(!0,b,function(){var a={};var c=g.is("input")||b.inline?g.data():g.find("input").data();c.dateOptions&&c.dateOptions instanceof Object&&(a=d.extend(!0,a,c.dateOptions));d.each(b,function(f){var k="date"+f.charAt(0).toUpperCase()+f.slice(1);void 0!==c[k]&&(a[f]=c[k])});return a}());e.options(b);U();p.on({change:ha,blur:b.debug?"":w,keydown:ea,keyup:fa,focus:b.allowInputToggle?A:""});if(g.is("input"))p.on({focus:A});else r&&(r.on("click",Y),r.on("mousedown",!1));p.prop("disabled")&&
e.disable();p.is("input")&&0!==p.val().trim().length?q(H(p.val().trim())):b.defaultDate&&void 0===p.attr("placeholder")&&q(b.defaultDate);b.inline&&A();return e};d.fn.datetimepicker=function(g){g=g||{};var b=Array.prototype.slice.call(arguments,1),e=!0,C=["destroy","hide","show","toggle"],r;if("object"===typeof g)return this.each(function(){var h=d(this);if(!h.data("DateTimePicker")){var D=d.extend(!0,{},d.fn.datetimepicker.defaults,g);h.data("DateTimePicker",sa(h,D))}});if("string"===typeof g)return this.each(function(){var h=
d(this).data("DateTimePicker");if(!h)throw Error('bootstrap-datetimepicker("'+g+'") method was called on an element that is not using DateTimePicker');r=h[g].apply(h,b);e=r===h}),e||-1<d.inArray(g,C)?this:r;throw new TypeError("Invalid arguments for DateTimePicker: "+g);};d.fn.datetimepicker.defaults={timeZone:"",format:!1,dayViewHeaderFormat:"MMMM YYYY",extraFormats:!1,stepping:1,minDate:!1,maxDate:!1,useCurrent:!0,collapse:!0,locale:z.locale(),defaultDate:!1,disabledDates:!1,enabledDates:!1,icons:{time:"glyphicon glyphicon-time",
date:"glyphicon glyphicon-calendar",up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down",previous:"glyphicon glyphicon-chevron-left",next:"glyphicon glyphicon-chevron-right",today:"glyphicon glyphicon-screenshot",clear:"glyphicon glyphicon-trash",close:"glyphicon glyphicon-remove"},tooltips:{today:"Go to today",clear:"Clear selection",close:"Close the picker",selectMonth:"Select Month",prevMonth:"Previous Month",nextMonth:"Next Month",selectYear:"Select Year",prevYear:"Previous Year",
nextYear:"Next Year",selectDecade:"Select Decade",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevCentury:"Previous Century",nextCentury:"Next Century",pickHour:"Pick Hour",incrementHour:"Increment Hour",decrementHour:"Decrement Hour",pickMinute:"Pick Minute",incrementMinute:"Increment Minute",decrementMinute:"Decrement Minute",pickSecond:"Pick Second",incrementSecond:"Increment Second",decrementSecond:"Decrement Second",togglePeriod:"Toggle Period",selectTime:"Select Time"},useStrict:!1,
sideBySide:!1,daysOfWeekDisabled:!1,calendarWeeks:!1,viewMode:"days",toolbarPlacement:"default",showTodayButton:!1,showClear:!1,showClose:!1,widgetPositioning:{horizontal:"auto",vertical:"auto"},widgetParent:null,ignoreReadonly:!1,keepOpen:!1,focusOnShow:!0,inline:!1,keepInvalid:!1,datepickerInput:".datepickerinput",keyBinds:{up:function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")?this.date(b.clone().subtract(7,"d")):this.date(b.clone().add(this.stepping(),"m"))}},
down:function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")?this.date(b.clone().add(7,"d")):this.date(b.clone().subtract(this.stepping(),"m"))}else this.show()},"control up":function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")?this.date(b.clone().subtract(1,"y")):this.date(b.clone().add(1,"h"))}},"control down":function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")?this.date(b.clone().add(1,
"y")):this.date(b.clone().subtract(1,"h"))}},left:function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"d"))}},right:function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"d"))}},pageUp:function(g){if(g){var b=this.date()||this.getMoment();g.find(".datepicker").is(":visible")&&this.date(b.clone().subtract(1,"M"))}},pageDown:function(g){if(g){var b=this.date()||this.getMoment();
g.find(".datepicker").is(":visible")&&this.date(b.clone().add(1,"M"))}},enter:function(){this.hide()},escape:function(){this.hide()},"control space":function(g){g&&g.find(".timepicker").is(":visible")&&g.find('.btn[data-action="togglePeriod"]').click()},t:function(){this.date(this.getMoment())},"delete":function(){this.clear()}},debug:!1,allowInputToggle:!1,disabledTimeIntervals:!1,disabledHours:!1,enabledHours:!1,viewDate:!1};return d.fn.datetimepicker});(function($ , undefined) {var Ace_Colorpicker = function(element, _options) {var attrib_values = ace.helper.getAttrSettings(element, $.fn.ace_colorpicker.defaults);var options = $.extend({}, $.fn.ace_colorpicker.defaults, _options, attrib_values);var $element = $(element);var color_list = '';var color_selected = '';var selection = null;var color_array = [];$element.addClass('hide').find('option').each(function() {var $class = 'colorpick-btn';var color = this.value.replace(/[^\w\s,#\(\)\.]/g, '');if(this.value != color) this.value = color;if(this.selected) {$class += ' selected';color_selected = color;}
color_array.push(color)
color_list += '<li><a class="'+$class+'" href="#" style="background-color:'+color+';" data-color="'+color+'"></a></li>';}).
end()
.on('change.color', function(){$element.next().find('.btn-colorpicker').css('background-color', this.value);})
.after('<div class="dropdown dropdown-colorpicker">\
<a data-toggle="dropdown" class="dropdown-toggle" '+(options.auto_pos ? 'data-position="auto"' : '')+' href="#"><span class="btn-colorpicker" style="background-color:'+color_selected+'"></span></a><ul class="dropdown-menu'+(options.caret? ' dropdown-caret' : '')+(options.pull_right ? ' dropdown-menu-right' : '')+'">'+color_list+'</ul></div>')
var dropdown = $element.next().find('.dropdown-menu')
dropdown.on(ace.click_event, function(e) {var a = $(e.target);if(!a.is('.colorpick-btn')) return false;if(selection) selection.removeClass('selected');selection = a;selection.addClass('selected');var color = selection.data('color');$element.val(color).trigger('change');e.preventDefault();return true;//to hide dropdown
})
selection = $element.next().find('a.selected');this.pick = function(index, insert) {if(typeof index === 'number') {if(index >= color_array.length) return;element.selectedIndex = index;dropdown.find('a:eq('+index+')').trigger(ace.click_event);}
else if(typeof index === 'string') {var color = index.replace(/[^\w\s,#\(\)\.]/g, '');index = color_array.indexOf(color);if(index == -1 && insert === true) {color_array.push(color);$('<option />')
.appendTo($element)
.val(color);$('<li><a class="colorpick-btn" href="#"></a></li>')
.appendTo(dropdown)
.find('a')
.css('background-color', color)
.data('color', color);index = color_array.length - 1;}
if(index == -1) return;dropdown.find('a:eq('+index+')').trigger(ace.click_event);}}
this.destroy = function() {$element.removeClass('hide').off('change.color')
.next().remove();color_array = [];}}
$.fn.ace_colorpicker = function(option, value) {var retval;var $set = this.each(function () {var $this = $(this);var data = $this.data('ace_colorpicker');var options = typeof option === 'object' && option;if (!data) $this.data('ace_colorpicker', (data = new Ace_Colorpicker(this, options)));if (typeof option === 'string') retval = data[option](value);});return (retval === undefined) ? $set : retval;}
$.fn.ace_colorpicker.defaults = {'pull_right' : false,'caret': true,'auto_pos': true}})(window.jQuery);(function(jQuery) {jQuery.hotkeys = {version: "0.8",specialKeys: {8: "backspace",9: "tab",10: "return",13: "return",16: "shift",17: "ctrl",18: "alt",19: "pause",20: "capslock",27: "esc",32: "space",33: "pageup",34: "pagedown",35: "end",36: "home",37: "left",38: "up",39: "right",40: "down",45: "insert",46: "del",59: ";",61: "=",96: "0",97: "1",98: "2",99: "3",100: "4",101: "5",102: "6",103: "7",104: "8",105: "9",106: "*",107: "+",109: "-",110: ".",111: "/",112: "f1",113: "f2",114: "f3",115: "f4",116: "f5",117: "f6",118: "f7",119: "f8",120: "f9",121: "f10",122: "f11",123: "f12",144: "numlock",145: "scroll",173: "-",186: ";",187: "=",188: ",",189: "-",190: ".",191: "/",192: "`",219: "[",220: "\\",221: "]",222: "'"},shiftNums: {"`": "~","1": "!","2": "@","3": "#","4": "$","5": "%","6": "^","7": "&","8": "*","9": "(","0": ")","-": "_","=": "+",";": ": ","'": "\"",",": "<",".": ">","/": "?","\\": "|"},textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime","datetime-local", "search", "color", "tel"],options: {filterTextInputs: true}};function keyHandler(handleObj) {if (typeof handleObj.data === "string") {handleObj.data = {keys: handleObj.data};}
if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {return;}
var origHandler = handleObj.handler,keys = handleObj.data.keys.toLowerCase().split(" ");handleObj.handler = function(event) {if (this !== event.target && (/textarea|select/i.test(event.target.nodeName) ||(jQuery.hotkeys.options.filterTextInputs &&jQuery.inArray(event.target.type, jQuery.hotkeys.textAcceptingInputTypes) > -1))) {return;}
var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[event.which],character = String.fromCharCode(event.which).toLowerCase(),modif = "",possible = {};jQuery.each(["alt", "ctrl", "shift"], function(index, specialKey) {if (event[specialKey + 'Key'] && special !== specialKey) {modif += specialKey + '+';}});if (event.metaKey && !event.ctrlKey && special !== "meta") {modif += "meta+";}
if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {modif = modif.replace("alt+ctrl+shift+", "hyper+");}
if (special) {possible[modif + special] = true;}
else {possible[modif + character] = true;possible[modif + jQuery.hotkeys.shiftNums[character]] = true;if (modif === "shift+") {possible[jQuery.hotkeys.shiftNums[character]] = true;}}
for (var i = 0, l = keys.length; i < l; i++) {if (possible[keys[i]]) {return origHandler.apply(this, arguments);}}};}
jQuery.each(["keydown", "keyup", "keypress"], function() {jQuery.event.special[this] = {add: keyHandler};});})(jQuery || this.jQuery || window.jQuery);if( !('ace' in window) ) window['ace'] = {}
ace.config = {cookie_expiry : 604800, //1 week duration for saved settings
cookie_path: '',storage_method: 2 //2 means use cookies, 1 means localStorage, 0 means localStorage if available otherwise cookies
}
if( !('vars' in window['ace']) ) window['ace'].vars = {}
ace.vars['very_old_ie']	= !('querySelector' in document.documentElement);ace.settings = {is : function(item, status) {return (ace.data.get('settings', item+'-'+status) == 1)},exists : function(item, status) {return (ace.data.get('settings', item+'-'+status) !== null)},set : function(item, status) {ace.data.set('settings', item+'-'+status, 1)},unset : function(item, status) {ace.data.set('settings', item+'-'+status, -1)},remove : function(item, status) {ace.data.remove('settings', item+'-'+status)},navbar_fixed : function(navbar, fix , save, chain) {if(ace.vars['very_old_ie']) return false;var navbar = navbar || '#navbar';if(typeof navbar === 'string') navbar = document.querySelector(navbar);if(!navbar) return false;fix = fix || false;save = save && true;if(!fix && chain !== false) {var sidebar = null;if(ace.settings.is('sidebar', 'fixed')
||((sidebar = document.getElementById('sidebar')) && ace.hasClass(sidebar , 'sidebar-fixed')))
{ace.settings.sidebar_fixed(sidebar, false, save);}}
if(fix) {if(!ace.hasClass(navbar , 'navbar-fixed-top'))  ace.addClass(navbar , 'navbar-fixed-top');if(save !== false) ace.settings.set('navbar', 'fixed');} else {ace.removeClass(navbar , 'navbar-fixed-top');if(save !== false) ace.settings.unset('navbar', 'fixed');}
try {document.getElementById('ace-settings-navbar').checked = fix;} catch(e) {}
if(window.jQuery) jQuery(document).trigger('settings.ace', ['navbar_fixed' , fix , navbar]);},sidebar_fixed : function(sidebar, fix , save, chain) {if(ace.vars['very_old_ie']) return false;var sidebar = sidebar || '#sidebar';if(typeof sidebar === 'string') sidebar = document.querySelector(sidebar);if(!sidebar) return false;fix = fix || false;save = save && true;if(!fix && chain !== false) {var breadcrumbs = null;if(ace.settings.is('breadcrumbs', 'fixed')
||((breadcrumbs = document.getElementById('breadcrumbs')) && ace.hasClass(breadcrumbs , 'breadcrumbs-fixed')))
{ace.settings.breadcrumbs_fixed(breadcrumbs, false, save);}}
if( fix && chain !== false && !ace.settings.is('navbar', 'fixed') ) {ace.settings.navbar_fixed(null, true, save);}
if(fix) {if( !ace.hasClass(sidebar , 'sidebar-fixed') )  {ace.addClass(sidebar , 'sidebar-fixed');var toggler = document.getElementById('menu-toggler');if(toggler) ace.addClass(toggler , 'fixed');}
if(save !== false) ace.settings.set('sidebar', 'fixed');} else {ace.removeClass(sidebar , 'sidebar-fixed');var toggler = document.getElementById('menu-toggler');if(toggler) ace.removeClass(toggler , 'fixed');if(save !== false) ace.settings.unset('sidebar', 'fixed');}
try {document.getElementById('ace-settings-sidebar').checked = fix;} catch(e) {}
if(window.jQuery) jQuery(document).trigger('settings.ace', ['sidebar_fixed' , fix , sidebar]);},breadcrumbs_fixed : function(breadcrumbs, fix , save, chain) {if(ace.vars['very_old_ie']) return false;var breadcrumbs = breadcrumbs || '#breadcrumbs';if(typeof breadcrumbs === 'string') breadcrumbs = document.querySelector(breadcrumbs);if(!breadcrumbs) return false;fix = fix || false;save = save && true;if(fix && chain !== false && !ace.settings.is('sidebar', 'fixed')) {ace.settings.sidebar_fixed(null, true, save);}
if(fix) {if(!ace.hasClass(breadcrumbs , 'breadcrumbs-fixed'))  ace.addClass(breadcrumbs , 'breadcrumbs-fixed');if(save !== false) ace.settings.set('breadcrumbs', 'fixed');} else {ace.removeClass(breadcrumbs , 'breadcrumbs-fixed');if(save !== false) ace.settings.unset('breadcrumbs', 'fixed');}
try {document.getElementById('ace-settings-breadcrumbs').checked = fix;} catch(e) {}
if(window.jQuery) jQuery(document).trigger('settings.ace', ['breadcrumbs_fixed' , fix , breadcrumbs]);},main_container_fixed : function(main_container, inside , save) {if(ace.vars['very_old_ie']) return false;inside = inside || false;save = save && true;var main_container = main_container || '#main-container';if(typeof main_container === 'string') main_container = document.querySelector(main_container);if(!main_container) return false;var navbar_container = document.getElementById('navbar-container');if(inside) {if( !ace.hasClass(main_container , 'container') )  ace.addClass(main_container , 'container');if( navbar_container && !ace.hasClass(navbar_container , 'container') )  ace.addClass(navbar_container , 'container');if( save !== false ) ace.settings.set('main-container', 'fixed');} else {ace.removeClass(main_container , 'container');if(navbar_container) ace.removeClass(navbar_container , 'container');if(save !== false) ace.settings.unset('main-container', 'fixed');}
try {document.getElementById('ace-settings-add-container').checked = inside;} catch(e) {}
if(navigator.userAgent.match(/webkit/i)) {var sidebar = document.getElementById('sidebar')
ace.toggleClass(sidebar , 'menu-min')
setTimeout(function() {	ace.toggleClass(sidebar , 'menu-min') } , 0)}
if(window.jQuery) jQuery(document).trigger('settings.ace', ['main_container_fixed', inside, main_container]);},sidebar_collapsed : function(sidebar, collapse , save) {if(ace.vars['very_old_ie']) return false;var sidebar = sidebar || '#sidebar';if(typeof sidebar === 'string') sidebar = document.querySelector(sidebar);if(!sidebar) return false;collapse = collapse || false;if(collapse) {ace.addClass(sidebar , 'menu-min');if(save !== false) ace.settings.set('sidebar', 'collapsed');} else {ace.removeClass(sidebar , 'menu-min');if(save !== false) ace.settings.unset('sidebar', 'collapsed');}
if(window.jQuery) jQuery(document).trigger('settings.ace', ['sidebar_collapsed' , collapse, sidebar]);if(!window.jQuery) {var toggle_btn = document.querySelector('.sidebar-collapse[data-target="#'+(sidebar.getAttribute('id')||'')+'"]');if(!toggle_btn) toggle_btn = sidebar.querySelector('.sidebar-collapse');if(!toggle_btn) return;var icon = toggle_btn.querySelector('[data-icon1][data-icon2]'), icon1, icon2;if(!icon) return;icon1 = icon.getAttribute('data-icon1');//the icon for expanded state
icon2 = icon.getAttribute('data-icon2');//the icon for collapsed state
if(collapse) {ace.removeClass(icon, icon1);ace.addClass(icon, icon2);}
else {ace.removeClass(icon, icon2);ace.addClass(icon, icon1);}}}}
ace.settings.check = function(item, val) {if(! ace.settings.exists(item, val) ) return;//no such setting specified
var status = ace.settings.is(item, val);//is breadcrumbs-fixed? or is sidebar-collapsed? etc
var mustHaveClass = {'navbar-fixed' : 'navbar-fixed-top','sidebar-fixed' : 'sidebar-fixed','breadcrumbs-fixed' : 'breadcrumbs-fixed','sidebar-collapsed' : 'menu-min','main-container-fixed' : 'container'}
var target = document.getElementById(item);//#navbar, #sidebar, #breadcrumbs
if(status != ace.hasClass(target , mustHaveClass[item+'-'+val])) {ace.settings[item.replace('-','_')+'_'+val](null, status);//call the relevant function to make the changes
}}
ace.data_storage = function(method, undefined) {var prefix = 'ace_';var storage = null;var type = 0;if((method == 1 || method === undefined) && 'localStorage' in window && window['localStorage'] !== null) {storage = ace.storage;type = 1;}
else if(storage == null && (method == 2 || method === undefined) && 'cookie' in document && document['cookie'] !== null) {storage = ace.cookie;type = 2;}
this.set = function(namespace, key, value, path, undefined) {if(!storage) return;if(value === undefined) {//no namespace here?
value = key;key = namespace;if(value == null) storage.remove(prefix+key)
else {if(type == 1)
storage.set(prefix+key, value)
else if(type == 2)
storage.set(prefix+key, value, ace.config.cookie_expiry, path || ace.config.cookie_path)}}
else {if(type == 1) {//localStorage
if(value == null) storage.remove(prefix+namespace+'_'+key)
else storage.set(prefix+namespace+'_'+key, value);}
else if(type == 2) {//cookie
var val = storage.get(prefix+namespace);var tmp = val ? JSON.parse(val) : {};if(value == null) {delete tmp[key];//remove
if(ace.sizeof(tmp) == 0) {//no other elements in this cookie, so delete it
storage.remove(prefix+namespace);return;}}
else {tmp[key] = value;}
storage.set(prefix+namespace , JSON.stringify(tmp), ace.config.cookie_expiry, path || ace.config.cookie_path)}}}
this.get = function(namespace, key, undefined) {if(!storage) return null;if(key === undefined) {//no namespace here?
key = namespace;return storage.get(prefix+key);}
else {if(type == 1) {//localStorage
return storage.get(prefix+namespace+'_'+key);}
else if(type == 2) {//cookie
var val = storage.get(prefix+namespace);var tmp = val ? JSON.parse(val) : {};return key in tmp ? tmp[key] : null;}}}
this.remove = function(namespace, key, undefined) {if(!storage) return;if(key === undefined) {key = namespace
this.set(key, null);}
else {this.set(namespace, key, null);}}}
ace.cookie = {get : function(name) {var cookie = document.cookie, e, p = name + "=", b;if ( !cookie )
return;b = cookie.indexOf("; " + p);if ( b == -1 ) {b = cookie.indexOf(p);if ( b != 0 )
return null;} else {b += 2;}
e = cookie.indexOf(";", b);if ( e == -1 )
e = cookie.length;return decodeURIComponent( cookie.substring(b + p.length, e) );},set : function(name, value, expires, path, domain, secure) {var d = new Date();if ( typeof(expires) == 'object' && expires.toGMTString ) {expires = expires.toGMTString();} else if ( parseInt(expires, 10) ) {d.setTime( d.getTime() + ( parseInt(expires, 10) * 1000 ) ); // time must be in miliseconds
expires = d.toGMTString();} else {expires = '';}
document.cookie = name + "=" + encodeURIComponent(value) +((expires) ? "; expires=" + expires : "") +((path) ? "; path=" + path : "") +((domain) ? "; domain=" + domain : "") +((secure) ? "; secure" : "");},remove : function(name, path) {this.set(name, '', -1000, path);}};ace.storage = {get: function(key) {return window['localStorage'].getItem(key);},set: function(key, value) {window['localStorage'].setItem(key , value);},remove: function(key) {window['localStorage'].removeItem(key);}};ace.sizeof = function(obj) {var size = 0;for(var key in obj) if(obj.hasOwnProperty(key)) size++;return size;}
ace.hasClass = function(elem, className) {	return (" " + elem.className + " ").indexOf(" " + className + " ") > -1; }
ace.addClass = function(elem, className) {if (!ace.hasClass(elem, className)) {var currentClass = elem.className;elem.className = currentClass + (currentClass.length? " " : "") + className;}}
ace.removeClass = function(elem, className) {ace.replaceClass(elem, className);}
ace.replaceClass = function(elem, className, newClass) {var classToRemove = new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i");elem.className = elem.className.replace(classToRemove, function (match, p1, p2) {return newClass? (p1 + newClass + p2) : " ";}).replace(/^\s+|\s+$/g, "");}
ace.toggleClass = function(elem, className) {if(ace.hasClass(elem, className))
ace.removeClass(elem, className);else ace.addClass(elem, className);}
ace.isHTTMlElement = function(elem) {return window.HTMLElement ? elem instanceof HTMLElement : ('nodeType' in elem ? elem.nodeType == 1 : false);}
ace.data = new ace.data_storage(ace.config.storage_method);(function() {var $, AbstractChosen, Chosen, SelectParser, _ref,__bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },__hasProp = {}.hasOwnProperty,__extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };SelectParser = (function() {function SelectParser() {this.options_index = 0;this.parsed = [];}
SelectParser.prototype.add_node = function(child) {if (child.nodeName.toUpperCase() === "OPTGROUP") {return this.add_group(child);} else {return this.add_option(child);}};SelectParser.prototype.add_group = function(group) {var group_position, option, _i, _len, _ref, _results;group_position = this.parsed.length;this.parsed.push({array_index: group_position,group: true,label: this.escapeExpression(group.label),title: group.title ? group.title : void 0,children: 0,disabled: group.disabled,classes: group.className});_ref = group.childNodes;_results = [];for (_i = 0, _len = _ref.length; _i < _len; _i++) {option = _ref[_i];_results.push(this.add_option(option, group_position, group.disabled));}
return _results;};SelectParser.prototype.add_option = function(option, group_position, group_disabled) {if (option.nodeName.toUpperCase() === "OPTION") {if (option.text !== "") {if (group_position != null) {this.parsed[group_position].children += 1;}
this.parsed.push({array_index: this.parsed.length,options_index: this.options_index,value: option.value,text: option.text,html: option.innerHTML,title: option.title ? option.title : void 0,selected: option.selected,disabled: group_disabled === true ? group_disabled : option.disabled,group_array_index: group_position,group_label: group_position != null ? this.parsed[group_position].label : null,classes: option.className,style: option.style.cssText});} else {this.parsed.push({array_index: this.parsed.length,options_index: this.options_index,empty: true});}
return this.options_index += 1;}};SelectParser.prototype.escapeExpression = function(text) {var map, unsafe_chars;if ((text == null) || text === false) {return "";}
if (!/[\&\<\>\"\'\`]/.test(text)) {return text;}
map = {"<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#x27;","`": "&#x60;"};unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;return text.replace(unsafe_chars, function(chr) {return map[chr] || "&amp;";});};return SelectParser;})();SelectParser.select_to_array = function(select) {var child, parser, _i, _len, _ref;parser = new SelectParser();_ref = select.childNodes;for (_i = 0, _len = _ref.length; _i < _len; _i++) {child = _ref[_i];parser.add_node(child);}
return parser.parsed;};AbstractChosen = (function() {function AbstractChosen(form_field, options) {this.form_field = form_field;this.options = options != null ? options : {};this.label_click_handler = __bind(this.label_click_handler, this);if (!AbstractChosen.browser_is_supported()) {return;}
this.is_multiple = this.form_field.multiple;this.set_default_text();this.set_default_values();this.setup();this.set_up_html();this.register_observers();this.on_ready();}
AbstractChosen.prototype.set_default_values = function() {var _this = this;this.click_test_action = function(evt) {return _this.test_active_click(evt);};this.activate_action = function(evt) {return _this.activate_field(evt);};this.active_field = false;this.mouse_on_container = false;this.results_showing = false;this.result_highlighted = null;this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className);this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;this.disable_search_threshold = this.options.disable_search_threshold || 0;this.disable_search = this.options.disable_search || false;this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;this.group_search = this.options.group_search != null ? this.options.group_search : true;this.search_contains = this.options.search_contains || false;this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;this.max_selected_options = this.options.max_selected_options || Infinity;this.inherit_select_classes = this.options.inherit_select_classes || false;this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY;this.case_sensitive_search = this.options.case_sensitive_search || false;return this.hide_results_on_select = this.options.hide_results_on_select != null ? this.options.hide_results_on_select : true;};AbstractChosen.prototype.set_default_text = function() {if (this.form_field.getAttribute("data-placeholder")) {this.default_text = this.form_field.getAttribute("data-placeholder");} else if (this.is_multiple) {this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;} else {this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;}
this.default_text = this.escape_html(this.default_text);return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;};AbstractChosen.prototype.choice_label = function(item) {if (this.include_group_label_in_selected && (item.group_label != null)) {return "<b class='group-name'>" + item.group_label + "</b>" + item.html;} else {return item.html;}};AbstractChosen.prototype.mouse_enter = function() {return this.mouse_on_container = true;};AbstractChosen.prototype.mouse_leave = function() {return this.mouse_on_container = false;};AbstractChosen.prototype.input_focus = function(evt) {var _this = this;if (this.is_multiple) {if (!this.active_field) {return setTimeout((function() {return _this.container_mousedown();}), 50);}} else {if (!this.active_field) {return this.activate_field();}}};AbstractChosen.prototype.input_blur = function(evt) {var _this = this;if (!this.mouse_on_container) {this.active_field = false;return setTimeout((function() {return _this.blur_test();}), 100);}};AbstractChosen.prototype.label_click_handler = function(evt) {if (this.is_multiple) {return this.container_mousedown(evt);} else {return this.activate_field();}};AbstractChosen.prototype.results_option_build = function(options) {var content, data, data_content, shown_results, _i, _len, _ref;content = '';shown_results = 0;_ref = this.results_data;for (_i = 0, _len = _ref.length; _i < _len; _i++) {data = _ref[_i];data_content = '';if (data.group) {data_content = this.result_add_group(data);} else {data_content = this.result_add_option(data);}
if (data_content !== '') {shown_results++;content += data_content;}
if (options != null ? options.first : void 0) {if (data.selected && this.is_multiple) {this.choice_build(data);} else if (data.selected && !this.is_multiple) {this.single_set_selected_text(this.choice_label(data));}}
if (shown_results >= this.max_shown_results) {break;}}
return content;};AbstractChosen.prototype.result_add_option = function(option) {var classes, option_el;if (!option.search_match) {return '';}
if (!this.include_option_in_results(option)) {return '';}
classes = [];if (!option.disabled && !(option.selected && this.is_multiple)) {classes.push("active-result");}
if (option.disabled && !(option.selected && this.is_multiple)) {classes.push("disabled-result");}
if (option.selected) {classes.push("result-selected");}
if (option.group_array_index != null) {classes.push("group-option");}
if (option.classes !== "") {classes.push(option.classes);}
option_el = document.createElement("li");option_el.className = classes.join(" ");option_el.style.cssText = option.style;option_el.setAttribute("data-option-array-index", option.array_index);option_el.innerHTML = option.search_text;if (option.title) {option_el.title = option.title;}
return this.outerHTML(option_el);};AbstractChosen.prototype.result_add_group = function(group) {var classes, group_el;if (!(group.search_match || group.group_match)) {return '';}
if (!(group.active_options > 0)) {return '';}
classes = [];classes.push("group-result");if (group.classes) {classes.push(group.classes);}
group_el = document.createElement("li");group_el.className = classes.join(" ");group_el.innerHTML = group.search_text;if (group.title) {group_el.title = group.title;}
return this.outerHTML(group_el);};AbstractChosen.prototype.results_update_field = function() {this.set_default_text();if (!this.is_multiple) {this.results_reset_cleanup();}
this.result_clear_highlight();this.results_build();if (this.results_showing) {return this.winnow_results();}};AbstractChosen.prototype.reset_single_select_options = function() {var result, _i, _len, _ref, _results;_ref = this.results_data;_results = [];for (_i = 0, _len = _ref.length; _i < _len; _i++) {result = _ref[_i];if (result.selected) {_results.push(result.selected = false);} else {_results.push(void 0);}}
return _results;};AbstractChosen.prototype.results_toggle = function() {if (this.results_showing) {return this.results_hide();} else {return this.results_show();}};AbstractChosen.prototype.results_search = function(evt) {if (this.results_showing) {return this.winnow_results();} else {return this.results_show();}};AbstractChosen.prototype.winnow_results = function() {var escapedSearchText, highlightRegex, option, regex, results, results_group, searchText, startpos, text, _i, _len, _ref;this.no_results_clear();results = 0;searchText = this.get_search_text();escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");regex = this.get_search_regex(escapedSearchText);highlightRegex = this.get_highlight_regex(escapedSearchText);_ref = this.results_data;for (_i = 0, _len = _ref.length; _i < _len; _i++) {option = _ref[_i];option.search_match = false;results_group = null;if (this.include_option_in_results(option)) {if (option.group) {option.group_match = false;option.active_options = 0;}
if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {results_group = this.results_data[option.group_array_index];if (results_group.active_options === 0 && results_group.search_match) {results += 1;}
results_group.active_options += 1;}
option.search_text = option.group ? option.label : option.html;if (!(option.group && !this.group_search)) {option.search_match = this.search_string_match(option.search_text, regex);if (option.search_match && !option.group) {results += 1;}
if (option.search_match) {if (searchText.length) {startpos = option.search_text.search(highlightRegex);text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);}
if (results_group != null) {results_group.group_match = true;}} else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {option.search_match = true;}}}}
this.result_clear_highlight();if (results < 1 && searchText.length) {this.update_results_content("");return this.no_results(searchText);} else {this.update_results_content(this.results_option_build());return this.winnow_results_set_highlight();}};AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {var regex_anchor, regex_flag;regex_anchor = this.search_contains ? "" : "^";regex_flag = this.case_sensitive_search ? "" : "i";return new RegExp(regex_anchor + escaped_search_string, regex_flag);};AbstractChosen.prototype.get_highlight_regex = function(escaped_search_string) {var regex_anchor, regex_flag;regex_anchor = this.search_contains ? "" : "\\b";regex_flag = this.case_sensitive_search ? "" : "i";return new RegExp(regex_anchor + escaped_search_string, regex_flag);};AbstractChosen.prototype.search_string_match = function(search_string, regex) {var part, parts, _i, _len;if (regex.test(search_string)) {return true;} else if (this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {parts = search_string.replace(/\[|\]/g, "").split(" ");if (parts.length) {for (_i = 0, _len = parts.length; _i < _len; _i++) {part = parts[_i];if (regex.test(part)) {return true;}}}}};AbstractChosen.prototype.choices_count = function() {var option, _i, _len, _ref;if (this.selected_option_count != null) {return this.selected_option_count;}
this.selected_option_count = 0;_ref = this.form_field.options;for (_i = 0, _len = _ref.length; _i < _len; _i++) {option = _ref[_i];if (option.selected) {this.selected_option_count += 1;}}
return this.selected_option_count;};AbstractChosen.prototype.choices_click = function(evt) {evt.preventDefault();this.activate_field();if (!(this.results_showing || this.is_disabled)) {return this.results_show();}};AbstractChosen.prototype.keydown_checker = function(evt) {var stroke, _ref;stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;this.search_field_scale();if (stroke !== 8 && this.pending_backstroke) {this.clear_backstroke();}
switch (stroke) {case 8:this.backstroke_length = this.get_search_field_value().length;break;case 9:if (this.results_showing && !this.is_multiple) {this.result_select(evt);}
this.mouse_on_container = false;break;case 13:if (this.results_showing) {evt.preventDefault();}
break;case 27:if (this.results_showing) {evt.preventDefault();}
break;case 32:if (this.disable_search) {evt.preventDefault();}
break;case 38:evt.preventDefault();this.keyup_arrow();break;case 40:evt.preventDefault();this.keydown_arrow();break;}};AbstractChosen.prototype.keyup_checker = function(evt) {var stroke, _ref;stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;this.search_field_scale();switch (stroke) {case 8:if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {this.keydown_backstroke();} else if (!this.pending_backstroke) {this.result_clear_highlight();this.results_search();}
break;case 13:evt.preventDefault();if (this.results_showing) {this.result_select(evt);}
break;case 27:if (this.results_showing) {this.results_hide();}
break;case 9:case 16:case 17:case 18:case 38:case 40:case 91:break;default:this.results_search();break;}};AbstractChosen.prototype.clipboard_event_checker = function(evt) {var _this = this;if (this.is_disabled) {return;}
return setTimeout((function() {return _this.results_search();}), 50);};AbstractChosen.prototype.container_width = function() {if (this.options.width != null) {return this.options.width;} else {return "" + this.form_field.offsetWidth + "px";}};AbstractChosen.prototype.include_option_in_results = function(option) {if (this.is_multiple && (!this.display_selected_options && option.selected)) {return false;}
if (!this.display_disabled_options && option.disabled) {return false;}
if (option.empty) {return false;}
return true;};AbstractChosen.prototype.search_results_touchstart = function(evt) {this.touch_started = true;return this.search_results_mouseover(evt);};AbstractChosen.prototype.search_results_touchmove = function(evt) {this.touch_started = false;return this.search_results_mouseout(evt);};AbstractChosen.prototype.search_results_touchend = function(evt) {if (this.touch_started) {return this.search_results_mouseup(evt);}};AbstractChosen.prototype.outerHTML = function(element) {var tmp;if (element.outerHTML) {return element.outerHTML;}
tmp = document.createElement("div");tmp.appendChild(element);return tmp.innerHTML;};AbstractChosen.prototype.get_single_html = function() {return "<a class=\"chosen-single chosen-default\">\n  <span>" + this.default_text + "</span>\n  <div><b></b></div>\n</a>\n<div class=\"chosen-drop\">\n  <div class=\"chosen-search\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" />\n  </div>\n  <ul class=\"chosen-results\"></ul>\n</div>";};AbstractChosen.prototype.get_multi_html = function() {return "<ul class=\"chosen-choices\">\n  <li class=\"search-field\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" value=\"" + this.default_text + "\" />\n  </li>\n</ul>\n<div class=\"chosen-drop\">\n  <ul class=\"chosen-results\"></ul>\n</div>";};AbstractChosen.prototype.get_no_results_html = function(terms) {return "<li class=\"no-results\">\n  " + this.results_none_found + " <span>" + terms + "</span>\n</li>";};AbstractChosen.browser_is_supported = function() {if ("Microsoft Internet Explorer" === window.navigator.appName) {return document.documentMode >= 8;}
if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {return false;}
return true;};AbstractChosen.default_multiple_text = "Select Some Options";AbstractChosen.default_single_text = "Select an Option";AbstractChosen.default_no_result_text = "No results match";return AbstractChosen;})();$ = jQuery;$.fn.extend({chosen: function(options) {if (!AbstractChosen.browser_is_supported()) {return this;}
return this.each(function(input_field) {var $this, chosen;$this = $(this);chosen = $this.data('chosen');if (options === 'destroy') {if (chosen instanceof Chosen) {chosen.destroy();}
return;}
if (!(chosen instanceof Chosen)) {$this.data('chosen', new Chosen(this, options));}});}});Chosen = (function(_super) {__extends(Chosen, _super);function Chosen() {_ref = Chosen.__super__.constructor.apply(this, arguments);return _ref;}
Chosen.prototype.setup = function() {this.form_field_jq = $(this.form_field);return this.current_selectedIndex = this.form_field.selectedIndex;};Chosen.prototype.set_up_html = function() {var container_classes, container_props;container_classes = ["chosen-container"];container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));if (this.inherit_select_classes && this.form_field.className) {container_classes.push(this.form_field.className);}
if (this.is_rtl) {container_classes.push("chosen-rtl");}
container_props = {'class': container_classes.join(' '),'title': this.form_field.title};if (this.form_field.id.length) {container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";}
this.container = $("<div />", container_props);this.container.width(this.container_width());if (this.is_multiple) {this.container.html(this.get_multi_html());} else {this.container.html(this.get_single_html());}
this.form_field_jq.hide().after(this.container);this.dropdown = this.container.find('div.chosen-drop').first();this.search_field = this.container.find('input').first();this.search_results = this.container.find('ul.chosen-results').first();this.search_field_scale();this.search_no_results = this.container.find('li.no-results').first();if (this.is_multiple) {this.search_choices = this.container.find('ul.chosen-choices').first();this.search_container = this.container.find('li.search-field').first();} else {this.search_container = this.container.find('div.chosen-search').first();this.selected_item = this.container.find('.chosen-single').first();}
this.results_build();this.set_tab_index();return this.set_label_behavior();};Chosen.prototype.on_ready = function() {return this.form_field_jq.trigger("chosen:ready", {chosen: this});};Chosen.prototype.register_observers = function() {var _this = this;this.container.bind('touchstart.chosen', function(evt) {_this.container_mousedown(evt);});this.container.bind('touchend.chosen', function(evt) {_this.container_mouseup(evt);});this.container.bind('mousedown.chosen', function(evt) {_this.container_mousedown(evt);});this.container.bind('mouseup.chosen', function(evt) {_this.container_mouseup(evt);});this.container.bind('mouseenter.chosen', function(evt) {_this.mouse_enter(evt);});this.container.bind('mouseleave.chosen', function(evt) {_this.mouse_leave(evt);});this.search_results.bind('mouseup.chosen', function(evt) {_this.search_results_mouseup(evt);});this.search_results.bind('mouseover.chosen', function(evt) {_this.search_results_mouseover(evt);});this.search_results.bind('mouseout.chosen', function(evt) {_this.search_results_mouseout(evt);});this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {_this.search_results_mousewheel(evt);});this.search_results.bind('touchstart.chosen', function(evt) {_this.search_results_touchstart(evt);});this.search_results.bind('touchmove.chosen', function(evt) {_this.search_results_touchmove(evt);});this.search_results.bind('touchend.chosen', function(evt) {_this.search_results_touchend(evt);});this.form_field_jq.bind("chosen:updated.chosen", function(evt) {_this.results_update_field(evt);});this.form_field_jq.bind("chosen:activate.chosen", function(evt) {_this.activate_field(evt);});this.form_field_jq.bind("chosen:open.chosen", function(evt) {_this.container_mousedown(evt);});this.form_field_jq.bind("chosen:close.chosen", function(evt) {_this.close_field(evt);});this.search_field.bind('blur.chosen', function(evt) {_this.input_blur(evt);});this.search_field.bind('keyup.chosen', function(evt) {_this.keyup_checker(evt);});this.search_field.bind('keydown.chosen', function(evt) {_this.keydown_checker(evt);});this.search_field.bind('focus.chosen', function(evt) {_this.input_focus(evt);});this.search_field.bind('cut.chosen', function(evt) {_this.clipboard_event_checker(evt);});this.search_field.bind('paste.chosen', function(evt) {_this.clipboard_event_checker(evt);});if (this.is_multiple) {return this.search_choices.bind('click.chosen', function(evt) {_this.choices_click(evt);});} else {return this.container.bind('click.chosen', function(evt) {evt.preventDefault();});}};Chosen.prototype.destroy = function() {$(this.container[0].ownerDocument).unbind('click.chosen', this.click_test_action);if (this.form_field_label.length > 0) {this.form_field_label.unbind('click.chosen');}
if (this.search_field[0].tabIndex) {this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;}
this.container.remove();this.form_field_jq.removeData('chosen');return this.form_field_jq.show();};Chosen.prototype.search_field_disabled = function() {this.is_disabled = this.form_field.disabled || this.form_field_jq.parents('fieldset').is(':disabled');this.container.toggleClass('chosen-disabled', this.is_disabled);this.search_field[0].disabled = this.is_disabled;if (!this.is_multiple) {this.selected_item.unbind('focus.chosen', this.activate_field);}
if (this.is_disabled) {return this.close_field();} else if (!this.is_multiple) {return this.selected_item.bind('focus.chosen', this.activate_field);}};Chosen.prototype.container_mousedown = function(evt) {var _ref1;if (this.is_disabled) {return;}
if (evt && ((_ref1 = evt.type) === 'mousedown' || _ref1 === 'touchstart') && !this.results_showing) {evt.preventDefault();}
if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {if (!this.active_field) {if (this.is_multiple) {this.search_field.val("");}
$(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);this.results_show();} else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {evt.preventDefault();this.results_toggle();}
return this.activate_field();}};Chosen.prototype.container_mouseup = function(evt) {if (evt.target.nodeName === "ABBR" && !this.is_disabled) {return this.results_reset(evt);}};Chosen.prototype.search_results_mousewheel = function(evt) {var delta;if (evt.originalEvent) {delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;}
if (delta != null) {evt.preventDefault();if (evt.type === 'DOMMouseScroll') {delta = delta * 40;}
return this.search_results.scrollTop(delta + this.search_results.scrollTop());}};Chosen.prototype.blur_test = function(evt) {if (!this.active_field && this.container.hasClass("chosen-container-active")) {return this.close_field();}};Chosen.prototype.close_field = function() {$(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);this.active_field = false;this.results_hide();this.container.removeClass("chosen-container-active");this.clear_backstroke();this.show_search_field_default();this.search_field_scale();return this.search_field.blur();};Chosen.prototype.activate_field = function() {if (this.is_disabled) {return;}
this.container.addClass("chosen-container-active");this.active_field = true;this.search_field.val(this.search_field.val());return this.search_field.focus();};Chosen.prototype.test_active_click = function(evt) {var active_container;active_container = $(evt.target).closest('.chosen-container');if (active_container.length && this.container[0] === active_container[0]) {return this.active_field = true;} else {return this.close_field();}};Chosen.prototype.results_build = function() {this.parsing = true;this.selected_option_count = null;this.results_data = SelectParser.select_to_array(this.form_field);if (this.is_multiple) {this.search_choices.find("li.search-choice").remove();} else if (!this.is_multiple) {this.single_set_selected_text();if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {this.search_field[0].readOnly = true;this.container.addClass("chosen-container-single-nosearch");} else {this.search_field[0].readOnly = false;this.container.removeClass("chosen-container-single-nosearch");}}
this.update_results_content(this.results_option_build({first: true}));this.search_field_disabled();this.show_search_field_default();this.search_field_scale();return this.parsing = false;};Chosen.prototype.result_do_highlight = function(el) {var high_bottom, high_top, maxHeight, visible_bottom, visible_top;if (el.length) {this.result_clear_highlight();this.result_highlight = el;this.result_highlight.addClass("highlighted");maxHeight = parseInt(this.search_results.css("maxHeight"), 10);visible_top = this.search_results.scrollTop();visible_bottom = maxHeight + visible_top;high_top = this.result_highlight.position().top + this.search_results.scrollTop();high_bottom = high_top + this.result_highlight.outerHeight();if (high_bottom >= visible_bottom) {return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);} else if (high_top < visible_top) {return this.search_results.scrollTop(high_top);}}};Chosen.prototype.result_clear_highlight = function() {if (this.result_highlight) {this.result_highlight.removeClass("highlighted");}
return this.result_highlight = null;};Chosen.prototype.results_show = function() {if (this.is_multiple && this.max_selected_options <= this.choices_count()) {this.form_field_jq.trigger("chosen:maxselected", {chosen: this});return false;}
this.container.addClass("chosen-with-drop");this.results_showing = true;this.search_field.focus();this.search_field.val(this.get_search_field_value());this.winnow_results();return this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this});};Chosen.prototype.update_results_content = function(content) {return this.search_results.html(content);};Chosen.prototype.results_hide = function() {if (this.results_showing) {this.result_clear_highlight();this.container.removeClass("chosen-with-drop");this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this});}
return this.results_showing = false;};Chosen.prototype.set_tab_index = function(el) {var ti;if (this.form_field.tabIndex) {ti = this.form_field.tabIndex;this.form_field.tabIndex = -1;return this.search_field[0].tabIndex = ti;}};Chosen.prototype.set_label_behavior = function() {this.form_field_label = this.form_field_jq.parents("label");if (!this.form_field_label.length && this.form_field.id.length) {this.form_field_label = $("label[for='" + this.form_field.id + "']");}
if (this.form_field_label.length > 0) {return this.form_field_label.bind('click.chosen', this.label_click_handler);}};Chosen.prototype.show_search_field_default = function() {if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {this.search_field.val(this.default_text);return this.search_field.addClass("default");} else {this.search_field.val("");return this.search_field.removeClass("default");}};Chosen.prototype.search_results_mouseup = function(evt) {var target;target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();if (target.length) {this.result_highlight = target;this.result_select(evt);return this.search_field.focus();}};Chosen.prototype.search_results_mouseover = function(evt) {var target;target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();if (target) {return this.result_do_highlight(target);}};Chosen.prototype.search_results_mouseout = function(evt) {if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {return this.result_clear_highlight();}};Chosen.prototype.choice_build = function(item) {var choice, close_link,_this = this;choice = $('<li />', {"class": "search-choice"}).html("<span>" + (this.choice_label(item)) + "</span>");if (item.disabled) {choice.addClass('search-choice-disabled');} else {close_link = $('<a />', {"class": 'search-choice-close','data-option-array-index': item.array_index});close_link.bind('click.chosen', function(evt) {return _this.choice_destroy_link_click(evt);});choice.append(close_link);}
return this.search_container.before(choice);};Chosen.prototype.choice_destroy_link_click = function(evt) {evt.preventDefault();evt.stopPropagation();if (!this.is_disabled) {return this.choice_destroy($(evt.target));}};Chosen.prototype.choice_destroy = function(link) {if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {if (this.active_field) {this.search_field.focus();} else {this.show_search_field_default();}
if (this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1) {this.results_hide();}
link.parents('li').first().remove();return this.search_field_scale();}};Chosen.prototype.results_reset = function() {this.reset_single_select_options();this.form_field.options[0].selected = true;this.single_set_selected_text();this.show_search_field_default();this.results_reset_cleanup();this.trigger_form_field_change();if (this.active_field) {return this.results_hide();}};Chosen.prototype.results_reset_cleanup = function() {this.current_selectedIndex = this.form_field.selectedIndex;return this.selected_item.find("abbr").remove();};Chosen.prototype.result_select = function(evt) {var high, item;if (this.result_highlight) {high = this.result_highlight;this.result_clear_highlight();if (this.is_multiple && this.max_selected_options <= this.choices_count()) {this.form_field_jq.trigger("chosen:maxselected", {chosen: this});return false;}
if (this.is_multiple) {high.removeClass("active-result");} else {this.reset_single_select_options();}
high.addClass("result-selected");item = this.results_data[high[0].getAttribute("data-option-array-index")];item.selected = true;this.form_field.options[item.options_index].selected = true;this.selected_option_count = null;if (this.is_multiple) {this.choice_build(item);} else {this.single_set_selected_text(this.choice_label(item));}
if (!(this.is_multiple && (!this.hide_results_on_select || (evt.metaKey || evt.ctrlKey)))) {this.results_hide();this.show_search_field_default();}
if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {this.trigger_form_field_change({selected: this.form_field.options[item.options_index].value});}
this.current_selectedIndex = this.form_field.selectedIndex;evt.preventDefault();return this.search_field_scale();}};Chosen.prototype.single_set_selected_text = function(text) {if (text == null) {text = this.default_text;}
if (text === this.default_text) {this.selected_item.addClass("chosen-default");} else {this.single_deselect_control_build();this.selected_item.removeClass("chosen-default");}
return this.selected_item.find("span").html(text);};Chosen.prototype.result_deselect = function(pos) {var result_data;result_data = this.results_data[pos];if (!this.form_field.options[result_data.options_index].disabled) {result_data.selected = false;this.form_field.options[result_data.options_index].selected = false;this.selected_option_count = null;this.result_clear_highlight();if (this.results_showing) {this.winnow_results();}
this.trigger_form_field_change({deselected: this.form_field.options[result_data.options_index].value});this.search_field_scale();return true;} else {return false;}};Chosen.prototype.single_deselect_control_build = function() {if (!this.allow_single_deselect) {return;}
if (!this.selected_item.find("abbr").length) {this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");}
return this.selected_item.addClass("chosen-single-with-deselect");};Chosen.prototype.get_search_field_value = function() {return this.search_field.val();};Chosen.prototype.get_search_text = function() {return this.escape_html($.trim(this.get_search_field_value()));};Chosen.prototype.escape_html = function(text) {return $('<div/>').text(text).html();};Chosen.prototype.winnow_results_set_highlight = function() {var do_high, selected_results;selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();if (do_high != null) {return this.result_do_highlight(do_high);}};Chosen.prototype.no_results = function(terms) {var no_results_html;no_results_html = this.get_no_results_html(terms);this.search_results.append(no_results_html);return this.form_field_jq.trigger("chosen:no_results", {chosen: this});};Chosen.prototype.no_results_clear = function() {return this.search_results.find(".no-results").remove();};Chosen.prototype.keydown_arrow = function() {var next_sib;if (this.results_showing && this.result_highlight) {next_sib = this.result_highlight.nextAll("li.active-result").first();if (next_sib) {return this.result_do_highlight(next_sib);}} else {return this.results_show();}};Chosen.prototype.keyup_arrow = function() {var prev_sibs;if (!this.results_showing && !this.is_multiple) {return this.results_show();} else if (this.result_highlight) {prev_sibs = this.result_highlight.prevAll("li.active-result");if (prev_sibs.length) {return this.result_do_highlight(prev_sibs.first());} else {if (this.choices_count() > 0) {this.results_hide();}
return this.result_clear_highlight();}}};Chosen.prototype.keydown_backstroke = function() {var next_available_destroy;if (this.pending_backstroke) {this.choice_destroy(this.pending_backstroke.find("a").first());return this.clear_backstroke();} else {next_available_destroy = this.search_container.siblings("li.search-choice").last();if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {this.pending_backstroke = next_available_destroy;if (this.single_backstroke_delete) {return this.keydown_backstroke();} else {return this.pending_backstroke.addClass("search-choice-focus");}}}};Chosen.prototype.clear_backstroke = function() {if (this.pending_backstroke) {this.pending_backstroke.removeClass("search-choice-focus");}
return this.pending_backstroke = null;};Chosen.prototype.search_field_scale = function() {var container_width, div, style, style_block, styles, width, _i, _len;if (!this.is_multiple) {return;}
style_block = {position: 'absolute',left: '-1000px',top: '-1000px',display: 'none',whiteSpace: 'pre'};styles = ['fontSize', 'fontStyle', 'fontWeight', 'fontFamily', 'lineHeight', 'textTransform', 'letterSpacing'];for (_i = 0, _len = styles.length; _i < _len; _i++) {style = styles[_i];style_block[style] = this.search_field.css(style);}
div = $('<div />').css(style_block);div.text(this.get_search_field_value());$('body').append(div);width = div.width() + 25;div.remove();container_width = this.container.outerWidth();width = Math.min(container_width - 10, width);return this.search_field.width(width);};Chosen.prototype.trigger_form_field_change = function(extra) {this.form_field_jq.trigger("input", extra);return this.form_field_jq.trigger("change", extra);};return Chosen;})(AbstractChosen);}).call(this);var modalSelect = function () {var ms = {};if (ms.$selects === 0) return;ms.generateHTML = function ( $formGroup, $selectBox ) {var $options = $selectBox.find('option');var isHidePreviewImg = $selectBox.data('hide-preview-img') == true;var selectSize = $selectBox.data('select-size') ? $selectBox.data('select-size') : 'regular';var imagesInRowInLine = $selectBox.data('images-in-row') ? $selectBox.data('images-in-row') : null;var $selectedOption = $selectBox.find('option:selected');var title = $formGroup.find('label').text();var id = $selectBox.attr('id') ? $selectBox.attr('id') : '';var disabledTitle = $selectBox.attr('data-disabled-tool-tip') ? $selectBox.attr('data-disabled-tool-tip') : '';if ( title.length === 0 ) title = $selectBox.data('modal-select-title');$selectedOption = ($selectedOption.length === 0) ? $selectBox.find('option:first-child') : $selectedOption;var html = '<div id="'+id+'_modalSelect" class="modal-select-container" title="'+disabledTitle+'">';html += '<a class="m-s-single">';html += '<span>';html += '<img class="m-s-image-small" src="'+$selectedOption.data('img-src')+'">';html += '<span class="m-s-option-text">'+$selectedOption.html()+'</span>';html += '</span>';html += '<div><b></b></div>';html += '</a>'
html += '</div>';var $modalSelect = $(html);if ( isHidePreviewImg ) {$modalSelect.find('img.m-s-image-small').remove();$modalSelect.find('span.m-s-option-text').addClass('m-s-no-preview-img');}
if ( selectSize == 'small' ) {$modalSelect.find('.m-s-single').css('padding','6px');}
$modalSelect.find('a').click(function(){if ( $modalSelect.hasClass('disabled') ) return;$modalSelect.addClass('modal-select-container-active');ms.generateModal($selectBox,$modalSelect,title,imagesInRowInLine);});return $modalSelect;}
ms.generateInlineHTML = function ( $formGroup, $selectBox ) {var $options = $selectBox.find('option');var $selectedOption = $selectBox.find('option:selected');var title = $formGroup.find('label').text();var id = $selectBox.attr('id') ? $selectBox.attr('id') : '';if ( title.length === 0 ) title = $selectBox.data('modal-select-title');$selectedOption = ($selectedOption.length === 0) ? $selectBox.find('option:first-child') : $selectedOption;var html = '<div id="'+id+'_inlineSelect" class="modal-select-inline-container fancy-scrollbar">';$.each($options,function(index,option){html += '<div class="inlineSelectItem m-s-option-btn" data-value="'+$(option).val()+'">';html += '<img class="m-s-i-img" src="'+$(option).data('img-src')+'">';html += '</div>';});html += '</div>';var $modalSelect = $(html);$modalSelect.find('.m-s-option-btn').click(function() {optionSelect($(this),$modalSelect,$selectBox,$modalSelect,'',true);if ( $selectBox.data('pages-settings-select') ) {ms.inlineHTMLChange($(this));}});return $modalSelect;}
ms.inlineHTMLChange = function( $option ) {$("#wizardForm").off('ajaxSuccess').one( 'ajaxSuccess', function( event ) {if ( !IsPreviewAtHomepage() ) {isPreviewReload = true;RefreshPreview();} else {UpdatePreviewAreaByAjax('#s123ModulesContainer',false,false,'');if ( $option.data('section-id') ) {window.scrollPreview = '#section-'+$option.data('section-id');scrollToPointInPreview();}}});AutoSaveWizard(false,true);}
ms.generateModal = function( $selectBox, $modalSelect, title, imagesInRowInLine ) {var $options = $selectBox.find('option');var $imageSwitch = $selectBox.data('image-switch') ? true : false;var html = '<div class="row m-s-options">';$options.each(function(index,value) {var $option = $(value);html += '<div class="col-xs-12 '+($options.length < 2 ? 'col-sm-4' : ( $.isNumeric(imagesInRowInLine) ? 'col-sm-'+(12 / imagesInRowInLine) : 'col-sm-6') )+'">';html += '<div class="m-s-option-btn'+($option.prop('selected') ? ' active' : '')+'" data-value="'+$option.val()+'">';if ( $option.text().length > 0 ) {html += '<p>'+$option.text()+'</p>';}
if ( $imageSwitch ) {html += '<div class="image-switch-container">';html += '<div class="image-switch">';html += '<img class="first-image" src="'+$option.data('img-src')+'"> ';html += '</div>';html += '<div class="image-switch second-image">';html += '<img src="'+$option.data('second-img-src')+'">';html += '</div>';html += '</div>';} else {html += '<img src="'+$option.data('img-src')+'">';}
html += '</div>';html += '</div>';});html += '</div>';var $html = $(html);var $dialog = bootbox.dialog({title: title,message: html,backdrop: true,className: 's123-modal',onEscape: function(){$modalSelect.removeClass('modal-select-container-active');}});$dialog.init(function(){$dialog.prop('id','modalSelect');$dialog.find('.modal-body').css('max-height',window.innerHeight-200).css('overflow-y','auto');if ( $selectBox.data('modal-size') ) {$dialog.find('.modal-dialog').addClass($selectBox.data('modal-size'));}
if ( $selectBox.data('image-size') ) {$dialog.find('img').css('width',$selectBox.data('image-size')).css('height',$selectBox.data('image-size'));} else if ( $selectBox.data('image-fit') ) {$dialog.find('img').css('height','auto').css('width','100%').css('object-fit','contain');} else if ( $selectBox.data('image-height') || $selectBox.data('image-width')) {if ( $selectBox.data('image-width') && !$selectBox.data('image-height') ) {$dialog.find('img').css('width',$selectBox.data('image-width')).css('height','auto');} else if ( $selectBox.data('image-height') && !$selectBox.data('image-width') ) {$dialog.find('img').css('width','100%').css('height',$selectBox.data('image-height'));} else {$dialog.find('img').css('width',$selectBox.data('image-width')).css('height',$selectBox.data('image-height'));}}
$dialog.find('.m-s-option-btn').click(function() {optionSelect($(this),$html,$selectBox,$modalSelect,$dialog,false);});});};function optionSelect( $button, $html, $selectBox, $modalSelect, $dialog, inline ) {$html.find('.m-s-option-btn').removeClass('active');$selectBox.val($button.data('value'));$button.addClass('active');if (!inline) {$modalSelect.find('.m-s-single img').prop('src',$button.find('img').prop('src'));$modalSelect.find('.m-s-single .m-s-option-text').html($button.find('p').html());$modalSelect.removeClass('modal-select-container-active');$selectBox.trigger('modal-select-click');}
$selectBox.trigger('change');if (!inline) $dialog.modal('hide');}
ms.init = function() {ms.$selects = $('select.modal-select:not([data-modal-select-initialized="true"])');ms.$selects.each(function(index,value) {var $selectBox = $(value);var $formGroup = $selectBox.closest('.form-group');$selectBox.hide();if ( $selectBox.data('inline-select')) {$formGroup.append(ms.generateInlineHTML($formGroup,$selectBox));} else {$formGroup.append(ms.generateHTML($formGroup,$selectBox));}
$selectBox.attr('data-modal-select-initialized',true);});};return ms;}();modalSelect.init();//Run when the page load (before images and other resource)
jQuery(function($) {SearchDomain.init();});function Progressbar(title) {var that = this;this.box = bootbox.dialog({closeButton: false,title: title,message: '<div id="ajaxLoadingProgressbar" class="progress pos-rel" data-percent="0%"><div class="progress-bar" style="width:0%;"></div></div>'});this.$pb = $('#ajaxLoadingProgressbar');this.start = function(interval) {this.refreshProgressbar = setInterval(function() {that.percent = parseInt(that.$pb.attr('data-percent'));if ( that.percent < 100 ) {that.percent += 1;that.update(that.percent);}
if ( that.percent >= 95 ) {that.stop();if (!that.finished) return;setTimeout(function() {if (that.callback) that.callback();that.box.modal('hide');}, 2000);}}, interval);};this.update = function(percent) {that.$pb.attr('data-percent',percent + '%').children('.progress-bar').width(percent + '%');};this.finish = function(callback) {that.finished = true;that.callback = callback;that.stop();that.start(10);};this.stop = function(callback) {clearInterval(that.refreshProgressbar);};}
function clone(obj) {if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
return obj;var temp = obj.constructor(); // changed
for(var key in obj) {if(Object.prototype.hasOwnProperty.call(obj, key)) {obj['isActiveClone'] = null;temp[key] = clone(obj[key]);delete obj['isActiveClone'];}}
return temp;}
function PopupCenter(url, title, w, h) {w = $(window).width()-150;h = $(window).height()-100;var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;var left = ((width / 2) - (w / 2)) + dualScreenLeft;var top = ((height / 2) - (h / 2)) + dualScreenTop;var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);if (window.focus) {newWindow.focus();}}
function mixPanelEvent(active,e) {try {if (active==true) {mixpanel.track(e);}}
catch(err) {console.log('mixpanel error');}}
function mixPanelEventV1(active,e,identify) {try {if (active==true) {mixpanel.identify(identify);mixpanel.track(e);}}
catch(err) {}}
function trackJsEvent(active,e) {try {if (active==true) {if (window.TrackJS) {TrackJS.track(e);}}}
catch(err) {console.log('trackJs error');}}
var topWindow = function() {var win = window;var top = win;while ( win.parent != win ) {try {win.parent.document;top = win.parent;} catch (e) {}
win = win.parent;}
return top;}();jQuery.fn.extend({onEnterKey: function( callback ) {this.each( function() {$(this).keydown( function( event ) {if ( event.which === 13 ) {callback.call(this,event);}});});}});var SearchDomain = function() {var SearchDomain = {};SearchDomain.init = function() {$('.SetDomainQuickSearchWidget').each(function() {var $thisDomainWidget = $(this);$thisDomainWidget.removeClass('SetDomainQuickSearchWidget'); //We remove the class so we will not built it again and again
var domainWidgetID = $thisDomainWidget.attr('id');var SearchDomainSettings = {};SearchDomainSettings.websiteID              = $thisDomainWidget.data('website-id');SearchDomainSettings.domainInit             = $thisDomainWidget.data('load-domain');SearchDomainSettings.insideWizard           = $thisDomainWidget.data('wizard');SearchDomainSettings.insidePublish          = $thisDomainWidget.data('publish');SearchDomainSettings.insideDashboard        = $thisDomainWidget.data('dashboard');SearchDomainSettings.insideSearchDomain     = $thisDomainWidget.data('search-domain');SearchDomainSettings.designStyle            = $thisDomainWidget.data('design-style');SearchDomainSettings.upgradeReason          = $thisDomainWidget.data('upgrade-reason') != undefined ? $thisDomainWidget.data('upgrade-reason') : 'multiDomainResult';$.get( '/manager/domain/checkDomainAvailabilityReturnHTML.php', {w: SearchDomainSettings.websiteID,insideWizard: SearchDomainSettings.insideWizard,insidePublish: SearchDomainSettings.insidePublish,insideDashboard: SearchDomainSettings.insideDashboard,insideSearchDomain: SearchDomainSettings.insideSearchDomain,systemDomainsList: SearchDomainSettings.systemDomainsList,d: SearchDomainSettings.domainInit,api_type: 'suggest_domain',}).done(function( data ) {$('#'+domainWidgetID).html(data);var $searchDomainForm     = $('#'+domainWidgetID).find('.SearchDomain_searchDomainFormAjax');var $domainName           = $searchDomainForm.find('.SearchDomain_sDomainName');var $tlds                 = $searchDomainForm.find('.SearchDomain_sDomainTlds');var $sdResult             = $searchDomainForm.find('.SearchDomain_sdResult');var $sdBtn                = $searchDomainForm.find('.SearchDomain_sdBtn');var $sdResultBtn          = $searchDomainForm.find('.SearchDomain_sdResultBtn');var $packageNUM           = $searchDomainForm.find('.SearchDomain_packageNUM').val();var $domainInit           = $searchDomainForm.find('.SearchDomain_domainInit').html();var $domainsList          = $('<div class="domains-list" data-max-domains="10" data-max-available="5" data-max-unavailable="5"></div>');var $suggestedDomains     = $('<div class="suggested-domains fancy-scrollbar"></div>');var $domainMoreOptionsBtn = $searchDomainForm.find('.domainMoreOptionsBtn');$suggestedDomains.append($domainsList);$suggestedDomains.addClass(SearchDomainSettings.designStyle);if ( $domainInit != '' ) {$domainInit = JSON.parse($domainInit);}
$domainName.onEnterKey(function (event) {$sdBtn.trigger('click');event.preventDefault();return false;});$sdBtn.click(function( event ) {event.preventDefault();$sdResultBtn.hide();$sdResult.show();$suggestedDomains.addClass('hidden');$sdResult.html('<i class="ace-icon fal fa-solid fa-spinner fa-spin blue fa-3x"></i>');$sdResult.removeClass('alert-info alert-success alert-danger');if ( $domainName.val().length < 3 ) {$sdResult.addClass('alert-danger');$sdResult.html('<h3 style="margin:10px;padding:10px;">'+translations.minimumDomainLength.replace('{{domain_length}}','<b>3</b>')+'</h3>');return;}
SearchDomain.TryExtractDomain($domainName,$tlds);if (SearchDomainSettings.domainInit!=$domainName.val()+'.'+$tlds.val()) {$.post( '/manager/domain/checkAvailabilityV3_suggest.php', {domainName: $domainName.val(),tlds: $tlds.val(),websiteID: SearchDomainSettings.websiteID});}
$.post( '/manager/domain/checkAvailabilityV3.php', {domainName: $domainName.val(),tlds: $tlds.val(),websiteID: SearchDomainSettings.websiteID,api_type: 'suggest_domain'}).done(function( domain ) {domain = jQuery.parseJSON(domain);$domainsList.empty();var html = '';var href = '';if ( domain.suggestedDomains && Object.keys(domain.suggestedDomains).length ) {var avalibleDomains = Array();var unavailable = Array();$suggestedDomains.removeClass('hidden');domain.suggestedDomains = Object.entries(domain.suggestedDomains);for ( var i = 0 ; i < domain.suggestedDomains.length ; i++ ) {var domainItem = domain.suggestedDomains[i][1];href = '/manager/upgrade/index.php?w='+SearchDomainSettings.websiteID+'&domainName='+encodeURIComponent(domainItem.hostname)+'&tlds='+encodeURIComponent(domainItem.suffix)+'&ur='+encodeURIComponent(SearchDomainSettings.upgradeReason);if ( $packageNUM > 1 )  href += '&domain=1';if ( i == 0 ) {html += generateDomainHtml('first',domainItem,href);} else {html += generateDomainHtml('notFirst',domainItem,href);}
checkAvalibility(domainItem,href,$searchDomainForm);}
$domainsList.append(html);if ( SearchDomainSettings.insideWizard ) $domainMoreOptionsBtn.show();} else {if ( !domain.isValid ) {$sdResult.addClass('alert-danger');html += translations.SorryDomainNotValid.replace('{{domain}}','<b>'+$domainName.val()+'</b>');} else if ( domain.subdomain ) {$sdResult.addClass('alert-danger');html += translations.SorryDomainIsSubDomain.replace('{{domain}}','<b>'+$domainName.val()+'</b>')}
$suggestedDomains.removeClass('hidden');$domainsList.append(html);if ( SearchDomainSettings.insideWizard ) $domainMoreOptionsBtn.hide();}
$sdResult.html(html);setTimeout(function() {fitty('.suggested-domains .domain-name a', {minSize: 7,maxSize: 16});},100);$sdResult.hide();mixPanelEvent(false,"WIZARD - User search a domain in wizard publish popup");function generateDomainHtml( place, domain, href ) {var html = '';place = '';html += '<div class="domain-record '+place+'" data-domain-name="'+domain.fullHostname+'">';html += '<div class="text-left domain-name">';html += domain.fullHostname;html += '</div>';html += '<div class="text-right domain-status" data-domain-name="'+domain.fullHostname+'">';html += '<i class="ace-icon fal fa-solid fa-spinner fa-spin"></i>';html +=  '</div>';html += '</div>';return html;}
function checkAvalibility( domainItem, href, $searchDomainForm ) {$.post('/manager/domain/checkAvailabilitySuggestedDomains.php', {domainName: domainItem.hostname,tlds: domainItem.suffix}).done(function( domain ) {domain = tryParseJSON(domain);if ( !domain ) return;var $loading = $searchDomainForm.find('.domain-status[data-domain-name="'+domain.fullHostname+'"] i');if ( domain.available ) {$loading.replaceWith('<a '+(href ? 'target="_blank" href="'+href+'"' :'' )+' data-toggle="quickPay" data-q-p-suggested-domain="'+domainItem.fullHostname+'"><span class="label label-success label-fix">'+translations.suggestedDomains.avalible+'</span></a>');} else {$loading.replaceWith('<span class="label label-danger label-fix">'+translations.suggestedDomains.notAvalible+'</span>');}});}});});if ( SearchDomainSettings.insideWizard ) {$('#domainMoreOptions').on('show.bs.modal', function ( event ) {var modal = $(this);var button = $(event.relatedTarget);var heighestHeightNUM = ace.vars['touch'] ? $(window).outerHeight(true) - 300 : $(window).outerHeight(true) - 200;modal.find('.modal-body').html('<iframe id="domainOptionsModuleIframe" name="domainOptionsModuleIframe" src="/manager/domain/getDomainMoreOptionsHTML.php?w='+SearchDomainSettings.websiteID+'&domain='+$domainName.val()+'&tld='+$tlds.val()+'&packageNUM='+$packageNUM+'&from=1&isIframe=true" style="width:100%;margin:0;padding:0;border:0;height:'+heighestHeightNUM+'px;"></iframe>');});}
if ( $domainInit.hostname && $domainInit.suffix ) {$domainName.val($domainInit.hostname);$tlds.val($domainInit.suffix);$sdBtn.trigger('click');}
(function(){$suggestedDomains.insertBefore($sdResult);})();});});};SearchDomain.TryExtractDomain = function( $domainName, $tlds ) {var d = $domainName.val();d = d.toLowerCase();if ( d.substring(0,4) === 'www.' ) d = d.substr(4);d = d.replace(/\s+/g, '-');if ( d.indexOf('.') !== -1 ) {var tld = d.substr(d.indexOf('.')+1);if ( $tlds.find('option[value="'+tld+'"]').length > 0 ) {$tlds.val(tld);d = d.replace('.'+tld,'');}}
$domainName.val(d);}
return SearchDomain;}();function getImageWRV1( size, path, isImgObj = false ) {if ( isImgObj ) {path = getImageWRV1Propery(path,'n');}
if ( !size || !path ) return path;var ext = path.split('.').pop();path = setImagesCDN(path);if ( ext === 'svg' ) return path;return path.replace('normal_',size+'_');}
function getImageWRV1Propery( path, propName ) {var obj = tryParseJSON(path);if ( obj != false && obj[propName]) {return obj[propName];}
return path;}
function setImagesCDN( path ) {if ( !path ) return path;if ( $GLOBALS['is_local_server'] ) return path;try {var Url = new URL(path);var host = Url.host.toLowerCase();if ( host === 'cdn-cms-localhost.f-static.com' ) {return path;} else if ( host === 'second-cdn.f-static.com' || host.indexOf("cdn-cms") !== -1 || host.indexOf("s123-cdn") !== -1 ) {path = path.replace(host,'static1.s123-cdn-static-a.com');}} catch (e) {}
return path;}
function autofitIframe() {if ( $(window.frameElement).length === 0 ) return;$(window.frameElement).height(window.frameElement.contentWindow.document.body.scrollHeight);}/* ========================================================================
 * bootstrap-tour - v0.10.2
 * http://bootstraptour.com
 * ========================================================================
 * Copyright 2012-2015 Ulrich Sossou
 *
 * ========================================================================
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

!function(t,e){var o,n;return n=e.document,o=function(){function o(o){var n;try{n=e.localStorage}catch(r){n=!1}this._options=t.extend({name:"tour",steps:[],container:"body",autoscroll:!0,keyboard:!0,storage:n,debug:!1,backdrop:!1,backdropContainer:"body",backdropPadding:0,redirect:!0,orphan:!1,duration:!1,delay:!1,basePath:"",template:'<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> <button class="btn btn-sm btn-default" data-role="end">End tour</button> </div> </div>',afterSetState:function(){},afterGetState:function(){},afterRemoveState:function(){},onStart:function(){},onEnd:function(){},onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onNext:function(){},onPrev:function(){},onPause:function(){},onResume:function(){},onRedirectError:function(){}},o),this._force=!1,this._inited=!1,this._current=null,this.backdrop={overlay:null,$element:null,$background:null,backgroundShown:!1,overlayElementShown:!1}}return o.prototype.addSteps=function(t){var e,o,n;for(o=0,n=t.length;n>o;o++)e=t[o],this.addStep(e);return this},o.prototype.addStep=function(t){return this._options.steps.push(t),this},o.prototype.getStep=function(e){return null!=this._options.steps[e]?t.extend({id:"step-"+e,path:"",host:"",placement:"right",title:"",content:"<p></p>",next:e===this._options.steps.length-1?-1:e+1,prev:e-1,animation:!0,container:this._options.container,autoscroll:this._options.autoscroll,backdrop:this._options.backdrop,backdropContainer:this._options.backdropContainer,backdropPadding:this._options.backdropPadding,redirect:this._options.redirect,reflexElement:this._options.steps[e].element,orphan:this._options.orphan,duration:this._options.duration,delay:this._options.delay,template:this._options.template,onShow:this._options.onShow,onShown:this._options.onShown,onHide:this._options.onHide,onHidden:this._options.onHidden,onNext:this._options.onNext,onPrev:this._options.onPrev,onPause:this._options.onPause,onResume:this._options.onResume,onRedirectError:this._options.onRedirectError},this._options.steps[e]):void 0},o.prototype.init=function(t){return this._force=t,this.ended()?(this._debug("Tour ended, init prevented."),this):(this.setCurrentStep(),this._initMouseNavigation(),this._initKeyboardNavigation(),this._onResize(function(t){return function(){return t.showStep(t._current)}}(this)),null!==this._current&&this.showStep(this._current),this._inited=!0,this)},o.prototype.start=function(t){var e;return null==t&&(t=!1),this._inited||this.init(t),null===this._current&&(e=this._makePromise(null!=this._options.onStart?this._options.onStart(this):void 0),this._callOnPromiseDone(e,this.showStep,0)),this},o.prototype.next=function(){var t;return t=this.hideStep(this._current),this._callOnPromiseDone(t,this._showNextStep)},o.prototype.prev=function(){var t;return t=this.hideStep(this._current),this._callOnPromiseDone(t,this._showPrevStep)},o.prototype.goTo=function(t){var e;return e=this.hideStep(this._current),this._callOnPromiseDone(e,this.showStep,t)},o.prototype.end=function(){var o,r;return o=function(o){return function(){return t(n).off("click.tour-"+o._options.name),t(n).off("keyup.tour-"+o._options.name),t(e).off("resize.tour-"+o._options.name),o._setState("end","yes"),o._inited=!1,o._force=!1,o._clearTimer(),null!=o._options.onEnd?o._options.onEnd(o):void 0}}(this),r=this.hideStep(this._current),this._callOnPromiseDone(r,o)},o.prototype.ended=function(){return!this._force&&!!this._getState("end")},o.prototype.restart=function(){return this._removeState("current_step"),this._removeState("end"),this._removeState("redirect_to"),this.start()},o.prototype.pause=function(){var t;return t=this.getStep(this._current),t&&t.duration?(this._paused=!0,this._duration-=(new Date).getTime()-this._start,e.clearTimeout(this._timer),this._debug("Paused/Stopped step "+(this._current+1)+" timer ("+this._duration+" remaining)."),null!=t.onPause?t.onPause(this,this._duration):void 0):this},o.prototype.resume=function(){var t;return t=this.getStep(this._current),t&&t.duration?(this._paused=!1,this._start=(new Date).getTime(),this._duration=this._duration||t.duration,this._timer=e.setTimeout(function(t){return function(){return t._isLast()?t.next():t.end()}}(this),this._duration),this._debug("Started step "+(this._current+1)+" timer with duration "+this._duration),null!=t.onResume&&this._duration!==t.duration?t.onResume(this,this._duration):void 0):this},o.prototype.hideStep=function(e){var o,n,r;return(r=this.getStep(e))?(this._clearTimer(),n=this._makePromise(null!=r.onHide?r.onHide(this,e):void 0),o=function(o){return function(){var n;return n=t(r.element),n.data("bs.popover")||n.data("popover")||(n=t("body")),n.popover("destroy").removeClass("tour-"+o._options.name+"-element tour-"+o._options.name+"-"+e+"-element"),n.removeData("bs.popover"),r.reflex&&t(r.reflexElement).removeClass("tour-step-element-reflex").off(""+o._reflexEvent(r.reflex)+".tour-"+o._options.name),r.backdrop&&o._hideBackdrop(),null!=r.onHidden?r.onHidden(o):void 0}}(this),this._callOnPromiseDone(n,o),n):void 0},o.prototype.showStep=function(t){var o,r,i,s;return this.ended()?(this._debug("Tour ended, showStep prevented."),this):(s=this.getStep(t))?(i=t<this._current,o=this._makePromise(null!=s.onShow?s.onShow(this,t):void 0),r=function(e){return function(){var o,r;if(e.setCurrentStep(t),o=function(){switch({}.toString.call(s.path)){case"[object Function]":return s.path();case"[object String]":return this._options.basePath+s.path;default:return s.path}}.call(e),!e._isRedirect(s.host,o,n.location)||(e._redirect(s,t,o),e._isJustPathHashDifferent(s.host,o,n.location))){if(e._isOrphan(s)){if(s.orphan===!1)return e._debug("Skip the orphan step "+(e._current+1)+".\nOrphan option is false and the element does not exist or is hidden."),i?e._showPrevStep():e._showNextStep(),void 0;e._debug("Show the orphan step "+(e._current+1)+". Orphans option is true.")}return s.backdrop&&e._showBackdrop(s),r=function(){return e.getCurrentStep()!==t||e.ended()?void 0:(null!=s.element&&s.backdrop&&e._showOverlayElement(s),e._showPopover(s,t),null!=s.onShown&&s.onShown(e),e._debug("Step "+(e._current+1)+" of "+e._options.steps.length))},s.autoscroll?e._scrollIntoView(s.element,r):r(),s.duration?e.resume():void 0}}}(this),s.delay?(this._debug("Wait "+s.delay+" milliseconds to show the step "+(this._current+1)),e.setTimeout(function(t){return function(){return t._callOnPromiseDone(o,r)}}(this),s.delay)):this._callOnPromiseDone(o,r),o):void 0},o.prototype.getCurrentStep=function(){return this._current},o.prototype.setCurrentStep=function(t){return null!=t?(this._current=t,this._setState("current_step",t)):(this._current=this._getState("current_step"),this._current=null===this._current?null:parseInt(this._current,10)),this},o.prototype.redraw=function(){return this._showOverlayElement(this.getStep(this.getCurrentStep()).element,!0)},o.prototype._setState=function(t,e){var o,n;if(this._options.storage){n=""+this._options.name+"_"+t;try{this._options.storage.setItem(n,e)}catch(r){o=r,o.code===DOMException.QUOTA_EXCEEDED_ERR&&this._debug("LocalStorage quota exceeded. State storage failed.")}return this._options.afterSetState(n,e)}return null==this._state&&(this._state={}),this._state[t]=e},o.prototype._removeState=function(t){var e;return this._options.storage?(e=""+this._options.name+"_"+t,this._options.storage.removeItem(e),this._options.afterRemoveState(e)):null!=this._state?delete this._state[t]:void 0},o.prototype._getState=function(t){var e,o;return this._options.storage?(e=""+this._options.name+"_"+t,o=this._options.storage.getItem(e)):null!=this._state&&(o=this._state[t]),(void 0===o||"null"===o)&&(o=null),this._options.afterGetState(t,o),o},o.prototype._showNextStep=function(){var t,e,o;return o=this.getStep(this._current),e=function(t){return function(){return t.showStep(o.next)}}(this),t=this._makePromise(null!=o.onNext?o.onNext(this):void 0),this._callOnPromiseDone(t,e)},o.prototype._showPrevStep=function(){var t,e,o;return o=this.getStep(this._current),e=function(t){return function(){return t.showStep(o.prev)}}(this),t=this._makePromise(null!=o.onPrev?o.onPrev(this):void 0),this._callOnPromiseDone(t,e)},o.prototype._debug=function(t){return this._options.debug?e.console.log("Bootstrap Tour '"+this._options.name+"' | "+t):void 0},o.prototype._isRedirect=function(t,e,o){var n;return""!==t&&this._isHostDifferent(t,o.href)?!0:(n=[o.pathname,o.search,o.hash].join(""),null!=e&&""!==e&&("[object RegExp]"==={}.toString.call(e)&&!e.test(n)||"[object String]"==={}.toString.call(e)&&this._isPathDifferent(e,n)))},o.prototype._isHostDifferent=function(t,e){return this._getProtocol(t)!==this._getProtocol(e)||this._getHost(t)!==this._getHost(e)},o.prototype._isPathDifferent=function(t,e){return this._getPath(t)!==this._getPath(e)||!this._equal(this._getQuery(t),this._getQuery(e))||!this._equal(this._getHash(t),this._getHash(e))},o.prototype._isJustPathHashDifferent=function(t,e,o){var n;return""!==t&&this._isHostDifferent(t,o.href)?!1:(n=[o.pathname,o.search,o.hash].join(""),"[object String]"==={}.toString.call(e)?this._getPath(e)===this._getPath(n)&&this._equal(this._getQuery(e),this._getQuery(n))&&!this._equal(this._getHash(e),this._getHash(n)):!1)},o.prototype._redirect=function(e,o,r){if(t.isFunction(e.redirect))return e.redirect.call(this,r);if(e.redirect===!0){if(this._debug("Redirect to "+e.host+r),this._getState("redirect_to")!==""+o)return this._setState("redirect_to",""+o),n.location.href=""+e.host+r;if(this._debug("Error redirection loop to "+r),this._removeState("redirect_to"),null!=e.onRedirectError)return e.onRedirectError(this)}},o.prototype._isOrphan=function(e){return null==e.element||!t(e.element).length||t(e.element).is(":hidden")&&"http://www.w3.org/2000/svg"!==t(e.element)[0].namespaceURI},o.prototype._isLast=function(){return this._current<this._options.steps.length-1},o.prototype._showPopover=function(e,o){var n,r,i,s,a;return t(".tour-"+this._options.name).remove(),s=t.extend({},this._options),i=this._isOrphan(e),e.template=this._template(e,o),i&&(e.element="body",e.placement="top"),n=t(e.element),n.addClass("tour-"+this._options.name+"-element tour-"+this._options.name+"-"+o+"-element"),e.options&&t.extend(s,e.options),e.reflex&&!i&&t(e.reflexElement).addClass("tour-step-element-reflex").off(""+this._reflexEvent(e.reflex)+".tour-"+this._options.name).on(""+this._reflexEvent(e.reflex)+".tour-"+this._options.name,function(t){return function(){return t._isLast()?t.next():t.end()}}(this)),a=e.smartPlacement===!0&&-1===e.placement.search(/auto/i),n.popover({placement:a?"auto "+e.placement:e.placement,trigger:"manual",title:e.title,content:e.content,html:!0,animation:e.animation,container:e.container,template:e.template,selector:e.element}).popover("show"),r=n.data("bs.popover")?n.data("bs.popover").tip():n.data("popover").tip(),r.attr("id",e.id),this._reposition(r,e),i?this._center(r):void 0},o.prototype._template=function(e,o){var n,r,i,s,a,p;return p=e.template,this._isOrphan(e)&&"[object Boolean]"!=={}.toString.call(e.orphan)&&(p=e.orphan),a=t.isFunction(p)?t(p(o,e)):t(p),n=a.find(".popover-navigation"),i=n.find('[data-role="prev"]'),r=n.find('[data-role="next"]'),s=n.find('[data-role="pause-resume"]'),this._isOrphan(e)&&a.addClass("orphan"),a.addClass("tour-"+this._options.name+" tour-"+this._options.name+"-"+o),e.reflex&&a.addClass("tour-"+this._options.name+"-reflex"),e.prev<0&&(i.addClass("disabled"),i.prop("disabled",!0)),e.next<0&&(r.addClass("disabled"),r.prop("disabled",!0)),e.duration||s.remove(),a.clone().wrap("<div>").parent().html()},o.prototype._reflexEvent=function(t){return"[object Boolean]"==={}.toString.call(t)?"click":t},o.prototype._reposition=function(e,o){var r,i,s,a,p,u,h;if(a=e[0].offsetWidth,i=e[0].offsetHeight,h=e.offset(),p=h.left,u=h.top,r=t(n).outerHeight()-h.top-e.outerHeight(),0>r&&(h.top=h.top+r),s=t("html").outerWidth()-h.left-e.outerWidth(),0>s&&(h.left=h.left+s),h.top<0&&(h.top=0),h.left<0&&(h.left=0),e.offset(h),"bottom"===o.placement||"top"===o.placement){if(p!==h.left)return this._replaceArrow(e,2*(h.left-p),a,"left")}else if(u!==h.top)return this._replaceArrow(e,2*(h.top-u),i,"top")},o.prototype._center=function(o){return o.css("top",t(e).outerHeight()/2-o.outerHeight()/2)},o.prototype._replaceArrow=function(t,e,o,n){return t.find(".arrow").css(n,e?50*(1-e/o)+"%":"")},o.prototype._scrollIntoView=function(o,n){var r,i,s,a,p,u;return r=t(o),r.length?(i=t(e),a=r.offset().top,u=i.height(),p=Math.max(0,a-u/2),this._debug("Scroll into view. ScrollTop: "+p+". Element offset: "+a+". Window height: "+u+"."),s=0,t("body, html").stop(!0,!0).animate({scrollTop:Math.ceil(p)},function(t){return function(){return 2===++s?(n(),t._debug("Scroll into view.\nAnimation end element offset: "+r.offset().top+".\nWindow height: "+i.height()+".")):void 0}}(this))):n()},o.prototype._onResize=function(o,n){return t(e).on("resize.tour-"+this._options.name,function(){return clearTimeout(n),n=setTimeout(o,100)})},o.prototype._initMouseNavigation=function(){var e;return e=this,t(n).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='prev']").off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='next']").off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='end']").off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='pause-resume']").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='next']",function(t){return function(e){return e.preventDefault(),t.next()}}(this)).on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='prev']",function(t){return function(e){return e.preventDefault(),t.prev()}}(this)).on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='end']",function(t){return function(e){return e.preventDefault(),t.end()}}(this)).on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role='pause-resume']",function(o){var n;return o.preventDefault(),n=t(this),n.text(e._paused?n.data("pause-text"):n.data("resume-text")),e._paused?e.resume():e.pause()})},o.prototype._initKeyboardNavigation=function(){return this._options.keyboard?t(n).on("keyup.tour-"+this._options.name,function(t){return function(e){if(e.which)switch(e.which){case 39:return e.preventDefault(),t._isLast()?t.next():t.end();case 37:if(e.preventDefault(),t._current>0)return t.prev();break;case 27:return e.preventDefault(),t.end()}}}(this)):void 0},o.prototype._makePromise=function(e){return e&&t.isFunction(e.then)?e:null},o.prototype._callOnPromiseDone=function(t,e,o){return t?t.then(function(t){return function(){return e.call(t,o)}}(this)):e.call(this,o)},o.prototype._showBackdrop=function(e){return this.backdrop.backgroundShown?void 0:(this.backdrop=t("<div>",{"class":"tour-backdrop"}),this.backdrop.backgroundShown=!0,t(e.backdropContainer).append(this.backdrop))},o.prototype._hideBackdrop=function(){return this._hideOverlayElement(),this._hideBackground()},o.prototype._hideBackground=function(){return this.backdrop?(this.backdrop.remove(),this.backdrop.overlay=null,this.backdrop.backgroundShown=!1):void 0},o.prototype._showOverlayElement=function(e,o){var n,r;return n=t(e.element),!n||0===n.length||this.backdrop.overlayElementShown&&!o?void 0:(this.backdrop.overlayElementShown||(this.backdrop.$element=n.addClass("tour-step-backdrop"),this.backdrop.$background=t("<div>",{"class":"tour-step-background"}),this.backdrop.$background.appendTo(e.backdropContainer),this.backdrop.overlayElementShown=!0),r={width:n.innerWidth(),height:n.innerHeight(),offset:n.offset()},e.backdropPadding&&(r=this._applyBackdropPadding(e.backdropPadding,r)),this.backdrop.$background.width(r.width).height(r.height).offset(r.offset))},o.prototype._hideOverlayElement=function(){return this.backdrop.overlayElementShown?(this.backdrop.$element.removeClass("tour-step-backdrop"),this.backdrop.$background.remove(),this.backdrop.$element=null,this.backdrop.$background=null,this.backdrop.overlayElementShown=!1):void 0},o.prototype._applyBackdropPadding=function(t,e){return"object"==typeof t?(null==t.top&&(t.top=0),null==t.right&&(t.right=0),null==t.bottom&&(t.bottom=0),null==t.left&&(t.left=0),e.offset.top=e.offset.top-t.top,e.offset.left=e.offset.left-t.left,e.width=e.width+t.left+t.right,e.height=e.height+t.top+t.bottom):(e.offset.top=e.offset.top-t,e.offset.left=e.offset.left-t,e.width=e.width+2*t,e.height=e.height+2*t),e},o.prototype._clearTimer=function(){return e.clearTimeout(this._timer),this._timer=null,this._duration=null},o.prototype._getProtocol=function(t){return t=t.split("://"),t.length>1?t[0]:"http"},o.prototype._getHost=function(t){return t=t.split("//"),t=t.length>1?t[1]:t[0],t.split("/")[0]},o.prototype._getPath=function(t){return t.replace(/\/?$/,"").split("?")[0].split("#")[0]},o.prototype._getQuery=function(t){return this._getParams(t,"?")},o.prototype._getHash=function(t){return this._getParams(t,"#")},o.prototype._getParams=function(t,e){var o,n,r,i,s;if(n=t.split(e),1===n.length)return{};for(n=n[1].split("&"),r={},i=0,s=n.length;s>i;i++)o=n[i],o=o.split("="),r[o[0]]=o[1]||"";return r},o.prototype._equal=function(t,e){var o,n;if("[object Object]"==={}.toString.call(t)&&"[object Object]"==={}.toString.call(e)){for(o in t)if(n=t[o],e[o]!==n)return!1;for(o in e)if(n=e[o],t[o]!==n)return!1;return!0}return t===e},o}(),e.Tour=o}(jQuery,window);/*!
 * jQuery Browser Plugin 0.1.0
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2015 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 23-11-2015
 */!function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(window.jQuery)}(function(a){"use strict";function b(a){void 0===a&&(a=window.navigator.userAgent),a=a.toLowerCase();var b=/(edge)\/([\w.]+)/.exec(a)||/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(iemobile)[\/]([\w.]+)/.exec(a)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(ipod)/.exec(a)||/(windows phone)/.exec(a)||/(iphone)/.exec(a)||/(kindle)/.exec(a)||/(silk)/.exec(a)||/(android)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/.exec(a)||/(playbook)/.exec(a)||/(bb)/.exec(a)||/(blackberry)/.exec(a)||[],d={},e={browser:b[5]||b[3]||b[1]||"",version:b[2]||b[4]||"0",versionNumber:b[4]||b[2]||"0",platform:c[0]||""};if(e.browser&&(d[e.browser]=!0,d.version=e.version,d.versionNumber=parseInt(e.versionNumber,10)),e.platform&&(d[e.platform]=!0),(d.android||d.bb||d.blackberry||d.ipad||d.iphone||d.ipod||d.kindle||d.playbook||d.silk||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv||d.iemobile){var f="msie";e.browser=f,d[f]=!0}if(d.edge){delete d.edge;var g="msedge";e.browser=g,d[g]=!0}if(d.safari&&d.blackberry){var h="blackberry";e.browser=h,d[h]=!0}if(d.safari&&d.playbook){var i="playbook";e.browser=i,d[i]=!0}if(d.bb){var j="blackberry";e.browser=j,d[j]=!0}if(d.opr){var k="opera";e.browser=k,d[k]=!0}if(d.safari&&d.android){var l="android";e.browser=l,d[l]=!0}if(d.safari&&d.kindle){var m="kindle";e.browser=m,d[m]=!0}if(d.safari&&d.silk){var n="silk";e.browser=n,d[n]=!0}return d.name=e.browser,d.platform=e.platform,d}return window.jQBrowser=b(window.navigator.userAgent),window.jQBrowser.uaMatch=b,a&&(a.browser=window.jQBrowser),window.jQBrowser});;(function() {'use strict';var objectTypes = {'function': true,'object': true};var root = (objectTypes[typeof window] && window) || this;var oldRoot = root;var freeExports = objectTypes[typeof exports] && exports;var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {root = freeGlobal;}
var maxSafeInteger = Math.pow(2, 53) - 1;var reOpera = /\bOpera/;var thisBinding = this;var objectProto = Object.prototype;var hasOwnProperty = objectProto.hasOwnProperty;var toString = objectProto.toString;function capitalize(string) {string = String(string);return string.charAt(0).toUpperCase() + string.slice(1);}
function cleanupOS(os, pattern, label) {var data = {'10.0': '10','6.4':  '10 Technical Preview','6.3':  '8.1','6.2':  '8','6.1':  'Server 2008 R2 / 7','6.0':  'Server 2008 / Vista','5.2':  'Server 2003 / XP 64-bit','5.1':  'XP','5.01': '2000 SP1','5.0':  '2000','4.0':  'NT','4.90': 'ME'};if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&(data = data[/[\d.]+$/.exec(os)])) {os = 'Windows ' + data;}
os = String(os);if (pattern && label) {os = os.replace(RegExp(pattern, 'i'), label);}
os = format(os.replace(/ ce$/i, ' CE')
.replace(/\bhpw/i, 'web')
.replace(/\bMacintosh\b/, 'Mac OS')
.replace(/_PowerPC\b/i, ' OS')
.replace(/\b(OS X) [^ \d]+/i, '$1')
.replace(/\bMac (OS X)\b/, '$1')
.replace(/\/(\d)/, ' $1')
.replace(/_/g, '.')
.replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
.replace(/\bx86\.64\b/gi, 'x86_64')
.replace(/\b(Windows Phone) OS\b/, '$1')
.replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
.split(' on ')[0]);return os;}
function each(object, callback) {var index = -1,length = object ? object.length : 0;if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {while (++index < length) {callback(object[index], index, object);}} else {forOwn(object, callback);}}
function format(string) {string = trim(string);return /^(?:webOS|i(?:OS|P))/.test(string)
? string
: capitalize(string);}
function forOwn(object, callback) {for (var key in object) {if (hasOwnProperty.call(object, key)) {callback(object[key], key, object);}}}
function getClassOf(value) {return value == null
? capitalize(value)
: toString.call(value).slice(8, -1);}
function isHostType(object, property) {var type = object != null ? typeof object[property] : 'number';return !/^(?:boolean|number|string|undefined)$/.test(type) &&(type == 'object' ? !!object[property] : true);}
function qualify(string) {return String(string).replace(/([ -])(?!$)/g, '$1?');}
function reduce(array, callback) {var accumulator = null;each(array, function(value, index) {accumulator = callback(accumulator, value, index, array);});return accumulator;}
function trim(string) {return String(string).replace(/^ +| +$/g, '');}
function parse(ua) {var context = root;var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';if (isCustomContext) {context = ua;ua = null;}
var nav = context.navigator || {};var userAgent = nav.userAgent || '';ua || (ua = userAgent);var isModuleScope = isCustomContext || thisBinding == oldRoot;var likeChrome = isCustomContext
? !!nav.likeChrome
: /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());var objectClass = 'Object',airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',enviroClass = isCustomContext ? objectClass : 'Environment',javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),phantomClass = isCustomContext ? objectClass : 'RuntimeObject';var java = /\bJava/.test(javaClass) && context.java;var rhino = java && getClassOf(context.environment) == enviroClass;var alpha = java ? 'a' : '\u03b1';var beta = java ? 'b' : '\u03b2';var doc = context.document || {};var opera = context.operamini || context.opera;var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
? operaClass
: (opera = null);var data;var arch = ua;var description = [];var prerelease = null;var useFeatures = ua == userAgent;var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();var isSpecialCasedOS;var layout = getLayout([{ 'label': 'EdgeHTML', 'pattern': 'Edge' },'Trident',{ 'label': 'WebKit', 'pattern': 'AppleWebKit' },'iCab','Presto','NetFront','Tasman','KHTML','Gecko']);var name = getName(['Adobe AIR','Arora','Avant Browser','Breach','Camino','Electron','Epiphany','Fennec','Flock','Galeon','GreenBrowser','iCab','Iceweasel','K-Meleon','Konqueror','Lunascape','Maxthon',{ 'label': 'Microsoft Edge', 'pattern': 'Edge' },'Midori','Nook Browser','PaleMoon','PhantomJS','Raven','Rekonq','RockMelt',{ 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },'SeaMonkey',{ 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },'Sleipnir','SlimBrowser',{ 'label': 'SRWare Iron', 'pattern': 'Iron' },'Sunrise','Swiftfox','Waterfox','WebPositive','Opera Mini',{ 'label': 'Opera Mini', 'pattern': 'OPiOS' },'Opera',{ 'label': 'Opera', 'pattern': 'OPR' },'Chrome',{ 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },{ 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },{ 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },{ 'label': 'IE', 'pattern': 'IEMobile' },{ 'label': 'IE', 'pattern': 'MSIE' },'Safari']);var product = getProduct([{ 'label': 'BlackBerry', 'pattern': 'BB10' },'BlackBerry',{ 'label': 'Galaxy S', 'pattern': 'GT-I9000' },{ 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },{ 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },{ 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },{ 'label': 'Galaxy S5', 'pattern': 'SM-G900' },{ 'label': 'Galaxy S6', 'pattern': 'SM-G920' },{ 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },{ 'label': 'Galaxy S7', 'pattern': 'SM-G930' },{ 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },'Google TV','Lumia','iPad','iPod','iPhone','Kindle',{ 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },'Nexus','Nook','PlayBook','PlayStation Vita','PlayStation','TouchPad','Transformer',{ 'label': 'Wii U', 'pattern': 'WiiU' },'Wii','Xbox One',{ 'label': 'Xbox 360', 'pattern': 'Xbox' },'Xoom']);var manufacturer = getManufacturer({'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },'Archos': {},'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },'Asus': { 'Transformer': 1 },'Barnes & Noble': { 'Nook': 1 },'BlackBerry': { 'PlayBook': 1 },'Google': { 'Google TV': 1, 'Nexus': 1 },'HP': { 'TouchPad': 1 },'HTC': {},'LG': {},'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },'Motorola': { 'Xoom': 1 },'Nintendo': { 'Wii U': 1,  'Wii': 1 },'Nokia': { 'Lumia': 1 },'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }});var os = getOS(['Windows Phone','Android','CentOS',{ 'label': 'Chrome OS', 'pattern': 'CrOS' },'Debian','Fedora','FreeBSD','Gentoo','Haiku','Kubuntu','Linux Mint','OpenBSD','Red Hat','SuSE','Ubuntu','Xubuntu','Cygwin','Symbian OS','hpwOS','webOS ','webOS','Tablet OS','Tizen','Linux','Mac OS X','Macintosh','Mac','Windows 98;','Windows ']);function getLayout(guesses) {return reduce(guesses, function(result, guess) {return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);});}
function getManufacturer(guesses) {return reduce(guesses, function(result, value, key) {return result || (value[product] ||value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)) && key;});}
function getName(guesses) {return reduce(guesses, function(result, guess) {return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);});}
function getOS(guesses) {return reduce(guesses, function(result, guess) {var pattern = guess.pattern || qualify(guess);if (!result && (result =
RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua))) {result = cleanupOS(result, pattern, guess.label || guess);}
return result;});}
function getProduct(guesses) {return reduce(guesses, function(result, guess) {var pattern = guess.pattern || qualify(guess);if (!result && (result =
RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua))) {if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {result[0] += ' ' + result[1];}
guess = guess.label || guess;result = format(result[0]
.replace(RegExp(pattern, 'i'), guess)
.replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
.replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));}
return result;});}
function getVersion(patterns) {return reduce(patterns, function(result, pattern) {return result || (RegExp(pattern +'(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;});}
function toStringPlatform() {return this.description || '';}
layout && (layout = [layout]);if (manufacturer && !product) {product = getProduct([manufacturer]);}
if ((data = /\bGoogle TV\b/.exec(product))) {product = data[0];}
if (/\bSimulator\b/i.test(ua)) {product = (product ? product + ' ' : '') + 'Simulator';}
if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {description.push('running in Turbo/Uncompressed mode');}
if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {data = parse(ua.replace(/like iPhone OS/, ''));manufacturer = data.manufacturer;product = data.product;}
else if (/^iP/.test(product)) {name || (name = 'Safari');os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
? ' ' + data[1].replace(/_/g, '.')
: '');}
else if (name == 'Konqueror' && !/buntu/i.test(os)) {os = 'Kubuntu';}
else if ((manufacturer && manufacturer != 'Google' &&((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||(/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
name = 'Android Browser';os = /\bAndroid\b/.test(os) ? os : 'Android';}
else if (name == 'Silk') {if (!/\bMobi/i.test(ua)) {os = 'Android';description.unshift('desktop mode');}
if (/Accelerated *= *true/i.test(ua)) {description.unshift('accelerated');}}
else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {description.push('identifying as Firefox ' + data[1]);}
else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {os || (os = 'Firefox OS');product || (product = data[1]);}
else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {name = null;}
if ((data = product || manufacturer || os) &&(product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';}}
else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {description.push('Chromium ' + data);}
if (!version) {version = getVersion(['(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))','Version',qualify(name),'(?:Firefox|Minefield|NetFront)']);}
if ((data =
layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||/\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||/\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||!layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront')) {layout = [data];}
if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {name += ' Mobile';os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');description.unshift('desktop mode');}
else if (/\bWPDesktop\b/i.test(ua)) {name = 'IE Mobile';os = 'Windows Phone 8.x';description.unshift('desktop mode');version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);}
else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {if (name) {description.push('identifying as ' + name + (version ? ' ' + version : ''));}
name = 'IE';version = data[1];}
if (useFeatures) {if (isHostType(context, 'global')) {if (java) {data = java.lang.System;arch = data.getProperty('os.arch');os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');}
if (rhino) {try {version = context.require('ringo/engine').version.join('.');name = 'RingoJS';} catch(e) {if ((data = context.system) && data.global.system == context.system) {name = 'Narwhal';os || (os = data[0].os || null);}}
if (!name) {name = 'Rhino';}}
else if (typeof context.process == 'object' && !context.process.browser &&(data = context.process)) {if (typeof data.versions == 'object') {if (typeof data.versions.electron == 'string') {description.push('Node ' + data.versions.node);name = 'Electron';version = data.versions.electron;} else if (typeof data.versions.nw == 'string') {description.push('Chromium ' + version, 'Node ' + data.versions.node);name = 'NW.js';version = data.versions.nw;}}
if (!name) {name = 'Node.js';arch = data.arch;os = data.platform;version = /[\d.]+/.exec(data.version);version = version ? version[0] : null;}}}
else if (getClassOf((data = context.runtime)) == airRuntimeClass) {name = 'Adobe AIR';os = data.flash.system.Capabilities.os;}
else if (getClassOf((data = context.phantom)) == phantomClass) {name = 'PhantomJS';version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);}
else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {version = [version, doc.documentMode];if ((data = +data[1] + 4) != version[1]) {description.push('IE ' + version[1] + ' mode');layout && (layout[1] = '');version[1] = data;}
version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];}
else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {description.push('masking as ' + name + ' ' + version);name = 'IE';version = '11.0';layout = ['Trident'];os = 'Windows';}
os = os && format(os);}
if (version && (data =
/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||/(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||/\bMinefield\b/i.test(ua) && 'a')) {prerelease = /b/i.test(data) ? 'beta' : 'alpha';version = version.replace(RegExp(data + '\\+?$'), '') +(prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');}
if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {name = 'Firefox Mobile';}
else if (name == 'Maxthon' && version) {version = version.replace(/\.[\d.]+/, '.x');}
else if (/\bXbox\b/i.test(product)) {if (product == 'Xbox 360') {os = null;}
if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {description.unshift('mobile mode');}}
else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&(os == 'Windows CE' || /Mobi/i.test(ua))) {name += ' Mobile';}
else if (name == 'IE' && useFeatures) {try {if (context.external === null) {description.unshift('platform preview');}} catch(e) {description.unshift('embedded');}}
else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
(RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||version)) {data = [data, /BB10/.test(ua)];os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];version = null;}
else if (this != forOwn && product != 'Wii' && ((useFeatures && opera) ||(/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||(name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||(name == 'IE' && ((os && !/^Win/.test(os) && version > 5.5) ||/\bWindows XP\b/.test(os) && version > 8 ||version == 8 && !/\bTrident\b/.test(ua)))) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');if (reOpera.test(name)) {if (/\bIE\b/.test(data) && os == 'Mac OS') {os = null;}
data = 'identify' + data;}
else {data = 'mask' + data;if (operaClass) {name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));} else {name = 'Opera';}
if (/\bIE\b/.test(data)) {os = null;}
if (!useFeatures) {version = null;}}
layout = ['Presto'];description.push(data);}
if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];if (name == 'Safari' && data[1].slice(-1) == '+') {name = 'WebKit Nightly';prerelease = 'alpha';version = data[1].slice(0, -1);}
else if (version == data[1] ||version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {version = null;}
data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {layout = ['Blink'];}
if (!useFeatures || (!likeChrome && !data[1])) {layout && (layout[1] = 'like Safari');data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');} else {layout && (layout[1] = 'like Chrome');data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');}
layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));if (name == 'Safari' && (!version || parseInt(version) > 45)) {version = data;}}
if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {name += ' ';description.unshift('desktop mode');if (data == 'zvav') {name += 'Mini';version = null;} else {name += 'Mobile';}
os = os.replace(RegExp(' *' + data + '$'), '');}
else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {description.unshift('desktop mode');name = 'Chrome Mobile';version = null;if (/\bOS X\b/.test(os)) {manufacturer = 'Apple';os = 'iOS 4.3+';} else {os = null;}}
if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&ua.indexOf('/' + data + '-') > -1) {os = trim(os.replace(data, ''));}
if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) ||name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {(data = layout[layout.length - 1]) && description.push(data);}
if (description.length) {description = ['(' + description.join('; ') + ')'];}
if (manufacturer && product && product.indexOf(manufacturer) < 0) {description.push('on ' + manufacturer);}
if (product) {description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);}
if (os) {data = / ([\d.+]+)$/.exec(os);isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';os = {'architecture': 32,'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,'version': data ? data[1] : null,'toString': function() {var version = this.version;return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');}};}
if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {if (os) {os.architecture = 64;os.family = os.family.replace(RegExp(' *' + data), '');}
if (name && (/\bWOW64\b/i.test(ua) ||(useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))) {description.unshift('32-bit');}}
else if (os && /^OS X/.test(os.family) &&name == 'Chrome' && parseFloat(version) >= 39) {os.architecture = 64;}
ua || (ua = null);var platform = {};platform.description = ua;platform.layout = layout && layout[0];platform.manufacturer = manufacturer;platform.name = name;platform.prerelease = prerelease;platform.product = product;platform.ua = ua;platform.version = name && version;platform.os = os || {'architecture': null,'family': null,'version': null,'toString': function() { return 'null'; }};platform.parse = parse;platform.toString = toStringPlatform;if (platform.version) {description.unshift(version);}
if (platform.name) {description.unshift(name);}
if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {description.push(product ? '(' + os + ')' : 'on ' + os);}
if (description.length) {platform.description = description.join(' ');}
return platform;}
var platform = parse();if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {root.platform = platform;define(function() {return platform;});}
else if (freeExports && freeModule) {forOwn(platform, function(value, key) {freeExports[key] = value;});}
else {root.platform = platform;}}.call(this));/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var b,c=void 0!==a._data(this.el,"events"),d=new Date;b=this.finalDate.getTime()-d.getTime(),b=Math.ceil(b/1e3),b=!this.options.elapse&&b<0?0:Math.abs(b),this.totalSecsLeft!==b&&c&&(this.totalSecsLeft=b,this.elapsed=d>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-d.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});// Spectrum Colorpicker v1.8.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

(function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) { // AMD
        define(['jquery'], factory);
    }
    else if (typeof exports == "object" && typeof module == "object") { // CommonJS
        module.exports = factory(require('jquery'));
    }
    else { // Browser
        factory(jQuery);
    }
})(function($, undefined) {
    "use strict";

    var defaultOpts = {

        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        color: false,
        flat: false,
        showInput: false,
        allowEmpty: false,
        showButtons: true,
        clickoutFiresChange: true,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        hideAfterPaletteSelect: false,
        togglePaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: false,
        className: "", // Deprecated - use containerClassName and replacerClassName instead.
        containerClassName: "",
        replacerClassName: "",
        showAlpha: false,
        theme: "sp-light",
        palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
        selectionPalette: [],
        disabled: false,
        offset: null
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
        "<div class='sp-replacer'>",
            "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
            "<div class='sp-dd'>&#9660;</div>",
        "</div>"
    ].join(''),
    markup = (function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return [
            "<div class='sp-container sp-hidden'>",
                "<div class='sp-palette-container'>",
                    "<div class='sp-palette sp-thumb sp-cf'></div>",
                    "<div class='sp-palette-button-container sp-cf'>",
                        "<button type='button' class='sp-palette-toggle'></button>",
                    "</div>",
                "</div>",
                "<div class='sp-picker-container'>",
                    "<div class='sp-top sp-cf'>",
                        "<div class='sp-fill'></div>",
                        "<div class='sp-top-inner'>",
                            "<div class='sp-color'>",
                                "<div class='sp-sat'>",
                                    "<div class='sp-val'>",
                                        "<div class='sp-dragger'></div>",
                                    "</div>",
                                "</div>",
                            "</div>",
                            "<div class='sp-clear sp-clear-display'>",
                            "</div>",
                            "<div class='sp-hue'>",
                                "<div class='sp-slider'></div>",
                                gradientFix,
                            "</div>",
                        "</div>",
                        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                    "</div>",
                    "<div class='sp-input-container sp-cf'>",
                        "<input class='sp-input' type='text' spellcheck='false'  />",
                    "</div>",
                    "<div class='sp-initial sp-thumb sp-cf'></div>",
                    "<div class='sp-button-container sp-cf'>",
                        "<a class='sp-cancel' href='#'></a>",
                        "<button type='button' class='sp-choose'></button>",
                    "</div>",
                "</div>",
            "</div>"
        ].join("");
    })();

    function paletteTemplate (p, color, className, opts) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var current = p[i];
            if(current) {
                var tiny = tinycolor(current);
                var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
                var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
                html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
            } else {
                var cls = 'sp-clear-display';
                html.push($('<div />')
                    .append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>')
                        .attr('title', opts.noColorSelectedText)
                    )
                    .html()
                );
            }
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        var opts = $.extend({}, defaultOpts, o);
        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            flat = opts.flat,
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            isDragging = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = [],
            paletteArray = [],
            paletteLookup = {},
            selectionPalette = opts.selectionPalette.slice(0),
            maxSelectionSize = opts.maxSelectionSize,
            draggingClass = "sp-dragging",
            shiftMovementDirection = null;

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            pickerContainer = container.find(".sp-picker-container"),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            clearButton = container.find(".sp-clear"),
            chooseButton = container.find(".sp-choose"),
            toggleButton = container.find(".sp-palette-toggle"),
            isInput = boundElement.is("input"),
            isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
            shouldReplace = isInput && !flat,
            replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
            offsetElement = (shouldReplace) ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || (isInput && boundElement.val()),
            colorOnShow = false,
            currentPreferredFormat = opts.preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
            isEmpty = !initialColor,
            allowEmpty = opts.allowEmpty && !isInputTypeColor;

        function applyOptions() {

            if (opts.showPaletteOnly) {
                opts.showPalette = true;
            }

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

            if (opts.palette) {
                palette = opts.palette.slice(0);
                paletteArray = $.isArray(palette[0]) ? palette : [palette];
                paletteLookup = {};
                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }
            }

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-clear-enabled", allowEmpty);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons);
            container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className).addClass(opts.containerClassName);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            if (shouldReplace) {
                boundElement.after(replacer).hide();
            }

            if (!allowEmpty) {
                clearButton.hide();
            }

            if (flat) {
                boundElement.after(container).hide();
            }
            else {

                var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                if (appendTo.length !== 1) {
                    appendTo = $("body");
                }

                appendTo.append(container);
            }

            updateSelectionPaletteFromStorage();

            offsetElement.on("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if(boundElement.is(":disabled") || (opts.disabled === true)) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            textInput.change(setFromTextInput);
            textInput.on("paste", function () {
                setTimeout(setFromTextInput, 1);
            });
            textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

            cancelButton.text(opts.cancelText);
            cancelButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                revert();
                hide();
            });

            clearButton.attr("title", opts.clearText);
            clearButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                isEmpty = true;
                move();

                if(flat) {
                    //for the flat style, this is a change event
                    updateOriginalInput(true);
                }
            });

            chooseButton.text(opts.chooseText);
            chooseButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (IE && textInput.is(":focus")) {
                    textInput.trigger('change');
                }

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
            toggleButton.on("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                opts.showPaletteOnly = !opts.showPaletteOnly;

                // To make sure the Picker area is drawn on the right, next to the
                // Palette area (and not below the palette), first move the Palette
                // to the left to make space for the picker, plus 5px extra.
                // The 'applyOptions' function puts the whole container back into place
                // and takes care of the button-text and the sp-palette-only CSS class.
                if (!opts.showPaletteOnly && !flat) {
                    container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                }
                applyOptions();
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = (dragX / alphaWidth);
                isEmpty = false;
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            }, dragStart, dragStop);

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY, e) {

                // shift+drag should snap the movement to either the x or y axis.
                if (!e.shiftKey) {
                    shiftMovementDirection = null;
                }
                else if (!shiftMovementDirection) {
                    var oldDragX = currentSaturation * dragWidth;
                    var oldDragY = dragHeight - (currentValue * dragHeight);
                    var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                    shiftMovementDirection = furtherFromX ? "x" : "y";
                }

                var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                if (setSaturation) {
                    currentSaturation = parseFloat(dragX / dragWidth);
                }
                if (setValue) {
                    currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                }

                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }

                move();

            }, dragStart, dragStop);

            if (!!initialColor) {
                set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

                addColorToSelectionPalette(initialColor);
            }
            else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function paletteElementClick(e) {
                if (e.data && e.data.ignore) {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                }
                else {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();

                    // If the picker is going to close immediately, a palette selection
                    // is a change.  Otherwise, it's a move only.
                    if (opts.hideAfterPaletteSelect) {
                        updateOriginalInput(true);
                        hide();
                    } else {
                        updateOriginalInput();
                    }
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.on(paletteEvent, ".sp-thumb-el", paletteElementClick);
            initialColorContainer.on(paletteEvent, ".sp-thumb-el:nth-child(1)", { ignore: true }, paletteElementClick);
        }

        function updateSelectionPaletteFromStorage() {

            if (localStorageKey && window.localStorage) {

                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var oldPalette = window.localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete window.localStorage[localStorageKey];
                        $.each(oldPalette, function(i, c) {
                             addColorToSelectionPalette(c);
                        });
                    }
                }
                catch(e) { }

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                }
                catch (e) { }
            }
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var rgb = tinycolor(color).toRgbString();
                if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                    selectionPalette.push(rgb);
                    while(selectionPalette.length > maxSelectionSize) {
                        selectionPalette.shift();
                    }
                }

                if (localStorageKey && window.localStorage) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    }
                    catch(e) { }
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            if (opts.showPalette) {
                for (var i = 0; i < selectionPalette.length; i++) {
                    var rgb = tinycolor(selectionPalette[i]).toRgbString();

                    if (!paletteLookup[rgb]) {
                        unique.push(selectionPalette[i]);
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
            });

            updateSelectionPaletteFromStorage();

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
            }
        }

        function dragStart() {
            if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                reflow();
            }
            isDragging = true;
            container.addClass(draggingClass);
            shiftMovementDirection = null;
            boundElement.trigger('dragstart.spectrum', [ get() ]);
        }

        function dragStop() {
            isDragging = false;
            container.removeClass(draggingClass);
            boundElement.trigger('dragstop.spectrum', [ get() ]);
        }

        function setFromTextInput() {

            var value = textInput.val();

            if ((value === null || value === "") && allowEmpty) {
                set(null);
                move();
                updateOriginalInput();
            }
            else {
                var tiny = tinycolor(value);
                if (tiny.isValid()) {
                    set(tiny);
                    move();
                    updateOriginalInput();
                }
                else {
                    textInput.addClass("sp-validation-error");
                }
            }
        }

        function toggle() {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }

        function show() {
            var event = $.Event('beforeShow.spectrum');

            if (visible) {
                reflow();
                return;
            }

            boundElement.trigger(event, [ get() ]);

            if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                return;
            }

            hideAll();
            visible = true;

            $(doc).on("keydown.spectrum", onkeydown);
            $(doc).on("click.spectrum", clickout);
            $(window).on("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.removeClass("sp-hidden");

            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
            boundElement.trigger('show.spectrum', [ colorOnShow ]);
        }

        function onkeydown(e) {
            // Close on ESC
            if (e.keyCode === 27) {
                hide();
            }
        }

        function clickout(e) {
            // Return on right click.
            if (e.button == 2) { return; }

            // If a drag event was happening during the mouseup, don't hide
            // on click.
            if (isDragging) { return; }

            if (clickoutFiresChange) {
                updateOriginalInput(true);
            }
            else {
                revert();
            }
            hide();
        }

        function hide() {
            // Return if hiding is unnecessary
            if (!visible || flat) { return; }
            visible = false;

            $(doc).off("keydown.spectrum", onkeydown);
            $(doc).off("click.spectrum", clickout);
            $(window).off("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.addClass("sp-hidden");

            callbacks.hide(get());
            boundElement.trigger('hide.spectrum', [ get() ]);
        }

        function revert() {
            set(colorOnShow, true);
            updateOriginalInput(true);
        }

        function set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                // Update UI just in case a validation error needs
                // to be cleared.
                updateUI();
                return;
            }

            var newColor, newHsv;
            if (!color && allowEmpty) {
                isEmpty = true;
            } else {
                isEmpty = false;
                newColor = tinycolor(color);
                newHsv = newColor.toHsv();

                currentHue = (newHsv.h % 360) / 360;
                currentSaturation = newHsv.s;
                currentValue = newHsv.v;
                currentAlpha = newHsv.a;
            }
            updateUI();

            if (newColor && newColor.isValid() && !ignoreFormatChange) {
                currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
            }
        }

        function get(opts) {
            opts = opts || { };

            if (allowEmpty && isEmpty) {
                return null;
            }

            return tinycolor.fromRatio({
                h: currentHue,
                s: currentSaturation,
                v: currentValue,
                a: Math.round(currentAlpha * 1000) / 1000
            }, { format: opts.format || currentPreferredFormat });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
            boundElement.trigger('move.spectrum', [ get() ]);
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
            dragger.css("background-color", flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get({ format: format }),
                displayColor = '';

             //reset background info for preview element
            previewElement.removeClass("sp-clear-display");
            previewElement.css('background-color', 'transparent');

            if (!realColor && allowEmpty) {
                // Update the replaced elements background with icon indicating no color selection
                previewElement.addClass("sp-clear-display");
            }
            else {
                var realHex = realColor.toHexString(),
                    realRgb = realColor.toRgbString();

                // Update the replaced elements background color (with actual selected color)
                if (rgbaSupport || realColor.alpha === 1) {
                    previewElement.css("background-color", realRgb);
                }
                else {
                    previewElement.css("background-color", "transparent");
                    previewElement.css("filter", realColor.toFilter());
                }

                if (opts.showAlpha) {
                    var rgb = realColor.toRgb();
                    rgb.a = 0;
                    var realAlpha = tinycolor(rgb).toRgbString();
                    var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                    if (IE) {
                        alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                    }
                    else {
                        alphaSliderInner.css("background", "-webkit-" + gradient);
                        alphaSliderInner.css("background", "-moz-" + gradient);
                        alphaSliderInner.css("background", "-ms-" + gradient);
                        // Use current syntax gradient on unprefixed property.
                        alphaSliderInner.css("background",
                            "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                    }
                }

                displayColor = realColor.toString(format);
            }

            // Update the text entry input as it changes happen
            if (opts.showInput) {
                textInput.val(displayColor);
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            if(allowEmpty && isEmpty) {
                //if selected color is empty, hide the helpers
                alphaSlideHelper.hide();
                slideHelper.hide();
                dragHelper.hide();
            }
            else {
                //make sure helpers are visible
                alphaSlideHelper.show();
                slideHelper.show();
                dragHelper.show();

                // Where to show the little circle in that displays your current selected color
                var dragX = s * dragWidth;
                var dragY = dragHeight - (v * dragHeight);
                dragX = Math.max(
                    -dragHelperHeight,
                    Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
                );
                dragY = Math.max(
                    -dragHelperHeight,
                    Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
                );
                dragHelper.css({
                    "top": dragY + "px",
                    "left": dragX + "px"
                });

                var alphaX = currentAlpha * alphaWidth;
                alphaSlideHelper.css({
                    "left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"
                });

                // Where to show the bar that displays your current selected hue
                var slideY = (currentHue) * slideHeight;
                slideHelper.css({
                    "top": (slideY - slideHelperHeight) + "px"
                });
            }
        }

        function updateOriginalInput(fireCallback) {
            var color = get(),
                displayColor = '',
                hasChanged = !tinycolor.equals(color, colorOnShow);

            if (color) {
                displayColor = color.toString(currentPreferredFormat);
                // Update the selection palette with the current color
                addColorToSelectionPalette(color);
            }

            if (isInput) {
                boundElement.val(displayColor);
            }

            if (fireCallback && hasChanged) {
                callbacks.change(color);
                boundElement.trigger('change', [ color ]);
            }
        }

        function reflow() {
            if (!visible) {
                return; // Calculations would be useless and wouldn't be reliable anyways
            }
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.css("position", "absolute");
                if (opts.offset) {
                    container.offset(opts.offset);
                } else {
                    container.offset(getOffset(container, offsetElement));
                }
            }

            updateHelperLocations();

            if (opts.showPalette) {
                drawPalette();
            }

            boundElement.trigger('reflow.spectrum');
        }

        function destroy() {
            boundElement.show();
            offsetElement.off("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;

            if (optionName === "preferredFormat") {
                currentPreferredFormat = opts.preferredFormat;
            }
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        function setOffset(coord) {
            opts.offset = coord;
            reflow();
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            offset: setOffset,
            set: function (c) {
                set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        var offsetLeft = offset.left;
        var offsetTop = offset.top;

        //SITE123 - RTL Support
        if ( $('html[dir=rtl]').length !== 0 ) {
            offsetLeft -= (dpWidth - input.outerWidth());
        }

        offsetTop += inputHeight;

        offsetLeft -=
            Math.min(offsetLeft, (offsetLeft + dpWidth > viewWidth && viewWidth > dpWidth) ?
            Math.abs(offsetLeft + dpWidth - viewWidth) : 0);

        offsetTop -=
            Math.min(offsetTop, ((offsetTop + dpHeight > viewHeight && viewHeight > dpHeight) ?
            Math.abs(dpHeight + inputHeight - extraY) : extraY));

        return {
            top: offsetTop,
            bottom: offset.bottom,
            left: offsetLeft,
            right: offset.right,
            width: offset.width,
            height: offset.height
        };
    }

    /**
    * noop - do nothing
    */
    function noop() {

    }

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () { };
        onstart = onstart || function () { };
        onstop = onstop || function () { };
        var doc = document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = ('ontouchstart' in window);

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents["touchmove mousemove"] = move;
        duringDragEvents["touchend mouseup"] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && doc.documentMode < 9 && !e.button) {
                    return stop();
                }

                var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                var pageX = t0 && t0.pageX || e.pageX;
                var pageY = t0 && t0.pageY || e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }

        function start(e) {
            var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).on(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    move(e);

                    prevent(e);
                }
            }
        }

        function stop() {
            if (dragging) {
                $(doc).off(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");

                // Wait a tick before notifying observers to allow the click event
                // to fire in Chrome.
                setTimeout(function() {
                    onstop.apply(element, arguments);
                }, 0);
            }
            dragging = false;
        }

        $(element).on("touchstart mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var throttler = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }

    function inputTypeColorSupport() {
        return $.fn.spectrum.inputTypeColorSupport();
    }

    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {
                    var method = spect[opts];
                    if (!method) {
                        throw new Error( "Spectrum: no such method: '" + opts + "'" );
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    }
                    else if (opts == "container") {
                        returnValue = spect.container;
                    }
                    else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    }
                    else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    }
                    else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var options = $.extend({}, $(this).data(), opts);
            var spect = spectrum(this, options);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;
    $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
        if (typeof inputTypeColorSupport._cachedResult === "undefined") {
            var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
            inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
        }
        return inputTypeColorSupport._cachedResult;
    };

    $.spectrum = { };
    $.spectrum.localization = { };
    $.spectrum.palettes = { };

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInputs = $("input[type=color]");
        if (colorInputs.length && !inputTypeColorSupport()) {
            colorInputs.spectrum({
                preferredFormat: "hex6"
            });
        }
    };

    // TinyColor v1.1.2
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License

    (function() {

    var trimLeft = /^[\s,#]+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        math = Math,
        mathRound = math.round,
        mathMin = math.min,
        mathMax = math.max,
        mathRandom = math.random;

    var tinycolor = function(color, opts) {

        color = (color) ? color : '';
        opts = opts || { };

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
           return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color,
        this._r = rgb.r,
        this._g = rgb.g,
        this._b = rgb.b,
        this._a = rgb.a,
        this._roundA = mathRound(1000 * this._a) / 1000,
        this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) { this._r = mathRound(this._r); }
        if (this._g < 1) { this._g = mathRound(this._g); }
        if (this._b < 1) { this._b = mathRound(this._b); }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    };

    tinycolor.prototype = {
        isDark: function() {
            return this.getBrightness() < 128;
        },
        isLight: function() {
            return !this.isDark();
        },
        isValid: function() {
            return this._ok;
        },
        getOriginalInput: function() {
          return this._originalInput;
        },
        getFormat: function() {
            return this._format;
        },
        getAlpha: function() {
            return this._a;
        },
        getBrightness: function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        setAlpha: function(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(1000 * this._a) / 1000;
            return this;
        },
        toHsv: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
            return (this._a == 1) ?
              "hsv("  + h + ", " + s + "%, " + v + "%)" :
              "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
        },
        toHsl: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
            return (this._a == 1) ?
              "hsl("  + h + ", " + s + "%, " + l + "%)" :
              "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
        },
        toHex: function(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function() {
            return rgbaToHex(this._r, this._g, this._b, this._a);
        },
        toHex8String: function() {
            return '#' + this.toHex8();
        },
        toRgb: function() {
            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
              "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
              "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function() {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function(secondColor) {
            var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = s.toHex8String();
            }

            return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
        },
        toString: function(format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },

        _applyModification: function(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function() {
            return this._applyModification(lighten, arguments);
        },
        brighten: function() {
            return this._applyModification(brighten, arguments);
        },
        darken: function() {
            return this._applyModification(darken, arguments);
        },
        desaturate: function() {
            return this._applyModification(desaturate, arguments);
        },
        saturate: function() {
            return this._applyModification(saturate, arguments);
        },
        greyscale: function() {
            return this._applyModification(greyscale, arguments);
        },
        spin: function() {
            return this._applyModification(spin, arguments);
        },

        _applyCombination: function(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function() {
            return this._applyCombination(analogous, arguments);
        },
        complement: function() {
            return this._applyCombination(complement, arguments);
        },
        monochromatic: function() {
            return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function() {
            return this._applyCombination(splitcomplement, arguments);
        },
        triad: function() {
            return this._applyCombination(triad, arguments);
        },
        tetrad: function() {
            return this._applyCombination(tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function(color, opts) {
        if (typeof color == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    }
                    else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if (typeof color == "object") {
            if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                color.s = convertToPercentage(color.s);
                color.v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, color.s, color.v);
                ok = true;
                format = "hsv";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                color.s = convertToPercentage(color.s);
                color.l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, color.s, color.l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }


    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b){
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        if(s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if(max == min) {
            h = 0; // achromatic
        }
        else {
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
     function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }
        // `rgbaToHex`
        // Converts an RGBA color plus alpha transparency to hex
        // Assumes r, g, b and a are contained in the set [0, 255]
        // Returns an 8 character hex
        function rgbaToHex(r, g, b, a) {

            var hex = [
                pad2(convertDecimalToHex(a)),
                pad2(mathRound(r).toString(16)),
                pad2(mathRound(g).toString(16)),
                pad2(mathRound(b).toString(16))
            ];

            return hex.join("");
        }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) { return false; }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };
    tinycolor.random = function() {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };


    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function desaturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function saturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function lighten (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function brighten(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
        return tinycolor(rgb);
    }

    function darken (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (mathRound(hsl.h) + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
            tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
        ];
    }

    function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({ h: h, s: s, v: v}));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function(color1, color2, amount) {
        amount = (amount === 0) ? 0 : (amount || 50);

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;
        var w = p * 2 - 1;
        var a = rgb2.a - rgb1.a;

        var w1;

        if (w * a == -1) {
            w1 = w;
        } else {
            w1 = (w + a) / (1 + w * a);
        }

        w1 = (w1 + 1) / 2;

        var w2 = 1 - w1;

        var rgba = {
            r: rgb2.r * w1 + rgb1.r * w2,
            g: rgb2.g * w1 + rgb1.g * w2,
            b: rgb2.b * w1 + rgb1.b * w2,
            a: rgb2.a * p  + rgb1.a * (1 - p)
        };

        return tinycolor(rgba);
    };


    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/AERT#color-contrast>

    // `readability`
    // Analyze the 2 colors and returns an object with the following properties:
    //    `brightness`: difference in brightness between the two colors
    //    `color`: difference in color/hue between the two colors
    tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        var rgb1 = c1.toRgb();
        var rgb2 = c2.toRgb();
        var brightnessA = c1.getBrightness();
        var brightnessB = c2.getBrightness();
        var colorDiff = (
            Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
            Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
            Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
        );

        return {
            brightness: Math.abs(brightnessA - brightnessB),
            color: colorDiff
        };
    };

    // `readable`
    // http://www.w3.org/TR/AERT#color-contrast
    // Ensure that foreground and background color combinations provide sufficient contrast.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    tinycolor.isReadable = function(color1, color2) {
        var readability = tinycolor.readability(color1, color2);
        return readability.brightness > 125 && readability.color > 500;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // *Example*
    //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
    tinycolor.mostReadable = function(baseColor, colorList) {
        var bestColor = null;
        var bestScore = 0;
        var bestIsReadable = false;
        for (var i=0; i < colorList.length; i++) {

            // We normalize both around the "acceptable" breaking point,
            // but rank brightness constrast higher than hue.

            var readability = tinycolor.readability(baseColor, colorList[i]);
            var readable = readability.brightness > 125 && readability.color > 500;
            var score = 3 * (readability.brightness / 125) + (readability.color / 500);

            if ((readable && ! bestIsReadable) ||
                (readable && bestIsReadable && score > bestScore) ||
                ((! readable) && (! bestIsReadable) && score > bestScore)) {
                bestIsReadable = readable;
                bestScore = score;
                bestColor = tinycolor(colorList[i]);
            }
        }
        return bestColor;
    };


    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
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
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);


    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = { };
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) { n = "100%"; }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if ((math.abs(n - max) < 0.000001)) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return (n % max) / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = (n * 100) + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return (parseIntFromHex(h) / 255);
    }

    var matchers = (function() {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    })();

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        }
        else if (color == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if ((match = matchers.rgb.exec(color))) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        if ((match = matchers.rgba.exec(color))) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if ((match = matchers.hsl.exec(color))) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        if ((match = matchers.hsla.exec(color))) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if ((match = matchers.hsv.exec(color))) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        if ((match = matchers.hsva.exec(color))) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if ((match = matchers.hex8.exec(color))) {
            return {
                a: convertHexToDecimal(match[1]),
                r: parseIntFromHex(match[2]),
                g: parseIntFromHex(match[3]),
                b: parseIntFromHex(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if ((match = matchers.hex6.exec(color))) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if ((match = matchers.hex3.exec(color))) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    window.tinycolor = tinycolor;
    })();

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });

});
(function (factory) {if (typeof define === 'function' && define.amd) {define(['jquery'], factory);} else if (typeof exports === 'object') {module.exports = factory(require('jquery'));} else {factory(jQuery);}}(function ($) {var pluses = /\+/g;function encode(s) {return config.raw ? s : encodeURIComponent(s);}
function decode(s) {return config.raw ? s : decodeURIComponent(s);}
function stringifyCookieValue(value) {return encode(config.json ? JSON.stringify(value) : String(value));}
function parseCookieValue(s) {if (s.indexOf('"') === 0) {s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');}
try {s = decodeURIComponent(s.replace(pluses, ' '));return config.json ? JSON.parse(s) : s;} catch(e) {}}
function read(s, converter) {var value = config.raw ? s : parseCookieValue(s);return $.isFunction(converter) ? converter(value) : value;}
var config = $.cookie = function (key, value, options) {if (arguments.length > 1 && !$.isFunction(value)) {options = $.extend({}, config.defaults, options);if (typeof options.expires === 'number') {var days = options.expires, t = options.expires = new Date();t.setMilliseconds(t.getMilliseconds() + days * 864e+5);}
return (document.cookie = [encode(key), '=', stringifyCookieValue(value),options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
options.path    ? '; path=' + options.path : '',options.domain  ? '; domain=' + options.domain : '',options.secure  ? '; secure' : ''].join(''));}
var result = key ? undefined : {},cookies = document.cookie ? document.cookie.split('; ') : [],i = 0,l = cookies.length;for (; i < l; i++) {var parts = cookies[i].split('='),name = decode(parts.shift()),cookie = parts.join('=');if (key === name) {result = read(cookie, value);break;}
if (!key && (cookie = read(cookie)) !== undefined) {result[name] = cookie;}}
return result;};config.defaults = {};$.removeCookie = function (key, options) {$.cookie(key, '', $.extend({}, options, { expires: -1 }));return !$.cookie(key);};}));(function($) {var fn_template = '<img class="{class_name}" src="{url}" />'
function prependTemplate(element, option, template, rtl, multiple, cls){var src = $(option).data('img-src')
if(src != undefined && src > ''){element = $(element)
text     = $(option).text()
multiple = (multiple != undefined) ? multiple : true
cls      = cls || (multiple ? 'chose-image' : 'chose-image-small')
cls      = rtl ? cls + ' rtl' : cls
template = template.replace('{url}',src)
.replace('{class_name}',cls)
.replace('{text}',text)
element.empty()
if(rtl && multiple){element.append(template)}
else {element.prepend(template)}}}
function getSelectedOptions(chosen){var items    = []
var options  = $(chosen.form_field).find('option:selected') || []
var spans    = (chosen.is_multiple) ? $(chosen.container).find('.chosen-choices span'):$(chosen.container).find('.chosen-single span')
for(var i = 0; i < options.length; i++)
for(var j = 0; j < spans.length; j++)
if($(spans[j]).text() == $(options[i]).text())
items.push({span:spans[j],option:options[i]})
return items}
var fn_chosen = $.fn.chosen
$.fn.extend({chosen: function(params) {params = params || {}
var ret = fn_chosen.apply(this, arguments)
this.each(function() {var $this = $(this), chosen = $this.data('chosen')
$this.on("chosen:hiding_dropdown", function(e, chosen){var options       = getSelectedOptions(chosen.chosen)
var rtl           = chosen.chosen.is_rtl
var multiple      = chosen.chosen.is_multiple
var html_template = params.html_template ||(rtl && multiple ? '{text}' + fn_template : fn_template + '{text}')
for(var i = 0; i < options.length; i++){prependTemplate(options[i].span, options[i].option, html_template, rtl, multiple)}})
$this.on("chosen:showing_dropdown", function showing_dropdown(evt, chosen){var chosen        = chosen.chosen
var options       = chosen.form_field.options || []
var rtl           = chosen.is_rtl
var html_template = params.html_template ||(rtl ? '{text}'+fn_template : fn_template+'{text}')
var lis = $(chosen.container).find('.chosen-drop ul li:not(:has(img))')
for(var i = 0; i < lis.length; i++){var li      = lis[i]
var option  = $(options[i])
var idx     = $(li).attr('data-option-array-index')
if (idx){option = options[chosen.results_data[idx].options_index]
prependTemplate(li, option, html_template, rtl, true, 'chose-image-list')}}})
$this.on("chosen:ready", function change(e, chosen){$this.trigger('chosen:hiding_dropdown',chosen)})
$this.on("chosen:updated", function change(e){$this.trigger('chosen:hiding_dropdown',{chosen:chosen})})
$this.on('chosen:filter', function(evt, chosen){$this.trigger('chosen:showing_dropdown',{chosen:chosen.chosen})})
if(typeof chosen != 'undefined') {$this.trigger('chosen:hiding_dropdown',{chosen:chosen})}})
return $(this);}})})(jQuery);(function($, undefined) {'use strict';var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;var IDBCursor = window.IDBCursor || window.webkitIDBCursor || {};if (typeof IDBCursor.PREV === "undefined") {IDBCursor.PREV = "prev";}
if (typeof IDBCursor.NEXT === "undefined") {IDBCursor.NEXT = "next";}
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;function getDefaultTransaction(mode) {var result = null;switch (mode) {case 0:case 1:case "readwrite":case "readonly":result = mode;break;default:result = IDBTransaction.READ_WRITE || "readwrite";}
return result;}
$.extend({"indexedDB": function(dbName, config) {if (config) {if (typeof config === "number") config = {"version": config};var version = config.version;if (config.schema && !version) {var max = -1;for (var key in config.schema) {max = max > key ? max : key;}
version = config.version || max;}}
var wrap = {"request": function(req, args) {return $.Deferred(function(dfd) {try {var idbRequest = typeof req === "function" ? req(args) : req;idbRequest.onsuccess = function(e) {dfd.resolveWith(idbRequest, [idbRequest.result, e]);};idbRequest.onerror = function(e) {dfd.rejectWith(idbRequest, [idbRequest.error, e]);};if (typeof idbRequest.onblocked !== "undefined" && idbRequest.onblocked === null) {idbRequest.onblocked = function(e) {var res;try {res = idbRequest.result;} catch (e) {res = null; // Required for Older Chrome versions, accessing result causes error
}
dfd.notifyWith(idbRequest, [res, e]);};}
if (typeof idbRequest.onupgradeneeded !== "undefined" && idbRequest.onupgradeneeded === null) {idbRequest.onupgradeneeded = function(e) {dfd.notifyWith(idbRequest, [idbRequest.result, e]);};}} catch (e) {e.name = "exception";dfd.rejectWith(idbRequest, ["exception", e]);}});},"transaction": function(idbTransaction) {return {"objectStore": function(storeName) {try {return wrap.objectStore(idbTransaction.objectStore(storeName));} catch (e) {idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();return wrap.objectStore(null);}},"createObjectStore": function(storeName, storeParams) {try {return wrap.objectStore(idbTransaction.db.createObjectStore(storeName, storeParams));} catch (e) {idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();}},"deleteObjectStore": function(storeName) {try {idbTransaction.db.deleteObjectStore(storeName);} catch (e) {idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();}},"abort": function() {idbTransaction.abort();}};},"objectStore": function(idbObjectStore) {var result = {};var crudOps = ["add", "put", "get", "delete", "clear", "count"];for (var i = 0; i < crudOps.length; i++) {result[crudOps[i]] = (function(op) {return function() {return wrap.request(function(args) {return idbObjectStore[op].apply(idbObjectStore, args);}, arguments);};})(crudOps[i]);}
result.each = function(callback, range, direction) {return wrap.cursor(function() {if (direction) {return idbObjectStore.openCursor(wrap.range(range), direction);} else {return idbObjectStore.openCursor(wrap.range(range));}}, callback);};result.index = function(name) {return wrap.index(function() {return idbObjectStore.index(name);});};result.createIndex = function(prop, options, indexName) {if (arguments.length === 2 && typeof options === "string") {indexName = arguments[1];options = null;}
if (!indexName) {indexName = prop;}
return wrap.index(function() {return idbObjectStore.createIndex(indexName, prop, options);});};result.deleteIndex = function(indexName) {return idbObjectStore.deleteIndex(indexName);};return result;},"range": function(r) {if ($.isArray(r)) {if (r.length === 1) {return IDBKeyRange.only(r[0]);} else {return IDBKeyRange.bound(r[0], r[1], (typeof r[2] === 'undefined') ? false : r[2], (typeof r[3] === 'undefined') ? false : r[3]);}} else if (typeof r === "undefined") {return null;} else {return r;}},"cursor": function(idbCursor, callback) {return $.Deferred(function(dfd) {try {var cursorReq = typeof idbCursor === "function" ? idbCursor() : idbCursor;cursorReq.onsuccess = function(e) {if (!cursorReq.result) {dfd.resolveWith(cursorReq, [null, e]);return;}
var elem = {"delete": function() {return wrap.request(function() {return cursorReq.result["delete"]();});},"update": function(data) {return wrap.request(function() {return cursorReq.result["update"](data);});},"next": function(key) {this.data = key;},"key": cursorReq.result.key,"value": cursorReq.result.value};dfd.notifyWith(cursorReq, [elem, e]);var result = callback.apply(cursorReq, [elem]);try {if (result === false) {dfd.resolveWith(cursorReq, [null, e]);} else if (typeof result === "number") {cursorReq.result["advance"].apply(cursorReq.result, [result]);} else {if (elem.data) cursorReq.result["continue"].apply(cursorReq.result, [elem.data]);else cursorReq.result["continue"]();}} catch (e) {dfd.rejectWith(cursorReq, [cursorReq.result, e]);}};cursorReq.onerror = function(e) {dfd.rejectWith(cursorReq, [cursorReq.result, e]);};} catch (e) {e.type = "exception";dfd.rejectWith(cursorReq, [null, e]);}});},"index": function(index) {try {var idbIndex = (typeof index === "function" ? index() : index);} catch (e) {idbIndex = null;}
return {"each": function(callback, range, direction) {return wrap.cursor(function() {if (direction) {return idbIndex.openCursor(wrap.range(range), direction);} else {return idbIndex.openCursor(wrap.range(range));}}, callback);},"eachKey": function(callback, range, direction) {return wrap.cursor(function() {if (direction) {return idbIndex.openKeyCursor(wrap.range(range), direction);} else {return idbIndex.openKeyCursor(wrap.range(range));}}, callback);},"get": function(key) {if (typeof idbIndex.get === "function") {return wrap.request(idbIndex.get(key));} else {return idbIndex.openCursor(wrap.range(key));}},"count": function() {if (typeof idbIndex.count === "function") {return wrap.request(idbIndex.count());} else {throw "Count not implemented for cursors";}},"getKey": function(key) {if (typeof idbIndex.getKey === "function") {return wrap.request(idbIndex.getKey(key));} else {return idbIndex.openKeyCursor(wrap.range(key));}}};}};var dbPromise = wrap.request(function() {return version ? indexedDB.open(dbName, parseInt(version)) : indexedDB.open(dbName);});dbPromise.then(function(db, e) {db.onversionchange = function() {if (!(config && config.onversionchange && config.onversionchange() !== false)) {db.close();}};}, function(error, e) {}, function(db, e) {if (e && e.type === "upgradeneeded") {if (config && config.schema) {for (var i = e.oldVersion + 1; i <= e.newVersion; i++) {typeof config.schema[i] === "function" && config.schema[i].call(this, wrap.transaction(this.transaction));}}
if (config && typeof config.upgrade === "function") {config.upgrade.call(this, wrap.transaction(this.transaction));}}});return $.extend(dbPromise, {"cmp": function(key1, key2) {return indexedDB.cmp(key1, key2);},"deleteDatabase": function() {return $.Deferred(function(dfd) {dbPromise.then(function(db, e) {db.close();wrap.request(function() {return indexedDB.deleteDatabase(dbName);}).then(function(result, e) {dfd.resolveWith(this, [result, e]);}, function(error, e) {dfd.rejectWith(this, [error, e]);}, function(db, e) {dfd.notifyWith(this, [db, e]);});}, function(error, e) {dfd.rejectWith(this, [error, e]);}, function(db, e) {dfd.notifyWith(this, [db, e]);});});},"transaction": function(storeNames, mode) {!$.isArray(storeNames) && (storeNames = [storeNames]);mode = getDefaultTransaction(mode);return $.Deferred(function(dfd) {dbPromise.then(function(db, e) {var idbTransaction;try {idbTransaction = db.transaction(storeNames, mode);idbTransaction.onabort = idbTransaction.onerror = function(e) {dfd.rejectWith(idbTransaction, [e]);};idbTransaction.oncomplete = function(e) {dfd.resolveWith(idbTransaction, [e]);};} catch (e) {e.type = "exception";dfd.rejectWith(this, [e]);return;}
try {dfd.notifyWith(idbTransaction, [wrap.transaction(idbTransaction)]);} catch (e) {e.type = "exception";dfd.rejectWith(this, [e]);}}, function(err, e) {dfd.rejectWith(this, [e, err]);}, function(res, e) {});});},"objectStore": function(storeName, mode) {var me = this,result = {};function op(callback) {return $.Deferred(function(dfd) {function onTransactionProgress(trans, callback) {try {callback(trans.objectStore(storeName)).then(function(result, e) {dfd.resolveWith(this, [result, e]);}, function(err, e) {dfd.rejectWith(this, [err, e]);});} catch (e) {e.name = "exception";dfd.rejectWith(trans, [e, e]);}}
me.transaction(storeName, getDefaultTransaction(mode)).then(function() {}, function(err, e) {if (err.code === err.NOT_FOUND_ERR && (mode === true || typeof mode === "object")) {var db = this.result;db.close();dbPromise = wrap.request(function() {return indexedDB.open(dbName, (parseInt(db.version, 10) || 1) + 1);});dbPromise.then(function(db, e) {db.onversionchange = function() {if (!(config && config.onversionchange && config.onversionchange() !== false)) {db.close();}};me.transaction(storeName, getDefaultTransaction(mode)).then(function() {}, function(err, e) {dfd.rejectWith(this, [err, e]);}, function(trans, e) {onTransactionProgress(trans, callback);});}, function(err, e) {dfd.rejectWith(this, [err, e]);}, function(db, e) {if (e.type === "upgradeneeded") {try {db.createObjectStore(storeName, mode === true ? {"autoIncrement": true} : mode);} catch (ex) {dfd.rejectWith(this, [ex, e]);}}});} else {dfd.rejectWith(this, [err, e]);}}, function(trans) {onTransactionProgress(trans, callback);});});}
function crudOp(opName, args) {return op(function(wrappedObjectStore) {return wrappedObjectStore[opName].apply(wrappedObjectStore, args);});}
function indexOp(opName, indexName, args) {return op(function(wrappedObjectStore) {var index = wrappedObjectStore.index(indexName);return index[opName].apply(index[opName], args);});}
var crud = ["add", "delete", "get", "put", "clear", "count", "each"];for (var i = 0; i < crud.length; i++) {result[crud[i]] = (function(op) {return function() {return crudOp(op, arguments);};})(crud[i]);}
result.index = function(indexName) {return {"each": function(callback, range, direction) {return indexOp("each", indexName, [callback, range, direction]);},"eachKey": function(callback, range, direction) {return indexOp("eachKey", indexName, [callback, range, direction]);},"get": function(key) {return indexOp("get", indexName, [key]);},"count": function() {return indexOp("count", indexName, []);},"getKey": function(key) {return indexOp("getKey", indexName, [key]);}};};return result;}});}});$.indexedDB.IDBCursor = IDBCursor;$.indexedDB.IDBTransaction = IDBTransaction;$.idb = $.indexedDB;})(jQuery);!function(e,t){if("function"==typeof define&&define.amd)define(["module","exports"],t);else if("undefined"!=typeof exports)t(module,exports);else{var n={exports:{}};t(n,n.exports),e.fitty=n.exports}}(this,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};t.default=function(n){if(n){var i=function(e){return[].slice.call(e)},r={IDLE:0,DIRTY_CONTENT:1,DIRTY_LAYOUT:2,DIRTY:3},o=[],e=null,u="requestAnimationFrame"in n?function(){n.cancelAnimationFrame(e),e=n.requestAnimationFrame(function(){a(o.filter(function(e){return e.dirty}))})}:function(){},t=function(t){return function(){o.forEach(function(e){e.dirty=t}),u()}},a=function(e){e.filter(function(e){return!e.styleComputed}).forEach(function(e){e.styleComputed=f(e)}),e.filter(d).forEach(p);var t=e.filter(s);t.forEach(c),t.forEach(function(e){p(e),l(e)}),t.forEach(m)},l=function(e){return e.dirty=r.IDLE},c=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap"},s=function(e){return e.dirty!==r.DIRTY_LAYOUT||e.dirty===r.DIRTY_LAYOUT&&e.element.parentNode.clientWidth!==e.availableWidth},f=function(e){var t=n.getComputedStyle(e.element,null);e.currentFontSize=parseInt(t.getPropertyValue("font-size"),10),e.display=t.getPropertyValue("display"),e.whiteSpace=t.getPropertyValue("white-space")},d=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=!0,e.whiteSpace="nowrap"),e.preStyleTestCompleted=!0,t)},p=function(e){e.originalStyle||(e.originalStyle=e.element.getAttribute("style")||""),e.element.style.cssText=e.originalStyle+";white-space:"+e.whiteSpace+";display:"+e.display+";font-size:"+e.currentFontSize+"px"},m=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},v=function(e,t){return function(){e.dirty=t,u()}},y=function(e){e.newbie=!0,e.dirty=!0,o.push(e)},h=function(t){return function(){o=o.filter(function(e){return e.element!==t.element}),t.observeMutations&&t.observer.disconnect(),t.element.style.cssText=t.originalStyle}},S=function(e){e.observeMutations&&(e.observer=new MutationObserver(v(e,r.DIRTY_CONTENT)),e.observer.observe(e.element,e.observeMutations))},b={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in n&&{subtree:!0,childList:!0,characterData:!0}},w=null,T=function(){n.clearTimeout(w),w=n.setTimeout(t(r.DIRTY_LAYOUT),g.observeWindowDelay)},z=["resize","orientationchange"];return Object.defineProperty(g,"observeWindow",{set:function(e){var t=(e?"add":"remove")+"EventListener";z.forEach(function(e){n[t](e,T)})}}),g.observeWindow=!0,g.observeWindowDelay=100,g.fitAll=t(r.DIRTY),g}function F(e,t){var n=D({},b,t),i=e.map(function(e){var t=D({},n,{element:e});return y(t),S(t),{element:e,fit:v(t,r.DIRTY),unsubscribe:h(t)}});return u(),i}function g(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?F(i(document.querySelectorAll(e)),t):F([e],t)[0]}}("undefined"==typeof window?null:window),e.exports=t.default});!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Sweetalert2=t()}(this,function(){"use strict";const q="SweetAlert2:",H=e=>e.charAt(0).toUpperCase()+e.slice(1),i=e=>Array.prototype.slice.call(e),a=e=>{console.warn("".concat(q," ").concat("object"==typeof e?e.join(" "):e))},l=e=>{console.error("".concat(q," ").concat(e))},V=[],N=(e,t)=>{e='"'.concat(e,'" is deprecated and will be removed in the next major release. Please use "').concat(t,'" instead.'),V.includes(e)||(V.push(e),a(e))},R=e=>"function"==typeof e?e():e,F=e=>e&&"function"==typeof e.toPromise,u=e=>F(e)?e.toPromise():Promise.resolve(e),U=e=>e&&Promise.resolve(e)===e,r={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0},W=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","willClose"],z={},_=["allowOutsideClick","allowEnterKey","backdrop","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],K=e=>Object.prototype.hasOwnProperty.call(r,e),Y=e=>-1!==W.indexOf(e),Z=e=>z[e],J=e=>{!e.backdrop&&e.allowOutsideClick&&a('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');for(const n in e)t=n,K(t)||a('Unknown parameter "'.concat(t,'"')),e.toast&&(t=n,_.includes(t)&&a('The parameter "'.concat(t,'" is incompatible with toasts'))),t=n,Z(t)&&N(t,Z(t));var t};var e=e=>{const t={};for(const n in e)t[e[n]]="swal2-"+e[n];return t};const p=e(["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","default-outline","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error"]),o=e(["success","warning","info","question","error"]),m=()=>document.body.querySelector(".".concat(p.container)),t=e=>{const t=m();return t?t.querySelector(e):null},n=e=>t(".".concat(e)),g=()=>n(p.popup),s=()=>n(p.icon),X=()=>n(p.title),$=()=>n(p["html-container"]),G=()=>n(p.image),Q=()=>n(p["progress-steps"]),ee=()=>n(p["validation-message"]),h=()=>t(".".concat(p.actions," .").concat(p.confirm)),f=()=>t(".".concat(p.actions," .").concat(p.deny));const d=()=>t(".".concat(p.loader)),b=()=>t(".".concat(p.actions," .").concat(p.cancel)),v=()=>n(p.actions),te=()=>n(p.footer),ne=()=>n(p["timer-progress-bar"]),oe=()=>n(p.close),ie=()=>{const e=i(g().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e,t)=>{e=parseInt(e.getAttribute("tabindex")),t=parseInt(t.getAttribute("tabindex"));return t<e?1:e<t?-1:0});var t=i(g().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e=>"-1"!==e.getAttribute("tabindex"));return(t=>{const n=[];for(let e=0;e<t.length;e++)-1===n.indexOf(t[e])&&n.push(t[e]);return n})(e.concat(t)).filter(e=>E(e))},ae=()=>w(document.body,p.shown)&&!w(document.body,p["toast-shown"])&&!w(document.body,p["no-backdrop"]),re=()=>g()&&w(g(),p.toast);function se(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];const n=ne();E(n)&&(t&&(n.style.transition="none",n.style.width="100%"),setTimeout(()=>{n.style.transition="width ".concat(e/1e3,"s linear"),n.style.width="0%"},10))}const c={previousBodyPadding:null},y=(t,e)=>{if(t.textContent="",e){const n=new DOMParser,o=n.parseFromString(e,"text/html");i(o.querySelector("head").childNodes).forEach(e=>{t.appendChild(e)}),i(o.querySelector("body").childNodes).forEach(e=>{t.appendChild(e)})}},w=(t,e)=>{if(!e)return!1;var n=e.split(/\s+/);for(let e=0;e<n.length;e++)if(!t.classList.contains(n[e]))return!1;return!0},ce=(t,n)=>{i(t.classList).forEach(e=>{Object.values(p).includes(e)||Object.values(o).includes(e)||Object.values(n.showClass).includes(e)||t.classList.remove(e)})},C=(e,t,n)=>{if(ce(e,t),t.customClass&&t.customClass[n]){if("string"!=typeof t.customClass[n]&&!t.customClass[n].forEach)return a("Invalid type of customClass.".concat(n,'! Expected string or iterable object, got "').concat(typeof t.customClass[n],'"'));A(e,t.customClass[n])}},le=(e,t)=>{if(!t)return null;switch(t){case"select":case"textarea":case"file":return e.querySelector(".".concat(p.popup," > .").concat(p[t]));case"checkbox":return e.querySelector(".".concat(p.popup," > .").concat(p.checkbox," input"));case"radio":return e.querySelector(".".concat(p.popup," > .").concat(p.radio," input:checked"))||e.querySelector(".".concat(p.popup," > .").concat(p.radio," input:first-child"));case"range":return e.querySelector(".".concat(p.popup," > .").concat(p.range," input"));default:return e.querySelector(".".concat(p.popup," > .").concat(p.input))}},ue=e=>{var t;e.focus(),"file"!==e.type&&(t=e.value,e.value="",e.value=t)},de=(e,t,n)=>{e&&t&&(t="string"==typeof t?t.split(/\s+/).filter(Boolean):t).forEach(t=>{Array.isArray(e)?e.forEach(e=>{n?e.classList.add(t):e.classList.remove(t)}):n?e.classList.add(t):e.classList.remove(t)})},A=(e,t)=>{de(e,t,!0)},k=(e,t)=>{de(e,t,!1)},P=(e,t)=>{var n=i(e.childNodes);for(let e=0;e<n.length;e++)if(w(n[e],t))return n[e]},pe=(e,t,n)=>{(n=n==="".concat(parseInt(n))?parseInt(n):n)||0===parseInt(n)?e.style[t]="number"==typeof n?"".concat(n,"px"):n:e.style.removeProperty(t)},B=function(e){e.style.display=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"flex"},x=e=>{e.style.display="none"},me=(e,t,n,o)=>{const i=e.querySelector(t);i&&(i.style[n]=o)},ge=(e,t,n)=>{t?B(e,n):x(e)},E=e=>!(!e||!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)),he=()=>!E(h())&&!E(f())&&!E(b()),fe=e=>!!(e.scrollHeight>e.clientHeight),be=e=>{const t=window.getComputedStyle(e);var e=parseFloat(t.getPropertyValue("animation-duration")||"0"),n=parseFloat(t.getPropertyValue("transition-duration")||"0");return 0<e||0<n},ve=()=>"undefined"==typeof window||"undefined"==typeof document,ye=100,T={},we=()=>{T.previousActiveElement&&T.previousActiveElement.focus?(T.previousActiveElement.focus(),T.previousActiveElement=null):document.body&&document.body.focus()},Ce=o=>new Promise(e=>{if(!o)return e();var t=window.scrollX,n=window.scrollY;T.restoreFocusTimeout=setTimeout(()=>{we(),e()},ye),window.scrollTo(t,n)}),Ae='\n <div aria-labelledby="'.concat(p.title,'" aria-describedby="').concat(p["html-container"],'" class="').concat(p.popup,'" tabindex="-1">\n   <button type="button" class="').concat(p.close,'"></button>\n   <ul class="').concat(p["progress-steps"],'"></ul>\n   <div class="').concat(p.icon,'"></div>\n   <img class="').concat(p.image,'" />\n   <h2 class="').concat(p.title,'" id="').concat(p.title,'"></h2>\n   <div class="').concat(p["html-container"],'" id="').concat(p["html-container"],'"></div>\n   <input class="').concat(p.input,'" />\n   <input type="file" class="').concat(p.file,'" />\n   <div class="').concat(p.range,'">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(p.select,'"></select>\n   <div class="').concat(p.radio,'"></div>\n   <label for="').concat(p.checkbox,'" class="').concat(p.checkbox,'">\n     <input type="checkbox" />\n     <span class="').concat(p.label,'"></span>\n   </label>\n   <textarea class="').concat(p.textarea,'"></textarea>\n   <div class="').concat(p["validation-message"],'" id="').concat(p["validation-message"],'"></div>\n   <div class="').concat(p.actions,'">\n     <div class="').concat(p.loader,'"></div>\n     <button type="button" class="').concat(p.confirm,'"></button>\n     <button type="button" class="').concat(p.deny,'"></button>\n     <button type="button" class="').concat(p.cancel,'"></button>\n   </div>\n   <div class="').concat(p.footer,'"></div>\n   <div class="').concat(p["timer-progress-bar-container"],'">\n     <div class="').concat(p["timer-progress-bar"],'"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g,""),ke=()=>{const e=m();return!!e&&(e.remove(),k([document.documentElement,document.body],[p["no-backdrop"],p["toast-shown"],p["has-column"]]),!0)},S=()=>{T.currentInstance.resetValidationMessage()},Pe=()=>{const e=g(),t=P(e,p.input),n=P(e,p.file),o=e.querySelector(".".concat(p.range," input")),i=e.querySelector(".".concat(p.range," output")),a=P(e,p.select),r=e.querySelector(".".concat(p.checkbox," input")),s=P(e,p.textarea);t.oninput=S,n.onchange=S,a.onchange=S,r.onchange=S,s.oninput=S,o.oninput=()=>{S(),i.value=o.value},o.onchange=()=>{S(),o.nextSibling.value=o.value}},Be=e=>"string"==typeof e?document.querySelector(e):e,xe=e=>{const t=g();t.setAttribute("role",e.toast?"alert":"dialog"),t.setAttribute("aria-live",e.toast?"polite":"assertive"),e.toast||t.setAttribute("aria-modal","true")},Ee=e=>{"rtl"===window.getComputedStyle(e).direction&&A(m(),p.rtl)},Te=(e,t)=>{if(e instanceof HTMLElement)t.appendChild(e);else if("object"==typeof e){var n=e,o=t;if(n.jquery)Se(o,n);else y(o,n.toString())}else e&&y(t,e)},Se=(t,n)=>{if(t.textContent="",0 in n)for(let e=0;e in n;e++)t.appendChild(n[e].cloneNode(!0));else t.appendChild(n.cloneNode(!0))},Le=(()=>{if(ve())return!1;var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",animation:"animationend"};for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&void 0!==e.style[n])return t[n];return!1})(),Oe=(e,t)=>{var n,o,i,a,r,s=v(),c=d();(t.showConfirmButton||t.showDenyButton||t.showCancelButton?B:x)(s),C(s,t,"actions"),s=s,n=c,o=t,i=h(),a=f(),r=b(),je(i,"confirm",o),je(a,"deny",o),je(r,"cancel",o),function(e,t,n,o){if(!o.buttonsStyling)return k([e,t,n],p.styled);A([e,t,n],p.styled),o.confirmButtonColor&&(e.style.backgroundColor=o.confirmButtonColor,A(e,p["default-outline"]));o.denyButtonColor&&(t.style.backgroundColor=o.denyButtonColor,A(t,p["default-outline"]));o.cancelButtonColor&&(n.style.backgroundColor=o.cancelButtonColor,A(n,p["default-outline"]))}(i,a,r,o),o.reverseButtons&&(o.toast?(s.insertBefore(r,i),s.insertBefore(a,i)):(s.insertBefore(r,n),s.insertBefore(a,n),s.insertBefore(i,n))),y(c,t.loaderHtml),C(c,t,"loader")};function je(e,t,n){ge(e,n["show".concat(H(t),"Button")],"inline-block"),y(e,n["".concat(t,"ButtonText")]),e.setAttribute("aria-label",n["".concat(t,"ButtonAriaLabel")]),e.className=p[t],C(e,n,"".concat(t,"Button")),A(e,n["".concat(t,"ButtonClass")])}const Me=(e,t)=>{var n,o,i=m();i&&(o=i,"string"==typeof(n=t.backdrop)?o.style.background=n:n||A([document.documentElement,document.body],p["no-backdrop"]),o=i,(n=t.position)in p?A(o,p[n]):(a('The "position" parameter is not valid, defaulting to "center"'),A(o,p.center)),n=i,(o=t.grow)&&"string"==typeof o&&(o="grow-".concat(o))in p&&A(n,p[o]),C(i,t,"container"))};var L={awaitingPromise:new WeakMap,promise:new WeakMap,innerParams:new WeakMap,domCache:new WeakMap};const De=["input","file","range","select","radio","checkbox","textarea"],Ie=(e,r)=>{const s=g();var t,e=L.innerParams.get(e);const c=!e||r.input!==e.input;De.forEach(e=>{var t=p[e];const n=P(s,t);{var o=r.inputAttributes;const i=le(g(),e);if(i){qe(i);for(const a in o)i.setAttribute(a,o[a])}}n.className=t,c&&x(n)}),r.input&&(c&&(e=>{if(!O[e.input])return l('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input,'"'));const t=Ne(e.input),n=O[e.input](t,e);B(n),setTimeout(()=>{ue(n)})})(r),e=r,t=Ne(e.input),e.customClass&&A(t,e.customClass.input))},qe=t=>{for(let e=0;e<t.attributes.length;e++){var n=t.attributes[e].name;["type","value","style"].includes(n)||t.removeAttribute(n)}},He=(e,t)=>{e.placeholder&&!t.inputPlaceholder||(e.placeholder=t.inputPlaceholder)},Ve=(e,t,n)=>{if(n.inputLabel){e.id=p.input;const i=document.createElement("label");var o=p["input-label"];i.setAttribute("for",e.id),i.className=o,A(i,n.customClass.inputLabel),i.innerText=n.inputLabel,t.insertAdjacentElement("beforebegin",i)}},Ne=e=>{e=p[e]||p.input;return P(g(),e)},O={},Re=(O.text=O.email=O.password=O.number=O.tel=O.url=(e,t)=>("string"==typeof t.inputValue||"number"==typeof t.inputValue?e.value=t.inputValue:U(t.inputValue)||a('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t.inputValue,'"')),Ve(e,e,t),He(e,t),e.type=t.input,e),O.file=(e,t)=>(Ve(e,e,t),He(e,t),e),O.range=(e,t)=>{const n=e.querySelector("input"),o=e.querySelector("output");return n.value=t.inputValue,n.type=t.input,o.value=t.inputValue,Ve(n,e,t),e},O.select=(e,t)=>{if(e.textContent="",t.inputPlaceholder){const n=document.createElement("option");y(n,t.inputPlaceholder),n.value="",n.disabled=!0,n.selected=!0,e.appendChild(n)}return Ve(e,e,t),e},O.radio=e=>(e.textContent="",e),O.checkbox=(e,t)=>{const n=le(g(),"checkbox");n.value="1",n.id=p.checkbox,n.checked=Boolean(t.inputValue);var o=e.querySelector("span");return y(o,t.inputPlaceholder),e},O.textarea=(n,e)=>{n.value=e.inputValue,He(n,e),Ve(n,n,e);return setTimeout(()=>{if("MutationObserver"in window){const t=parseInt(window.getComputedStyle(g()).width);new MutationObserver(()=>{var e=n.offsetWidth+(e=n,parseInt(window.getComputedStyle(e).marginLeft)+parseInt(window.getComputedStyle(e).marginRight));e>t?g().style.width="".concat(e,"px"):g().style.width=null}).observe(n,{attributes:!0,attributeFilter:["style"]})}}),n},(e,t)=>{const n=$();C(n,t,"htmlContainer"),t.html?(Te(t.html,n),B(n,"block")):t.text?(n.textContent=t.text,B(n,"block")):x(n),Ie(e,t)}),Fe=(e,t)=>{var n=te();ge(n,t.footer),t.footer&&Te(t.footer,n),C(n,t,"footer")},Ue=(e,t)=>{const n=oe();y(n,t.closeButtonHtml),C(n,t,"closeButton"),ge(n,t.showCloseButton),n.setAttribute("aria-label",t.closeButtonAriaLabel)},We=(e,t)=>{var e=L.innerParams.get(e),n=s();return e&&t.icon===e.icon?(Ze(n,t),void ze(n,t)):t.icon||t.iconHtml?t.icon&&-1===Object.keys(o).indexOf(t.icon)?(l('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon,'"')),x(n)):(B(n),Ze(n,t),ze(n,t),void A(n,t.showClass.icon)):x(n)},ze=(e,t)=>{for(const n in o)t.icon!==n&&k(e,o[n]);A(e,o[t.icon]),Je(e,t),_e(),C(e,t,"icon")},_e=()=>{const e=g();var t=window.getComputedStyle(e).getPropertyValue("background-color");const n=e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");for(let e=0;e<n.length;e++)n[e].style.backgroundColor=t},Ke='\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',Ye='\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n',Ze=(e,t)=>{var n;e.textContent="",t.iconHtml?y(e,Xe(t.iconHtml)):"success"===t.icon?y(e,Ke):"error"===t.icon?y(e,Ye):(n={question:"?",warning:"!",info:"i"},y(e,Xe(n[t.icon])))},Je=(e,t)=>{if(t.iconColor){e.style.color=t.iconColor,e.style.borderColor=t.iconColor;for(const n of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])me(e,n,"backgroundColor",t.iconColor);me(e,".swal2-success-ring","borderColor",t.iconColor)}},Xe=e=>'<div class="'.concat(p["icon-content"],'">').concat(e,"</div>"),$e=(e,t)=>{const n=G();if(!t.imageUrl)return x(n);B(n,""),n.setAttribute("src",t.imageUrl),n.setAttribute("alt",t.imageAlt),pe(n,"width",t.imageWidth),pe(n,"height",t.imageHeight),n.className=p.image,C(n,t,"image")},Ge=(e,o)=>{const i=Q();if(!o.progressSteps||0===o.progressSteps.length)return x(i);B(i),i.textContent="",o.currentProgressStep>=o.progressSteps.length&&a("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),o.progressSteps.forEach((e,t)=>{e=e,n=document.createElement("li"),A(n,p["progress-step"]),y(n,e);var n,e=n;i.appendChild(e),t===o.currentProgressStep&&A(e,p["active-progress-step"]),t!==o.progressSteps.length-1&&(n=(e=>{const t=document.createElement("li");return A(t,p["progress-step-line"]),e.progressStepsDistance&&(t.style.width=e.progressStepsDistance),t})(o),i.appendChild(n))})},Qe=(e,t)=>{const n=X();ge(n,t.title||t.titleText,"block"),t.title&&Te(t.title,n),t.titleText&&(n.innerText=t.titleText),C(n,t,"title")},et=(e,t)=>{var n=m();const o=g();t.toast?(pe(n,"width",t.width),o.style.width="100%",o.insertBefore(d(),s())):pe(o,"width",t.width),pe(o,"padding",t.padding),t.color&&(o.style.color=t.color),t.background&&(o.style.background=t.background),x(ee());n=o;(n.className="".concat(p.popup," ").concat(E(n)?t.showClass.popup:""),t.toast)?(A([document.documentElement,document.body],p["toast-shown"]),A(n,p.toast)):A(n,p.modal);C(n,t,"popup"),"string"==typeof t.customClass&&A(n,t.customClass);t.icon&&A(n,p["icon-".concat(t.icon)])},tt=(e,t)=>{et(e,t),Me(e,t),Ge(e,t),We(e,t),$e(e,t),Qe(e,t),Ue(e,t),Re(e,t),Oe(e,t),Fe(e,t),"function"==typeof t.didRender&&t.didRender(g())},j=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),nt=()=>{const e=i(document.body.children);e.forEach(e=>{e===m()||e.contains(m())||(e.hasAttribute("aria-hidden")&&e.setAttribute("data-previous-aria-hidden",e.getAttribute("aria-hidden")),e.setAttribute("aria-hidden","true"))})},ot=()=>{const e=i(document.body.children);e.forEach(e=>{e.hasAttribute("data-previous-aria-hidden")?(e.setAttribute("aria-hidden",e.getAttribute("data-previous-aria-hidden")),e.removeAttribute("data-previous-aria-hidden")):e.removeAttribute("aria-hidden")})},it=["swal-title","swal-html","swal-footer"],at=e=>{const n={};return i(e.querySelectorAll("swal-param")).forEach(e=>{M(e,["name","value"]);var t=e.getAttribute("name"),e=e.getAttribute("value");"boolean"==typeof r[t]&&"false"===e&&(n[t]=!1),"object"==typeof r[t]&&(n[t]=JSON.parse(e))}),n},rt=e=>{const n={};return i(e.querySelectorAll("swal-button")).forEach(e=>{M(e,["type","color","aria-label"]);var t=e.getAttribute("type");n["".concat(t,"ButtonText")]=e.innerHTML,n["show".concat(H(t),"Button")]=!0,e.hasAttribute("color")&&(n["".concat(t,"ButtonColor")]=e.getAttribute("color")),e.hasAttribute("aria-label")&&(n["".concat(t,"ButtonAriaLabel")]=e.getAttribute("aria-label"))}),n},st=e=>{const t={},n=e.querySelector("swal-image");return n&&(M(n,["src","width","height","alt"]),n.hasAttribute("src")&&(t.imageUrl=n.getAttribute("src")),n.hasAttribute("width")&&(t.imageWidth=n.getAttribute("width")),n.hasAttribute("height")&&(t.imageHeight=n.getAttribute("height")),n.hasAttribute("alt")&&(t.imageAlt=n.getAttribute("alt"))),t},ct=e=>{const t={},n=e.querySelector("swal-icon");return n&&(M(n,["type","color"]),n.hasAttribute("type")&&(t.icon=n.getAttribute("type")),n.hasAttribute("color")&&(t.iconColor=n.getAttribute("color")),t.iconHtml=n.innerHTML),t},lt=e=>{const n={},t=e.querySelector("swal-input");t&&(M(t,["type","label","placeholder","value"]),n.input=t.getAttribute("type")||"text",t.hasAttribute("label")&&(n.inputLabel=t.getAttribute("label")),t.hasAttribute("placeholder")&&(n.inputPlaceholder=t.getAttribute("placeholder")),t.hasAttribute("value")&&(n.inputValue=t.getAttribute("value")));e=e.querySelectorAll("swal-input-option");return e.length&&(n.inputOptions={},i(e).forEach(e=>{M(e,["value"]);var t=e.getAttribute("value"),e=e.innerHTML;n.inputOptions[t]=e})),n},ut=(e,t)=>{const n={};for(const o in t){const i=t[o],a=e.querySelector(i);a&&(M(a,[]),n[i.replace(/^swal-/,"")]=a.innerHTML.trim())}return n},dt=e=>{const t=it.concat(["swal-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);i(e.children).forEach(e=>{e=e.tagName.toLowerCase();-1===t.indexOf(e)&&a("Unrecognized element <".concat(e,">"))})},M=(t,n)=>{i(t.attributes).forEach(e=>{-1===n.indexOf(e.name)&&a(['Unrecognized attribute "'.concat(e.name,'" on <').concat(t.tagName.toLowerCase(),">."),"".concat(n.length?"Allowed attributes are: ".concat(n.join(", ")):"To set the value, use HTML within the element.")])})};var pt={email:(e,t)=>/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid email address"),url:(e,t)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)?Promise.resolve():Promise.resolve(t||"Invalid URL")};function mt(e){(t=e).inputValidator||Object.keys(pt).forEach(e=>{t.input===e&&(t.inputValidator=pt[e])}),e.showLoaderOnConfirm&&!e.preConfirm&&a("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"),(n=e).target&&("string"!=typeof n.target||document.querySelector(n.target))&&("string"==typeof n.target||n.target.appendChild)||(a('Target parameter is not valid, defaulting to "body"'),n.target="body"),"string"==typeof e.title&&(e.title=e.title.split("\n").join("<br />"));var t,n=e,e=ke();if(ve())l("SweetAlert2 requires document to initialize");else{const o=document.createElement("div"),i=(o.className=p.container,e&&A(o,p["no-transition"]),y(o,Ae),Be(n.target));i.appendChild(o),xe(n),Ee(i),Pe()}}class gt{constructor(e,t){this.callback=e,this.remaining=t,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=(new Date).getTime()-this.started.getTime()),this.remaining}increase(e){var t=this.running;return t&&this.stop(),this.remaining+=e,t&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const ht=()=>{null===c.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(c.previousBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight="".concat(c.previousBodyPadding+(()=>{const e=document.createElement("div");e.className=p["scrollbar-measure"],document.body.appendChild(e);var t=e.getBoundingClientRect().width-e.clientWidth;return document.body.removeChild(e),t})(),"px"))},ft=()=>{null!==c.previousBodyPadding&&(document.body.style.paddingRight="".concat(c.previousBodyPadding,"px"),c.previousBodyPadding=null)},bt=()=>{if((/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints)&&!w(document.body,p.iosfix)){var e,t=document.body.scrollTop;document.body.style.top="".concat(-1*t,"px"),A(document.body,p.iosfix);{const n=m();let t;n.ontouchstart=e=>{t=vt(e)},n.ontouchmove=e=>{t&&(e.preventDefault(),e.stopPropagation())}}{const o=navigator.userAgent,i=!!o.match(/iPad/i)||!!o.match(/iPhone/i),a=!!o.match(/WebKit/i),r=i&&a&&!o.match(/CriOS/i);r&&(e=44,g().scrollHeight>window.innerHeight-44&&(m().style.paddingBottom="".concat(44,"px")))}}},vt=e=>{var t,n=e.target,o=m();return!((t=e).touches&&t.touches.length&&"stylus"===t.touches[0].touchType||(t=e).touches&&1<t.touches.length)&&(n===o||!(fe(o)||"INPUT"===n.tagName||"TEXTAREA"===n.tagName||fe($())&&$().contains(n)))},yt=()=>{var e;w(document.body,p.iosfix)&&(e=parseInt(document.body.style.top,10),k(document.body,p.iosfix),document.body.style.top="",document.body.scrollTop=-1*e)},wt=10,Ct=e=>{const t=g();if(e.target===t){const n=m();t.removeEventListener(Le,Ct),n.style.overflowY="auto"}},At=(e,t)=>{Le&&be(t)?(e.style.overflowY="hidden",t.addEventListener(Le,Ct)):e.style.overflowY="auto"},kt=(e,t,n)=>{bt(),t&&"hidden"!==n&&ht(),setTimeout(()=>{e.scrollTop=0})},Pt=(e,t,n)=>{A(e,n.showClass.backdrop),t.style.setProperty("opacity","0","important"),B(t,"grid"),setTimeout(()=>{A(t,n.showClass.popup),t.style.removeProperty("opacity")},wt),A([document.documentElement,document.body],p.shown),n.heightAuto&&n.backdrop&&!n.toast&&A([document.documentElement,document.body],p["height-auto"])},D=e=>{let t=g();t||new wn,t=g();var n=d();if(re())x(s());else{var o=t;const i=v(),a=d();!e&&E(h())&&(e=h());B(i),e&&(x(e),a.setAttribute("data-button-to-replace",e.className));a.parentNode.insertBefore(a,e),A([o,i],p.loading)}B(n),t.setAttribute("data-loading",!0),t.setAttribute("aria-busy",!0),t.focus()},Bt=(t,n)=>{const o=g(),i=e=>Et[n.input](o,Tt(e),n);F(n.inputOptions)||U(n.inputOptions)?(D(h()),u(n.inputOptions).then(e=>{t.hideLoading(),i(e)})):"object"==typeof n.inputOptions?i(n.inputOptions):l("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))},xt=(t,n)=>{const o=t.getInput();x(o),u(n.inputValue).then(e=>{o.value="number"===n.input?parseFloat(e)||0:"".concat(e),B(o),o.focus(),t.hideLoading()}).catch(e=>{l("Error in inputValue promise: ".concat(e)),o.value="",B(o),o.focus(),t.hideLoading()})},Et={select:(e,t,i)=>{const a=P(e,p.select),r=(e,t,n)=>{const o=document.createElement("option");o.value=n,y(o,t),o.selected=St(n,i.inputValue),e.appendChild(o)};t.forEach(e=>{var t=e[0];const n=e[1];if(Array.isArray(n)){const o=document.createElement("optgroup");o.label=t,o.disabled=!1,a.appendChild(o),n.forEach(e=>r(o,e[1],e[0]))}else r(a,n,t)}),a.focus()},radio:(e,t,a)=>{const r=P(e,p.radio),n=(t.forEach(e=>{var t=e[0],e=e[1];const n=document.createElement("input"),o=document.createElement("label"),i=(n.type="radio",n.name=p.radio,n.value=t,St(t,a.inputValue)&&(n.checked=!0),document.createElement("span"));y(i,e),i.className=p.label,o.appendChild(n),o.appendChild(i),r.appendChild(o)}),r.querySelectorAll("input"));n.length&&n[0].focus()}},Tt=n=>{const o=[];return"undefined"!=typeof Map&&n instanceof Map?n.forEach((e,t)=>{let n=e;"object"==typeof n&&(n=Tt(n)),o.push([t,n])}):Object.keys(n).forEach(e=>{let t=n[e];"object"==typeof t&&(t=Tt(t)),o.push([e,t])}),o},St=(e,t)=>t&&t.toString()===e.toString();function Lt(){var e,t=L.innerParams.get(this);if(t){const n=L.domCache.get(this);x(n.loader),re()?t.icon&&B(s()):(t=n,(e=t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"))).length?B(e[0],"inline-block"):he()&&x(t.actions)),k([n.popup,n.actions],p.loading),n.popup.removeAttribute("aria-busy"),n.popup.removeAttribute("data-loading"),n.confirmButton.disabled=!1,n.denyButton.disabled=!1,n.cancelButton.disabled=!1}}var Ot={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const jt=()=>h()&&h().click();const Mt=e=>{e.keydownTarget&&e.keydownHandlerAdded&&(e.keydownTarget.removeEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!1)},Dt=(e,t,n)=>{const o=ie();if(o.length)return(t+=n)===o.length?t=0:-1===t&&(t=o.length-1),o[t].focus();g().focus()},It=["ArrowRight","ArrowDown"],qt=["ArrowLeft","ArrowUp"],Ht=(e,n,t)=>{var o=L.innerParams.get(e);if(o&&(!n.isComposing&&229!==n.keyCode))if(o.stopKeydownPropagation&&n.stopPropagation(),"Enter"===n.key)e=e,s=n,i=o,R(i.allowEnterKey)&&s.target&&e.getInput()&&s.target.outerHTML===e.getInput().outerHTML&&(["textarea","file"].includes(i.input)||(jt(),s.preventDefault()));else if("Tab"===n.key){e=n;var i=o;var a=e.target,r=ie();let t=-1;for(let e=0;e<r.length;e++)if(a===r[e]){t=e;break}e.shiftKey?Dt(i,t,-1):Dt(i,t,1);e.stopPropagation(),e.preventDefault()}else if([...It,...qt].includes(n.key)){var s=n.key;const l=h(),u=f(),d=b();if([l,u,d].includes(document.activeElement)){var c=It.includes(s)?"nextElementSibling":"previousElementSibling";let t=document.activeElement;for(let e=0;e<v().children.length;e++){if(!(t=t[c]))return;if(E(t)&&t instanceof HTMLButtonElement)break}t instanceof HTMLButtonElement&&t.focus()}}else if("Escape"===n.key){e=n,n=o,o=t;if(R(n.allowEscapeKey)){e.preventDefault();o(j.esc)}}};function Vt(e,t,n,o){re()?Ut(e,o):(Ce(n).then(()=>Ut(e,o)),Mt(T)),/^((?!chrome|android).)*safari/i.test(navigator.userAgent)?(t.setAttribute("style","display:none !important"),t.removeAttribute("class"),t.innerHTML=""):t.remove(),ae()&&(ft(),yt(),ot()),k([document.documentElement,document.body],[p.shown,p["height-auto"],p["no-backdrop"],p["toast-shown"]])}function Nt(e){e=void 0!==(n=e)?Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n):{isConfirmed:!1,isDenied:!1,isDismissed:!0};const t=Ot.swalPromiseResolve.get(this);var n=(e=>{const t=g();if(!t)return false;const n=L.innerParams.get(e);if(!n||w(t,n.hideClass.popup))return false;k(t,n.showClass.popup),A(t,n.hideClass.popup);const o=m();return k(o,n.showClass.backdrop),A(o,n.hideClass.backdrop),Ft(e,t,n),true})(this);this.isAwaitingPromise()?e.isDismissed||(Rt(this),t(e)):n&&t(e)}const Rt=e=>{e.isAwaitingPromise()&&(L.awaitingPromise.delete(e),L.innerParams.get(e)||e._destroy())},Ft=(e,t,n)=>{var o,i,a,r=m(),s=Le&&be(t);"function"==typeof n.willClose&&n.willClose(t),s?(s=e,o=t,t=r,i=n.returnFocus,a=n.didClose,T.swalCloseEventFinishedCallback=Vt.bind(null,s,t,i,a),o.addEventListener(Le,function(e){e.target===o&&(T.swalCloseEventFinishedCallback(),delete T.swalCloseEventFinishedCallback)})):Vt(e,r,n.returnFocus,n.didClose)},Ut=(e,t)=>{setTimeout(()=>{"function"==typeof t&&t.bind(e.params)(),e._destroy()})};function Wt(e,t,n){const o=L.domCache.get(e);t.forEach(e=>{o[e].disabled=n})}function zt(e,t){if(!e)return!1;if("radio"===e.type){const n=e.parentNode.parentNode,o=n.querySelectorAll("input");for(let e=0;e<o.length;e++)o[e].disabled=t}else e.disabled=t}const _t=e=>{e.isAwaitingPromise()?(Kt(L,e),L.awaitingPromise.set(e,!0)):(Kt(Ot,e),Kt(L,e))},Kt=(e,t)=>{for(const n in e)e[n].delete(t)};e=Object.freeze({hideLoading:Lt,disableLoading:Lt,getInput:function(e){var t=L.innerParams.get(e||this);return(e=L.domCache.get(e||this))?le(e.popup,t.input):null},close:Nt,isAwaitingPromise:function(){return!!L.awaitingPromise.get(this)},rejectPromise:function(e){const t=Ot.swalPromiseReject.get(this);Rt(this),t&&t(e)},handleAwaitingPromise:Rt,closePopup:Nt,closeModal:Nt,closeToast:Nt,enableButtons:function(){Wt(this,["confirmButton","denyButton","cancelButton"],!1)},disableButtons:function(){Wt(this,["confirmButton","denyButton","cancelButton"],!0)},enableInput:function(){return zt(this.getInput(),!1)},disableInput:function(){return zt(this.getInput(),!0)},showValidationMessage:function(e){const t=L.domCache.get(this);var n=L.innerParams.get(this);y(t.validationMessage,e),t.validationMessage.className=p["validation-message"],n.customClass&&n.customClass.validationMessage&&A(t.validationMessage,n.customClass.validationMessage),B(t.validationMessage);const o=this.getInput();o&&(o.setAttribute("aria-invalid",!0),o.setAttribute("aria-describedby",p["validation-message"]),ue(o),A(o,p.inputerror))},resetValidationMessage:function(){var e=L.domCache.get(this);e.validationMessage&&x(e.validationMessage);const t=this.getInput();t&&(t.removeAttribute("aria-invalid"),t.removeAttribute("aria-describedby"),k(t,p.inputerror))},getProgressSteps:function(){return L.domCache.get(this).progressSteps},update:function(e){var t=g(),n=L.innerParams.get(this);if(!t||w(t,n.hideClass.popup))return a("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");t=(t=>{const n={};return Object.keys(t).forEach(e=>{if(Y(e))n[e]=t[e];else a('Invalid parameter to update: "'.concat(e,'". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'))}),n})(e),n=Object.assign({},n,t),tt(this,n),L.innerParams.set(this,n),Object.defineProperties(this,{params:{value:Object.assign({},this.params,e),writable:!1,enumerable:!0}})},_destroy:function(){var e=L.domCache.get(this);const t=L.innerParams.get(this);t?(e.popup&&T.swalCloseEventFinishedCallback&&(T.swalCloseEventFinishedCallback(),delete T.swalCloseEventFinishedCallback),T.deferDisposalTimer&&(clearTimeout(T.deferDisposalTimer),delete T.deferDisposalTimer),"function"==typeof t.didDestroy&&t.didDestroy(),e=this,_t(e),delete e.params,delete T.keydownHandler,delete T.keydownTarget,delete T.currentInstance):_t(this)}});const Yt=(e,t)=>{var n=L.innerParams.get(e);if(!n.input)return l('The "input" parameter is needed to be set when using returnInputValueOn'.concat(H(t)));var o=((e,t)=>{const n=e.getInput();if(!n)return null;switch(t.input){case"checkbox":return n.checked?1:0;case"radio":return(o=n).checked?o.value:null;case"file":return(o=n).files.length?null!==o.getAttribute("multiple")?o.files:o.files[0]:null;default:return t.inputAutoTrim?n.value.trim():n.value}var o})(e,n);if(n.inputValidator){var i=e;var a=o;var r=t;const s=L.innerParams.get(i),c=(i.disableInput(),Promise.resolve().then(()=>u(s.inputValidator(a,s.validationMessage))));c.then(e=>{i.enableButtons(),i.enableInput(),e?i.showValidationMessage(e):("deny"===r?Zt:$t)(i,a)})}else e.getInput().checkValidity()?("deny"===t?Zt:$t)(e,o):(e.enableButtons(),e.showValidationMessage(n.validationMessage))},Zt=(t,n)=>{const e=L.innerParams.get(t||void 0);if(e.showLoaderOnDeny&&D(f()),e.preDeny){L.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preDeny(n,e.validationMessage)));o.then(e=>{!1===e?(t.hideLoading(),Rt(t)):t.closePopup({isDenied:!0,value:void 0===e?n:e})}).catch(e=>Xt(t||void 0,e))}else t.closePopup({isDenied:!0,value:n})},Jt=(e,t)=>{e.closePopup({isConfirmed:!0,value:t})},Xt=(e,t)=>{e.rejectPromise(t)},$t=(t,n)=>{const e=L.innerParams.get(t||void 0);if(e.showLoaderOnConfirm&&D(),e.preConfirm){t.resetValidationMessage(),L.awaitingPromise.set(t||void 0,!0);const o=Promise.resolve().then(()=>u(e.preConfirm(n,e.validationMessage)));o.then(e=>{E(ee())||!1===e?(t.hideLoading(),Rt(t)):Jt(t,void 0===e?n:e)}).catch(e=>Xt(t||void 0,e))}else Jt(t,n)},Gt=(n,e,o)=>{e.popup.onclick=()=>{var e,t=L.innerParams.get(n);t&&((e=t).showConfirmButton||e.showDenyButton||e.showCancelButton||e.showCloseButton||t.timer||t.input)||o(j.close)}};let Qt=!1;const en=t=>{t.popup.onmousedown=()=>{t.container.onmouseup=function(e){t.container.onmouseup=void 0,e.target===t.container&&(Qt=!0)}}},tn=t=>{t.container.onmousedown=()=>{t.popup.onmouseup=function(e){t.popup.onmouseup=void 0,e.target!==t.popup&&!t.popup.contains(e.target)||(Qt=!0)}}},nn=(n,o,i)=>{o.container.onclick=e=>{var t=L.innerParams.get(n);Qt?Qt=!1:e.target===o.container&&R(t.allowOutsideClick)&&i(j.backdrop)}},on=e=>"object"==typeof e&&e.jquery,an=e=>e instanceof Element||on(e);const rn=()=>{if(T.timeout){{const n=ne();var e=parseInt(window.getComputedStyle(n).width),t=(n.style.removeProperty("transition"),n.style.width="100%",parseInt(window.getComputedStyle(n).width)),e=e/t*100;n.style.removeProperty("transition"),n.style.width="".concat(e,"%")}return T.timeout.stop()}},sn=()=>{var e;if(T.timeout)return e=T.timeout.start(),se(e),e};let cn=!1;const ln={};const un=t=>{for(let e=t.target;e&&e!==document;e=e.parentNode)for(const o in ln){var n=e.getAttribute(o);if(n)return void ln[o].fire({template:n})}};var dn=Object.freeze({isValidParameter:K,isUpdatableParameter:Y,isDeprecatedParameter:Z,argsToParams:n=>{const o={};return"object"!=typeof n[0]||an(n[0])?["title","html","icon"].forEach((e,t)=>{t=n[t];"string"==typeof t||an(t)?o[e]=t:void 0!==t&&l("Unexpected type of ".concat(e,'! Expected "string" or "Element", got ').concat(typeof t))}):Object.assign(o,n[0]),o},isVisible:()=>E(g()),clickConfirm:jt,clickDeny:()=>f()&&f().click(),clickCancel:()=>b()&&b().click(),getContainer:m,getPopup:g,getTitle:X,getHtmlContainer:$,getImage:G,getIcon:s,getInputLabel:()=>n(p["input-label"]),getCloseButton:oe,getActions:v,getConfirmButton:h,getDenyButton:f,getCancelButton:b,getLoader:d,getFooter:te,getTimerProgressBar:ne,getFocusableElements:ie,getValidationMessage:ee,isLoading:()=>g().hasAttribute("data-loading"),fire:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return new this(...t)},mixin:function(n){class e extends this{_main(e,t){return super._main(e,Object.assign({},n,t))}}return e},showLoading:D,enableLoading:D,getTimerLeft:()=>T.timeout&&T.timeout.getTimerLeft(),stopTimer:rn,resumeTimer:sn,toggleTimer:()=>{var e=T.timeout;return e&&(e.running?rn:sn)()},increaseTimer:e=>{if(T.timeout)return e=T.timeout.increase(e),se(e,!0),e},isTimerRunning:()=>T.timeout&&T.timeout.isRunning(),bindClickHandler:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"data-swal-template";ln[e]=this,cn||(document.body.addEventListener("click",un),cn=!0)}});let pn;class I{constructor(){if("undefined"!=typeof window){pn=this;for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=Object.freeze(this.constructor.argsToParams(t)),o=(Object.defineProperties(this,{params:{value:o,writable:!1,enumerable:!0,configurable:!0}}),this._main(this.params));L.promise.set(this,o)}}_main(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=(J(Object.assign({},t,e)),T.currentInstance&&(T.currentInstance._destroy(),ae()&&ot()),T.currentInstance=this,gn(e,t)),t=(mt(e),Object.freeze(e),T.timeout&&(T.timeout.stop(),delete T.timeout),clearTimeout(T.restoreFocusTimeout),hn(this));return tt(this,e),L.innerParams.set(this,e),mn(this,t,e)}then(e){const t=L.promise.get(this);return t.then(e)}finally(e){const t=L.promise.get(this);return t.finally(e)}}const mn=(l,u,d)=>new Promise((e,t)=>{const n=e=>{l.closePopup({isDismissed:!0,dismiss:e})};var o,i,a;Ot.swalPromiseResolve.set(l,e),Ot.swalPromiseReject.set(l,t),u.confirmButton.onclick=()=>{var e=l,t=L.innerParams.get(e);e.disableButtons(),t.input?Yt(e,"confirm"):$t(e,!0)},u.denyButton.onclick=()=>{var e=l,t=L.innerParams.get(e);e.disableButtons(),t.returnInputValueOnDeny?Yt(e,"deny"):Zt(e,!1)},u.cancelButton.onclick=()=>{var e=l,t=n;e.disableButtons(),t(j.cancel)},u.closeButton.onclick=()=>n(j.close),e=l,t=u,a=n,L.innerParams.get(e).toast?Gt(e,t,a):(en(t),tn(t),nn(e,t,a)),o=l,e=T,t=d,i=n,Mt(e),t.toast||(e.keydownHandler=e=>Ht(o,e,i),e.keydownTarget=t.keydownListenerCapture?window:g(),e.keydownListenerCapture=t.keydownListenerCapture,e.keydownTarget.addEventListener("keydown",e.keydownHandler,{capture:e.keydownListenerCapture}),e.keydownHandlerAdded=!0),a=l,"select"===(t=d).input||"radio"===t.input?Bt(a,t):["text","email","number","tel","textarea"].includes(t.input)&&(F(t.inputValue)||U(t.inputValue))&&(D(h()),xt(a,t));{var r=d;const s=m(),c=g();"function"==typeof r.willOpen&&r.willOpen(c),e=window.getComputedStyle(document.body).overflowY,Pt(s,c,r),setTimeout(()=>{At(s,c)},wt),ae()&&(kt(s,r.scrollbarPadding,e),nt()),re()||T.previousActiveElement||(T.previousActiveElement=document.activeElement),"function"==typeof r.didOpen&&setTimeout(()=>r.didOpen(c)),k(s,p["no-transition"])}fn(T,d,n),bn(u,d),setTimeout(()=>{u.container.scrollTop=0})}),gn=(e,t)=>{var n=(e=>{e="string"==typeof e.template?document.querySelector(e.template):e.template;if(!e)return{};e=e.content,dt(e),e=Object.assign(at(e),rt(e),st(e),ct(e),lt(e),ut(e,it));return e})(e);const o=Object.assign({},r,t,n,e);return o.showClass=Object.assign({},r.showClass,o.showClass),o.hideClass=Object.assign({},r.hideClass,o.hideClass),o},hn=e=>{var t={popup:g(),container:m(),actions:v(),confirmButton:h(),denyButton:f(),cancelButton:b(),loader:d(),closeButton:oe(),validationMessage:ee(),progressSteps:Q()};return L.domCache.set(e,t),t},fn=(e,t,n)=>{var o=ne();x(o),t.timer&&(e.timeout=new gt(()=>{n("timer"),delete e.timeout},t.timer),t.timerProgressBar&&(B(o),C(o,t,"timerProgressBar"),setTimeout(()=>{e.timeout&&e.timeout.running&&se(t.timer)})))},bn=(e,t)=>{if(!t.toast)return R(t.allowEnterKey)?void(vn(e,t)||Dt(t,-1,1)):yn()},vn=(e,t)=>t.focusDeny&&E(e.denyButton)?(e.denyButton.focus(),!0):t.focusCancel&&E(e.cancelButton)?(e.cancelButton.focus(),!0):!(!t.focusConfirm||!E(e.confirmButton))&&(e.confirmButton.focus(),!0),yn=()=>{document.activeElement instanceof HTMLElement&&"function"==typeof document.activeElement.blur&&document.activeElement.blur()},wn=(Object.assign(I.prototype,e),Object.assign(I,dn),Object.keys(e).forEach(e=>{I[e]=function(){if(pn)return pn[e](...arguments)}}),I.DismissReason=j,I.version="11.4.8",I);return wn.default=wn}),void 0!==this&&this.Sweetalert2&&(this.swal=this.sweetAlert=this.Swal=this.SweetAlert=this.Sweetalert2);
"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}");/**
 * Interface PWA Object
 */
var pwaInterface = function() {

	// Get object
	var _ = {};

	/**
	 * The method is initializing the pwa object
	 */
	_.init = function( settings ) {
		// security - check that the settings are set
		if ( !settings ) return;
		// get settings
		_.translation = settings.translation;
		_.websiteID = settings.websiteID;
		_.deviceType = settings.deviceType;
		_.$GLOBALS = settings.$GLOBALS;
		// security - check that the browser supports `serviceWorker`
		if ( 'serviceWorker' in navigator ) {
			// append to the head the manifest file
			$('head').append('<link rel="manifest" href="' + _.$GLOBALS['cdn-system-files'] + '/site123_mani_fest.json?v=10&test55pass=1">');
			// register the service worker
			navigator.serviceWorker.register('/site123_sw.js');
			// initialize the installation message
			_.promptHandler.init();
		}
	};

	/**
	 * The function convert special characters to HTML entities, we use it when
	 * we add strings into HTML attributes, it used to prevent the breaks in 
	 * the HTML e.g. title="abc"efg".
	 * 
	 * Source: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
	 */
	function escapeHtml(text) {
		
		if ( !text ) return text;

		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&apos;'
		};
		return text.toString().replace( /[&<>"']/g, function( m ) { return map[m]; } );
	}

	/**
	 * The function trying to parse the sent JSON string, we use it to prevent
	 * JS error if the JSON is not valid from some reason. 
	 * 
	 * @param {string} str - JSON string.
	 * @param {function} faildCallback - Callback function to execute on failed parse (optional).
	 * @return {object} Obj - Valid Object or False if the sent JSON string is invalid.
	 */
	function tryParseJSON( str, faildCallback ) {
		// try parse the sent JSON
		try {
			var Obj = JSON.parse(str);
			if ( Obj && typeof Obj === "object" ) {
				return Obj;
			}
		} catch (e) {}
		// executing the callback function (if needed)
		if ( faildCallback ) faildCallback.call(this);
		// return false instead of invalid JSON
		return false;
	}

	/**
	 * Prompt Handler Object
	 */
	_.promptHandler = {
		/**
		 * The method is initializing the prompt object
		 */
		init: function() {
			// get object instance
			var that = this;
			// get prompt html
			that.$html = $(that.generateHtml());
			// check
			that.promptAllowed = that.isPromptAllowed();
			// set in how many days we want to show the installation message
			that.nextShow = 30;
			// add event listener to pwa before installation
			window.addEventListener('beforeinstallprompt', function( e ) {
				// prevent Chrome 76 and later from showing the mini-infobar
				e.preventDefault();
				// disable pwa installation message on pc
				if ( _.deviceType != 'mobile' && _.deviceType != 'tablet' ) return;
				/* once user already dismissed the installation message don't show it to him
				for some time, at the moment the cookie is expiration date is for month */
				if ( !that.promptAllowed ) return;
				// add the message to the body
				$('body').append(that.$html);
				// stash the event so it can be triggered later
				deferredPrompt = e;
				// trigger show animation
				that.$html.addClass('show-prompt');
				// add click event to the pwa button
				that.$html.find('#pwaInstallBtn').on('click', function( e ) {
					// hide the prompt
					that.hide();
					// show the browser install prompt
					deferredPrompt.prompt();
					// wait for the user to respond to the prompt
					deferredPrompt.userChoice.then(function( choiceResult ) {
						// user accepted the install prompt
						if ( choiceResult.outcome === 'accepted' ) {
						// user dismissed the install promp
						} else {
							that.promptAllowed = false;
						}
					});
				});
				// add click even to the dismiss button
				that.$html.find('#pwaDismissPrompot').on('click', function( e ) {
					that.hide();
				});
				// add event listener when the app is finished installation
				window.addEventListener('appinstalled', function( event ) {
				});
			});

		},
		/**
		 * The method is hiding the prompt and setting a cookie to prevent opening
		 * the prompt for some time
		 */
		hide: function() {
			// hide the app provided install promotion
			this.$html.removeClass('show-prompt');
			// set cookie to hide the message
			$.cookie(_.websiteID + '_pwaInterface',JSON.stringify({dismissed: true}),{ expires: this.nextShow, path: '/' });
		},
		/**
		 * The method is generating the html of the prompt
		 
		 * @return {string} html - Prompt structure
		 */
		generateHtml: function() {
			// generate html
			var html = '';
			html += '<div id="pwaPrompt">';
				// body
				html += '<div class="pwa-prompt-body">';
					// logo
					html += '<div class="pwa-prompt-logo-container">';
						html += '<img src="' + _.$GLOBALS['cdn-system-files'] + '/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png?v=' + _.$GLOBALS['v-cache'] + '">';
					html += '</div>';
					// content
					html += '<div class="pwa-prompt-content">';
						html += '<a id="pwaInstallBtn" href="#">' + escapeHtml(_.translation.buttonText) + '</a>';
					html += '</div>';
					// dismiss button
					html += '<div class="pwa-prompt-dismiss-container">';
						html += '<a id="pwaDismissPrompot" href="#">&times;</a>';
					html += '</div>';
				html += '</div>';
			html += '</div>'
			// return html
			return html;
		},
		/**
		 * The method is checking if the user already see the prompt
		 *
		 * @return {boolean} Unnamed - False for preventing opening the prompt
		 */
		isPromptAllowed: function() {
			// get data from cookie
			var cookie = tryParseJSON($.cookie(_.websiteID + '_pwaInterface'));
			// check if the user already dismissed the prompt
			if ( cookie && cookie.dismissed ) return false;
			// user still didn't see the prompt
			return true;
		}
	};

	// Return object
	return _;
}();function ModuleLayoutCustomizer( settings ) {var _ = {$container: settings.$container,defaultData: settings.defaultData,moduleID: settings.moduleID,style: settings.style,translations: settings.translations,onChange: settings.onChange,currentModule: null,popoverPlacement: settings.popoverPlacement,supportedModules: {gallery: [56,57,1,45,46,62],customers: [13,75,77,190],testimonials: [5,25,132,133,148],team: [4,4001,4002,4003,51,74,102,101,131,135],services: [3,6,7,26,61,146,160,26004,26001,26002,26003],counters:[12,92],numbersFeatures: [136,138],about: [16,33,34,89,90,91,149,150,168,171,175,16001,91001,150001,150002,150003,90150,150001,150002,150003,171001,175001],percentage: [110001],faq: [11,50,134,11001],blog: [70,84,85,151,163,166,192],articles: [152,164,165,195,17001,17004,17005],customFormBuilder: [79,116,117,118,119,120,121,122],portfolio: [170],headers: [167,167001,167002,167003,167004,167005,167006,167007,167008,167009,167012,167013,167014,167015,167016,167018,167019,167020,167021,167022,167023,167024,167025,167026,167027,167028,167029,167030,167031,167032,167033,167034,167035,167036,167037,167038,167039,167040,167041,167042],homepageModule: [169,169002,169004,169006,169007,169001,169005,169009,169003,169014,169015,169016,169017,169018,169022,169023,169024,169025,169026,169027,169028,169029,169030,169031,169032,169033,169034,169035,169036,169037,169038,169039,169040,169041,169042],restaurantMenu: [9,29],timeline: [41,41001,41002],agenda: [107,107001,107002,111,111001,111002,109,109001,109002]},boxBackgroundColor: {'#ffffff': [169024,169023,169022,169029,169033],'var(--global_main_color)': [169004,169009,169031,169032],'#ebebeb': [169017,169018],'#fbefd7': [169039],'#d4fdfc': [169040,169041],},};_.init = function() {if ( !_.defaultData ) return;setCurrentModule();if ( !_.currentModule ) return;addController();};function addController() {loadData();_.$popOverContent = $('<div class="p-m-s-container"><a class="p-m-s-mobile-back-btn blue"><i class="fa fa-arrow-left" aria-hidden="true"></i></a></div>');_.$popOverContent.find('.p-m-s-mobile-back-btn').click( function( event ) {destroyPopover();});switch ( _.currentModule ) {case 'gallery':_.$popOverContent = _.$popOverContent.append(getGalleryContent());break;case 'customers':_.$popOverContent = _.$popOverContent.append(getCustomersContent());break;case 'testimonials':_.$popOverContent = _.$popOverContent.append(getTestimonialsContent());break;case 'team':_.$popOverContent = _.$popOverContent.append(getTeamContent());break;case 'services':_.$popOverContent = _.$popOverContent.append(getServicesContent());break;case 'counters':_.$popOverContent = _.$popOverContent.append(getCountersContent());break;case 'numbersFeatures':_.$popOverContent = _.$popOverContent.append(getNumbersFeaturesContent());break;case 'about':_.$popOverContent = _.$popOverContent.append(getAboutContent());break;case 'headers':_.$popOverContent = _.$popOverContent.append(getHeaderContent());break;case 'percentage':_.$popOverContent = _.$popOverContent.append(getPercentageContent());break;case 'faq':_.$popOverContent = _.$popOverContent.append(getFaqContent());break;case 'blog':_.$popOverContent = _.$popOverContent.append(getBlogContent());break;case 'articles':_.$popOverContent = _.$popOverContent.append(getArticlesContent());break;case 'customFormBuilder':_.$popOverContent = _.$popOverContent.append(getCustomFormBuilderContent());break;case 'portfolio':_.$popOverContent = _.$popOverContent.append(getPortfolioContent());break;case 'homepageModule':_.$popOverContent = _.$popOverContent.append(getHomepageContent());break;case 'restaurantMenu':_.$popOverContent = _.$popOverContent.append(getRestaurantMenuContent());break;case 'timeline':_.$popOverContent = _.$popOverContent.append(getTimelineContent());break;case 'agenda':_.$popOverContent = _.$popOverContent.append(getAgendaContent());break;}
_.$container.popover({container: 'body',content: _.$popOverContent,html: true,trigger: 'manual',template: '<div class="popover modules-setting layout-customizer" role="tooltip" data-current-module="'+_.currentModule+'"><div class="arrow"></div><div class="popover-content"></div></div>',placement: _.popoverPlacement == 'intrface_align_reverse' ? intrface_align_reverse : intrface_align});_.$popOverContent.append('<a class="c-l-mobile-back-btn blue"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>');_.$popOverContent.find('.c-l-mobile-back-btn').click( function( event ) {destroyPopover();});_.$container.on('shown.bs.popover', function () {_.$container.closest('body').find('.popover.layout-customizer [data-rel=tooltip]').tooltip({container: 'body',placement: 'auto'});$(document).on('mousedown.styleCustomizerPopover', function ( event ) {if ( $(event.target).closest('.popover.layout-customizer').length === 0 ) {destroyPopover();}});$(window).one('blur.styleCustomizerPopover', function( event ) {destroyPopover();});_.$container.closest('body').on('mousedown.preview.styleCustomizerPopover', function ( event ) {var $target = $(event.target);if ( $target.closest('.popover.layout-customizer').length === 0 ) {destroyPopover();_.$container.closest('body').off('mousedown.preview.styleCustomizerPopover');}});initializeControllers();});_.$container.popover('show');function destroyPopover() {_.$container.popover('destroy');$(document).off('mousedown.styleCustomizerPopover');$(window).off('blur.styleCustomizerPopover');$(window).off('scroll.styleCustomizerPopover');}}
function loadData() {var moduleSetting = tryParseJSON(GetModuleSetting(_.moduleID,'settings'));if ( moduleSetting.layout_customize ) {_.data = new Data(moduleSetting.layout_customize);} else {_.data = new Data(_.defaultData);}}
function Data( data ) {function Def() {switch ( _.currentModule ) {case 'gallery':return {display_type: 'standard',carouselInterval: 5,autoPlay: false,number_images_in_row: _.style == 1 ? 3 : 4,mobile_number_images_in_row: _.style == 1 ? 1 : 2};break;case 'customers':return {number_images_in_row: 5};break;case 'testimonials':return {testimonialsInterval: 10,style_box_color: '1',};break;case 'team':return {number_items_in_row: 4,style_box_color: '1',style_text_align: '1',};break;case 'services':return {number_items_in_row: 3,style_box_color: 1};break;case 'counters':return {number_items_in_row: 5};break;case 'numbersFeatures':return {number_items_in_row: 3};break;case 'about':return {style_box_color: '1',custom_text_size: '1'};break;case 'headers':return {style_box_color: '1',custom_text_size: '1',style_text_order: '1',custom_height: '1',};break;case 'percentage':return {style_box_color: '1',};break;case 'faq':return {style_box_color: '1',style_text_align: '1',};break;case 'blog':return {style_box_color: '1',};break;case 'articles':return {style_box_color: '1',};break;case 'customFormBuilder':return {style_box_color: '1',};break;case 'portfolio':return {number_items_in_row: 2};break;case 'homepageModule':return {custom_text_size: '1',style_background_color: '1',style_box_color: '1',style_text_order: '1',custom_height: '1',};break;case 'restaurantMenu':return {style_box_color: '1',};break;case 'timeline':return {style_box_color: '1',};break;case 'agenda':return {style_box_color: '1',};break;}}
var def = new Def();if ( data ) {data = objectAssign(def, data); // (objectAssign overwrite objects)
} else {data = def;}
return data;}
function getGalleryContent() {var html = '';html += '<div data-type="gallery">';html += '<div class="display-type-options" style="display: none;">';html += '<div class="form-group">';html += '<label>' + escapeHtml(_.translations.gallery.displayTypeTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.gallery.displayTypeToolTip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="display_type" class="display-type form-control">';html += '<option value="standard" ' + ( _.data.display_type === 'standard' ? 'selected' : '') + '>' + escapeHtml(_.translations.gallery.displayTypeOptionStandard) + '</option>';html += '<option value="carousel" ' + ( _.data.display_type === 'carousel' ? 'selected' : '') + '>' + escapeHtml(_.translations.gallery.displayTypeOptionCarousel) + '</option>';html += '</select>';html += '</div>';html += '<div class="checkbox" data-display-options="carousel">';html += '<label class="block">';html += '<input name="autoPlay" type="checkbox" class="ace auto-play" ' + ( _.data.autoPlay ? 'checked' : '' ) + '>';html +='<span class="lbl">';html += '&nbsp;' + escapeHtml(_.translations.gallery.autoPlayTitle);html +='</span>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.gallery.autoPlayToolTip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '</label>';html += '</div>';html += '<div data-display-options="carousel">';html += '<div class="sliderInput" id="carouselInterval" data-text="' + escapeHtml(_.translations.gallery.intervalTitle) + '" data-value="' + escapeHtml(_.data.carouselInterval) + '" data-max="30" data-min="1" data-tooltip="' + escapeHtml(_.translations.gallery.intervalToolTip) + '" data-number-kind="4" data-design="twoLines" data-custom-class="carousel-interval"></div>';html += '</div>';html += '</div>';html += '<div class="images-in-row-options" style="display: none;">';html += '<div class="form-group">';html += '<label class="images-in-row-label">' + escapeHtml(_.translations.gallery.numberImagesInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.gallery.numberImagesInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_images_in_row" class="number-images-in-row form-control">';html += '<option value="3" ' + ( _.data.number_images_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_images_in_row == '4' ? 'selected' : '') + '>4</option>';html += '<option value="5" ' + ( _.data.number_images_in_row == '5' ? 'selected' : '') + '>5</option>';html += '</select>';html += '</div>';html += '</div>';html += '<div class="images-in-row-options" style="display: none;">';html += '<div class="form-group">';html += '<label class="images-in-row-label">' + escapeHtml(_.translations.gallery.mobileNumberImagesInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.gallery.mobileNumberImagesInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="mobile_number_images_in_row" class="number-images-in-row form-control">';html += '<option value="1" ' + ( _.data.mobile_number_images_in_row == '1' ? 'selected' : '') + '>1</option>';html += '<option value="2" ' + ( _.data.mobile_number_images_in_row == '2' ? 'selected' : '') + '>2</option>';html += '</select>';html += '</div>';html += '</div>';html += '</div>';var $html = $(html);$html.find('[data-display-options="' + _.data.display_type + '"]').show();if ( [56,57].indexOf(_.style) != -1 ) {$html.children('.display-type-options').show();if ( _.data.display_type != 'carousel' ) {$html.addClass('small-popup');}} else if ( [1,45,46,62].indexOf(_.style) != -1 ) {$html.children('.images-in-row-options').show();$html.addClass('small-popup');}
return $html;}
function getCustomersContent() {var html = '';html += '<div data-type="customers">';html += '<div class="form-group">';html += '<label>' + escapeHtml(_.translations.customers.numberImagesInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.customers.numberImagesInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_images_in_row" class="number-images-in-row form-control">';html += '<option value="3" ' + ( _.data.number_images_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_images_in_row == '4' ? 'selected' : '') + '>4</option>';html += '<option value="5" ' + ( _.data.number_images_in_row == '5' ? 'selected' : '') + '>5</option>';html += '<option value="6" ' + ( _.data.number_images_in_row == '6' ? 'selected' : '') + '>6</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);return $html;}
function getTestimonialsContent() {var html = '';html += '<div data-type="testimonials">';html += '<div class="slider-container">';html += '<div class="sliderInput" id="testimonialsInterval" data-text="' + escapeHtml(_.translations.testimonials.intervalTitle) + '" data-value="' + escapeHtml(_.data.testimonialsInterval) + '" data-max="30" data-min="1" data-tooltip="' + escapeHtml(_.translations.testimonials.intervalToolTip) + '" data-number-kind="4" data-design="twoLines" data-custom-class="carousel-interval"></div>';html += '</div>';html += componentboxColor(true);html += '</div>';var $html = $(html);if ( [133,148,25].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();}
if ( [148,25].indexOf(_.style) != -1  ) {$html.children('.slider-container').hide();}
return $html;}
function getTeamContent() {var html = '';html += '<div data-type="team">';html += '<div class="form-group display-items-options">';html += '<label>' + escapeHtml(_.translations.team.numberItemsInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.team.numberItemsInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_items_in_row" class="number-items-in-row form-control">';html += '<option value="3" ' + ( _.data.number_items_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_items_in_row == '4' ? 'selected' : '') + '>4</option>';html += '</select>';html += '</div>';html += componentboxColor(true);html += '<div class="form-group display-text-align">';html += '<label>' + escapeHtml(_.translations.textAlign.TextAlignTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.textAlign.TextAlignTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="style_text_align" class="style-text-align form-control">';html += '<option value="1" ' + ( _.data.style_text_align == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.textAlign.textCenter) + '</option>';html += '<option value="2" ' + ( _.data.style_text_align == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.textAlign.textSide) + '</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);if ( [101,131].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();$html.children('.display-items-options').hide();}
if ( [135].indexOf(_.style) != -1 ) {$html.children('.display-color-options').hide();$html.children('.display-items-options').hide();}
if ( [4,102,135].indexOf(_.style) == -1 ) {$html.children('.display-text-align').hide();}
return $html;}
function getServicesContent() {var html = '';html += '<div data-type="services">';html += '<div class="form-group display-items-options">';html += '<label>' + escapeHtml(_.translations.services.numberItemsInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.services.numberItemsInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_items_in_row" class="number-items-in-row form-control">';html += '<option value="2" ' + ( _.data.number_items_in_row == '2' ? 'selected' : '') + '>2</option>';html += '<option value="3" ' + ( _.data.number_items_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_items_in_row == '4' ? 'selected' : '') + '>4</option>';html += '</select>';html += '</div>';html += componentboxColor(true);html += '</div>';var $html = $(html);if ( [26001,26002].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();}
if ( [146].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();$html.children('.display-items-options').hide();}
return $html;}
function getCountersContent() {var html = '';html += '<div data-type="counters">';html += '<div class="form-group">';html += '<label>' + escapeHtml(_.translations.counters.numberItemsInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.counters.numberItemsInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_items_in_row" class="number-items-in-row form-control">';html += '<option value="3" ' + ( _.data.number_items_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_items_in_row == '4' ? 'selected' : '') + '>4</option>';html += '<option value="5" ' + ( _.data.number_items_in_row == '5' ? 'selected' : '') + '>5</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);return $html;}
function getNumbersFeaturesContent() {var html = '';html += '<div data-type="numbersFeatures">';html += '<div class="form-group">';html += '<label>' + escapeHtml(_.translations.numbersFeatures.numberItemsInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.numbersFeatures.numberItemsInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_items_in_row" class="number-items-in-row form-control">';html += '<option value="3" ' + ( _.data.number_items_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_items_in_row == '4' ? 'selected' : '') + '>4</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);return $html;}
function getAboutContent() {var html = '';html += '<div data-type="about">';html += '<div class="form-group display-text-size-option">';html += '<label>' + escapeHtml(_.translations.about.layoutTextSize) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.about.layoutTextSizeTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="custom_text_size" class="custom-text-size form-control">';html += '<option value="1" ' + ( _.data.custom_text_size == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.small) + '</option>';html += '<option value="2" ' + ( _.data.custom_text_size == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.big) + '</option>';html += '<option value="3" ' + ( _.data.custom_text_size == '3' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.large) + '</option>';html += '</select>';html += '</div>';html += componentboxColor(true);html += '</div>';var $html = $(html);if ( [171,175,171001,175001,167006,167013].indexOf(_.style) != -1 ) {$html.children('.display-text-size-option').hide();}
if ( [150,171,175,150001,150002,150003,171001,175001,167006,167013].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();}
return $html;}
function getPercentageContent() {var html = '';html += '<div data-type="percentage">';html += componentboxColor(false);html += '</div>';var $html = $(html);return $html;}
function getFaqContent() {var html = '';html += '<div data-type="faq">';html += componentboxColor(false);html += '<div class="form-group display-text-align">';html += '<label>' + escapeHtml(_.translations.textAlign.TextAlignTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.textAlign.TextAlignTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="style_text_align" class="style-text-align form-control">';html += '<option value="1" ' + ( _.data.style_text_align == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.textAlign.textCenter) + '</option>';html += '<option value="2" ' + ( _.data.style_text_align == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.textAlign.textSide) + '</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);if ( [11,11001].indexOf(_.style) == -1 ) {$html.children('.display-text-align').hide();}
return $html;}
function getBlogContent() {var html = '';html += '<div data-type="blog">';html += componentboxColor(false);html += '</div>';var $html = $(html);return $html;}
function getArticlesContent() {var html = '';html += '<div data-type="articles">';html += componentboxColor(false);html += '</div>';var $html = $(html);return $html;}
function getCustomFormBuilderContent() {var html = '';html += '<div data-type="customFormBuilder">';html += '<div class="form-group">';html += '<label>' + escapeHtml(_.translations.bgColor.boxStyleTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.bgColor.boxStyleTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="style_box_color" class="style-box-color form-control">';html += '<option value="1" ' + ( _.data.style_box_color == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.noBackground) + '</option>';html += '<option value="2" ' + ( _.data.style_box_color == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.mainColor) + '</option>';html += '<option value="3" ' + ( _.data.style_box_color == '3' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.black) + '</option>';html += '<option value="4" ' + ( _.data.style_box_color == '4' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.whiteTopBorder) + '</option>';html += '<option value="5" ' + ( _.data.style_box_color == '5' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.gray) + '</option>';html += '<option value="6" ' + ( _.data.style_box_color == '6' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.whiteTransparent) + '</option>';html += '<option value="7" ' + ( _.data.style_box_color == '7' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.transparent) + '</option>';html += '<option value="8" ' + ( _.data.style_box_color == '8' ? 'selected' : '') + '>' + escapeHtml(_.translations.styles.primary) + '</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);return $html;}
function getPortfolioContent() {var html = '';html += '<div data-type="portfolio">';html += '<div class="form-group">';html += '<label>' + escapeHtml(_.translations.portfolio.numberItemsInRowTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.portfolio.numberItemsInRowTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="number_items_in_row" class="number-items-in-row form-control">';html += '<option value="2" ' + ( _.data.number_items_in_row == '2' ? 'selected' : '') + '>2</option>';html += '<option value="3" ' + ( _.data.number_items_in_row == '3' ? 'selected' : '') + '>3</option>';html += '<option value="4" ' + ( _.data.number_items_in_row == '4' ? 'selected' : '') + '>4</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);return $html;}
function getHomepageContent() {var $modules_color_second = $('#modules_color_second');var backgroundColor = 'var(--modules_color_second)';if ( $modules_color_second.length > 0 ) {backgroundColor = $modules_color_second.val();}
var html = '';html += '<div data-type="homepageModule">';html += '<div class="form-group display-text-size-option">';html += '<label>' + escapeHtml(_.translations.about.layoutTextSize) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.about.layoutTextSizeTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="custom_text_size" class="custom-text-size form-control">';html += '<option value="1" ' + ( _.data.custom_text_size == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.small) + '</option>';html += '<option value="2" ' + ( _.data.custom_text_size == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.big) + '</option>';html += '<option value="3" ' + ( _.data.custom_text_size == '3' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.large) + '</option>';html += '</select>';html += '</div>';html += '<div class="form-group display-background-color-options" style="display: none;">';html += '<label>' + escapeHtml(_.translations.homepageModule.backgroundStyleTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.homepageModule.backgroundStyleTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<div class="style-background-color">';html += '<input type="hidden" class="m-c-l-quick-color-input" name="style_background_color" value="'+_.data.style_background_color+'">';html += '<div class="m-c-l-quick-colors">';html += '<div class="m-c-l-quick-color m-c-l-quick-color-default" style="background-color: ' + backgroundColor + ';" data-value="5" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.defaultThemeColor) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-white" data-value="1" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.white) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-black" data-value="2" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.black) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-gray" data-value="3" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.gray) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color background-primary-color" data-value="4" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.mainColor) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '</div>';html += '</div>';html += '</div>';html += '<div class="form-group display-opacity-options" style="display: none;">';html += '<label>' + escapeHtml(_.translations.homepageModule.opacityStyleTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.homepageModule.opacityStyleTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select class="style-opacity-options form-control">';html += '<option value="no" ' + ( $('#header_opacity').val() == 'no' ? 'selected' : '') + '>' + escapeHtml(_.translations.homepageModule.noOpacity) + '</option>';html += '<option value="full" ' + ( $('#header_opacity').val() == 'full' ? 'selected' : '') + '>' + escapeHtml(_.translations.homepageModule.full) + '</option>';html += '<option value="slight" ' + ( $('#header_opacity').val() == 'slight' ? 'selected' : '') + '>' + escapeHtml(_.translations.homepageModule.half) + '</option>';html += '</select>';html += '</div>';html += componentboxColor(true);html += '<div class="form-group display-text-orders" style="display: none;">';html += '<label>' + escapeHtml(_.translations.textOrder.title) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.textOrder.tooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="style_text_order" class="style-text-order form-control">';html += '<option value="1" ' + ( _.data.style_text_order == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.textOrder.bigSmall) + '</option>';html += '<option value="2" ' + ( _.data.style_text_order == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.textOrder.smallBig) + '</option>';html += '</select>';html += '</div>';html += '<div class="form-group display-custom-height" style="display: none;">';html += '<label>' + escapeHtml(_.translations.customHeight.title) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.customHeight.tooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="custom_height" class="custom-height form-control">';html += '<option value="1" ' + ( _.data.custom_height == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.customHeight.default) + '</option>';html += '<option value="2" ' + ( _.data.custom_height == '2' ? 'selected' : '') + '>75%</option>';html += '<option value="3" ' + ( _.data.custom_height == '3' ? 'selected' : '') + '>100%</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);$html.children('.display-text-orders').show();$html.children('.display-custom-height').show();if ( [169002,169004,169009,169006,169007,169014,169015,169016,169017,169018,169028,169027,169022,169031,169032,169033,169034,169035,169039,169040,169041].indexOf(_.style) != -1 ) {$html.children('.display-background-color-options').show();} else if ( [169001,169003,169,169030,169027,169025,169024,169023,169038,169042].indexOf(_.style) != -1 ) {var template = $('#template').val();$html.children('.display-opacity-options').show();if ( layoutArr[template].menuPlace != 'top' && (layoutArr[template].menuPlace != 'bottom' || template == 20) ) {$html.children('.display-opacity-options').find('.style-opacity-options').attr('disabled','disabled');$html.children('.display-opacity-options').find('a').attr('title',escapeHtml(_.translations.homepageModule.opacityStyleNotSupportedTooltip));}}
if ( [169017,169018,169024,169023,169022,169029,169033,169036,169037,169039,169040,169041].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();}
if ( Wizard.Preview.ready ) {var $section = Wizard.Preview.$('#section-'+_.moduleID);if ( $section.find('.line') && $section.find('.line').css('display') == 'none' ) {$html.children('.display-text-size-option').hide();$html.children('.display-text-orders').hide();}}
return $html;}
function getHeaderContent() {var backgroundColor = '#ffffff';if ( topWindow.Wizard.Preview.ready ) {var $section = topWindow.Wizard.Preview.$('#section-'+_.moduleID);if ( $section.length > 0 ) {if ( $section.hasClass('bg-primary') ) {backgroundColor = topWindow.$('#modules_color').val();} else {backgroundColor = topWindow.$('#modules_color_second').val();}}}
var html = '';html += '<div data-type="header">';html += '<div class="form-group display-text-size-option">';html += '<label>' + escapeHtml(_.translations.about.layoutTextSize) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.about.layoutTextSizeTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="custom_text_size" class="custom-text-size form-control">';html += '<option value="1" ' + ( _.data.custom_text_size == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.small) + '</option>';html += '<option value="2" ' + ( _.data.custom_text_size == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.big) + '</option>';html += '<option value="3" ' + ( _.data.custom_text_size == '3' ? 'selected' : '') + '>' + escapeHtml(_.translations.about.large) + '</option>';html += '</select>';html += '</div>';html += '<div class="form-group display-bg-color-options" style="display: none;">';html += '<label>' + escapeHtml(_.translations.homepageModule.backgroundStyleTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.homepageModule.backgroundStyleTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<div class="style-background-color">';html += '<input type="hidden" class="m-c-l-quick-color-input" name="style_background_color" value="'+_.data.style_background_color+'">';html += '<div class="m-c-l-quick-colors">';html += '<div class="m-c-l-quick-color m-c-l-quick-color-default" style="background-color: ' + backgroundColor + ';" data-value="1" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.defaultThemeColor) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></i></div>';html += '<div class="m-c-l-quick-color bg-primary-white" data-value="2" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.white) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-black" data-value="3" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.black) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-gray" data-value="4" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.gray) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color background-primary-color" data-value="5" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.mainColor) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '</div>';html += '</div>';html += '</div>';html += componentboxColor(true);html += '<div class="form-group display-text-orders">';html += '<label>' + escapeHtml(_.translations.textOrder.title) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.textOrder.tooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="style_text_order" class="style-text-order form-control">';html += '<option value="1" ' + ( _.data.style_text_order == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.textOrder.bigSmall) + '</option>';html += '<option value="2" ' + ( _.data.style_text_order == '2' ? 'selected' : '') + '>' + escapeHtml(_.translations.textOrder.smallBig) + '</option>';html += '</select>';html += '</div>';html += '<div class="form-group display-custom-height" style="display: none;">';html += '<label>' + escapeHtml(_.translations.customHeight.title) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.customHeight.tooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<select name="custom_height" class="custom-height form-control">';html += '<option value="1" ' + ( _.data.custom_height == '1' ? 'selected' : '') + '>' + escapeHtml(_.translations.customHeight.default) + '</option>';html += '<option value="2" ' + ( _.data.custom_height == '2' ? 'selected' : '') + '>75%</option>';html += '<option value="3" ' + ( _.data.custom_height == '3' ? 'selected' : '') + '>100%</option>';html += '</select>';html += '</div>';html += '</div>';var $html = $(html);$html.children('.display-custom-height').show();if ( [167006,167013,167024,167023,167022,167029,167033,167036,167037,167039,167040,167041].indexOf(_.style) != -1 ) {$html.children('.display-color-options').show();}
if ( [167,167001,167002,167003,167004,167005,167007,167008,167009,167012,167014,167015,167016,167020,167021,167028,167027,167022,167031,167032,167033,167035,167039,167040,167041,167034].indexOf(_.style) != -1 ) {$html.children('.display-bg-color-options').show();}
if ( Wizard.Preview.ready ) {var $section = Wizard.Preview.$('#section-'+_.moduleID);if ( $section.find('.line') && $section.find('.line').css('display') == 'none' ) {$html.children('.display-text-size-option').hide();$html.children('.display-text-orders').hide();}}
return $html;}
function getRestaurantMenuContent() {var html = '';html += componentboxColor(false);var $html = $(html);return $html;}
function getTimelineContent() {var html = '';html += componentboxColor(false);var $html = $(html);return $html;}
function getAgendaContent() {var html = '';html += componentboxColor(false);var $html = $(html);return $html;}
function save() {_.$popOverContent.find('[name]').each(function( index, input ) {switch ( $(this).prop('type') ) {case 'checkbox':_.data[$(this).attr('name')] = $(this).is(':checked');break;default:_.data[$(this).attr('name')] = $(this).val();break;}});if ( _.onChange ) _.onChange.call(this,_.data);}
function setCurrentModule() {$.each(_.supportedModules, function( index, moduleStyles ) {if ( moduleStyles.indexOf(_.style) != -1 ) {_.currentModule = index;return false;}});}
function getDefaultBoxBackgroundColor() {var backgroundColor = '';$.each(_.boxBackgroundColor, function( color, styles ) {if ( styles.indexOf(_.style) != -1 ) {backgroundColor = color;}});return backgroundColor;}
function initializeControllers() {switch ( _.currentModule ) {case 'gallery':SliderInputInitialize(_.$popOverContent.find('.sliderInput'));_.$popOverContent.find('[data-rel=tooltip]').tooltip({container: 'body',placement: 'auto'});_.$popOverContent.find('.display-type, .auto-play, .hide-social')
.on('change', function( event, status ) {var $this = $(event.target);if ( $this.hasClass('display-type') ) {_.$popOverContent.find('[data-display-options]').stop().fadeOut();_.$popOverContent.find('[data-display-options="' + $this.val() + '"]').stop().fadeIn();}
save();});_.$popOverContent.find('.carousel-interval').on('sliderInput.stop change', function( event ) {clearTimeout(this.userDragging);this.userDragging = setTimeout(function(){save();},500);});_.$popOverContent.find('.number-images-in-row').on('change', function( event, status ) {save();});break;case 'customers':_.$popOverContent.find('.number-images-in-row').on('change', function( event, status ) {save();});break;case 'testimonials':SliderInputInitialize(_.$popOverContent.find('.sliderInput'));initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.carousel-interval').on('input change', function( event ) {clearTimeout(this.userDragging);this.userDragging = setTimeout(function(){save();},500);});break;case 'services':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.number-items-in-row').on('change', function( event, status ) {save();});break;case 'team':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.number-items-in-row, .style-text-align').on('change', function( event, status ) {save();});break;case 'counters':_.$popOverContent.find('.number-items-in-row').on('change', function( event, status ) {save();});break;case 'numbersFeatures':_.$popOverContent.find('.number-items-in-row').on('change', function( event, status ) {save();});break;case 'about':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.custom-text-size').on('change', function( event, status ) {save();});break;case 'headers':initializingQuickColorPicker(_.$popOverContent.find('.style-background-color'));initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.custom-text-size, .style-text-order, .custom-height').on('change', function( event, status ) {save();});break;case 'percentage':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));break;case 'faq':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.style-text-align').on('change', function( event, status ) {save();});break;case 'blog':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));break;case 'articles':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));break;case 'customFormBuilder':_.$popOverContent.find('.style-box-color').on('change', function( event, status ) {save();});break;case 'portfolio':_.$popOverContent.find('.number-items-in-row').on('change', function( event, status ) {save();});break;case 'homepageModule':initializingQuickColorPicker(_.$popOverContent.find('.style-background-color'));initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));_.$popOverContent.find('.custom-text-size, .style-text-order, .custom-height').on('change', function( event, status ) {save();});_.$popOverContent.find('.style-opacity-options').on('change', function( event, status ) {$(document).trigger('mousedown.styleCustomizerPopover');$('#header_opacity').val($(this).val()).trigger('change');});break;case 'restaurantMenu':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));break;case 'timeline':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));break;case 'agenda':initializingQuickColorPicker(_.$popOverContent.find('.style-box-color'));break;}}
function initializingQuickColorPicker( $el ) {var $input = $el.find('.m-c-l-quick-color-input');var $colors = $el.find('.m-c-l-quick-colors .m-c-l-quick-color');var $activeIcon = $('<i class="ace-icon fa fa-check-circle"></i>');$colors.each(function(index,color) {var $color = $(color);if ( $color.data('value') == $input.val() ) {$color.append($activeIcon);}
$color.off('click').on('click',function(){var $this = $(this);$input.val($this.data('value'));$colors.html('');$this.append($activeIcon);save();});});}
function componentboxColor( hide ) {var layoutsDefaultNoBackground = [146,131];var backgroundColor = getDefaultBoxBackgroundColor();if ( layoutsDefaultNoBackground.includes(_.style) ) {backgroundColor = 'transparent';}
if ( backgroundColor.length == 0 ) {if ( Wizard.Preview.ready ) {backgroundColor = '#ffffff';var $section = Wizard.Preview.$('#section-'+_.moduleID);if ( $section.length > 0 ) {if ( $section.hasClass('bg-primary') ) {backgroundColor = topWindow.$('#modules_color_box').val();} else {backgroundColor = topWindow.$('#modules_color_second_box').val();}}}}
html = '<div class="form-group display-color-options" ' + (hide ? 'style="display: none;"' : '') + '>';html += '<label>' + escapeHtml(_.translations.bgColor.boxStyleTitle) + '</label>&nbsp;';html += '<a href="#" onclick="return false;" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.bgColor.boxStyleTitleTooltip) + '">';html += '<i class="fa fa-question-circle"></i>';html += '</a>';html += '<div class="style-box-color">';html += '<input type="hidden" class="m-c-l-quick-color-input" name="style_box_color" value="'+_.data.style_box_color+'">';html += '<div class="m-c-l-quick-colors">';html += '<div class="m-c-l-quick-color m-c-l-quick-color-default" style="background-color: ' + backgroundColor + ';" data-value="1" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.default) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color background-primary-color" data-value="2" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.mainColor) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-black" data-value="3" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.black) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-white" data-value="4" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.white) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '<div class="m-c-l-quick-color bg-primary-gray" data-value="5" data-rel="tooltip" data-trigger="hover" title="' + escapeHtml(_.translations.styles.gray) + '" data-delay=\'{"show":"1000", "hide":"0"}\'></div>';html += '</div>';html += '</div>';html += '</div>';return html;}
_.init();return _;}