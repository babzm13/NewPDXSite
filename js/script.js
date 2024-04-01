let slideIndex = 0;
let movingPicturesController;
const menu_option_1 = "#rulebooks";
const menu_option_2 = "#general_info";
const menu_option_3 = "#about";
const menu_option_4 = "#donations";
const menu_option_5 = "#policies";
const menu_option_6 = "#worlds";
const menu_short_1 = "#rlbks";
const menu_short_2 = "#geninf";
const menu_short_3 = "#abt";
const menu_short_4 = "#dntns";
const menu_short_5 = "#pols";
const menu_short_6 = "#wlds";
const click_div = ".role_div h3";

$(document).ready(function(){
	//Menu Bar controls
	$(menu_short_1).click(function(){
		displayOrHide($(this), $(menu_option_1));
	});
	$(menu_short_2).click(function(){
		displayOrHide($(this), $(menu_option_2));
	});
	$(menu_short_3).click(function(){
		displayOrHide($(this), $(menu_option_3));
	});
	$(menu_short_4).click(function(){
		displayOrHide($(this), $(menu_option_4));
	});
	$(menu_short_5).click(function(){
		displayOrHide($(this), $(menu_option_5));
	});
	$(menu_short_6).click(function(){
		displayOrHide($(this), $(menu_option_6));
	});
	
	let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if(width <= 1250) { //If the side menu is enabled, make the closed side menu bar
		closeSideNav();
		makeSideMenu();
	}
	
	//Changes direction of menu upon resize
	$(window).resize(function(){ //When window resizes
		let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		if(width <= 1250) {
			closeSideNav();
			makeSideMenu();
		} else {
			closeSideNav();
			makeTopMenu();
			$("#menu_label").addClass("hide");
			$(".main-menu").each(function() {
				if ($(this).hasClass("hide"))
					$(this).removeClass("hide");
			});
		}
	});
	
	//Getting the image bar working
	if(document.getElementsByClassName("gallery").length != 0)
		showSlides();
	
	//Show/hide divs
	$(click_div).click(function() {
		showHideDiv($(this));
	});
	
	//show/hide all divs
	$(".expand_collapse").click(function() {
		let expanding = $(this).is("#expand");
		$(".expand_collapse").each(function() {
			if ($(this).hasClass("hide"))
				$(this).removeClass("hide");
			else
				$(this).addClass("hide");
		});
		$(click_div).each(function() {
			showHideAllDiv($(this), expanding);
		});
	});
});

//Hides or displays a given submenu
function displayOrHide($this, $param) {
	if($param.css("display") == "none") { //If this sub_menu is not currently being displayed
		$(".sub_menu").addClass("hide");
		$(document).find(".selected_element").removeClass("selected_element");
		$param.removeClass("hide");
		$this.addClass("selected_element");
	}
	else { //This sub_menu is currently being displayed
		$param.addClass("hide");
		$this.removeClass("selected_element");
	}
}

function openSideNav() {
	$("#side_nav").removeClass("hide");
	$("#close_menu").removeClass("hide");
	$("#menu_label").addClass("hide");
	$(".top_nav").each(function() {
		if ($(this).hasClass("hide"))
			$(this).removeClass("hide");
	});
	$(".sub_menu").each(function() {
		if (!$(this).hasClass("hide"))
			$(this).addClass("hide");
	});
}

function closeSideNav() {
	$("#side_nav").addClass("hide");
	$("#close_menu").addClass("hide");
	$("#menu_label").removeClass("hide");
	$(".top_nav").each(function() {
		if (!$(this).hasClass("hide"))
			$(this).addClass("hide");
	});
	$(".sub_menu").each(function() {
		if (!$(this).hasClass("hide"))
			$(this).addClass("hide");
	});
}

function makeTopMenu() {
	const left_side = $("#left_menu");
	const right_side = $("#right_menu");
	$(".sub_menu").each(function() {
		let item = $(this).detach();
		let location = ".set_of_sub_menues";
		$(location).append($(item));
	});
	left_side.append($(menu_short_1));
	left_side.append($(menu_short_2));
	left_side.append($(menu_short_3));
	right_side.append($(menu_short_4));
	right_side.append($(menu_short_5));
	right_side.append($(menu_short_6));
	$(".sub_menu").addClass("hide");
	$(".selected_element").removeClass("selected_element");
	$(".top_nav").removeClass("hide");
}

function makeSideMenu() {
	$(menu_short_6).detach().insertAfter($("#close_menu"));
	$(menu_short_5).detach().insertAfter($("#close_menu"));
	$(menu_short_4).detach().insertAfter($("#close_menu"));
	$(menu_short_3).detach().insertAfter($("#close_menu"));
	$(menu_short_2).detach().insertAfter($("#close_menu"));
	$(menu_short_1).detach().insertAfter($("#close_menu"));
	
	$(".sub_menu").each(function() {
		let item = $(this).detach();
		let location = null;
		let item_id = "#" + $(item).attr("id");
		switch(item_id) {
			case menu_option_1:
				location = menu_short_1;
				break;
			case menu_option_2:
				location = menu_short_2;
				break;
			case menu_option_3:
				location = menu_short_3;
				break;
			case menu_option_4:
				location = menu_short_4;
				break;
			case menu_option_5:
				location = menu_short_5;
				break;
			default: //worlds
				location = menu_short_6;
		}
		$(item).insertAfter($(document).find(location));
		$(item).addClass("hide");
		$(".selected_element").removeClass("selected_element");
	});
	$(".top_nav").addClass("hide");
}

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("gallery");
	let dots = document.getElementsByClassName("demo");
	let captionText = document.getElementById("caption");
	if(n != undefined)
		slideIndex = n;
	else
		slideIndex++;
	//Wrap properly
	if(slideIndex > slides.length) {
		slideIndex = 1;
	}
	if (slideIndex < 1) {
		slideIndex = slides.length;
	}
	//Hide everything
	$(".gallery").each(function() {
		if(!$(this).hasClass("hide")){
			$(this).addClass("hide");
		}
		$(this).removeClass("activeSlide");
	});
	for(i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	//Show current slide
	slides[slideIndex-1].className = slides[slideIndex-1].className.replace("hide", "activeSlide");
	dots[slideIndex-1].className += " active";
	captionText.innerHTML = dots[slideIndex-1].alt;
	
	if(n == undefined) {
		movingPicturesController = setTimeout(showSlides, 3000);
	} else {
		clearTimeout(movingPicturesController);
		movingPicturesController = setTimeout(showSlides, 3000);
	}	
}

function showHideAllDiv( theDiv, isExpanding ) {
	let status = $(theDiv).parent().children(".collapsible");
	if (status.hasClass("hide") && isExpanding) {
		status.removeClass("hide");
	} else if (!status.hasClass("hide") && !isExpanding) {
		status.addClass("hide");
	}
}

function showHideDiv( theDiv ) {
	let status = $(theDiv).parent().children(".collapsible");
	if (status.hasClass("hide")) {
		status.removeClass("hide");
	} else {
		status.addClass("hide");
	}
}

(function($, window) {
        var adjustAnchor = function() {

            var $anchor = $(':target'),
                    fixedElementHeight = 200;

            if ($anchor.length > 0) {

                $('html, body')
                    .stop()
                    .animate({
                        scrollTop: $anchor.offset().top - fixedElementHeight
                    }, 200);

            }

        };

        $(window).on('hashchange load', function() {
            adjustAnchor();
        });

    })(jQuery, window);