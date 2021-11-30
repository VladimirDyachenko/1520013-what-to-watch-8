import { PropsWithChildren } from 'react';
import HeaderUser from '../header-user/header-user';
import Logo from '../logo/logo';

type HeaderProps = PropsWithChildren<{
  type: 'login' | 'addReview' | 'filmPage' | 'myList';
}>

function Header({type, children}: HeaderProps): JSX.Element {

  if (type === 'login') {
    return (
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
    );
  }

  if (type === 'addReview') {
    return (
      <header className="page-header">
        <Logo />
        {children}
        <HeaderUser/>
      </header>
    );
  }

  if (type === 'filmPage') {
    return (
      <header className="page-header film-card__head">
        <Logo />
        <HeaderUser/>
      </header>
    );
  }

  if (type === 'myList') {
    return (
      <header className="page-header user-page__head">
        <Logo />
        {children}
        <HeaderUser/>
      </header>
    );
  }

  return (<div>Missing header type</div>);
}

export default Header;
