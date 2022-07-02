//recup url api par id
const urlParam = (new URL(location)).searchParams;
const productId = urlParam.get("id");

//test console pour voir si on recoit bien l id
console.log(productId);

//decla variable pour pouvoir faire l' injection dans le html
const imgKanap = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");


//recup produit par id
const kanapId = fetch(`http://localhost:3000/api/products/${productId}`);

//promise asynchrone qui répond par un fichier json si la reponse est positive
kanapId.then(async(res, err) => {

    if (res.ok) {
        await res.json()

        .then((product) => {
                imgKanap.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
                title.innerHTML = `${product.name}`;
                price.innerHTML = `${product.price}`;
                description.innerHTML = `${product.description}`;

                //injetion des couleurs de produit dans constante sur lequel on fait une boucle
                const colorArray = product.colors

                //boucle qui récupère le choix des couleurs dans le tableau
                for (let color of colorArray) {

                    /*injection des valeur d' option (couleur) dans l' element select html 
                    qui fournit une liste d 'options parmi lesquelles l'
                    utilisateur pourra choisir.*/
                    colors.innerHTML += `<option value =${color}>${color}</option>`
                }
            })
            //imprime dans la console un message d' erreur si la réponse de la promesse est négative
            .catch((err) => {
                console.log(err);
            })
    }
});

const btnAdd = document.querySelector("#addToCart");

btnAdd.addEventListener('click', () => {

    if (quantity.value < 100) {

        let productOptions = {
            id: productId,
            color: colors.value,
            quantity: quantity.value,
            image: imgKanap,
            description: description
        }

        console.log(productOptions);
    } else {
        console.log("ca ne marche pas");
    }
    //------------local storage-----------------
    let localStorageContent = JSON.parse(localStorage.getItem("product")); //convertitles données au format json

    if (localStorageContent) {


    } else {
        localStorageContent = [];
        localStorageContent.push(productOptions);
        localStorage.setItem("product", JSON.stringify(localStorageContent));
        console.log(localStorageContent);
    };

});