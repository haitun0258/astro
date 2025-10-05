import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia, mainnet, arbitrum} from '@reown/appkit/networks' // 添加 sepolia
import type { AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from https://dashboard.reown.com
export const projectId = "b56e18d47c72ab683b10814fe9495694"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// 配置测试网
export const networks = [sepolia, mainnet, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig