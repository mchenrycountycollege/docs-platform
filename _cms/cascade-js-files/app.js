$(document).foundation();

var splide;
let firstInteraction = true;
let userPaused = false;
let hoverPaused = false;

$('.overlay').click(function () {
    $('body').removeClass('right-active');
    $('body').removeClass('left-adm-active');
    $('.admissions-burgermenu').removeClass('disabled');
    $('.menu-icon').removeClass('disabled');
    $('.overlay').removeClass('show');
});

$(document).ready(function () {

    if ($('.splide').length) {
        let startInitTime = performance.now(); // Capture start time for initialization

        splide = new Splide('.splide', {
            type: 'loop',
            autoplay: true,
            interval: 6000,
            pauseOnHover: false, // Disable native pause on hover to control it manually
            pauseOnFocus: true,
            arrows: true,
            pagination: true,
        });
        splide.on('mounted', function () {
            let endInitTime = performance.now(); // Capture time when initialized

            splide.Components.Autoplay.play();
            updatePauseButtonState();
        });
        splide.mount();
        let mountTime = performance.now(); // Capture mount time

    }
    if (splide && splide.Components && splide.Components.Autoplay) {
        if (!splide.Components.Autoplay.isPaused()) {
            $('#pauseButton').html('<i class="fas fa-pause"></i>');
        } else {
            $('#pauseButton').html('<i class="fas fa-play"></i>');
        }
    }

    /*$('.left-nav').click(function(event){
        $('body').removeClass('right-active');
        $('body').toggleClass('left-active');
        event.stopPropagation();
    });*/
    $('.right-nav').click(function (event) {
        $('body').removeClass('left-active');
        $('body').toggleClass('right-active');
        $('.admissions-burgermenu').toggleClass('disabled');
        $('.overlay').toggleClass('show');
        event.stopPropagation();
    });
    $('.admissions-burgermenu').click(function (event) {
        $('.menu-icon').toggleClass('disabled');
        $('body').toggleClass('left-adm-active');
        $('.overlay').toggleClass('show');
        event.stopPropagation();
    });
    $('li.has-dropdown').click(function (event) {  // Added 'event' parameter here
        // Check if this dropdown is already active
        if ($(this).hasClass('active-bg')) {
            // If it's active, just close it (original behavior)
            $(this).removeClass('active-bg');
            $(this).find('.dropdown').removeClass('active-dropdown');
        } else {
            // If it's not active, close all other dropdowns first
            $('li.has-dropdown.active-bg').not(this).each(function () {
                $(this).removeClass('active-bg');
                $(this).find('.dropdown').removeClass('active-dropdown');
            });

            // Then open this dropdown
            $(this).addClass('active-bg');
            $(this).find('.dropdown').addClass('active-dropdown');
        }

        // Prevent the click from propagating to parent elements
        event.stopPropagation();
    });
})

// Handle pause button click event
$(document).on('click', '#pauseButton', function () {
    if (splide && splide.Components && splide.Components.Autoplay) {

        if (firstInteraction) {
            splide.Components.Autoplay.play();
            userPaused = true;
            firstInteraction = false; // Disable this correction forever
            splide.Components.Autoplay.pause();
        } else {
            // if (splide.Components.Autoplay.isPaused()) {
            //     splide.Components.Autoplay.play();
            //     userPaused = false;
            // } else {
            //     splide.Components.Autoplay.pause();
            //     userPaused = true;
            // }
            if ($('#pauseButton i').hasClass('fa-pause')) {
                // If the button shows the pause icon, pause autoplay and set userPaused to true
                splide.Components.Autoplay.pause();
                userPaused = true;
            } else {
                // If the button shows the play icon, play autoplay and set userPaused to false
                splide.Components.Autoplay.play();
                userPaused = false;
            }
        }
        updatePauseButtonState();
    } else { }
});

// Update pause button icon
function updatePauseButtonState() {
    if (splide.Components.Autoplay.isPaused()) {
        $('#pauseButton').html('<i class="fas fa-play"></i>');
    } else {
        $('#pauseButton').html('<i class="fas fa-pause"></i>');
    }
}

// Mouse enter on splide (Pause on hover functionality)
$('.splide').on('mouseenter', function () {
    if (!userPaused) {
        splide.Components.Autoplay.pause(); // Ensure it pauses on hover
        hoverPaused = true; // Mark as hover-paused
    } else {
        splide.Components.Autoplay.pause(); // Keep it paused if user manually stopped it
        hoverPaused = false; // Ensure hover pause doesn't override manual pause
    }
});

// Mouse leave from splide (Resume autoplay if not manually paused)
$('.splide').on('mouseleave', function () {
    if (!userPaused) {
        splide.Components.Autoplay.play(); // Resume autoplay when mouse leaves
        hoverPaused = false; // Reset hover paused flag
    } else {
        splide.Components.Autoplay.pause(); // Keep it paused if user manually stopped it
    }
});

$(window).on('load', function () {
    $('footer .footer-nav header').click(function () {
        if ($(window).width() < 1024) {
            $(this).next('.footer-nav-links').slideToggle();
        }
    });
});

$(window).on('resize load', function () {
    if ($(window).width() < 1022) { // was 860
        $(".top-nav-wrap").insertAfter(".primary-nav .menu-centered");
        $(".top-nav-wrap").show();
        if ($('body').hasClass('right-active')) {
            $('.overlay').addClass('show');
        }
    } else {
        $('.overlay').removeClass('show');
        $(".top-nav-wrap").insertBefore(".search-top");
    }
});

// Fix Osano Cookie Consent accessibility issues
// Updates aria-label to match visible text for "Privacy Policy" link
// Removes aria-label from "Got it!" dismiss button to avoid WCAG 2.5.3 violation
(function () {
    function fixOsanoCookieConsentAccessibility() {
        var fixed = false;

        // Fix 1: Find the Privacy Policy link in the Osano cookie consent banner
        var cookieLink = document.querySelector('.cc-link[aria-label="learn more about cookies"]');

        if (cookieLink) {
            // Get the visible text from the link
            var visibleText = cookieLink.textContent.trim();

            // Update aria-label to match the visible text
            if (visibleText) {
                cookieLink.setAttribute('aria-label', visibleText);
                fixed = true;
            }
        }

        // Fix 2: Remove aria-label from dismiss button to comply with WCAG 2.5.3 Label in Name
        var dismissButton = document.querySelector('.cc-btn.cc-dismiss[aria-label="dismiss cookie message"]');

        if (dismissButton) {
            // Remove the aria-label since the visible text "Got it!" is descriptive enough
            dismissButton.removeAttribute('aria-label');
            fixed = true;
        }

        return fixed;
    }

    // Try to hook into Osano's initialization if available
    if (typeof window.cookieconsent !== 'undefined') {
        // If cookieconsent is already loaded, set up a callback
        var originalInitialise = window.cookieconsent.initialise;
        if (originalInitialise) {
            window.cookieconsent.initialise = function (options) {
                // Extend the options with our callback
                options = options || {};
                var originalOnPopupOpen = options.onPopupOpen;
                var originalOnInitialise = options.onInitialise;

                options.onPopupOpen = function () {
                    if (originalOnPopupOpen) originalOnPopupOpen.apply(this, arguments);
                    fixOsanoCookieConsentAccessibility();
                };

                options.onInitialise = function () {
                    if (originalOnInitialise) originalOnInitialise.apply(this, arguments);
                    fixOsanoCookieConsentAccessibility();
                };

                return originalInitialise.call(this, options);
            };
        }
    }

    // Fallback: Poll for the element if Osano hasn't loaded yet
    var checkInterval;
    var maxAttempts = 50; // Try for ~10 seconds
    var attempts = 0;

    checkInterval = setInterval(function () {
        attempts++;

        if (fixOsanoCookieConsentAccessibility()) {
            // Element found and fixed, clear interval
            clearInterval(checkInterval);
        } else if (attempts >= maxAttempts) {
            // Give up after max attempts
            clearInterval(checkInterval);
        }
    }, 200); // Check every 200ms

    // Also try on page load
    $(window).on('load', function () {
        setTimeout(fixOsanoCookieConsentAccessibility, 500);
    });
})();

// Add title attribute to Wufoo iframe for accessibility
// Finds iframes within divs that have title attributes and applies them
(function () {
    function addTitleToWufooIframe(iframe) {
        // Check if title already exists
        if (iframe.hasAttribute('title')) {
            return true;
        }

        // Look for parent div with id starting with "wufoo-" that has a title attribute
        var parent = iframe.parentElement;
        var formTitle = null;
        
        // Check up to 5 levels of parent elements
        for (var i = 0; i < 5 && parent; i++) {
            if (parent.id && parent.id.startsWith('wufoo-') && parent.hasAttribute('title')) {
                formTitle = parent.getAttribute('title');
                break;
            }
            parent = parent.parentElement;
        }

        // If we found a title from parent, use it; otherwise use fallback for wufoo iframes
        if (formTitle) {
            iframe.setAttribute('title', formTitle);
            return true;
        } else if (iframe.src && iframe.src.includes('wufoo.com')) {
            iframe.setAttribute('title', 'Wufoo Form');
            return true;
        }
        
        return false;
    }

    function checkWufooDivsForIframes() {
        // Find all divs with id starting with "wufoo-" that have a title attribute
        var wufooDivs = document.querySelectorAll('div[id^="wufoo-"][title]');
        
        wufooDivs.forEach(function(div) {
            var title = div.getAttribute('title');
            // Find any wufoo iframes inside this div
            var iframes = div.querySelectorAll('iframe[src*="wufoo.com"]');
            
            iframes.forEach(function(iframe) {
                if (!iframe.hasAttribute('title') && title) {
                    iframe.setAttribute('title', title);
                }
            });
        });
    }

    // Set up MutationObserver to watch for dynamically added iframes
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                // Check if the added node is an iframe
                if (node.nodeName === 'IFRAME') {
                    if (node.src && node.src.includes('wufoo.com')) {
                        // Try immediately and also after short delays
                        addTitleToWufooIframe(node);
                        setTimeout(function () {
                            addTitleToWufooIframe(node);
                        }, 100);
                        setTimeout(function () {
                            addTitleToWufooIframe(node);
                        }, 500);
                    }
                }
                // Check if the added node contains iframes
                else if (node.querySelectorAll) {
                    var iframes = node.querySelectorAll('iframe');
                    iframes.forEach(function (iframe) {
                        if (iframe.src && iframe.src.includes('wufoo.com')) {
                            addTitleToWufooIframe(iframe);
                            setTimeout(function () {
                                addTitleToWufooIframe(iframe);
                            }, 100);
                            setTimeout(function () {
                                addTitleToWufooIframe(iframe);
                            }, 500);
                        }
                    });
                }
            });
        });
    });

    // Start observing the document for changes
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        // Check existing divs on startup
        checkWufooDivsForIframes();
    } else {
        // If body isn't ready yet, wait for it
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            checkWufooDivsForIframes();
        });
    }

    // Also check on window load and periodically for the first few seconds
    $(window).on('load', function () {
        checkWufooDivsForIframes();
        setTimeout(checkWufooDivsForIframes, 500);
        setTimeout(checkWufooDivsForIframes, 1000);
        setTimeout(checkWufooDivsForIframes, 2000);
    });
})();