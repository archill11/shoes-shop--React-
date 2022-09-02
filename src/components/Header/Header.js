import { LogoSvg } from '../LogoSvg/LogoSvg';

import './Header.scss'

const Header = (props) => {
    return(
        <header className='header'>
            <div className="header__logo">
                <LogoSvg className="logo__img--anim header__logo__img" fill={'#FF1493'} />
            </div>
            <div className="header__buttons">
                <ul className="header__cart">
                    <li onClick={props.opnCart}>
                        <img src="/img/shopping-cart-outline-svgrepo-com.svg" height={20} alt="cart"></img>
                        <span className="cart__total">{props.cartTotal} руб.</span>
                    </li>
                    <li>
                        <img src="/img/heart.svg" height={20} alt="like"></img>
                    </li>
                    <li className="header__accaunt">
                    <img src="/img/account.svg" height={20} alt="cart"></img>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export {Header}