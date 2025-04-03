// app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { useNonce } from '@shopify/hydrogen';
import Layout from './layout';

export function App() {
  return <Outlet />;
}

export default function Root() {
  const nonce = useNonce();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="w-screen h-screen">
          <Layout />
        </div>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
