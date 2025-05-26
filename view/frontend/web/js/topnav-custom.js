define([
  'jquery',
  'domReady!',
  'matchMedia'
], function ($) {
  'use strict';

  return function (config, element) {
    const menuClass = config.menuClass;

    console.log('Topnav Custom Module Loaded: ', config, element);

    mediaCheck({
      media: '(min-width: 768px)',
      entry: $.proxy(function () {
        // Desktop functionality
        const menu = $(element);
        const menuItems = menu.find(`.${menuClass}__item`);
        const submenuItems = menu.find(`.${menuClass}__inner-item > a`);
        const navElement = $(`.${menuClass}`); // used for sticky.

        // If submenu item is current, find its top-level parent and add 'current' class to it.
        submenuItems.each(function () {
          const submenuItemLink = $(this);

          if (submenuItemLink.hasClass('current')) {
            submenuItemLink.closest(`.${menuClass}__item`).children('a').addClass('current');
          }
        });

        // Hide all submenus initially.
        menu.find(`.${menuClass}__inner-list`).hide();

        // Handle hover for top-level menu items.
        menuItems.on('mouseenter', function () {
          const this_ = $(this);
          const submenu = this_.find('> .topnav-main__inner-list--level1');

          // Hide other submenus.
          menu.find(`.${menuClass}__inner-list`).hide();

          // Show the current submenu if item is a parent.
          if (this_.hasClass(`${menuClass}__item--parent`)) {
            this_.find('> a').addClass('hovered');

            // Add the overlay on dropdown menu only.
            if (!$('.menu-overlay').length) {
              $('body').append('<div class="menu-overlay"></div>');
              $('.menu-overlay').fadeIn(200);
            }

            if (this_.hasClass('full-width-menu-item')) {
              submenu.css({ display: 'flex'});
            } else {
              submenu.show();
            }
          }
        });

        menuItems.on('mouseleave', function () {
          const this_ = $(this);
          if (this_.find('> a').hasClass('hovered')) {
            this_.find('> a').removeClass('hovered');

             // Check if we're completely leaving the menu, only then remove overlay.
             if ($('.menu-overlay').length) {
              // Set a small timeout to check if we've moved to another menu item.
              setTimeout(function() {
                if ($(`.${menuClass}__item > a.hovered`).length === 0) {
                  $('.menu-overlay').fadeOut(200, function() {
                    $(this).remove();
                  });
                }
              }, 50);
            }
          }
        });

        // Handle hover for nested submenu items.
        menu.on('mouseenter', `.${menuClass}__inner-item`, function () {
          const this_ = $(this);
          const submenu = this_.find('> .topnav-main__inner-list');

          // Hide sibling submenus.
          this_.siblings().find(`.${menuClass}__inner-list`).hide();

          // Show the current submenu if item is a parent.
          if (this_.hasClass(`${menuClass}__inner-item--parent`)) {
            submenu.show();
          }
        });

        // Hide all submenus when leaving the menu.
        menu.on('mouseleave', function () {
          menu.find(`.${menuClass}__inner-list`).hide();
        });

        // =========================
        // Custom Sticky Navigation
        // =========================
        const navHeight = navElement.outerHeight();
        const navOffset = navElement.offset().top;
        const stickyClass = 'sticky-nav';

        // Create placeholder to prevent content jumps.
        const stickyPlaceholder = $('<div class="sticky-placeholder"></div>')
          .height(navHeight)
          .insertAfter(navElement)
          .hide();

        // Function to handle scroll events.
        function handleScroll() {
          const scrollTop = $(window).scrollTop();

          if (scrollTop > navOffset) {
            // Make the nav sticky.
            if (!navElement.hasClass(stickyClass)) {
              navElement.addClass(stickyClass);
              stickyPlaceholder.show();
            }
          } else {
            // Remove sticky state.
            if (navElement.hasClass(stickyClass)) {
              navElement.removeClass(stickyClass);
              stickyPlaceholder.hide();
            }
          }
        }

        $(window).on('scroll.stickyNav', handleScroll);
        handleScroll();

      }, this),
      exit: $.proxy(function () {
        // Mobile functionality
        const menu = $(element);
        const menuElement = menu.find(`.${menuClass}`);
        const accountLinks = document.querySelector('.header.links');

        // Add account links to mobile menu.
        if (accountLinks) {
          menuElement.append(accountLinks);
        }

        // Handle click event for mobile icon.
        menu.on('click', `.${menuClass}__mobile-icon`, function () {
          const this_ = $(this);

          // Toggle active class on the mobile menu.
          this_.toggleClass(`nav_active`);

          if (this_.hasClass(`nav_active`)) {
            menuElement.addClass('mobile-nav_open');
            $('body').addClass('fixed');
          } else {
            menuElement.removeClass('mobile-nav_open');
            $('body').removeClass('fixed');
          }
        });

        // Hide all level1 submenus initially.
        menu.find(`.${menuClass}__inner-list--level1`).hide();

        // Add click event for top-level parent items.
        menu.on('click', `.${menuClass}__item--parent > a`, function (e) {
          e.preventDefault();
          const this_ = $(this);
          const submenu = this_.closest(`.${menuClass}__item--parent`).find(`.${menuClass}__inner-list--level1`);

          this_.toggleClass('expanded');
          this_.parent().toggleClass('selected');
          menu.find(`.${menuClass}__inner-list--level1`).not(submenu).slideUp();

          // Toggle the visibility of current submenu items.
          /// change animation direction for a dropdown effect.
          if (this_.parent().hasClass('selected')) {
            submenu.css({ display: 'block', opacity: 0, left: '-100%' })
              .animate({ left: '0%', opacity: 1 }, 300);
          } else {
            submenu.hide();
          }
        });
      }, this)
    });

    // Reload the page on resize to ensure the menu is displayed correctly.
    let timeout;
    window.addEventListener('resize', function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        location.reload();
      }, 300);
    });
  }
});
