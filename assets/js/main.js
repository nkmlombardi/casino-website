// *************************************************************************//
// ! This is main JS file that contains custom scripts used in this template*/
// *************************************************************************//
/**
	Navigation File

	01. Carousel
	02. Custom Select
	03. Mobile Menu

 */

$(document).ready(function() {
    "use strict"
    // **********************************************************************//
    // 01. Carousel
    // **********************************************************************//
    $('.base-slider, .slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        navText: [
            "<i class=\"fa fa-chevron-left\"></i>",
            "<i class=\"fa fa-chevron-right\"></i>"
        ],
        dots: false,
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    $('.partner-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        autoplay: true,
        dots: false,
        item: 5,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    // **********************************************************************//
    // 02. Custom Select
    // **********************************************************************//
    $('select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length

        $this.addClass('select-hidden')
        $this.wrap('<div class="select"></div>')
        $this.after('<div class="select-styled"></div>')

        var $styledSelect = $this.next('div.select-styled')
        $styledSelect.text($this.children('option').eq(0).text())

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect)

        for (var i = 0; i < numberOfOptions; i++) $('<li />', {
            rel: $this.children('option').eq(i).val(),
            text: $this.children('option').eq(i).text()
        }).appendTo($list)

        var $listItems = $list.children('li')

        $styledSelect.click(function(e) {
            e.stopPropagation()
            $('div.select-styled.active').not(this).each(function() {
                $(this).removeClass('active').next('ul.select-options').hide()
            })
            $(this).toggleClass('active').next('ul.select-options').toggle()
        })

        $listItems.click(function(e) {
            e.stopPropagation()
            $styledSelect.text($(this).text()).removeClass('active')
            $this.val($(this).attr('rel'))
            $list.hide()
        })

        $(document).click(function() {
            $styledSelect.removeClass('active')
            $list.hide()
        })

    })

    // Roulette Mini Game
    var roulette = {
        numbers: [
            0, 32, 15, 19, 4, 21, 2, 25,
            17, 34, 6, 27, 13, 36, 11, 30, 8,
            23, 10, 5, 24, 16, 33, 1, 20, 14,
            31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,

            0, 32, 15, 19, 4, 21, 2, 25,
            17, 34, 6, 27, 13, 36, 11, 30, 8,
            23, 10, 5, 24, 16, 33, 1, 20, 14,
            31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,

            0, 32, 15, 19, 4, 21, 2, 25,
            17, 34, 6, 27, 13, 36, 11, 30, 8,
            23, 10, 5, 24, 16, 33, 1, 20, 14,
            31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
        ],
        picked: false,
        active: false,
        result: false
    }

    $('.track-container').addClass('hide')
    $('.result-container').addClass('hide')
    $('.controls').addClass('hide')

    var wheelContext

    for (var k = 0; k < roulette.numbers.length; k++) {
        $('.track .wheel').append(
            '<div class="number"><span>' + roulette.numbers[k] + '</span></div>'
        )

        wheelContext = $('.wheel .number').last()

        if (k === 0) wheelContext.addClass('green')
        else if (k % 2 === 0) wheelContext.addClass('black')
        else wheelContext.addClass('red')
    }


    $('.roulette-cell').click(function(event) {
        console.log('Gold toggled', this, event, roulette)

        $('.roulette-cell').removeClass('gold')
        $(this).addClass('gold')

        var selectedNumber = Number(event.target.outerText)

        if (roulette.picked === selectedNumber) {
            roulette.picked = false
            $('.controls').removeClass('hide')
            $('.roulette-cell').removeClass('gold')
        } else {
            roulette.picked = Number(event.target.outerText)
            $('.controls').removeClass('hide')
        }
    })

    $('.play').click(function(event) {
        if (!roulette.picked) return

        if (roulette.result) {
            $('.result-container').addClass('animate-out')
            setTimeout(function() {
                $('.result-container').addClass('hide')
                $('.result-container').removeClass('animate-out')
            }, 750)
            $('.play span').text('Spin Me!')
            $('.roulette-cell').removeClass('gold')
            roulette.picked = false
            roulette.result = false
            return
        }

        $('.track-container').removeClass('hide')
        roulette.active = true
        $('.track .wheel').addClass('animating')

        setTimeout(function() {
            $('.result-container').removeClass('hide')
            $('.play span').text('Retry?')
            roulette.active = false
        }, 4000)

        setTimeout(function() {
            $('.track .wheel').removeClass('animating')
            $('.track-container').addClass('hide')
        }, 6000)

        roulette.result = Math.round(Math.random() * 36)

        if (roulette.result === roulette.picked) {
            $('.result').html('<span class="winner">You won!</span><span class="result-number">' + roulette.result + '</span>')
        } else {
            $('.result').html('<span class="loser">You lost</span><span class="result-number">' + roulette.result + '</span>')
        }
    })


    // **********************************************************************//
    // 03. Mobile Menu
    // **********************************************************************//
    $('.mobile-menu-btn').on('click', function() {
        $(this).toggleClass('active')
        $('header').toggleClass('active')
        $('body').toggleClass('mobile-menu-open')
    })


    // **********************************************************************//
    // 04. Video Background
    // **********************************************************************//
    var timeoutId
    var $videoBgAspect = $(".videobg-aspect")
    var $videoBgWidth = $(".videobg-width")
    var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth()
    var windowAspect

    function videobgEnlarge() {
        console.log('resize')
        windowAspect = ($(window).height() / $(window).width())

        if (windowAspect > videoAspect) {
            $videoBgWidth.width((windowAspect / videoAspect) * 100 + '%')
        } else {
            $videoBgWidth.width(100 + "%")
        }
    }

    $(window).resize(function() {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(videobgEnlarge, 100)
    })

    $(function() {
        videobgEnlarge()
    })
})
