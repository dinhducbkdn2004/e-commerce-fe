/**
 * Request Throttler
 * Giúp tránh spam requests và rate limiting
 */

class RequestThrottler {
  private requestQueue: Map<string, number> = new Map()
  private readonly minInterval = 300 // 300ms giữa các requests cho cùng endpoint

  /**
   * Kiểm tra xem có thể thực hiện request không
   * @param endpoint - API endpoint
   * @returns true nếu có thể thực hiện request
   */
  canMakeRequest(endpoint: string): boolean {
    const now = Date.now()
    const lastRequest = this.requestQueue.get(endpoint)

    if (!lastRequest || now - lastRequest >= this.minInterval) {
      this.requestQueue.set(endpoint, now)
      return true
    }

    return false
  }

  /**
   * Đợi cho đến khi có thể thực hiện request
   * @param endpoint - API endpoint
   * @returns Promise resolve khi có thể thực hiện request
   */
  async waitForAvailability(endpoint: string): Promise<void> {
    const now = Date.now()
    const lastRequest = this.requestQueue.get(endpoint)

    if (lastRequest) {
      const timeSinceLastRequest = now - lastRequest
      const waitTime = this.minInterval - timeSinceLastRequest

      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }

    this.requestQueue.set(endpoint, Date.now())
  }

  /**
   * Clear old entries (cleanup)
   */
  cleanup(): void {
    const now = Date.now()
    const expiredTime = 60000 // 1 phút

    for (const [endpoint, timestamp] of this.requestQueue.entries()) {
      if (now - timestamp > expiredTime) {
        this.requestQueue.delete(endpoint)
      }
    }
  }
}

export const requestThrottler = new RequestThrottler()

// Cleanup old entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(
    () => {
      requestThrottler.cleanup()
    },
    5 * 60 * 1000
  )
}

