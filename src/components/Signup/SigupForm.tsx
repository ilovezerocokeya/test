"use client";

import React from "react";
import Signup01 from "./Signup01";
import Signup02 from "./Signup02";
import Signup03 from "./Signup03";
import Signup04 from "./Signup04";
import { useUser } from "@/provider/UserContextProvider";

const SignupForm: React.FC = () => {
  const { setUserData, step } = useUser();

  switch (step) {
    case 1:
      return <Signup01 />;
    case 2:
      return <Signup02 />;
    case 3:
      return <Signup03 setUserData={setUserData} />;
    case 4:
      return <Signup04 />;
    default:
      return <div>Error: Unknown step</div>;
  }
};

export default SignupForm;
