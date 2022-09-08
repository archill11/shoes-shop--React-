
import styles from './Drawer.module.scss';



const Drawer = (props) => {

    

    const cartItems = props.cartItems.map(item => {
        return (
            <div className={styles.item} key={item.title+item.price}>
                <img width={70} src={item.img} alt="thumbl" />
                <div className={styles.item_info}>
                    <p>{item.title.slice(0, 25)}...</p>
                    <b>{item.price}</b>
                </div>
                {console.log('thisID:', item.thisID)}
                <img className={styles.remove_item_btn + ' cp'} height={25} src="/img/x-circle.svg" alt="remove-item" 
                    onClick={() => {
                        props.remFromCart(item.thisID)}
                    }/>
            </div>
        )
    })

    return (
    <>
        <div className={styles.overlay} onClick={props.clseCart}></div>
        <div className={styles.drawer}>
            <div className={styles.header}>
                <span className={styles.title}>Корзина</span>
                <img onClick={props.clseCart} className={styles.close_btn + ' cp'} height={25} src="/img/x-circle.svg" alt="close-btn" />
            </div>
            <div className={styles.list_items}>
                {cartItems.length > 0 ? cartItems : <h2 className={styles.emptyCartTitle}>Корзина пустая...</h2> }
            </div>
            {cartItems.length > 0 ? <span>Итого: {props.cartTotal}руб.</span> : null}
            <div className={styles.buy_btn}>
                {cartItems.length > 0 ? <button onClick={() => props.checkout()} className='cp'><span>Оформить заказ</span></button> : null}
            </div>
        </div>
    </>
    );
}

export {Drawer};