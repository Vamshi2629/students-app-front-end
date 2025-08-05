import { useState } from "react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

const SignupPage = () => {
  const [email, setEmail] = useState(null);

  return (
    <div>
      {!email ? <SignupStep1 onNext={setEmail} /> : <SignupStep2 email={email} />}
    </div>
  );
};

export default SignupPage;
