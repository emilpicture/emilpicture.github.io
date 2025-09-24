// Smooth scroll to gallery
const toGalleryBtn = document.getElementById('to-gallery');
if(toGalleryBtn){
toGalleryBtn.addEventListener('click', () => {
document.getElementById('gallery-section').scrollIntoView({ behavior: 'smooth' });
});
}


// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


// Lightbox
(function(){
const gallery = Array.from(document.querySelectorAll('#gallery img'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbClose = document.getElementById('lb-close');
const lbNext = document.getElementById('lb-next');
const lbPrev = document.getElementById('lb-prev');
let current = 0;


function openAt(index){
const img = gallery[index];
if(!img) return;
current = index;
lbImg.src = img.src;
lbImg.alt = img.alt || '';
lightbox.classList.add('active');
}


function closeLB(){
lightbox.classList.remove('active');
lbImg.src = '';
}


function next(){ openAt((current+1)%gallery.length); }
function prev(){ openAt((current-1+gallery.length)%gallery.length); }


gallery.forEach((img, i) => {
img.addEventListener('click', () => openAt(i));
});


lbClose.addEventListener('click', closeLB);
lbNext.addEventListener('click', next);
lbPrev.addEventListener('click', prev);


document.addEventListener('keydown', (e) => {
if(lightbox.classList.contains('active')){
if(e.key === 'Escape') closeLB();
if(e.key === 'ArrowRight') next();
if(e.key === 'ArrowLeft') prev();
}
});


lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLB(); });
})();


// Contact form
const contactForm = document.getElementById('contact-form');
if(contactForm){
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();
if(!name || !email || !message){
alert('Merci de remplir tous les champs.');
return;
}
const subject = encodeURIComponent('Contact via portfolio — ' + name);
const body = encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message);
window.location.href = `mailto:email@example.com?subject=${subject}&body=${body}`;
});
}

// Masonry Grid auto-height fix
const resizeAllGridItems = () => {
  const gallery = document.querySelector('.masonry-gallery');
  const items = gallery.querySelectorAll('.photo-card');
  const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('gap'));
  
  items.forEach(item => {
    const contentHeight = item.querySelector('img').getBoundingClientRect().height;
    const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;
  });
};

window.addEventListener("load", resizeAllGridItems);
window.addEventListener("resize", resizeAllGridItems);
