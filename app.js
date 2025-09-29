// ملف بسيط يقرأ products.json ويعرضها ويطبّق فلترة وبحث
const productsEl = document.getElementById('products');
const catEl = document.getElementById('category');
const searchEl = document.getElementById('search');

let products = [];

// تحميل JSON من نفس المجلد
fetch('products.json')
  .then(r => r.json())
  .then(data => {
    products = data;
    populateCategories(products);
    render(products);
  })
  .catch(err => {
    productsEl.innerHTML = '<p>خطأ في جلب المنتجات — تأكد من وجود products.json</p>';
    console.error(err);
  });

function populateCategories(list) {
  const cats = Array.from(new Set(list.map(p => p.category))).sort();
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    catEl.appendChild(opt);
  });
}

function render(list) {
  if (!list.length) {
    productsEl.innerHTML = '<p>لا توجد منتجات مطابقة.</p>';
    return;
  }
  productsEl.innerHTML = list.map(p => `
    <article class="card">
      <img src="${p.image || 'https://via.placeholder.com/400x280?text=لا+صورة'}" alt="${escapeHtml(p.name)}" />
      <h3>${escapeHtml(p.name)}</h3>
      <div class="meta">
        <span class="price">${escapeHtml(p.price)}</span>
        <small>${escapeHtml(p.category)}</small>
      </div>
    </article>
  `).join('');
}

// البحث + الفلترة
function filterAndRender() {
  const q = searchEl.value.trim().toLowerCase();
  const cat = catEl.value;
  let filtered = products.filter(p => {
    const matchQ = q === '' || p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q);
    const matchCat = cat === 'all' || p.category === cat;
    return matchQ && matchCat;
  });
  render(filtered);
}

searchEl.addEventListener('input', filterAndRender);
catEl.addEventListener('change', filterAndRender);

// تجنّب مشاكل XSS بسيطة
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
