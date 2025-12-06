export const API_CONFIG = {
  serpapi: {
    key: '2793125b8f2684df7c7677d0677385f2624d3bf21184d5c5d1d737e726f2490b',
    baseUrl: 'https://serpapi.com/search'
  },
  geoapify: {
    key: '4247471f71c943ceb8a629a2884d4b52',
    projectId: 'A9kbyuVSd3zOOxVpZ3x1',
    baseUrl: 'https://api.geoapify.com'
  },
  colombia: {
    baseUrl: 'https://api-colombia.com/api/v1'
  },
  pexels: {
    key: 'BTwqq2C2wgW1JIK0hKXU3IFdheqFPNSGD1k7SIKd2LKVKlq5aUY39VbF',
    baseUrl: 'https://api.pexels.com/v1'
  },
  rapidapi: {
    key: '859275b919mshc1241a9dd04ce6bp106d7ajsn9ab4f347e3b4'
  }
} as const

export const CACHE_DURATION = 24 * 60 * 60 * 1000

export const RATE_LIMITS = {
  serpapi: { maxRequests: 100, perMilliseconds: 3600000 },
  geoapify: { maxRequests: 3000, perMilliseconds: 86400000 },
  pexels: { maxRequests: 200, perMilliseconds: 3600000 }
} as const
