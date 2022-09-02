
import styles from './Drawer.module.scss';




const Drawer = (props) => {

  
  return (
    <div className={styles.overlay}>
        <div className={styles.drawer}>
            <div className={styles.header}>
                <span className={styles.title}>Корзина</span>
                <img className={styles.close_btn + ' cp'} height={25} src="/img/x-circle.svg" alt="close-btn" />
            </div>
            <div className={styles.list_items}>
                <div className={styles.item}>
                    <img width={70} src="/img/1img.webp" alt="1" />
                    <div className="drawer__item-info">
                        <p>МУжские кроссовки New Balance 500</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img className={styles.remove_item_btn + ' cp'} height={25} src="/img/x-circle.svg" alt="remove-item" />
                </div>
            </div>
            <div className={styles.buy_btn}>
                <button className='cp'><span>Оформить заказ</span></button>
            </div>
        </div>
      </div>
  );
}

export {Drawer};