import LoginForm from "../auth/LoginForm";
import RandomImage from "../randomimage/RandomImage";

function LoginPage() {

return (
  <div className="relative min-h-screen flex">
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">

      <LoginForm></LoginForm>
      <RandomImage></RandomImage>
    </div>
  </div>
);

}

export default LoginPage;