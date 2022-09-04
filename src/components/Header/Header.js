import { LogoSvg } from '../LogoSvg/LogoSvg';
import {Link} from "react-router-dom";

import './Header.scss'

const Header = (props) => {
    return(
        <header className='header'>
            <Link to="/">
                <div className="header__logo cp">
                    <LogoSvg className="logo__img--anim header__logo__img" fill={'#FF1493'} />
                </div>
            </Link>
            <div className="header__buttons">
                <ul className="header__cart">
                    <li onClick={props.opnCart}>
                        <img src="/img/shopping-cart-outline-svgrepo-com.svg" height={20} alt="cart"></img>
                        <span className="cart__total">{props.cartTotal} руб.</span>
                    </li>
                    <li>
                        <Link to="/favorites">
                            <img src="/img/heart.svg" height={20} alt="like"></img>
                        </Link>
                    </li>
                    <li className="header__accaunt">
                        <Link to="/cabinet">
                            <img src="/img/account.svg" height={20} alt="cart"></img>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export {Header}