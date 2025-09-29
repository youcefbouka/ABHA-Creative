const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_-uN_IWr3g6o7DiHNvYzf43eldOS1pm32mpZnKljpB5X5VSmGhiSm_KPFMRknqwXamdfrypcmFWhk/pub?gid=0&single=true&output=csv";

fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    // تقسيم حسب الفاصلة أو الفاصلة المنقوطة
    const rows = data.split("\n").map(r => r.split(/[,;]+/));
    const headers = rows[0].map(h => h.trim().toLowerCase());
    
    const products = rows.slice(1).map(row => {
      let product = {};
      headers.forEach((h, i) => product[h] = row[i] ? row[i].trim() : "");
      return product;
    }).filter(p => p.name && p.price && p.image);

    const container = document.getElementById("product-list");
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = "<p>⚠️ لم يتم العثور على منتجات في الجدول.</p>";
      return;
    }

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>السعر: ${p.price} دج</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("product-list").innerHTML = "<p>❌ حصل خطأ أثناء جلب البيانات.</p>";
  });
