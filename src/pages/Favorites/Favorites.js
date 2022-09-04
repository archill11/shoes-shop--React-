
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { Card } from '../CardList/Card/Card';

import styles from '../CardList/CardList.module.scss';


const Favorites = (props) => {
  const cardList = props.favItems
                        .filter(item => item.title.toLowerCase().includes(props.searchVal.toLowerCase()))
                        .map(item => {
                          const {id, title, price, img} = item
                          return (
                            <Card key={id} {...item} favorited={true}
                                  addToCart={() => props.addToCart({thisID:id,title,price,img})} 
                                  remFromCart={() => props.remFromCart(item.id)}
                                  addTofav={() => props.addTofav({thisID:id,title,price,img,id})}
                                  remFromFav={() => props.remFromFav(item.thisID)}
                                  addedCart={props.cartItems.some(item=> Number(item.thisID) === Number(id))}
                                  cartItems={props.cartItems}/>
                          )
                        })

  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Закладки</span>
            <SearchInput searchVal={props.searchVal} placeholder={'Найти...'} searchByVal={props.searchByVal}/>
        </div>
        <div className={styles.card_list}>
          {cardList.length > 0 ? cardList : <h2 className={styles.emptyCartTitle}>Пусто...</h2> }
        </div>
      </main>
  );
}

export {Favorites};