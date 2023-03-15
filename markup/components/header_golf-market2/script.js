(function ($) {
  'use strict';

  $(function () {
    //header search
    $('.bj-search-icon').click(function () {
      $('.bj-page-header').addClass('i-search');
      setTimeout(function () {
        $('.bj-page-header').addClass('i-ready');
        $('.bj-page-header__search__input').focus();
      }, 100);
    });

    $('.bj-page-header__search-close').click(function (e) {
      e.preventDefault();
      $('.bj-page-header').removeClass('i-ready');
      setTimeout(function () {
        $('.bj-page-header').removeClass('i-search');
      }, 300);
    });

    //menu sandwich
    document
      .querySelector('.ob-menu-sandwich')
      .addEventListener('click', function (e) {
        e.preventDefault();
        $('.ob-catalog-menu__block').slideToggle();
        $('.ob-catalog-menu-sub:visible').slideUp();
        document
          .querySelectorAll('.ob-catalog-menu__item.active')
          .forEach(function (item) {
            item.classList.remove('active');
          });
      });

    var headerGMOpacoTimeoutId;
    var headerGMMenuTimeoutId;

    //header dropdown
    $('.bj-page-header__menu-link').hover(
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(headerGMMenuTimeoutId);
        headerGMMenuTimeoutId = setTimeout(function () {
          var id = e.target.getAttribute('data-sub');
          var $article = $(id + ' article');

          //hide menu and user dropdown
          $('#nav-button-xs').sideNav('hide');
          $('.bj-page-header__user-dropdown article')
            .stop()
            .slideUp()
            .removeClass('i-animate');

          $article.stop();

          //hide menu dropdowns
          document
            .querySelectorAll('.bj-page-header__dropdown article')
            .forEach(function (article) {
              $(article).stop().slideUp().removeClass('i-animate');
            });

          $article.stop().slideDown().addClass('i-animate');
          showOpaco();

          //hide cart dropdown
          if (window.cartDropdownFlag) {
            window.cartDropdownFlag = false;
            setTimeout(function () {
              if (!window.cartDropdownFlag) {
                $('.bj-page-header__cart-dropdown article')
                  .stop()
                  .slideUp()
                  .removeClass('i-animate');
                $('#cartDropdown').removeClass('i-loaded');
              }
            }, 100);
          }
        }, 200);
      },
      function (e) {
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(headerGMMenuTimeoutId);
        headerGMMenuTimeoutId = setTimeout(function () {
          var id = e.target.getAttribute('data-sub');
          var $article = $(id + ' article');

          //hide menu dropdowns
          $article.stop().slideUp().removeClass('i-animate');
          hideOpaco();
        }, 200);
      }
    );

    $('.bj-page-header__dropdown').hover(
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(headerGMMenuTimeoutId);
      },
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target =
          e.target.tagName === 'ARTICLE'
            ? e.target
            : e.target.closest('article');
        clearTimeout(headerGMMenuTimeoutId);
        headerGMMenuTimeoutId = setTimeout(function () {
          var $article = $(target);

          //hide menu dropdowns
          $article.stop().slideUp().removeClass('i-animate');
          hideOpaco();
        }, 200);
      }
    );

    function showOpaco() {
      clearTimeout(headerGMOpacoTimeoutId);
      headerGM.classList.add('i-opaco');
      headerGM.classList.add('i-animate-opaco');
    }

    function hideOpaco() {
      headerGM.classList.remove('i-animate-opaco');
      clearTimeout(headerGMOpacoTimeoutId);
      headerGMOpacoTimeoutId = setTimeout(function () {
        headerGM.classList.remove('i-opaco');
      }, 500);
    }

    $('.bj-page-header__dropdown article, #userDropdown, #cartDropdown').click(
      function (e) {
        e.stopPropagation();
      }
    );
    $('.bj-page-header__dropdown .up').click(function (e) {
      $(this).closest('article').slideUp().removeClass('i-animate');
      e.preventDefault();
    });

    //user dropdown
    $('.bj-personal-icon').click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      $('#nav-button-xs').sideNav('hide');
      $('.bj-page-header__dropdown article:visible')
        .slideUp()
        .removeClass('i-animate');

      $('.ob-catalog-menu__block').slideUp();
      $('.bj-page-header__user-dropdown article')
        .slideToggle()
        .toggleClass('i-animate');

      if (window.cartDropdownFlag) {
        window.cartDropdownFlag = false;
        setTimeout(function () {
          if (!window.cartDropdownFlag) {
            $('.bj-page-header__cart-dropdown article')
              .slideUp()
              .removeClass('i-animate');
            $('#cartDropdown').removeClass('i-loaded');
          }
        }, 100);
      }

      //opaco
      if ($('.bj-page-header__user-dropdown article').hasClass('i-animate')) {
        showOpaco();
      } else {
        hideOpaco();
      }
    });

    //header cart-dropdown
    if (!$('html').hasClass('bx-touch')) {
      //desktop

      $('.bj-cart-icon').click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (!window.cartDropdownFlag) {
          window.cartDropdownFlag = true;

          $('#nav-button-xs').sideNav('hide');
          $('.bj-page-header__dropdown article:visible')
            .slideUp()
            .removeClass('i-animate');
          $('.bj-page-header__user-dropdown article')
            .slideUp()
            .removeClass('i-animate');

          $('.ob-catalog-menu__block').slideUp();
          $('.bj-page-header__user-dropdown article')
            .slideUp()
            .removeClass('i-animate');

          $('.bj-page-header__cart-dropdown article').slideDown();
          setTimeout(function () {
            $('.bj-page-header__cart-dropdown article').addClass('i-animate');
          }, 100);

          //ajax
          $.ajax({
            url: $('#cartDropdown').data('url'),
            type: $('#cartDropdown').data('method'),
            dataType: 'html',
            success: function (html) {
              if (html) {
                $('#cartDropdown .container-fluid').html(html);
                setTimeout(function () {
                  $('#cartDropdown').addClass('i-loaded');
                }, 100);
              }
            },
            error: function (a, b, c) {
              if (window.console) {
                console.log(a);
                console.log(b);
                console.log(c);
              }
            },
          });
          showOpaco();
        } else {
          window.cartDropdownFlag = false;
          setTimeout(function () {
            if (!window.cartDropdownFlag) {
              $('.bj-page-header__cart-dropdown article')
                .slideUp()
                .removeClass('i-animate');
            }
          }, 100);
          setTimeout(function () {
            if (!window.cartDropdownFlag) {
              $('#cartDropdown').removeClass('i-loaded');
            }
          }, 500);
          hideOpaco();
        }
      });
    } else {
      $('.bj-cart-icon').click(function (e) {
        e.stopPropagation();
      });
    }

    $(document).bind('click', function (e) {
      hideOpaco();
      //menu dropdown
      $('.bj-page-header__dropdown article').slideUp().removeClass('i-animate');
      //user dropdown
      $('.bj-page-header__user-dropdown article')
        .slideUp()
        .removeClass('i-animate');
      //cart dropdown
      if (
        window.cartDropdownFlag &&
        !$(e.target).closest('#cartDropdown').length
      ) {
        window.cartDropdownFlag = false;
        setTimeout(function () {
          if (!window.cartDropdownFlag) {
            $('.bj-page-header__cart-dropdown article')
              .slideUp()
              .removeClass('i-animate');
            $('#cartDropdown').removeClass('i-loaded');
          }
        }, 100);
      }
    });

    //OBCatalogMenu
    if (window.matchMedia('(max-width: 1024px)').matches) {
      document
        .querySelectorAll('.ob-catalog-menu__link')
        .forEach(function (elem) {
          elem.addEventListener('click', function (e) {
            if (elem.className.search('i-link') !== -1) {
              return;
            }
            e.preventDefault();

            if (
              elem
                .closest('.ob-catalog-menu__item')
                .className.search('active') < 0
            ) {
              //slide up
              document
                .querySelectorAll('.ob-catalog-menu__item.active')
                .forEach(function (menuItem) {
                  menuItem.classList.remove('active');
                });
              $('.ob-catalog-menu-sub:visible').slideUp();
            }

            //show current
            elem.closest('.ob-catalog-menu__item').classList.toggle('active');
            $(
              elem.parentNode.querySelector('.ob-catalog-menu-sub')
            ).slideToggle();
          });
        });

      document
        .querySelectorAll('.ob-catalog-menu__title')
        .forEach(function (elem) {
          elem.addEventListener('click', function (e) {
            e.preventDefault();
            elem.classList.toggle('active');
            $(
              elem.parentNode.querySelector('.ob-catalog-menu__block')
            ).slideToggle();

            if (
              document.querySelectorAll('.ob-catalog-menu__item.active').length
            ) {
              document
                .querySelectorAll('.ob-catalog-menu__item.active')
                .forEach(function (menuItem) {
                  menuItem.classList.remove('active');
                });
              $('.ob-catalog-menu-sub:visible').slideUp();
            }
          });
        });

      const searchInput = document.getElementById('title-search-input');

      searchInput.addEventListener('keyup', function () {
        if (document.getElementById('title-search-input').value !== '') {
          document
            .querySelector('.bj-page-header')
            .classList.add('i-search-input-filled');
        } else {
          document
            .querySelector('.bj-page-header')
            .classList.remove('i-search-input-filled');
        }
      });
      searchInput.addEventListener('focus', function () {
        document
          .querySelector('.bj-page-header')
          .classList.add('i-search-input-focused');
      });
      searchInput.addEventListener('blur', function () {
        document
          .querySelector('.bj-page-header')
          .classList.remove('i-search-input-focused');
      });

      $('.bj-page-header__search-close').click(function (e) {
        e.preventDefault();
        document.getElementById('title-search-input').value = '';
        document
          .querySelector('.bj-page-header')
          .classList.remove('i-search-input-filled');
      });
    }

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
