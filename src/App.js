import './App.css';
import {useEffect, useState} from 'react';

function App() {


  const [getProduct, setProduct] = useState([]);
  const [getrawProduct, setrawProduct] = useState([]);
  const [isLoading, setIsloading] = useState(false)

function getAllFruits(){
  setIsloading(true)

  fetch(`http://fakestoreapi.com/products`)
  .then((response) => response.json())
  .then((data) => {
    setIsloading(false)

    if(data){
      setrawProduct(data)
        // make a fresh array with the categories
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

            setProduct(productGroups)
           }  
          })
            .catch((err) => {
              setIsloading(false)
            console.log(err.message);
            });
}

useEffect(() =>{
 getAllFruits()
},[])



function handleSearch(e) {

  var results = [];
 var toSearch = e;
  
        // for(var i=0; i < getrawProduct.length; i++) {
        //   for(var key in getrawProduct[i]) {
        //     if(getrawProduct[i][key].indexOf(toSearch)!=-1) {
        //       results.push(getrawProduct[i]);
        //     }
        //   }
        // }

    console.log("result::", getrawProduct)
}


function DiplayProduct(products) {
   return  products.map((item, index)=>(
                        
    <div key={index}  className='tableContent'>
          <span>{item.id}</span>
          <span style={{width:100}}>{item.title}</span>
          <span>{item.price}</span>
          <span>{item.rating.rate}</span>
          <img src={item.image} width="60" height="60" />
     </div>
 ) )
}



  return (
    <div className="container">
      
          <div className='miniContainer'>

              {/* search */}
            
              <div className='search-container'>
                  <input type="search" onChange={(e) => handleSearch(e.target.value)}    placeholder='Search  with any keywords' className='search-input' />
              </div>


                     <header className='headerContainer'>
                           <span>ID</span>
                           <span>Product name</span>
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
