import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='flex items-center justify-center min-h-[400px] p-4'>
          <Card className='w-full max-w-md'>
            <CardContent className='p-6 text-center'>
              <AlertTriangle className='w-12 h-12 text-destructive mx-auto mb-4' />
              <h2 className='text-xl font-semibold mb-2'>Có lỗi xảy ra</h2>
              <p className='text-muted-foreground mb-4'>
                Xin lỗi, đã có lỗi xảy ra khi tải nội dung này. Vui lòng thử
                lại.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='text-left mb-4 p-3 bg-muted rounded text-sm'>
                  <summary className='cursor-pointer font-medium'>
                    Chi tiết lỗi
                  </summary>
                  <pre className='mt-2 whitespace-pre-wrap text-xs'>
                    {this.state.error.message}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <div className='flex gap-2 justify-center'>
                <Button
                  onClick={this.handleRetry}
                  className='flex items-center gap-2'
                >
                  <RefreshCw className='w-4 h-4' />
                  Thử lại
                </Button>
                <Button
                  variant='outline'
                  onClick={() => window.location.reload()}
                >
                  Tải lại trang
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

