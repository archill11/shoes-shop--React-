
import { Card } from './Card/Card';

import styles from './CardList.module.scss';



const CardList = (props) => {

  const cardList = props.shoesData.map(item => {
    return (
      <Card key={item.id} title={item.title} price={item.price} img={item.img}
            addToCartTotal={props.addToCartTotal} cartTotal={props.cartTotal}
            addToCart={() => props.addToCart(item.id)} 
            remFromCart={() => props.remFromCart(item.id)}/>
    )
  })
  
  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Все кроссовки</span>
            <input placeholder='Найти...' type="text" name="search" id="input-search"/>
        </div>
      <div className={styles.card_list}>
        {cardList}
      </div>
      </main>
  );
}

export {CardList};