import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_REGEX } from "../utils/constants";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`;
const Button = styled.input`
  height: 55px;
  width: 214px;
  border-radius: 40px;
  background: #000000;
  color: white;
  font-family: GT Planar;
  font-size: 22px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;
  border: none;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: gray;
  }
`;
const InputSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const EmailInput = styled.input`
  height: 55px;
  width: 350px;
  color: #6c6c6c;
  border-radius: 12px;
  border: none;
  font-family: GT Planar;
  font-size: 22px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;
  padding-left: 20px;
  margin-right: 20px;
`;
const Error = styled.div`
  color: #c40f0f;
  padding-top: 5px;
`;
const Success = styled.div`
  color: green;
  padding-top: 5px;
`;

const SUBMIT_BUTTON_TEXT = "Join the waitlist";

type Inputs = {
  email: string;
};

export const Signup: React.FC = () => {
  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] =
    React.useState(SUBMIT_BUTTON_TEXT);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSubmitButtonText("Submitting...");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const params = {
      email: data.email,
    };
    const init = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params),
    };
    const request = new Request("/api/signup", init);
    const r = await fetch(request);
    if (r.status !== 200) {
      setErr(true);
    } else {
      setSuccess(true);
    }
    setSubmitButtonText(SUBMIT_BUTTON_TEXT);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignupContainer>
        <InputSection>
          <EmailInput
            placeholder="Email Address"
            {...register("email", {
              required: true,
              pattern: EMAIL_REGEX,
            })}
          />
          {errors.email && <Error>Invalid email</Error>}
          {err && <Error>Something went wrong. Try again.</Error>}
          {success && <Success>Success! Expect an email from us soon.</Success>}
        </InputSection>
        <>
          <Button type="submit" value={submitButtonText} />
        </>
      </SignupContainer>
    </form>
  );
};
