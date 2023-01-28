import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_REGEX } from "../utils/constants";
import { breakpoint } from "../utils/breakpoints";

const Button = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  height: 45px;
  width: 184px;
  background: #000000;
  color: white;
  font-family: GT Planar;
  font-size: 18px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;
  border: none;
  cursor: pointer;
  &:hover {
    background: gray;
  }
  box-shadow: 0px 7.88244px 19.1089px rgb(0 0 0 / 14%),
    0px 3.27396px 7.93687px rgb(0 0 0 / 11%),
    0px 1.18413px 2.87061px rgb(0 0 0 / 7%);
  border-radius: 9.50786px;

  @media (max-width: ${breakpoint.size.lg}) {
    position: unset;
    margin-top: 20px;
  }
`;

const EmailInput = styled.input`
  height: 71px;
  width: 100%;
  padding: 0 20px;
  color: #6c6c6c;
  border-radius: 12px;
  border: none;
  font-family: GT Planar;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0em;

  @media only screen and ${breakpoint.device.md} {
    font-size: 22px;
  }
  @media only screen and ${breakpoint.device.lg} {
    font-size: 22px;
  }
`;
const Message = styled.div`
  position: absolute;
  top: -25px;
  left: 20px;
  font-size: 18px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Error = styled.div`
  color: #c40f0f;
`;
const Success = styled.div`
  color: green;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`;

const SUBMIT_BUTTON_TEXT = "Access the beta";
const SUBMIT_BUTTON_LOADING_TEXT = "Submitting...";

type Inputs = {
  email: string;
};

export const Signup: React.FC = () => {
  const [err, setErr] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
    try {
      setIsLoading(true);
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
          const { error } = resp;
          console.error(error);
          setErr(error);
          setSuccess(false);
        }
      } else {
        setSuccess(true);
        setErr("");
      }
    } catch (err) {
      setErr("Something went wrong. Please try again");
      console.error(err);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  let error_msg = errors.email ? "Invalid email" : err;
  let has_error = error_msg.length !== 0;

  return (
    <SignupForm onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
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
        <Button
          type="submit"
          value={isLoading ? SUBMIT_BUTTON_LOADING_TEXT : SUBMIT_BUTTON_TEXT}
        />
      </InputContainer>
    </SignupForm>
  );
};
