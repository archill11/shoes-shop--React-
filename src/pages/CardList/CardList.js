

import { Sceleton } from '../../components/Sceleton/Sceleton';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { Card } from './Card/Card';

import styles from './CardList.module.scss';


const CardList = (props) => {

  const sceletons = new Array(16).fill(<Sceleton style={{boxShadow: 'rgb(0 0 0 / 9%) 5px 3px 27px', borderRadius: "37px", padding: "10px"}}/>)

  const cardList = props.shoesData
                          .filter(item => item.title.toLowerCase().includes(props.searchVal.toLowerCase()))
                          .map(item => {
                            const {id, title, price, img} = item
                            return (
                              <Card key={id} {...item}
                                    cartTotal={props.cartTotal}
                                    addToCart={() => props.addToCart({thisID:id,title,price,img})} 
                                    remFromCart={() => props.remFromCart(item.id)}
                                    addTofav={() => props.addTofav({thisID:id,title,price,img})}
                                    remFromFav={() => props.remFromFav(item.id)}
                                    addedCart={props.cartItems.some(item=> Number(item.thisID) === Number(id))}
                                    favorited={props.favItems.some(item=> Number(item.thisID) === Number(id))}
                                    cartItems={props.cartItems} favItems={props.favItems}
                                    />
                            )
                          })
  
  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Все кроссовки</span>
            <SearchInput searchVal={props.searchVal} placeholder={'Найти...'} searchByVal={props.searchByVal}/>
        </div>
      <div className={styles.card_list}>
        {props.loading ? sceletons : cardList}
      </div>
      </main>
  );
}

export {CardList};