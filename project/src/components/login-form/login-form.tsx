import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loginAction } from '../../store/api-action';
import { AppRoute } from '../../utils/const';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const onLoginResult = (result: 'ok' | 'error'): void => {
      switch (result) {
        case 'ok':
          history.push(AppRoute.Main);
          break;
        case 'error':
          // eslint-disable-next-line no-console
          console.log('login error');
          break;
        default:
          throw new Error(`Missing case ${result}`);
      }
    };

    dispatch(loginAction(email, password, onLoginResult));
  };

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
      <fieldset style={{border: '0', padding: '0', margin: '0'}}>
        <div className="sign-in__fields">
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              type="email"
              placeholder="Email address"
              name="user-email"
              id="user-email"
              autoComplete="current-password"
              onChange={handleEmailInput}
              value={email}
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
          </div>
          <div className="sign-in__field">
            <input
              className="sign-in__input"
              type="password"
              placeholder="Password"
              name="user-password"
              id="user-password"
              autoComplete="email"
              onChange={handlePasswordInput}
              value={password}
            />
            <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
          </div>
        </div>
        <div className="sign-in__submit">
          <button className="sign-in__btn" type="submit">Sign in</button>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginForm;
