
import { Card } from './Card/Card';

import styles from './CardList.module.scss';



const CardList = (props) => {

  const cardList = props.shoesData
                          .filter(item => item.title.toLowerCase().includes(props.searchVal.toLowerCase()))
                          .map(item => {
                            const {id, title, price, img} = item
                            return (
                              <Card key={id} {...item}
                                    addToCartTotal={props.addToCartTotal} cartTotal={props.cartTotal}
                                    addToCart={() => props.addToCart({title,price,img,id})} 
                                    remFromCart={() => props.remFromCart(item.id)}
                                    addTofav={() => props.addTofav({title,price,img,id})}
                                    remFromFav={() => props.remFromFav(item.id)}/>
                            )
                          })
  
  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Все кроссовки</span>
            <input placeholder='Найти...' type="text" name="search" id="input-search" value={props.searchVal}
              onChange={(e) => props.searchByVal(e.target.value)}/>
        </div>
      <div className={styles.card_list}>
        {cardList}
      </div>
      </main>
  );
}

export {CardList};