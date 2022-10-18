import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import qs from "qs";
import { Message, DappRequest, parseRequestFromMessage } from "../types";

const ResultContainer = styled.div``;

const ScanResult: React.FC = () => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [request, setRequest] = useState<DappRequest | undefined>(undefined);
  useEffect(() => {
    const windowQs = window.location.search;
    const cleanedQs = windowQs.startsWith("?") ? windowQs.slice(1) : windowQs;
    // NOTE: We only pass Message through the query params
    const _message = qs.parse(cleanedQs) as unknown as Message;
    const _request = parseRequestFromMessage(_message);
    setMessage(_message);
    setRequest(_request);
  }, []);
  console.log(message);
  console.log(request);
  return <ResultContainer>ScanResult</ResultContainer>;
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<ScanResult />);
