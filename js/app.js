const ulList = document.getElementById('list');
const search = document.getElementById('search-input');

const getProducts = async() => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();

    // listing all the products
        renderList(data);

    // search the product with keywords
    search.addEventListener('input', () => {
        if(search.value.trim().length > 3){
          const filteredProduct =  data.filter(product => (
                product.title.toLowerCase().includes(search.value.toLowerCase())
            ))
                if(filteredProduct.length > 0){
                    // rendering searched products
                   renderList(filteredProduct);
                } else {
                    ulList.innerHTML = `<p class="text-3xl font-serif font-bold">Product not found</p>`
                }
        } else {
            renderList(data);
        }
    })
}

function renderList(product) {
    let html = '';
    product.map((item) => {
        html += `
          <li class="shadow-xl max-w-[400px] flex flex-col items-center py-5 rounded-lg mx-10 my-10 bg-white">
            <img src=${item.image} alt='image' class="w-[300px] h-[250px] shadow-xl rounded-2xl">
            <div class="dtls mt-4 space-y-2">
                <h3 class="lg:text-2xl text-lg px-3 font-serif font-semibold">${item.title}</h3>
                <p class="text-xl text-wrap px-3 font-serif font-semibold">Price: <span>$${item.price}</span></p>
            </div>
        </li>
    `
      })

      ulList.innerHTML = html;
}

getProducts();