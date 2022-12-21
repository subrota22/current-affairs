const loadingSpinner = document.getElementById("dataLoading") ;
loadingSpinner.style.display = "none" ;
// >>----------->>--------->> Load Category Name <<-----------<<----------<<
const loadCategoryName= async () => {
try {
    const url = `https://openapi.programming-hero.com/api/news/categories` ;
    const response = await fetch(url) ;
    const data = await response.json() ;
    displayCatagoryData(data.data.news_category) ;
} catch (error) {
   alert(" You have an error => " + error) ; 
}
} ;
loadCategoryName() ;

// >>----------->>--------->> Display Catagory Data <<-----------<<----------<<
const displayCatagoryData  = (categoryData) => {
const categoryContainerDiv = document.getElementById("categoryContainer") ;
   categoryData.filter(category => {
    const spanText = document.createElement("span") ;
    spanText.setAttribute("class" , "text-info fw-bold fs-5 m-4 categoryText") ;
    spanText.innerHTML = 
    `
  <span onclick="loadCategoryAllData('${category.category_id}' , ' ${category.category_name}')" id="spanText">   ${category.category_name} </span>
    `;
    categoryContainerDiv.appendChild(spanText) ;
   } )
} ;

// >>----------->>--------->> Load Category All Dataa <<-----------<<----------<<
 const loadCategoryAllData = async (categoryId , category_name) => {
        loadingSpinner.style.display = "block" ;
        try {
            const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}` ;
            const response = await fetch(url) ;
            const data = await response.json() ;
            categoryInformation(data.data , category_name) ;
        } catch (error) {
           alert(" You have an error => " + error) ; 
        }   
    }

// >>----------->>--------->> Category Information <<-----------<<----------<<
const categoryInformation = (categoryData , category_name) => {
categoryData.sort( (a , b ) =>  b.total_view - a.total_view ) ; 
loadingSpinner.style.display = "none" ;
const displayCategoryInformationDiv = document.getElementById("displayCategoryInformation") ;
const displayDefaultCategoryInformationDiv = document.getElementById("displayDefaultCategory") ;
displayCategoryInformationDiv.innerHTML = "" ;
displayDefaultCategoryInformationDiv.innerHTML = "" ;
const dataLength = categoryData.length;
const totalDataFoundDiv = document.getElementById("totalDataFound") ;
totalDataFoundDiv.innerHTML = 
`
<div class="shadow-lg p-3 mb-5 bg-body rounded fw-bold fs-4"> ${dataLength} items found for ${category_name}  </div>
` ;
categoryData.map(categoryInfo => {
let {image_url , title , details , author , total_view , rating , _id}  = categoryInfo ;

const navImageDiv = document.getElementById("navImage") ;
navImageDiv.innerHTML = 
`
<img src="${author.img}" class="img-fluid" id="navImage"/>

` ;

const displayCatagoryDiv = document.createElement("div") ;
displayCatagoryDiv.innerHTML = 
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
            <h2 class="text-success fw-bold fs-6 m-2"> ${author.published_date ?  author.published_date : "data not found" }  </h2>
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

displayCategoryInformationDiv.appendChild(displayCatagoryDiv) ;

})

} ;

// >>----------->>--------->> Dynamic Data Load <<-----------<<----------<<
const dynamicDataLoad = (news_id) => { 
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`   ;
    fetch(url) 
    .then(response => response.json())
    .then(data => displayDynamicData(data.data[0]))
    .catch(error => {
        alert("You have an erro" + error) ;
    })
    } ;
// >>----------->>--------->> Display Dynamic Data <<-----------<<----------<<
    const displayDynamicData = (data) => {
     let {image_url , title , details , author , total_view , rating ,category_id     } = data ;
     const ModalTitleHeader = document.getElementById("ModalTitle") ;
     ModalTitleHeader.innerHTML = ` <span class="text-success text-uppercase fs-3 fw-bolder"> Author :  </span> ${ author.name ? author.name : "author name not found"}`;
     const modalBodyDiv = document.getElementById("modalBody") ;
     modalBodyDiv.innerHTML = 
     `
     <img src="${image_url}" class="img-fluid img-thumbnail"/>
     <p class="text-primary text-center fs-6 fw-bold"> <span class="text-success text-uppercase fs-3 fw-bolder"> Title : </span> ${title}</p> 
     <p class="text-primary text-center fs-6 fw-bold"><span class="text-success text-uppercase fs-3 fw-bolder">  Details : </span> ${details}</p> 
     <div class="d-flex flex-row">
     <img src="${author.img}" alt="author image" id="authorImage"/>
     <h2 class="text-success fw-bold fs-6"> ${ author.name ? author.name : "data not found"} </h2> <br><br>
     <h2 class="text-success fw-bold fs-6 m-2"> ${author.published_date }  </h2>
 </div>    
 </div>

 <div class="col-6 col-sm-6 col-md-2 col-lg-2"> 
     <i class="fa-solid fa-eye text-success "></i>
 <span class="text-success fw-bold fs-6"> ${total_view ? total_view : "data not found"}</span>
 </div>
 </div>

 <span class="col-6 col-sm-6 col-md-8 col-lg-8">
 <span class="fa-solid fa-star"></span> 
 <span class="fa-solid fa-star"></span>
 <span class="fa-solid fa-star"></span>
 <span class="fa-solid fa-star"></span>
 <span class="fa-regular fa-star-half-stroke"></span>
 <span class="d-flex flex-row fw-bold text-success"> ${rating.number} </span>
</span>
<h2 class="text-success fw-bold fs-6 m-2">  <span class="d-flex flex-row fw-bold text-success"> Category id </span> ${category_id}  </h2>

     ` ;
    };
// >>----------->>--------->> Change theme <<-----------<<----------<<
let colors = ['yellow' , 'white'] ;
let colorIndex = 0 ;
document.getElementById("changeBackTheme").addEventListener("click" , function() {
document.body.style.backgroundColor = colors[colorIndex] ;
colorIndex = (colorIndex + 1) % colors.length ;
})
    