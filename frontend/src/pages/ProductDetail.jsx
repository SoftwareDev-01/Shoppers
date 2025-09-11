import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct'

function ProductDetail() {
  let { productId } = useParams()
  let { products, currency, addtoCart } = useContext(shopDataContext)
  let [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  // Reviews states
  const [reviews, setReviews] = useState([
    { id: 1, text: "Great quality, very comfortable!", rating: 5 },
    { id: 2, text: "Looks good but the size runs a bit small.", rating: 4 }
  ])
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [editId, setEditId] = useState(null) // for editing reviews

  const fetchProductData = () => {
    products.forEach(item => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  const handleAddReview = () => {
    if (newReview.trim() === '') return
    if (editId) {
      // Edit existing review
      setReviews(prev => prev.map(r => r.id === editId ? { ...r, text: newReview, rating: newRating } : r))
      setEditId(null)
    } else {
      // Add new review
      setReviews(prev => [
        ...prev,
        { id: prev.length + 1, text: newReview.trim(), rating: newRating }
      ])
    }
    setNewReview('')
    setNewRating(5)
  }

  const handleEditReview = (rev) => {
    setNewReview(rev.text)
    setNewRating(rev.rating)
    setEditId(rev.id)
  }

  return productData ? (
    <>
      <style>{`
        .product-bg {
          background-color: #03010f;
          color: #f5f1e9;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow-x: hidden;
          overflow-y: visible; /* only outer page scroll if needed */
          min-height: 100vh;
        }

        /* Luxury golden glow circles */
        .product-bg::before, .product-bg::after {
          content: '';
          position: absolute;
          border: 2px solid #d4af37;
          border-radius: 50%;
          opacity: 0.3;
          filter: drop-shadow(0 0 8px #d4af37);
          animation: pulseGlow 8s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        .product-bg::before { width: 650px; height: 650px; top: -300px; left: -250px; animation-delay: 0s; }
        .product-bg::after { width: 450px; height: 450px; bottom: -250px; right: -200px; animation-delay: 4s; }
        @keyframes pulseGlow {
          0% { opacity: 0.25; transform: scale(1); filter: drop-shadow(0 0 6px #d4af37);}
          100% { opacity: 0.6; transform: scale(1.1); filter: drop-shadow(0 0 15px #ffd700);}
        }

        .image-card { border-radius: 1rem; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; z-index: 10;}
        .image-card:hover { transform: scale(1.05); box-shadow: 0 10px 25px rgba(212,175,55,0.5);}
        .main-image { border-radius: 1rem; box-shadow: 0 15px 25px rgba(0,0,0,0.6); transition: transform 0.3s ease; z-index: 10;}
        .main-image:hover { transform: scale(1.02); }
        .review-card { background: rgba(20,45,127,0.4); border: 1px solid #d4af37; border-radius: 1rem; padding: 15px; margin-bottom: 10px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .review-card:hover { transform: scale(1.02); box-shadow: 0 8px 20px rgba(212,175,55,0.5); }

        .reviews-container {
          max-height: 300px;
          overflow-y: auto; /* only inner scroll */
          padding-right: 10px;
          scroll-behavior: smooth;
        }
        .reviews-container::-webkit-scrollbar { width: 8px; }
        .reviews-container::-webkit-scrollbar-thumb { background-color: #d4af37; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
        .reviews-container::-webkit-scrollbar-thumb:hover { background-color: #ffd700; }

        .review-input, .rating-select {
          background: #142d7f; border: 1px solid #d4af37; color: #f5f1e9; border-radius: 0.5rem;
          padding: 10px; width: 100%; margin-bottom: 10px; outline: none; font-size: 16px;
        }
        .review-input::placeholder { color: #ccc6b8; }
        .add-review-btn { background: #d4af37; color: #0b1e5e; padding: 10px 20px; border: none; font-weight: 600; border-radius: 25px; cursor: pointer; transition: background-color 0.3s ease, transform 0.3s ease;}
        .add-review-btn:hover { background: #ffd700; transform: scale(1.05); }
        .size-button { border-radius: 0.5rem; padding: 8px 15px; transition: all 0.3s ease; }
        .size-button:hover { transform: scale(1.05); box-shadow: 0 6px 15px rgba(212,175,55,0.4);}
        .add-to-cart-btn { background: #495b61c9; border: 1px solid #80808049; color: #fff; border-radius: 1rem; padding: 10px 20px; font-weight: 500; cursor: pointer; box-shadow: 0 5px 15px rgba(0,0,0,0.4); transition: all 0.3s ease; }
        .add-to-cart-btn:hover { transform: scale(1.05); box-shadow: 0 10px 25px rgba(212,175,55,0.5); }
      `}</style>

      <div className="product-bg flex flex-col items-center justify-start w-full pt-[70px] pb-[100px] gap-10">
        {/* Product Images & Info */}
        <div className='flex flex-col lg:flex-row items-start justify-center gap-10 w-[95%]'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col gap-4'>
              {[image1, image2, image3, image4].map((img, idx) => (
                <div key={idx} className='image-card w-[60px] h-[60px] md:w-[100px] md:h-[100px]'>
                  <img src={img} alt={`product-${idx}`} className='w-full h-full object-cover rounded-md cursor-pointer' onClick={() => setImage(img)} />
                </div>
              ))}
            </div>
            <div className='w-full lg:w-[400px] h-[400px] md:h-[500px] main-image'>
              <img src={image} alt="selected-product" className='w-full h-full object-cover rounded-2xl' />
            </div>
          </div>

          {/* Product Info */}
          <div className='flex flex-col gap-4 w-full lg:w-[50%]'>
            <h1 className='text-4xl font-semibold'>{productData.name.toUpperCase()}</h1>
            <div className='flex items-center gap-1'>
              <FaStar className='text-yellow-400' />
              <FaStar className='text-yellow-400' />
              <FaStar className='text-yellow-400' />
              <FaStar className='text-yellow-400' />
              <FaStarHalfAlt className='text-yellow-400' />
              <p className='pl-2'>({reviews.length})</p>
            </div>
            <p className='text-3xl font-bold'>{currency}{productData.price}</p>
            <p className='text-lg'>{productData.description}</p>

            {/* Size Selection */}
            <div className='flex flex-wrap gap-2'>
              {productData.sizes.map((item, idx) => (
                <button key={idx} className={`size-button ${size === item ? 'bg-black text-[#2f97f1] text-lg' : 'bg-slate-300 text-black'}`} onClick={() => setSize(item)}>{item}</button>
              ))}
            </div>
            <button className='add-to-cart-btn mt-4' onClick={() => addtoCart(productData._id, size)} disabled={!size} title={!size ? "Select a size first" : ""}>Add To Cart</button>
          </div>
        </div>

        {/* Reviews */}
        <div className='w-[90%] max-w-[900px] flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold'>Reviews</h2>
          <div className='reviews-container'>
            {reviews.map((rev) => (
              <div key={rev.id} className='review-card'>
                <div className='flex items-center gap-1 mb-2'>
                  {[...Array(5)].map((_, idx) => {
                    if (idx < Math.floor(rev.rating)) return <FaStar key={idx} className="text-yellow-400" />
                    if (idx === Math.floor(rev.rating) && rev.rating % 1 !== 0) return <FaStarHalfAlt key={idx} className="text-yellow-400" />
                    return <FaStar key={idx} className="text-gray-500" />
                  })}
                </div>
                <p>{rev.text}</p>
                <button className='text-sm text-yellow-400 mt-1 underline' onClick={() => handleEditReview(rev)}>Edit</button>
              </div>
            ))}
          </div>

          <textarea className='review-input' rows="4" placeholder="Write your review..." value={newReview} onChange={e => setNewReview(e.target.value)} />
          <select className='rating-select' value={newRating} onChange={e => setNewRating(Number(e.target.value))}>
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r>1?'s':''}</option>)}
          </select>
          <button onClick={handleAddReview} className='add-review-btn' disabled={!newReview.trim()}>{editId ? "Update Review" : "Submit Review"}</button>
        </div>

        {/* Related Products */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      </div>
    </>
  ) : <div className='opacity-0'></div>
}

export default ProductDetail
