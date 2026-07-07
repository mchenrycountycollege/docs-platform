(function () {
  'use strict';

  var wrapper = document.querySelector('.acp-content');
  if (!wrapper) { return; }

  // -----------------------------------------------------------
  // Accordion: generic setup for all .acp-accordion-trigger
  // -----------------------------------------------------------
  var triggers = wrapper.querySelectorAll('.acp-accordion-trigger');

  triggers.forEach(function (trigger) {
    var panelId = trigger.getAttribute('aria-controls');
    if (!panelId) { return; }
    var panel = document.getElementById(panelId);
    if (!panel) { return; }

    // Collapse all panels on load (progressive enhancement)
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', function () {
      var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;
    });
  });

  // -----------------------------------------------------------
  // Expand All / Collapse All controls
  // Each .acp-accordion-controls element scopes to its nearest
  // parent section's accordions
  // -----------------------------------------------------------
  var controlSets = wrapper.querySelectorAll('.acp-accordion-controls');

  controlSets.forEach(function (controls) {
    var section = controls.closest('section') || wrapper;
    var expandBtn = controls.querySelector('.acp-expand-all');
    var collapseBtn = controls.querySelector('.acp-collapse-all');

    function getSectionTriggers () {
      return section.querySelectorAll('.acp-accordion-trigger');
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', function () {
        getSectionTriggers().forEach(function (t) {
          var panelId = t.getAttribute('aria-controls');
          var panel = panelId ? document.getElementById(panelId) : null;
          if (panel) {
            panel.hidden = false;
            t.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        getSectionTriggers().forEach(function (t) {
          var panelId = t.getAttribute('aria-controls');
          var panel = panelId ? document.getElementById(panelId) : null;
          if (panel) {
            panel.hidden = true;
            t.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  });

  // -----------------------------------------------------------
  // Keyboard: Enter and Space toggle accordion trigger
  // (button already handles these natively; this is belt-and-
  //  suspenders for edge-case assistive technology)
  // -----------------------------------------------------------
  triggers.forEach(function (trigger) {
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });

}());
