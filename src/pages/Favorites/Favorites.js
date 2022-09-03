
import { Card } from '../CardList/Card/Card';
import styles from '../CardList/CardList.module.scss';
// import styles from './Favorites.module.scss';



const Favorites = (props) => {

  const cardList = props.favItems
                        .filter(item => item.title.toLowerCase().includes(props.searchVal.toLowerCase()))
                        .map(item => {
                          const {id, title, price, img} = item
                          return (
                            <Card key={id} {...item} favorited={true}
                                  addToCartTotal={props.addToCartTotal} cartTotal={props.cartTotal}
                                  addToCart={() => props.addToCart({title,price,img})} 
                                  remFromCart={() => props.remFromCart(item.id)}
                                  addTofav={() => props.addTofav({title,price,img,id})}
                                  remFromFav={() => props.remFromFav(item.id)}/>
                          )
                        })

  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Закладки</span>
            <input placeholder='Найти...' type="text" name="search" id="input-search" value={props.searchVal}
              onChange={(e) => props.searchByVal(e.target.value)}/>
        </div>
        <div className={styles.card_list}>
          {cardList.length > 0 ? cardList : <h2 className={styles.emptyCartTitle}>Пусто...</h2> }
        </div>
      </main>
  );
}

export {Favorites};