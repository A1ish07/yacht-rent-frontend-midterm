$(document).ready(function () {
    $('.faq-question').on('click', function () {
        const $question = $(this);
        const $answer = $question.next('.faq-answer');
        const $item = $question.parent('.faq-item');

        $answer.slideToggle(300);
        $item.siblings().find('.faq-answer').slideUp(300);
    });

    $('.faq-item').on('mouseenter', function () {
        $(this).css('box-shadow', '0 4px 15px rgba(11, 37, 69, 0.15)');
    }).on('mouseleave', function () {
        $(this).css('box-shadow', 'none');
    });

    $('.stat-number').each(function () {
        const $el = $(this);
        const target = Number($el.attr('data-target'));

        $({ val: 0 }).animate({ val: target }, {
            duration: 1500,
            step: function () {
                $el.text(Math.floor(this.val));
            },
            complete: function () {
                $el.text(target);
            }
        });
    });

    $('input[type="email"]').on('focus', function () {
        $(this).closest('form').find('#booking-success').fadeOut(300);
    });
});
