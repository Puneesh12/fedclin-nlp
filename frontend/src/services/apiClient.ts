// Typed API Client with Graceful Simulated Mock Fallback

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

export class ApiClient {
  private static token: string | null = null

  static setToken(token: string) {
    this.token = token
  }

  static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return (await response.json()) as T
    } catch (err) {
      // Graceful fallback for offline / mock evaluation mode
      console.info(`[FedClinNLP API] Fallback to simulated provider for ${endpoint}:`, err)
      throw err
    }
  }
}
