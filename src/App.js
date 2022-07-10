import './App.css';
import {useEffect, useState} from 'react';

function App() {


  const [getProduct, setProduct] = useState([]);
  const [getrawProduct, setrawProduct] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [tab, setTab] = useState(null);





function getAllProducts(){
  setIsloading(true)

  fetch(`http://fakestoreapi.com/products`)
  .then((response) => response.json())
  .then((data) => {
    setIsloading(false)

    if(data){
          setrawProduct(data)
        // make a fresh array with the categories
         const productGroups= groubByCategory(data);
         setProduct(productGroups)
           }  
          }).catch((err) => {
              setIsloading(false)
             console.log(err.message);
           });
     }


useEffect(() =>{
      getAllProducts();
 },[])


// this function group all product by category

  function groubByCategory(data) {
        
        const groups = data?.reduce((groups, product) => {
          const category = product.category;
          if (!groups[category]) {
            groups[category] = [];
          }
          groups[category].push(product);
          return groups;
        }, {});

      // convert the array to object with accesible keys
        const productGroups = Object.keys(groups).map((category) => {
          return {
            category,
            products: groups[category]
          };
        });

        return productGroups;
  }






function filterIt(arr, searchKey) {
  return arr.filter(function(obj) {
    return Object.keys(obj).some(function(key) {
      return obj.title?.toLowerCase().includes(searchKey) ||  obj.description?.toLowerCase().includes(searchKey) || obj.category?.toLowerCase().includes(searchKey);
    })
  });
}




function handleSearch(e) {
  setIsloading(true)
const searchQuery = e.toLowerCase();
const result = filterIt(getrawProduct, searchQuery);

// make a fresh array with the categories
const productGroups= groubByCategory(result);
setProduct(productGroups);
setIsloading(false)

}


function hendleFilterProduct(tab) {

setTab(tab)
setIsloading(true)
let sortedProducts;

if(tab === 'price'){
   sortedProducts = getrawProduct.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}else if(tab === 'rating'){
  sortedProducts = getrawProduct.sort((a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate));
}

// make a fresh array with the categories
const productGroups= groubByCategory(sortedProducts);
setProduct(productGroups);
setIsloading(false);

}



function handleClearFilter(){
   window.location.reload();
}



function DiplayProduct(products) {
   return  products.map((item, index)=>(
                        
    <div key={index}  className='tableContent'>
          <span>{item.id}</span>
          <span style={{width:100}}>{item.title}</span>
          <span style={{width:200}}>{item.description.substring(0,200)}</span>
          <span>${item.price}</span>
          <span>{item.rating.rate}</span>
          <img src={item.image} width="60" alt={item.title} height="60" />
     </div>
 ) )
}


console.log("rawData:", getrawProduct);
  return (
    <div className="container">
      
          <div className='miniContainer' >

              {/* search */}
            
              <div className='search-container'>
                  <input type="search" onChange={(e) => handleSearch(e.target.value)}    placeholder='Search  with any keywords' className='search-input' />
              </div>

              {/* filter */}
               
                <div className='filterContainer'>

                  <div className='filterItems'>
                     <span>Filter By:</span>
                  </div>
                  

                  <div className='filterItems'>
                        <button className='button' onClick={()=> hendleFilterProduct('price')}  style={ tab === 'price' ? { backgroundColor:'orange', color:'#fff'}: {backgroundColor: 'bisque', } }>
                              Lowest Price
                        </button>

                        <button className='button'  onClick={()=> hendleFilterProduct('rating')} style={ tab === 'rating' ? { backgroundColor:'orange', color:'#fff'}: {backgroundColor: 'bisque', } } >
                             Highest ratings
                        </button>

                        <button  onClick={()=> handleClearFilter()}  >
                           clear
                        </button>
                   </div>
               </div>


          {/* table header */}

                     <header className='headerContainer'>
                           <span>ID</span>
                           <span>Product name</span>
                           <span>Product Description</span>
                           <span>Price</span>
                           <span>Rating</span>
                           <span>Logo</span>
                     </header>

                    {!isLoading ? getProduct.map((item,index) =>
                         
                      (
                        < >
                           <div key={index} className='category-label'>{item.category}</div>
                           { DiplayProduct(item.products) }
                        </>
                       
                       ) ) :
                        <div className='containerCenter'>
                                      <span>Loading...</span>
                           </div>
                      }
                           
                          

                     
            </div>
     
    </div>
  );
}

export default App;
