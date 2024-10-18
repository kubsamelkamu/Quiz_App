import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('../components/auth/SignUp'), { ssr: false });

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
