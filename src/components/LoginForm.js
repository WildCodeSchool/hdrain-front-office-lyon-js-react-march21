import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import qs from 'query-string';
import API from '../APIClient';

export default function LoginForm() {
  const { addToast } = useToasts();

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = ({ username, password, stayConnected }) => {
    API.post(`/auth/login`, { username, password, stayConnected })
      .then(() => {
        const { redirectUrl } = qs.parse(window.location.search);
        if (redirectUrl) history.push(redirectUrl);
        addToast('Successfully logged in', {
          appearance: 'success',
          autoDismiss: true,
        });
        history.push('/home');
        window.location.reload();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          addToast('Wrong Credentials', {
            appearance: 'error',
            autoDismiss: true,
          });
        } else window.console.error(err);
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In</h2>
      <input
        {...register('username', { required: true })}
        autoComplete="username"
        placeholder="Enter your username"
        type="text"
      />
      {errors.username && (
        <span
          style={{
            marginLeft: '1em',
            marginTop: 0,
            color: 'red',
            fontSize: '.75rem',
          }}
        >
          This field is required
        </span>
      )}
      <input
        {...register('password', { required: true })}
        placeholder="Password"
        autoComplete="current-password"
        type="password"
        rules={{
          minLength: {
            value: 4,
            message: 'should be at least 8 characters',
          },
        }}
      />
      {errors.password && (
        <span
          style={{
            marginLeft: '1em',
            marginTop: 0,
            color: 'red',
            fontSize: '.75rem',
          }}
        >
          This field is required
        </span>
      )}

      <input type="submit" value="Login" />
    </form>
  );
}
