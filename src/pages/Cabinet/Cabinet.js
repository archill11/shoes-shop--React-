
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Sceleton } from '../../components/Sceleton/Sceleton';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { Card } from '../CardList/Card/Card';
import styles from '../CardList/CardList.module.scss';
import style from './Cabinet.module.scss';



const Cabinet = (props) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        try {
            (async () => {
                const ordersResponse = await axios.get('https://6311eb0df5cba498da884e3e.mockapi.io/orders/')
                setOrders(ordersResponse.data) 
                setLoading(false)
                })()
        } catch (error) {
            alert('Ошибка при запросе на сервер')
            console.error(error)
        }
      }, [])

    const sceletons = new Array(2).fill(<Sceleton style={{boxShadow: 'rgb(0 0 0 / 9%) 5px 3px 27px', borderRadius: "37px", padding: "10px"}}/>)
    // console.log('ordrrs:',orders);
    const ordersList = 
        orders
            .filter(item => item.id.toLowerCase().includes(props.searchVal.toLowerCase()))
            .map(item => {
                // console.log('order:',item);
                const {id, total} = item
                return (
                    <div key={id} className={style.order}>
                        <span className={style.orderInfo} >
                            заказ№ <b>{id}</b><br/><br/>
                            сумма заказа: <b>{total} руб.</b>
                        </span>
                        {item.items.map(item => {
                            const {thisID, title, price, img} = item

                            return (
                                <Card key={id+':'+item.id} {...item} 
                                    addToCart={() => props.addToCart({thisID,title,price,img})} 
                                    remFromCart={() => props.remFromCart(thisID)}
                                    addTofav={() => props.addTofav({thisID,title,price,img})}
                                    remFromFav={() => props.remFromFav(thisID)}
                                    addedCart={props.cartItems.some(item=> Number(item.thisID) === Number(thisID))}
                                    favorited={props.favItems.some(item=> Number(item.thisID) === Number(thisID))}
                                    cartItems={props.cartItems} favItems={props.favItems}/>
                            )
                        })}
                    </div>
                )
            })
                        
                        
  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Мои заказы</span>
            <SearchInput searchVal={props.searchVal} placeholder={'Найти...'} searchByVal={props.searchByVal}/>
        </div>
        <div className={style.order_list}>
            {loading ? sceletons 
            : ordersList.length > 0 ? ordersList 
            : <h2 className={styles.emptyCartTitle}>У Вас пока нет заказов...</h2> }
        </div>
      </main>
  );
}

export {Cabinet};