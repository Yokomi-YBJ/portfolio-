
document.documentElement.classList.remove('no-js');
/* ---------- Contact obfuscation (assembled at runtime, never in plain source) ---------- */
(function(){
  const u = ["beyeayokomi","gmail.com"];
  const email = u[0] + "@" + u[1];
  const phoneParts = [237, 691, "09", 40, 48];
  const phone = "+" + phoneParts.join(" ").replace("+", "");
  const phoneTel = "+237691094048";
  const gh = "https://github.com/" + ["Yokomi","YBJ"].join("-");

  function toast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2600);
  }

  function openEmail(){
    window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent("Contact via portfolio");
    toast("Ouverture de votre messagerie…");
  }
  function openPhone(){
    window.location.href = "tel:" + phoneTel;
    toast("Composition de " + phone + "…");
  }

  document.getElementById('emailBtn').addEventListener('click', openEmail);
  document.getElementById('channelEmail').addEventListener('click', openEmail);
  document.getElementById('channelPhone').addEventListener('click', openPhone);
  document.getElementById('channelGithub').setAttribute('href', gh);
})();

/* ---------- CV download ---------- */
function downloadCV(){
  const a = document.createElement('a');
  a.href = 'assets/CV_Yokomi_Beyea_Josaphat.pdf';
  a.download = 'CV_Yokomi_Beyea_Josaphat.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
['cvBtnNav','cvBtnHero','cvBtnContact'].forEach(id=>{
  document.getElementById(id).addEventListener('click', downloadCV);
});
document.getElementById('contactBtnNav').addEventListener('click', ()=>{
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
});

/* ---------- Floating icons parallax ---------- */
(function(){
  const visual = document.getElementById('heroVisual');
  if(!visual) return;
  const icons = Array.from(visual.querySelectorAll('.float-icon'));
  if(!icons.length) return;
  const isFine = window.matchMedia('(pointer:fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!isFine || reduceMotion) return;

  let rafId = null;
  let targetX = 0, targetY = 0;

  visual.addEventListener('mousemove', (e)=>{
    const rect = visual.getBoundingClientRect();
    targetX = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
    targetY = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
    if(!rafId){ rafId = requestAnimationFrame(applyParallax); }
  });
  visual.addEventListener('mouseleave', ()=>{
    targetX = 0; targetY = 0;
    if(!rafId){ rafId = requestAnimationFrame(applyParallax); }
  });

  function applyParallax(){
    icons.forEach(icon=>{
      const depth = parseFloat(icon.dataset.depth) || 0.05;
      const tx = targetX * depth * 140;
      const ty = targetY * depth * 140;
      icon.style.setProperty('--px', tx.toFixed(1) + 'px');
      icon.style.setProperty('--py', ty.toFixed(1) + 'px');
    });
    rafId = null;
  }
})();

/* ---------- Header scroll state ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

/* ---------- Reveal on scroll ---------- */
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
}

/* ---------- Clock ---------- */
function tick(){
  const now = new Date();
  const opts = {hour:'2-digit', minute:'2-digit', timeZone:'Africa/Douala'};
  document.getElementById('clock').textContent = 'Ngaoundéré · ' + now.toLocaleTimeString('fr-FR', opts);
}
tick(); setInterval(tick, 30000);
