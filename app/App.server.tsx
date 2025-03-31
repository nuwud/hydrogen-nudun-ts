import Layout3DWrapper from './components/Layout3DWrapper';
import React, { Suspense } from 'react'
import { ShopifyProvider } from '@shopify/hydrogen-react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Assuming your rootRoute is a Promise<RouteConfigEntry[]>
// You need to create an actual router with createBrowserRouter
const router = createBrowserRouter([
  // Your routes configuration here
  // Replace this with your actual routes
  {
    path: '/',
    element: <Layout3DWrapper>
      <div>Home Page Content</div>
    </Layout3DWrapper>
  },
  // Other routes...
]);

export default function App() {
  return (
    <ShopifyProvider 
      storeDomain="your-store.myshopify.com"
      storefrontToken="your-storefront-token"
      storefrontApiVersion="2023-07"
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <Layout3DWrapper>
        <Suspense fallback={<div>Loading site...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </Layout3DWrapper>
    </ShopifyProvider>
  )
}
