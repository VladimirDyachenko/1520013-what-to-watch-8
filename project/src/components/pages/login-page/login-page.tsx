import Footer from '../../footer/footer';
import Header from '../../header/header';
import LoginForm from '../../login-form/login-form';

function LoginPage(): JSX.Element {
  return (
    <div className="user-page">
      <Header type={'login'}/>

      <div className="sign-in user-page__content">
        <LoginForm/>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
