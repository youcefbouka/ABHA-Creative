window.onload = function() {
  Tabletop.init({
    key: '1lGqRZEaZmpyEDSatBLO6gXdTmRtlJ9SCRmFxAemcSws', // ID الجدول
    simpleSheet: true,
    callback: function(data) {
      let container = document.getElementById("products");
      container.innerHTML = "";

      data.forEach(item => {
        container.innerHTML += `
          <div class="product">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <h3>${item.name}</h3>
              <p>السعر: ${item.price}</p>
              <p>الفئة: ${item.category}</p>
            </div>
          </div>
        `;
      });
    }
  });
};
