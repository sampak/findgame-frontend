import AuthLayout from '../../../components/AuthLayout';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import CTAButton from '../../../components/CTAButton';
import LoginMethods from '../../../components/LoginMethods';
import { useNavigate } from 'react-router-dom';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import authService from '../../../api/authService';
import { setToken } from '../../../api/user';
import useLang from '../../../hooks/useLang';
import { getApiError } from '../../../utils/getApiError';

const SignIn = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const { getLang } = useLang('signIn');

  const { mutate: signIn } = authService.useSignIn();

  const handleClickNeedAccount = () => navigate('/auth/sign-up');

  const loginValue = watch('login');
  const passwordValue = watch('password');

  const handleSignIn = (data: FieldValues) => {
    signIn(
      {
        login: data.login,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          setToken(data.token);
          navigate('/');
        },

        onError: (err) => {
          console.log(getApiError(err, getLang));
        },
      }
    );
  };

  useEffect(() => {
    trigger();
  }, [loginValue, passwordValue, trigger]);

  const isError: boolean = !!errors?.login || !!errors?.password;

  return (
    <AuthLayout>
      <div className="w-full flex flex-col gap-7">
        <LoginMethods />
        <div className="relative my-2 w-full inline-flex items-center justify-center w-full">
          <hr className="w-full h-px bg-deepNavy-500 border-0 absolute top-1/2 " />
          <span className="absolute px-3 font-medium -translate-x-1/2 top-1/2 bg-white -translate-y-1/2 left-1/2 text-deepNavy-500">
            {getLang('orText')}
          </span>
        </div>

        <form
          className="w-full flex gap-5 flex-col"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Controller
            name="login"
            control={control}
            rules={{ required: true }}
            defaultValue="" // Ensuring the initial value is an empty string
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                value={value ?? ''} // Ensuring the value is always defined
                onChange={(text) => onChange(text)}
                placeholder={getLang('placeholderLogin')}
                label=""
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue="" // Ensuring the initial value is an empty string
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                value={value ?? ''} // Ensuring the value is always defined
                onChange={(text) => onChange(text)}
                placeholder={getLang('placeholderPassword')}
                label=""
                type="password"
                onBlur={onBlur}
                ref={ref}
              />
            )}
          />
          <Button isDisabled={isError} type="submit" className="mt-5 w-full">
            {getLang('signInButton')}
          </Button>
        </form>

        <CTAButton
          onClick={handleClickNeedAccount}
          className="flex justify-center"
        >
          {getLang('needAccountButton')}
        </CTAButton>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
