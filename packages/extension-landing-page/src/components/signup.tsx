import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_REGEX } from "../utils/constants";
import { breakpoint } from "../utils/breakpoints";

const SignupContainer = styled.div`
  flex-direction: row;
  padding-top: 20px;

  @media only screen and ${breakpoint.device.md} {
    display: flex;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
  }
`;
const Button = styled.input`
  height: 45px;
  width: 184px;
  border-radius: 40px;
  background: #000000;
  color: white;
  font-family: GT Planar;
  font-size: 18px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;
  border: none;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background: gray;
  }
  margin-top: 20px;

  @media only screen and ${breakpoint.device.md} {
    font-size: 22px;
    height: 55px;
    width: 214px;
  }
  @media only screen and ${breakpoint.device.lg} {
    font-size: 22px;
    height: 55px;
    width: 214px;
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
  font-size: 18px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;
  padding-left: 20px;
  margin-right: 20px;

  @media only screen and ${breakpoint.device.md} {
    font-size: 22px;
  }
  @media only screen and ${breakpoint.device.lg} {
    font-size: 22px;
  }
`;
const Message = styled.div`
  margin-bottom: 5px;
  padding-left: 20px;
  height: 24px;
`;
const Error = styled.div`
  color: #c40f0f;
`;
const Success = styled.div`
  color: green;
`;

const SUBMIT_BUTTON_TEXT = "Access the beta";

type Inputs = {
  email: string;
};

export const Signup: React.FC = () => {
  const [err, setErr] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [submitButtonText, setSubmitButtonText] =
    React.useState(SUBMIT_BUTTON_TEXT);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Make sure we clear the "success" message if an error occurs in the email field
  useEffect(() => {
    if (errors.email) {
      setSuccess(false);
    }
  }, [errors.email]);

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
    const resp = await r.json();
    if (r.status !== 200) {
      if (resp.error === "email already exists") {
        setSuccess(true);
        setErr("");
      } else {
        setErr(resp.error);
        setSuccess(false);
      }
    } else {
      setSuccess(true);
      setErr("");
    }
    setSubmitButtonText(SUBMIT_BUTTON_TEXT);
  };

  let error_msg = errors.email ? "Invalid email" : err;
  let has_error = error_msg.length !== 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SignupContainer>
        <InputSection>
          <Message>
            {has_error && <Error>{error_msg}</Error>}
            {success && !has_error && (
              <Success>Success! Expect an email from us soon.</Success>
            )}
          </Message>
          <EmailInput
            placeholder="Email Address"
            {...register("email", {
              required: true,
              pattern: EMAIL_REGEX,
            })}
          />
        </InputSection>
        <>
          <Button type="submit" value={submitButtonText} />
        </>
      </SignupContainer>
    </form>
  );
};
