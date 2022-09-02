
import styles from './CardList.module.scss';
import { Card } from './Card/Card';




const CardList = (props) => {

  const cardList = props.sneakersData.map(item => {
    return (
      <Card key={item.id} title={item.title} price={item.price} img={item.img}/>
    )
  })
  
  return (
    <main className={styles.main}>
        <div className={styles.main_title}>
            <span>Все кроссовки</span>
            <input placeholder='Найти...' type="text" name="search" id="input-search" />
        </div>
      <div className={styles.card_list}>
        {cardList}
      </div>
      </main>
  );
}

export {CardList};