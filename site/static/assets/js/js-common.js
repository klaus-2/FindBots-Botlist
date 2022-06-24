page = $('#wrapper').data('page');
toastr.options.positionClass = 'toast-bottom-right';

function smap(url) {
    const script = document.createElement('script');
    script.textContent = `//# sourceMappingURL=${url}?v=${Date.now()}`;
    document.head.appendChild(script);
    script.remove();
}

$(document).ready(function() {
    new Swiper('#slider', {
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
        },
        pagination: {
            el: '#slider .slider-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
        },
    });
    new Swiper('#trending-home .trends-container', {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: '.trending-navi .navi-next',
            prevEl: '.trending-navi .navi-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            900: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1320: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
            1880: {
                slidesPerView: 8,
                spaceBetween: 20,
            },
        },
        autoplay: 2000,
    });
    $(".btn-more-desc").click(function(e) {
        $(".bot-page-desc .text").toggleClass("text-full");
        $(this).toggleClass("active");
    });
    $("#mobile_search").click(function() {
        $("#mobile_search, #search").toggleClass("active");
    });
    $(".cbox-collapse .btn-showmore").click(function(e) {
        $(this).parent().find(".rank-block-ul").toggleClass("no-limit");
        $(this).toggleClass("active");
    });
    
    $('.select-anime-name').click(function() {
        $('.select-anime-name').toggleClass('off');
        quickSettings('anime_name', $(this).hasClass('off') ? 'jp' : 'en');
        toggleAnimeName();
    });
    $('.select-play-dub').click(function() {
        $('.select-play-dub').toggleClass('active')
        quickSettings('enable_dub', $(this).hasClass('active') ? 1 : 0);
    });
    $("#text-home-expand").click(function(e) {
        $(".text-home").toggleClass("thm-expand");
    });
    $('[data-toggle="tooltip"]').tooltip();
    $(".toggle-basic").click(function(e) {
        $(this).toggleClass("off");
    });
    var hidden_results = true;
    $('#search-suggest').mouseover(function() {
        hidden_results = false;
    });
    $('#search-suggest').mouseout(function() {
        hidden_results = true;
    });
    var timeout = null;
    $('.search-input').keyup(function() {
        if (timeout != null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
            timeout = null;
            var keyword = $('.search-input').val().trim();
            if (keyword.length > 1) {
                $('#search-suggest').show();
                $('#search-loading').show();
                $.get("/api/ajax/busca?nome=" + keyword, function(res) {
                    $('#search-suggest .result').html(res.html);
                    $('#search-suggest .result').slideUp('fast');
                    $('#search-suggest .result').slideDown('fast');
                    $('#search-loading').hide();
                });
            } else {
                $('#search-suggest').hide();
            }
        }, 500);
    });
    $('.search-input').blur(function() {
        if (hidden_results) {
            $('#search-suggest').slideUp('fast');
        }
    });
    

});
$('.quick-settings').click(function() {
    var option = $(this).data("option"),
        value = $(this).hasClass('off') ? 1 : 0;
    quickSettings(option, value);
});
$(document).on('click', '.dropdown-menu-noti,.dropdown-menu-right', function(e) {
    e.stopPropagation();
});
$(document).on('keyup', '#search-ep', function(e) {
    e.preventDefault();
    var value = e.target.value;
    $('.ep-item').removeClass('highlight');
    if (value) {
        var epEl = $('.ep-item[data-number=' + value + ']');
        if (epEl.length > 0) {
            var parent = epEl.parent();
            $('.ep-page-item[data-page=' + parent.data('page') + ']').click();
            if (e.keyCode === 13) {
                $(e.target).val("");
                epEl.click();
            } else {
                epEl.addClass('highlight');
            }
        }
    } else {
        var currPage = $('.ep-item.active').parent().data('page');
        $('.ep-page-item[data-page=' + currPage + ']').click();
    }
});
$('.f-genre-item').click(function() {
    $(this).toggleClass('active');
    var genreIds = [];
    $('.f-genre-item').each(function() {
        $(this).hasClass('active') && genreIds.push($(this).data('id'));
    })
    $('#f-genre-ids').val(genreIds.join(','));
});
if (Cookies.get('DevTools')) Cookies.remove('DevTools');
if ($('.bot-page-desc .text').length > 0) {
    var fullDes = $('.bot-page-desc .text').html();
    if (fullDes.length > 300) {
        var desShow = fullDes.substring(0, 300) + '...<span class="btn-more-desc more">+ Mais</span>',
            desMore = fullDes.substring(301, fullDes.length);
        $('.bot-page-desc .text').html(desShow);
    }
    $(document).on('click', '.btn-more-desc', function() {
        if ($(this).hasClass('more')) {
            $('.bot-page-desc .text').html(fullDes + '<span class="btn-more-desc less">- Menos</span>');
        } else {
            $('.bot-page-desc .text').html(desShow);
        }
    });
}

if ($('#dia-semana-1').hasClass('trends-slider-active')) {
    carregarCalendario(1);
} else if ($('#dia-semana-2').hasClass('trends-slider-active')) {
    carregarCalendario(2);
} else if ($('#dia-semana-3').hasClass('trends-slider-active')) {
    carregarCalendario(3);
} else if ($('#dia-semana-4').hasClass('trends-slider-active')) {
    carregarCalendario(4);
} else if ($('#dia-semana-5').hasClass('trends-slider-active')) {
    carregarCalendario(5);
} else if ($('#dia-semana-6').hasClass('trends-slider-active')) {
    carregarCalendario(6);
} else if ($('#dia-semana-7').hasClass('trends-slider-active')) {
    carregarCalendario(7);
}


$('#dia-semana-1').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(1);
});
$('#dia-semana-2').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(2);
});
$('#dia-semana-3').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(3);
});
$('#dia-semana-4').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(4);
});
$('#dia-semana-5').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(5);
});
$('#dia-semana-6').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(6);
});
$('#dia-semana-7').click(function () {
    $('.tsd-item').removeClass('active');
    $(this).find('.tsd-item').addClass('active');
    carregarCalendario(7);
});

function carregarCalendario(dia) {
    $('#recents-loading').show();
    $.get("/ajax/calendario/" + dia, function(res) {
        $('#recents-content .result').html(res.html);
        $('#recents-content .result').slideUp('fast');
        $('#recents-content .result').slideDown('fast');
        $('#recents-loading').hide();
    });
}

    $("#scl-more").click(function () {
        $(this).parent().find("#recents-content").toggleClass("active");
        $(this).toggleClass("active");
    });

    if ($('.recents-base-list li').length > 7) {
        $('#scl-more').show();
    }

    var scheduleSw = new Swiper('.recents-list .recents-base-date .trends-container', {
        slidesPerView: 7,
        spaceBetween: 10,
        // centeredSlides: true,
        navigation: {
            nextEl: '.recents-list .tsn-next',
            prevEl: '.recents-list .tsn-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            360: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 7,
                spaceBetween: 13,
            },
        },
    });
    scheduleSw.slideTo($(".tsd-item").index($(".tsd-item.active")), 1000);
    setTimeout(function () {
        $(".tsd-item.active").click();
    }, 1000)

    setInterval(showTime, 1000);

    function showTime() {
        var time = new Date();
        var hour = time.getHours();
        var min = time.getMinutes();
        var sec = time.getSeconds();
        var am_pm = "";

        // if (hour > 12) {
        //     hour -= 12;
        //     am_pm = "PM";
        // }
        // if (hour === 0) {
        //     hour = 12;
        //     am_pm = "AM";
        // }

        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        var currentTime = hour + ":" + min + ":" + sec + " " + am_pm;
        $('#clock').html(currentTime);
    }

    var date = new Date();
    $('#current-date').text(date.toLocaleDateString());
    var timezone = date.toString().split(" ")[5];
    $('#timezone').text("(" + timezone.slice(0, timezone.length - 2) + ":" + timezone.slice(-2) + ")");

    showTime();