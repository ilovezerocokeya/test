"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import SignupForm from "@/components/Signup/SigupForm";

const supabase = createClient();

const SignupPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching logged-in user:", userError);
        return;
      }

      if (!user) {
        router.push("/");
        return;
      }
    };

    checkUser();
  }, [router]);

  return <SignupForm />;
};

export default SignupPage;