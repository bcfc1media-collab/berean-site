(function () {
  var hdr = document.getElementById('hdr');
  function onScroll(){
    if (!hdr) return;
    if (window.scrollY > 40){ hdr.classList.add('scrolled'); hdr.classList.remove('top'); }
    else { hdr.classList.add('top'); hdr.classList.remove('scrolled'); }
  }
  onScroll(); window.addEventListener('scroll', onScroll, { passive:true });

  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  if (burger && menu){
    burger.addEventListener('click', function(){ menu.classList.toggle('open'); });
    menu.addEventListener('click', function(e){ if (e.target.tagName === 'A') menu.classList.remove('open'); });
  }

  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  var pform = document.getElementById('prayerForm');
  if (pform){
    pform.addEventListener('submit', function(e){
      e.preventDefault();
      var err = document.getElementById('prayerErr'); if (err) err.hidden = true;
      var ta = pform.querySelector('textarea');
      if (ta && !ta.value.trim()){ ta.focus(); return; }
      var btn = pform.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      var fd = new FormData(pform);
      fd.append('_subject', 'New Prayer Request — bcfcphx.org');
      fd.append('_captcha', 'false');
      fd.append('_template', 'table');
      fetch('https://formsubmit.co/ajax/BCFC@bcfcphx.org', {
        method:'POST', headers:{ 'Accept':'application/json' }, body: fd
      })
      .then(function(r){ return r.json(); })
      .then(function(j){
        if (!j || String(j.success) !== 'true') throw new Error('x');
        pform.hidden = true;
        document.getElementById('prayerThanks').hidden = false;
      })
      .catch(function(){
        btn.disabled = false; btn.textContent = 'Send Prayer Request';
        if (err) err.hidden = false;
      });
    });
  }
})();
