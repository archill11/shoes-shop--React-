// import {Routes, Route} from "react-router-dom";
import './Card.scss';




const Card = (props) => {

  
  return (
      <div className="card ">
        <img className='cart__like' src="/img/heart.svg" height={20} alt="like"></img>
        <img width={180} height={130} src={props.img} alt="1" />
        <p>{props.title}</p>
        <div className="card__bottom">
            <div className="card__price">
                <span>цена:</span>
                <b>{props.price} руб.</b>
            </div>
            <button className='card__button '>
                <img src="/img/plus.svg" alt="plus" />
            </button>
        </div>
      </div>
  );
}

export {Card};