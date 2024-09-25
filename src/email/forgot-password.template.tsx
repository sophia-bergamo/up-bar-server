import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface Props {
  code: string;
}

export const ForgotPasswordEmailTemplate = (props: Props) => (
  <Html lang="pt-BR">
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>Recuperação de senha</Text>
        <Text style={text}>
          Para criar uma nova senha, insira o código abaixo no app:
        </Text>
        <Section style={section}>
          <Text style={code}>{props.code}</Text>
        </Section>
        <Text style={text}>
          Caso não tenha feito essa solicitação, ignore essa mensagem.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = { background: "#ffffff", color: "#333333" };

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  color: "#333333",
  fontSize: "24px",
  lineHeight: 1.2,
  fontWeight: 600,
};

const section = {
  margin: "0 auto 16px",
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const text = {
  color: "#333333",
  margin: "0 0 16px 0",
  textAlign: "left" as const,
};

const code = {
  fontSize: "24px",
  color: "#29a3a3",
  lineHeight: 1.2,
};
