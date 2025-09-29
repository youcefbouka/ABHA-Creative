async function loadProducts() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_-uN_IWr3g6o7DiHNvYzf43eldOS1pm32mpZnKljpB5X5VSmGhiSm_KPFMRknqwXamdfrypcmFWhk/pub?gid=0&single=true&output=csv";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("فشل في جلب البيانات");

    const text = await response.text();

    const rows = text.split("\n").map(row => row.split(","));
    const headers = rows[0];
    const data = rows.slice(1);

    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    let found = false;

    data.forEach(row => {
      const product = {};
      headers.forEach((h, i) => {
        product[h.trim()] = row[i] ? row[i].trim() : "";
      });

      // التأكد من أن الاسم والسعر موجودان
      if (product.Name && product.Price) {
        found = true;
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.Image}" alt="${product.Name}">
          <h2>${product.Name}</h2>
          <p>💲 ${product.Price}</p>
        `;
        productsContainer.appendChild(div);
      }
    });

    if (!found) {
      productsContainer.innerHTML = "<div class='message warning'>⚠️ لم يتم العثور على منتجات في الجدول.</div>";
    }

  } catch (error) {
    document.getElementById("products").innerHTML =
      "<div class='message.error'>❌ خطأ أثناء تحميل المنتجات. تحقق من رابط Google Sheets.</div>";
    console.error(error);
  }
}

// شغّل عند بداية التحميل
loadProducts();
