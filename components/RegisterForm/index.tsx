"use client";

import Content from "./components/content";
import Submit from "./components/submit";
import Title from "./components/title";

const RegisterForm = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Title />
      <Content />
      <Submit />
    </div>
  );
};

export default RegisterForm;
