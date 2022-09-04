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
    console.log(data);
    btn.innerHTML = `
        <button onclick="loadId('${data.category_id}')" class="catagory-btn fw-semibold">${data.category_name}</button>
        `;
    catagory.appendChild(btn);
  });
};
const loadId = (id, name) => {
  loadallnews(id);
};
const loadallnews = (id) => {
  spiner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => diaplayNews(data.data));
};

const diaplayNews = (datas) => {
  console.log(datas);

  const dataLength = document.getElementById("data-length");
  if (datas.length === 0) {
    dataLength.innerText = `No items found for this cetagory !`;
  } else {
    dataLength.innerText = `${datas.length} items found for this cetagory`;
  }
  dataLength.innerText = datas.length;

  const cardSec = document.getElementById("card-section");
  cardSec.textContent = "";
  // Sort Only Defult
  datas.sort((a, b) => b.total_view - a.total_view);

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
      

      <i onclick="displayNewsDetails('${
        data._id
      }')" class="fa-solid fa-arrow-right text-primary fs-5 me-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="modal-body" class="modal-body">
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>  
</div>
 </div>
 </div>
 </div>
    </div>
    
  </div>
      `;
    cardSec.appendChild(cardSecDiv);
    spiner(false);
  }
};
// Modal
const displayNewsDetails = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => detailsOnModal(data.data[0]))
    .catch((error) => console.log(error));
};
const detailsOnModal = (detail) => {
  console.log(detail._id);
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
  <img class="img-fluid" src="${detail.image_url}" alt="">
  <p class="mt-3">Published : ${detail.author.published_date}</p>
  <h5>${detail.title}</h5>
  <p class="mt-3">${detail.details}</p>
  <div class="d-md-none d-flex justify-content-between">
    <div>
      <i class="fa-regular fa-eye me-1"></i>
      <span class="fw-semibold">${
        detail.total_view ? detail.total_view : "No data found"
      }</span>
    </div>
    <div>
      <i class="fa-regular fa-star-half-stroke"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </div>
  </div>
  `;
};

// Spiner Loader

const spiner = (isLoading) => {
  const loaderSection = document.getElementById("spinner-container");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};