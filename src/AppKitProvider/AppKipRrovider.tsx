import { wagmiAdapter, projectId, networks } from './Config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import AdminLayout from '../components/AdminLayout'
import DashHead from '../components/dashBoard/DashHead'
import DashCard from '../components/dashBoard/DashCard'
import DashTable from '../components/dashBoard/DashTable'
import CardTest from '../components/dashBoard/CardTest'

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'next-reown-appkit',
  description: 'next-reown-appkit',
  url: 'https://github.com/0xonerb/next-reown-appkit-ssr', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

function AppKitProvider({ cookies }: { cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // 防止水合错误
  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {/* {children} */}

        <AdminLayout title="首页">
          <DashHead />
          {/* <DashCard /> */}


          <CardTest />
          <DashTable />
        </AdminLayout>

      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default AppKitProvider