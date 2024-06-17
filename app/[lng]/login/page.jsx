"use client";
import { Descope } from "@descope/nextjs-sdk";
// you can choose flow to run from the following without `flowId` instead
// import { SignInFlow, SignUpFlow, SignUpOrInFlow } from '@descope/nextjs-sdk'

const PageAuth = () => {
  return (
    <div className="flex justify-center">
      <Descope
        flowId="sign-up-or-in"
        // onSuccess={(e) => console.log("Logged in!", e.detail.user.email)}
        // onError={(e) => console.log("Could not logged in!")}
        redirectAfterSuccess="/"
        // redirectAfterError="/error-page"
      />
    </div>
  );
};

export default PageAuth;
