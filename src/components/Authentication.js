import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';
import API from '../APIClient';

export default function LoginForm() {
  const { addToast } = useToasts();
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

  const onSubmit = ({ username, password }) => {
    API.post(`/auth/login`, { username, password })
      .then(() => {
        addToast('Successfully logged in', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch((err) => {
        window.console.error(err);
        addToast('Wrong Credentials', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Log In</h2>
      <input
        {...register('username', { required: true })}
        autoComplete="username"
        placeholder="Enter your email"
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
      <span className="rememberMe">
        <input
          type="Checkbox"
          {...register('rememberMe')}
          label="Remember me"
        />
        Remember me
      </span>
      <input type="submit" value="Login" />
    </form>
  );
}
