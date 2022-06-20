// rafce
import React,{useState,useEffect} from 'react'
//function 
import { readProduct } from '../functions/product'

import { useParams } from 'react-router-dom'
import SingleProductCard from '../card/SingleProductCard'


const Product = () => {
    const param = useParams()
    const [product, setProduct] = useState([])

    useEffect(()=>{
        //code
        loadData()
    },[])

    const loadData = ()=>{
        readProduct(param.id)
        .then(res=>{
            //code
            setProduct(res.data)
        }).catch(err=>{
            //err
            console.log(err.response.data)
        })
    }

    return (
        <div className="container-fluid">

            <div className="row pt-4">
                <SingleProductCard product={product}/>
            </div>

            <div className="row">
                {/* {JSON.stringify(product)} */}

            </div>
        </div>
    )
}

export default Product
