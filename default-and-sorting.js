
// >>----------->>--------->> Load data sorting <<-----------<<----------<<
const getCategorySortingId = async () => {
try {
    const url = `https://openapi.programming-hero.com/api/news/category/08` ;
    const response = await fetch(url) ;
    const data = await response.json() ;
    displayAllCategorySortingInfo(data.data);
} catch (error) {
   alert(" You have an error => " + error) ; 
}
}
getCategorySortingId() ;
// >>----------->>--------->> Display All Category Sorting <<-----------<<----------<<
const displayDefaultCategoryDiv = document.getElementById("displayDefaultCategory") ;
const displayAllCategorySortingInfo = (data) => {
data.sort( (a , b ) =>    a.total_view - b.total_view  ) ; 
data.filter(info => {
const displayDefaultDiv = document.createElement("div") ;
const {image_url , title , details , author , total_view , _id  , rating} = info ;
const navLogo = document.getElementById("navImage") ;
navLogo.innerHTML =
`
<img src="${author.img}" class="img-fluid" alt="news image" id="navImage" />
` ;
displayDefaultDiv.innerHTML =
`
<div class="row shadow-lg p-3 rounded m-4 h-auto">
<div class="col-12 col-sm-12 col-md-2 col-lg-2">
<img src="${image_url}" class="img-fluid img-thumbnail h-100" alt="news image" />
</div>
<div class="col-12 col-sm-12 col-md-10 col-lg-10"> 
<h2 class="text-primary fw-bold fs-4"> ${title}</h2>
<p class="text-info fw-bold fs-6">
${details.slice(0,300)+"....."} 
</p>
<div class="conatiner">
    <div class="row">

        <div class="col-6 col-sm-6 col-md-3 col-lg-3"> 
        <div class="d-flex flex-row">
            <img src="${author.img}" alt="author image" id="authorImage"/>
            <h2 class="text-success fw-bold fs-6"> ${ author.name ? author.name : "data not found"} </h2> <br><br>
            <h2 class="text-success fw-bold fs-6 m-2"> ${author.published_date  ? author.published_date : "data not found"}  </h2>
        </div>    
        </div>

        <div class="col-6 col-sm-6 col-md-2 col-lg-2"> 
            <i class="fa-solid fa-eye text-success "></i>
        <span class="text-success fw-bold fs-6"> ${total_view ? total_view : "data not found"}</span>
        </div>
       
        <span class="col-6 col-sm-6 col-md-5 col-lg-5">
        <span class="fa-solid fa-star"></span> 
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-regular fa-star-half-stroke"></span>
        <span class="d-flex flex-row fw-bold text-success"> ${rating.number ? rating.number : "data not found"} </span>
       </span>

     <div class="col-6 col-sm-6 col-md-2 col-lg-2 ">
      <i onclick="dynamicDataLoad('${_id}')"  class="fa-solid fa-arrow-right fa-2x text-info " data-bs-target="#newsDetailsModal"  data-bs-toggle="modal"></i> 
      </div>
    </div>
</div>
</div>          
</div>
` ;
 displayDefaultCategoryDiv.appendChild(displayDefaultDiv) ;
}) ;
loadingSpinner.style.display = "none" ;
} ;
//>>----------->>----------->>------------->> sort View Div <<-----------------<<---------------<<-----------<<
const sortViewDiv = document.getElementById("sortView") ;
sortViewDiv.innerHTML =
`
<span class="text-info fw-bold fs-5 mx-3"> Sort By View: </span>
<div class="dropdown d-inline-flex">
    <a class="btn btn-white border dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Change view
    </a>
    <ul class="dropdown-menu">
      <li><div class="dropdown-item"  onclick="DefaultCategoryInfoDeafultByClick()">Descending order</div></li>
      <li><div class="dropdown-item"  onclick="sortCategoryInfoByClick()">Ascending order</a></div>
    </ul>
  </div>
  `;
  //>>------------------>>------------------>>  Default Category Name Deafult By Click <<-----------------<<---------------<<
  const DefaultCategoryInfoDeafultByClick = () => {
    displayDefaultCategoryDiv.innerHTML = "" ;
    getCategoryDefaultId() ;
  }
/*  >>------------------>>------------------>>  Sort Category info  By Click <<-----------------<<---------------<< */
    const sortCategoryInfoByClick = () => {
        displayDefaultCategoryDiv.innerHTML = "" ;
        getCategorySortingId();
      }
      // >>----------->>--------->> Loading Category Default Info <<-----------<<----------
      const getCategoryDefaultId = async () => {
        try {
            const url = `https://openapi.programming-hero.com/api/news/category/08` ;
            const response = await fetch(url) ;
            const data = await response.json() ;
            displayAllCategoryDefaultInfo(data.data) ;
        } catch (error) {
           alert(" You have an error => " + error) ; 
        }
        }
        getCategoryDefaultId() ;
      // >>----------->>--------->> Display All Category Default Info <<-----------<<----------<<

const displayAllCategoryDefaultInfo = (data) => {
data.sort( (a , b ) =>   b.total_view - a.total_view ) ; 
data.filter(info => {
const displayDefaultDiv = document.createElement("div") ;
const {image_url , title , details , author , total_view , _id  , rating} = info ;
displayDefaultDiv.innerHTML =
`
<div class="row shadow-lg p-3 rounded m-4 h-auto">
<div class="col-12 col-sm-12 col-md-2 col-lg-2">
<img src="${image_url}" class="img-fluid img-thumbnail h-100" alt="news image" />
</div>
<div class="col-12 col-sm-12 col-md-10 col-lg-10"> 
<h2 class="text-primary fw-bold fs-4"> ${title}</h2>
<p class="text-info fw-bold fs-6">
${details.slice(0,300)+"....."} 
</p>
<div class="conatiner">
    <div class="row">

        <div class="col-6 col-sm-6 col-md-3 col-lg-3"> 
        <div class="d-flex flex-row">
            <img src="${author.img}" alt="author image" id="authorImage"/>
            <h2 class="text-success fw-bold fs-6"> ${ author.name ? author.name : "data not found"} </h2> <br><br>
            <h2 class="text-success fw-bold fs-6 m-2"> ${author.published_date  ? author.published_date : "data not found"}  </h2>
        </div>    
        </div>

        <div class="col-6 col-sm-6 col-md-2 col-lg-2"> 
            <i class="fa-solid fa-eye text-success "></i>
        <span class="text-success fw-bold fs-6"> ${total_view ? total_view : "data not found"}</span>
        </div>
       
        <span class="col-6 col-sm-6 col-md-5 col-lg-5">
        <span class="fa-solid fa-star"></span> 
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-regular fa-star-half-stroke"></span>
        <span class="d-flex flex-row fw-bold text-success"> ${rating.number ? rating.number : "data not found"} </span>
       </span>

     <div class="col-6 col-sm-6 col-md-2 col-lg-2 ">
      <i onclick="dynamicDataLoad('${_id}')"  class="fa-solid fa-arrow-right fa-2x text-info " data-bs-target="#newsDetailsModal"  data-bs-toggle="modal"></i> 
      </div>
    </div>
</div>
</div>          
</div>
` ;
 displayDefaultCategoryDiv.appendChild(displayDefaultDiv) ;
}) ;
loadingSpinner.style.display = "none" ;
} ;