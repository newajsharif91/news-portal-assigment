const loadCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayData(data.data.news_category));
};

loadCatagory();

const displayData = (datas) => {
  const catagory = document.getElementById("catagory");
  datas.forEach((data) => {
    const btn = document.createElement("div");
    // console.log(data);
    btn.innerHTML = `
        <button onclick="loadId('${data.category_id}')" class="catagory-btn fw-semibold">${data.category_name}</button>
        `;
    catagory.appendChild(btn);
  });
};
// 3No
const loadId = (id, name) => {
  //   console.log(id);
  //   console.log(name);
  //   const catagoryName = document.getElementById("catagory");
  //   catagoryName.innerText = "";
  //   const h4 = document.createElement("span");
  //   h4.innerText = name;
  //   catagoryName.appendChild(h4);
  //   console.log(id);
  loadallnews(id);
};
const loadallnews = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => diaplayNews(data.data));
};
const diaplayNews = (datas) => {
  console.log(datas);

  const cardSec = document.getElementById("card-section");
  cardSec.textContent = "";

  for (const data of datas) {
    const cardSecDiv = document.createElement("div");
    cardSecDiv.innerHTML = `
    
  


  <div class="col">
    <div class="card h-100">
      <img src="${data.thumbnail_url}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title text-2xl">${data.title}</h5>
      <p class="text-small mt-3 text-gray-500"><span>${
        data.details.length > 300
          ? data.details.slice(0, 300) + "..."
          : data.details
      }</span></p>

      <div class="d-flex justify-content-between">
      <div> <img src="${
        data.author.img
      }"   class="rounded-circle w-10" style="width:2rem" alt="">
      <p><span>${data.author.name}</span></p>
      </div>
      <div><p>Total View <span class="mt-4"> <i class="fa-solid fa-eye">  ${
        data.total_view
      } </i> </span></p>
 
</div>
 </div>
 </div>
      </div>
    </div>
    
  </div>

            `;
    cardSec.appendChild(cardSecDiv);
  }
};
