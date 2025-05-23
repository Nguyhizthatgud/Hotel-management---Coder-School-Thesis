import LoginSignupPage from "./components/LoginSignupPage";

export default function Home() {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <LoginSignupPage />
      </div>
    </div>
  );
}
