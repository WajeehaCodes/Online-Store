import NavBar from "./Navbar";
import Footer from "./Footer";
import Home from "../pages/Home/Home";
import About from "../pages/About/about";
import Login from "../pages/Login/login";
import Contact from "../pages/Contact/contact";
import WhatsappButton from "./whatsAppButton";
import Register from "../pages/Register/register";
import Terms from "../pages/Terms and Conditions/Terms";
import PrivacyPolicy from "../pages/Privacy Policy/PrivacyPolicy";
import FAQ from "../pages/FAQ/FAQ";
import Cart from "../pages/Cart/cart";
import Thanks from "../pages/Thanks/thanks";
import Shop from "../pages/Shop/shop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import sanityClient from "../utils/client";
import { useEffect, useState } from "react";
import { getAllBooksQuery, getlatestBooksQuery, getBannerCount, getBannersQ, getCategoryBlock } from "../utils/sanityQueries"
// import { getDataLatest } from "../temporaryData";
import Checkout from "../pages/Checkout/checkout";
import { setDoc, doc, updateDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import { useAuth } from "../context/AuthContext";
import Wishlist from "../pages/WishList/Wishlist";
import ScrollToTop from "./ScrollToTopButton";
import ProductDetails from "../pages/Product Details/ProductDetails";
import imageUrlBuilder from "@sanity/image-url";
import Category from "../pages/Categories/category";
import SearchResult from "../pages/Search Result/searchResult";
import ExchangePolicy from "../pages/Return and Exchange/ExchangePolicy";

export default function PrivateRouter() {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [latestBooks, setLatestBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [banners, setBanners] = useState([]);
    const [categoryBlock, setCategoryBlock] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        // commented to save api calls
        sanityClient.fetch(
            getlatestBooksQuery()
        )
            .then((data) => {
                //   console.log(data[0]);

                data = data.filter((book) => {
                    return (book.Name !== null && book.Image !== null && book.price !== null  && book.price > 0 && book.quantity !== null && book.Authors !== null && book.Category !== null)
                })

                setLatestBooks(data);
            })
            .catch((err) => console.log(err));

        sanityClient.fetch(
            getBannerCount()
        )
            .then(data => {
                sanityClient.fetch(
                    getBannersQ(parseInt(data.extra))
                )
                    .then(dataB => setBanners(dataB))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

        sanityClient.fetch(
            getAllBooksQuery()
        )
            .then(data => {
                data = data.filter((book) => {
                    // console.log(book.Image.asset)
                    return (book.Name !== null && book.Image !== null &&  book.Image !== undefined && book.price !== null && book.quantity !== null && book.Authors !== null && book.Category !== null)
                })
                setAllBooks(data)
            })
            .catch(err => console.log(err));

        sanityClient.fetch(
            getCategoryBlock()
        )
            .then((data) => {
                setCategoryBlock(data)
                // console.log(data);
            })
            .catch(err => {
                console.log(err);
            })

        // let data = getDataLatest();
        // setLatestBooks(data);
        // console.log(latestBooks);

        if (user !== null) {
            async function getUserDataRecord() {

                try {
                    const docSnap = await getDoc(doc(db, "users", user.email));

                    let dataDocSnap = docSnap.data();
                    if (dataDocSnap === null || dataDocSnap === undefined) {
                        let userObj = {
                            email: user.email,
                            picture: user.photoURL ? user.photoURL : "https://cdn.sanity.io/images/lu9vyhom/production/f1809d36168b6bf89b1334fda669e6135c9cb250-612x612.jpg?rect=131,132,350,350",
                            phone: "",
                            userName: "",
                            lastName: "",
                            cart: [],
                            cartCount: [],
                            wishlist: [],
                            address: "",
                            country: "Pakistan",
                            city: "",
                            postalCode: "",

                        }

                        await setDoc(doc(db, "users", user.email), userObj)
                        setUserData(userObj);
                    }
                    else {
                        setUserData(dataDocSnap);
                    }
                    // console.log(docSnap.data());
                }
                catch (err) {
                    console.log(err);
                }
            }

            getUserDataRecord();
        }
        else {
            let dataLocal = JSON.parse(window.localStorage.getItem("userRecord"));
            setUserData(dataLocal);
        }
    }, [user])

    async function handleUserLogout() {
        console.log("Logout");
        setUserData(null);
        await logout();
    }

    async function addToCart(book, quantityOfBooks = 1) {
        quantityOfBooks = quantityOfBooks < 1 ? 1 : quantityOfBooks;
        if (userData === null) {
            let userObj = {
                email: "",
                picture: "",
                userName: "",
                lastName: "",
                phone: "",
                cart: [book],
                cartCount: [quantityOfBooks],
                wishlist: [],
                address: "",
                country: "Pakistan",
                city: "",
                postalCode: "",
            }
            setUserData(userObj);
            // toast.success("Book Added To Cart")

            window.localStorage.setItem("userRecord", JSON.stringify(userObj));
        }
        else {
            let exist = false;
            let count = -1;
            let arrBooks = userData.cart;
            let CountBooks = userData.cartCount;
            arrBooks.forEach((bookU, i) => {
                if (bookU._id === book._id) {
                    count = CountBooks[i];
                    exist = true;
                }
            })
            if (!exist) {
                arrBooks.push(book);
                CountBooks.push(quantityOfBooks);

                setUserData((prevState) => {
                    return ({
                        ...prevState,
                        cart: arrBooks,
                        cartCount: CountBooks
                    })
                })
                // toast.success("Book Added To Cart")

                if (user !== null) {
                    await updateDoc(doc(db, "users", user.email), {
                        cart: arrBooks,
                        cartCount: CountBooks
                    })
                        .catch(() => {
                            toast.error("Cannot Add Book To Cart")

                            // reverting changes
                            arrBooks.pop()
                            CountBooks.pop();

                            setUserData((prevState) => {
                                return ({
                                    ...prevState,
                                    cart: arrBooks,
                                    cartCount: CountBooks
                                })
                            })
                        })
                }
                else {
                    window.localStorage.setItem("userRecord", JSON.stringify(userData));
                }
            }
            else {
                updateCartBookCount(book, count + quantityOfBooks);
            }
        }
        document.getElementById('cart-model-btn').click();
        setTimeout(() => {
            let newBtn = document.getElementById('modal-dismiss');
            newBtn.click();
        }, 6500);
    }
    async function addToWishlist(book) {
        if (user != null) {
            let exist = false;
            let WishlistU = userData.wishlist;
            WishlistU.forEach((bookU) => {
                if (bookU._id === book._id) {
                    exist = true;
                }
            })
            if (!exist) {
                WishlistU.push(book);

                setUserData((prevState) => {
                    return ({
                        ...prevState,
                        wishlist: WishlistU
                    });
                })

                toast.success("Book Added To Wishlist")

                await updateDoc(doc(db, "users", user.email), {
                    wishlist: WishlistU
                })
                    .catch(() => {
                        toast.error("Cannot Add Book To Wishlist")

                        if (!exist)
                            WishlistU.pop();

                        setUserData((prevState) => {
                            return ({
                                ...prevState,
                                wishlist: WishlistU
                            });
                        })
                    })
            }
        }
        else {
            toast.error("Login First")
        }
    }
    async function deleteFromWishlist(book) {
        if (user !== null) {
            let index = -1;
            userData.wishlist.forEach((bookU, i) => {
                if (bookU._id === book._id) {
                    index = i
                }
            })
            if (index !== -1) {
                let arrNew = userData.wishlist;
                arrNew.splice(index, 1);

                setUserData((prevState) => {
                    return ({
                        ...prevState,
                        wishlist: arrNew
                    });
                })
                toast.success("Book Removed From Wishlist")

                await updateDoc(doc(db, "users", user.email), {
                    wishlist: arrNew
                })
                    .catch(() => {
                        toast.error("Cannot Remove Book From Wishlist")

                        // revert changes
                    })
            }
        }
    }
    async function deleteFromCart(book) {
        let index = -1;

        userData.cart.forEach((bookd, i) => {
            if (bookd._id === book._id) {
                index = i;
            }
        });

        let newArrBook = userData.cart;
        let arrCount = userData.cartCount;

        newArrBook.splice(index, 1);
        arrCount.splice(index, 1);

        setUserData((prevState) => {
            return ({
                ...prevState,
                cart: newArrBook,
                cartCount: arrCount
            });
        })
        toast.success("Book Removed From Cart")

        if (user !== null) {
            await updateDoc(doc(db, "users", user.email), {
                cart: newArrBook,
                cartCount: arrCount
            })
                .catch(() => {
                    toast.error("Somethings Wrong!!!")

                    newArrBook.push(book);
                    arrCount.push(1);

                    setUserData((prevState) => {
                        return ({
                            ...prevState,
                            cart: newArrBook,
                            cartCount: arrCount
                        });
                    })
                })
        }
        else {
            window.localStorage.setItem("userRecord", JSON.stringify(userData));
        }
    }
    async function updateCartBookCount(book, count) {
        let index = -1;
        userData.cart.forEach((bookU, i) => {
            if (bookU._id === book._id) {
                index = i;
            }
        });

        if (index !== -1) {
            if (count === 0) {
                deleteFromCart(book);
            }
            else {
                if (book.quantity >= count) {
                    let cartCount = userData.cartCount
                    cartCount[index] = count;

                    setUserData((prevState) => {
                        return ({
                            ...prevState,
                            cartCount: cartCount
                        })
                    })
                    if (user !== null) {
                        await updateDoc(doc(db, "users", user.email), {
                            cartCount: cartCount
                        })
                    }
                    else {
                        window.localStorage.setItem("userRecord", JSON.stringify(userData));
                    }
                }
                else {
                    toast('Stock Limit Reached!', {
                        icon: 'ℹ️',
                    });
                }
            }
        }
    }
    async function confirmOrder(orderObj, rememberMe) {
        console.log(orderObj);
        const builder = imageUrlBuilder(sanityClient);
        function urlFor(source) {
            return builder.image(source);
        }
        orderObj.cart.forEach((book, i) => {
            orderObj.cart[i].Image = urlFor(orderObj.cart[i].Image).url();
        })
        try {
            let orderCollection = collection(db, "orders");
            await addDoc(orderCollection, orderObj);

            let newUserObj = {};

            if (rememberMe && user) {
                newUserObj = {
                    email: userData.email,
                    picture: userData.picture,
                    wishlist: userData.wishlist,
                    cart: [],
                    cartCount: [],
                    userName: orderObj.user.userName,
                    lastName: orderObj.user.lastName,
                    phone: orderObj.user.phone,
                    address: orderObj.addressObj.address,
                    address2: orderObj.addressObj.address2,
                    // city: orderObj.addressObj.city,
                    postalCode: orderObj.addressObj.postalCode,
                }
            }
            else {
                newUserObj = {
                    email: userData.email,
                    picture: userData.picture,
                    wishlist: userData.wishlist,
                    cart: [],
                    cartCount: [],
                    userName: userData.userName,
                    lastName: userData.lastName,
                    phone: userData.phone,
                    address: userData.address,
                    address2: userData.address2,
                    // city: userData.city,
                    postalCode: userData.postalCode,
                }
            }
            setUserData(newUserObj);
            console.log(userData);
            if (user)
                await updateDoc(doc(db, "users", user.email), newUserObj)

            // setUserData(newUserObj);
            // console.log(userData);
            window.localStorage.setItem("userRecord", JSON.stringify(newUserObj));

            toast.success("Your order has been placed");

            if(orderObj.user.email !== "") {
                fetch(
                    "https://email-server-gilt.vercel.app/orders/newOrder"
                // "http://localhost:5000/orders/newOrder"
                ,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderObj)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
        catch (err) {
            console.log(err);
            toast.error("There an error while placing the order");
        }
    }

    async function emptyCart() {
        await setUserData((prevState) => {
            return ({
                ...prevState,
                cart: [],
                cartCount: []
            });
        })
        toast.success("Book Removed From Cart")

        if (user !== null) {
            await updateDoc(doc(db, "users", user.email), {
                cart: [],
                cartCount: []
            })
                .catch(() => {
                    toast.error("Somethings Wrong!!!")
                })
        }
        else {
            let temp = userData;
            temp.cart = [];
            temp.cartCount = [];
            window.localStorage.setItem("userRecord", JSON.stringify(temp));
        }
    }

    return (
        <BrowserRouter >
            <Toaster />

            <div className="App">
                <NavBar user={user} userData={userData} handleUserLogout={handleUserLogout} handlecartbookremove={deleteFromCart} />

                <Routes>
                    <Route exact path="/" index element={<Home banners={banners} categoryBlock={categoryBlock} allBooks={allBooks} booksDisplay={latestBooks} addToCart={addToCart} addToWishlist={addToWishlist} />} />

                    <Route exact path="/shop" element={<Shop addToCart={addToCart} addToWishlist={addToWishlist} allBooks={allBooks} />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route exact path="/login" element={<Login user={user} />} />
                    <Route exact path="/register" element={<Register user={user} />} />

                    <Route exact path="/cart" element={<Cart user={userData} handleCartBookRemove={deleteFromCart} handleUpdateCartBookCount={updateCartBookCount} addToCart={addToCart} emptyCart={emptyCart}/>} />
                    <Route exact path="/shop/:id" element={<ProductDetails addToCart={addToCart} />} />
                    <Route exact path="/categories/:id/:book_id" element={<ProductDetails addToCart={addToCart} />} />
                    {/* <Route path="/categories" >
                        <Route path="/" element={<Category addCart={addToCart} addToWishlist={addToWishlist}/>}/>
                    </Route> */}
                    <Route exact path="/categories/:id" element={<Category addToCart={addToCart} addToWishlist={addToWishlist} />} />
                    <Route exact path="/search/:query" element={<SearchResult addToCart={addToCart} addToWishlist={addToWishlist} />} />
                    <Route exact path="/search/" element={<Shop addToCart={addToCart} addToWishlist={addToWishlist} allBooks={allBooks} />} />
                    <Route exact path="/checkout" element={<Checkout user={userData} confirmOrder={confirmOrder} />} />
                    <Route exact path="/thanks-for-shopping-here" element={<Thanks />} />
                    <Route exact path="/Wishlist" element={<Wishlist user={userData} addToCart={addToCart} deleteFromWishlist={deleteFromWishlist} />} />
                    <Route exact path="/Terms" element={<Terms />} />
                    <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                    <Route exact path="/ExchangePolicy" element={<ExchangePolicy />} />
                    <Route exact path="/FAQ" element={<FAQ />} />
                </Routes>
                <Footer />
                <ScrollToTop />
                <WhatsappButton />
            </div>
        </BrowserRouter>
    );
}