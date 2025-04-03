// app/layout.tsx
import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { useNonce } from '@shopify/hydrogen';
import tailwindCss from './styles/tailwind.css?url';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import { ClientOnly } from '~/components/ClientOnly';
import Layout3DWrapper from '~/components/Layout3DWrapper';

export default function Layout() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={tailwindCss} />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />
        <Meta />
        <Links />
      </head>
      <body>
        <ClientOnly>
          <Layout3DWrapper>
            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
          </Layout3DWrapper>
        </ClientOnly>
      </body>
    </html>
  );
}
