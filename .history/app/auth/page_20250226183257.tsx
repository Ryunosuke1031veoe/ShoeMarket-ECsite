import { SignUpForm } from '../components/sign-up';



export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white bg-cover pt-16"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(18, 18, 18, 0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="w-full max-w-md p-6 space-y-8">
        <SignUpForm />
      </div>
    </div>
  );
}