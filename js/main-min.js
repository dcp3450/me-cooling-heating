function validateEmail(e){return!!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)}jQuery(document).ready(function(){function e(){var e=$(window).scrollTop();$(".form-container").css({top:"100px"})}function t(){$("#overlay").removeClass("active"),$(".form-container").removeClass("active"),$("body").css({overflow:"auto"})}function a(e){$(".tab-target .target").removeClass("active").eq(e).addClass("active")}$(".tabs").on("click","li",function(){var e=$(this),t=e.index();e.siblings().removeClass("active"),e.addClass("active"),$(".mobile-tabs option").eq(t).attr("selected","selected"),a(t)}),$(".mobile-tabs").change(function(){var e=$(this).find(":selected"),t=e.index();$(".tabs li").removeClass("active"),$(".tabs li").eq(t).addClass("active"),a(t)}),$(".form-trigger").on("click",function(e){var t=$(window).scrollTop();$("#overlay").addClass("active"),$(".form-container").addClass("active").css({top:t+40+"px"}),e.preventDefault()}),$("#overlay").on("click",function(e){t()}),$(document).keyup(function(e){27==e.keyCode&&t()}),$("#brochureForm").on("submit",function(e){var t=$(this),a=t.serialize(),i=!0,o=!0;if($(".form-inputs input").removeClass("error"),$(this).find(".form-inputs .required").each(function(){var e=$(this).find("input"),t=e.val();""==t&&(e.addClass("error"),i=!1),"email"==e.attr("type")&&((o=validateEmail(t))||e.addClass("error"))}),!i||!o)return!1;$.post("process.php",a,function(e){1==e?($(".form-inputs input").val(""),$(".form-container .thank-you").fadeIn(300)):alert("boom")}),e.preventDefault()});var i});