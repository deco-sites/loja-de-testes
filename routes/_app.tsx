import { AppProps } from "$fresh/server.ts";
import { context } from "$live/live.ts";
import Script from "partytown/Script.tsx";

const trackingId = "";

export default function App(props: AppProps) {
  return (
    <>
      {/* Add Tag Manager script during production only. To test it locally remove the condition */}
      {!!context.deploymentId && trackingId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
          />
          <Script
            forward={["gtag"]}
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              window.dataLayer.push(arguments);
            }
            window.gtag = gtag;
            window.gtag("js", new Date());
            window.gtag("config", "${trackingId}");
            `,
            }}
          />
        </>
      )}

      <props.Component />
    </>
  );
}
