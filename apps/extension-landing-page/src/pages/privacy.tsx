import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Text } from "@blowfish/ui/core";

const Main = styled.main`
  max-width: 1024px;
  margin: auto;
  padding: 0 24px;
`;

const P = styled(Text).attrs({ as: "p" })``;

const Wrapper = styled.div`
  h2 {
    font-size: 21px;
    line-height: 24px;
    font-weight: 500;
  }

  li + li {
    margin-top: 7px;
  }

  a {
    color: rgb(0, 0, 238);
    text-decoration: underline;
  }
`;

const Home = () => {
  return (
    <>
      <Main>
        <Wrapper>
          <Text as="h1" size="xxl">
            Blowfish Privacy Policy
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            Last updated: April 3, 2023
          </Text>
          <P>
            Ninja Security AG (&quot;<b>Ninja Security</b>&quot;, &quot;
            <b>we</b>&quot;, &quot;<b>us</b>
            &quot;, or &quot;<b>our</b>&quot;) provides fraud identification and
            prevention services to protect crypto wallets. This Privacy Policy
            describes how we collect, use, process, and share your personal
            data, and to help you understand and exercise your privacy rights.
          </P>
          <P>
            This Privacy Policy describes how we process your personal data
            through our &quot;<b>Services</b>&quot;, which include our websites,
            browser extensions, and other online offerings. We reserve the right
            to modify this Privacy Policy as we see fit. If any significant
            changes are made to this Privacy Policy, we will inform you as
            required by applicable law. By continuing to use our Ser- vices
            after the updated Privacy Policy takes effect, you acknowledge and
            accept its terms.
          </P>
          <Text as="h2">Contact us</Text>
          <P>
            If you have any question about our processing of your personal data,
            please contact Ninja Security AG, Grienbachstrasse 17, 6300 Zug,
            Switzerland,{" "}
            <a href="mailto:contact@blowfish.xyz">contact@blowfish.xyz</a>.
          </P>
          <Text as="h2">Personal data we process</Text>
          <P>
            We may process the following personal data through our Services:
          </P>
          <ul>
            <li>
              <b>Account information</b>, such as your username
            </li>
            <li>
              <b>Contact information</b>, such as your email address
            </li>
            <li>
              <b>Crypto transaction data</b>, in particular data concerning a
              proposed crypto transac- tion supplied to our Services for fraud
              identification. This includes, for example, the user account being
              asked to sign a transaction, the addresses of the transaction
              signer and the transaction recipient, the value of the proposed
              transaction and the domain of the decentralized application (dApp)
              proposing the transaction.
            </li>
            <li>
              <b>Log data</b>, such as internet protocol (IP) address, your
              operating system, browser type, browser id, date/time of visit,
              the time spent on our Services and any errors that may occur
              during the visit to our Services.
            </li>
          </ul>
          <P>
            If you choose not to share certain personal data with us, we may not
            be able to serve you as effectively or offer you our Services.
          </P>
          <Text as="h2">Purpose for which we process your personal data</Text>
          <P>We process your personal data to:</P>
          <ul>
            <li>Manage your information and accounts.</li>
            <li>
              Provide you access to our Services, including our fraud
              identification service.
            </li>
            <li>Answer requests for customer or technical support.</li>
            <li>
              Communicate with you about your account, activities on our
              Services, and policy changes.
            </li>
            <li>
              Process your financial information and other payment methods for
              products or Services bought.
            </li>
            <li>Test, enhance, update and monitor our Services.</li>
            <li>Improve and customize our Services.</li>
            <li>
              Help maintain the safety, security and integrity of our Services.
            </li>
            <li>
              Fulfill or enforce our legal or contractual obligations and
              requirements, to resolve disputes and to carry out our obligations
              and enforce our rights.
            </li>
            <li>
              Prevent, investigate or provide notice of fraud or unlawful or
              criminal activity
            </li>
          </ul>
          <Text as="h2">How we disclose your personal data</Text>
          <P>
            The categories of third parties with whom we may share your personal
            data are described below:
          </P>
          <P>
            <b>Service providers</b>. We may share your personal data with our
            third-party service providers and vendors that assist us with the
            provision of our Services. This includes service providers and
            vendors that provide us with IT support, authentication, security,
            hosting, payment pro- cessing, alerting, customer service, and
            related services.
          </P>
          <P>
            We may access, preserve, and disclose any information associated
            with you to external parties if we, in good faith, believe doing so
            is required or appropriate to comply with law enforcement or
            national security requests and legal process, such as a court order
            or subpoena.
          </P>
          <P>
            If we are involved in a merger, acquisition, financing due
            diligence, purchase or sale of assets, or transition of service to
            another provider, your personal data may be transferred as part of
            such a transaction, as permitted by law and/or contract.
          </P>
          <Text as="h2">How long we retain your personal data</Text>
          <P>
            We store the personal information we collect as described in this
            Privacy Policy for as long as you use our Services, or as necessary
            to fulfill the purpose(s) for which it was collected.
          </P>
          <Text as="h2">Your privacy rights</Text>
          <P>
            In accordance with applicable data protection laws, you may have the
            right to:
          </P>
          <ul>
            <li>
              Access your personal data, including the right to data
              portability.
            </li>
            <li>
              Request correction of personal data where it is inaccurate or
              incomplete. In some cases, we may provide self-service tools that
              enable you to update your personal data.
            </li>
            <li> Request deletion of your personal data</li>
            <li>
              Request restriction of, or object to, our processing of your
              personal information.
            </li>
          </ul>
          <P>
            If you would like to exercise any of these rights, please contact us
            as set forth in “Contact Us” above. We will process such requests in
            accordance with applicable laws, which may include restrictions to
            and exemptions to these rights.
          </P>
          <Text as="h2">
            Supplemental notice for personal data originating from the EEA, UK,
            Switzerland
          </Text>
          <P>
            Processing of personal data is based on the following legal bases:
          </P>
          <ul>
            <li>
              Processing is necessary for the performance of a contract to which
              the data subject is party or in order to take steps at the request
              of the data subject prior to entering into a contract.
            </li>
            <li>
              Processing is necessary for the purposes of the legitimate
              interests pursued by the controller or by a third party. The
              legitimate interests are identifying and preventing crypto-native
              fraud and scams.
            </li>
          </ul>
          <P>
            All personal data we process may be transferred and stored anywhere
            in the world, including but not limited to the United States or
            other countries that may have data protection laws that are
            different from the laws where you live. We endeavor to safeguard
            your information con- sistent with the requirements of the
            applicable laws. If we transfer personal data which origi- nates in
            the European Economic Area, Switzerland, and/or the United Kingdom
            to a country that has not been found to provide an adequate level of
            protection under applicable data pro- tection laws, one of the
            safeguards we may use to support such transfer is the{" "}
            <a
              href="https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en"
              target="_blank"
              rel="noreferrer"
            >
              EU Standard Contractual Clauses
            </a>
            .
          </P>
          <P>
            Our processing of personal data does not constitute automated
            decision-making or profiling in the sense of the GDPR and similar
            data protection laws. In particular, you are free to sign or not
            sign a transaction that has been screened by our Services.
          </P>
          <P>
            You have the right to lodge a complaint with the competent
            supervisory authority. The contact details of the supervisory
            authorities in the EEA can be found{" "}
            <a
              href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </P>
        </Wrapper>
        <Footer />
      </Main>
    </>
  );
};

export default Home;
