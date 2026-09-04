// Soardale Resources — shared interactivity

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Gallery lightbox
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.querySelector('.lightbox');
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector('img');
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var src = item.querySelector('img').getAttribute('src');
        var alt = item.querySelector('img').getAttribute('alt') || '';
        lbImg.setAttribute('src', src);
        lbImg.setAttribute('alt', alt);
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // Generic contact/application form -> mailto composer + success message
  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.getAttribute('data-mailto');
      var subjectField = form.querySelector('[data-subject]');
      var subject = subjectField ? subjectField.value : 'Website enquiry';
      var lines = [];
      form.querySelectorAll('input, select, textarea').forEach(function (field) {
        if (field.type === 'file') {
          if (field.files.length) lines.push(field.name + ': ' + field.files[0].name + ' (please attach manually)');
          return;
        }
        if (!field.name) return;
        lines.push(field.name + ': ' + field.value);
      });
      var body = encodeURIComponent(lines.join('\n'));
      var success = form.parentElement.querySelector('.form-success');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
      if (success) success.classList.add('show');
    });
  });

  // Active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

});
