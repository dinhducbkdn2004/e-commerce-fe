import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { Comment } from '@/types/product'
import { MessageCircle, Reply, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface CommentListProps {
  productId: string
  initialComments?: Comment[]
}

export default function CommentList({
  productId,
  initialComments = [],
}: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [username, setUsername] = useLocalStorage('comment-username', '')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      toast.error('Vui lòng nhập tên của bạn')
      return
    }

    if (!newComment.trim()) {
      toast.error('Vui lòng nhập nội dung bình luận')
      return
    }

    setIsSubmitting(true)

    try {
      const comment: Comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        username: username.trim(),
        content: newComment.trim(),
        date: new Date().toISOString(),
        replies: [],
      }

      // Optimistic update
      setComments(prev => [comment, ...prev])
      setNewComment('')

      toast.success('Đã thêm bình luận thành công!')

      // Here you would typically send to your API
      // await commentService.addComment(productId, comment)
    } catch (error) {
      console.error('Error adding comment:', error)
      toast.error('Có lỗi xảy ra khi thêm bình luận')

      // Revert optimistic update on error
      setComments(prev => prev.slice(1))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentCommentId: string) => {
    if (!username.trim()) {
      toast.error('Vui lòng nhập tên của bạn')
      return
    }

    if (!replyText.trim()) {
      toast.error('Vui lòng nhập nội dung phản hồi')
      return
    }

    setIsSubmitting(true)

    try {
      const reply: Comment = {
        id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        username: username.trim(),
        content: replyText.trim(),
        date: new Date().toISOString(),
        replies: [],
      }

      // Optimistic update
      setComments(prev =>
        prev.map(comment =>
          comment.id === parentCommentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        )
      )

      setReplyText('')
      setReplyingTo(null)
      toast.success('Đã thêm phản hồi thành công!')

      // Here you would typically send to your API
      // await commentService.addReply(parentCommentId, reply)
    } catch (error) {
      console.error('Error adding reply:', error)
      toast.error('Có lỗi xảy ra khi thêm phản hồi')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return 'Vừa xong'
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} phút trước`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} giờ trước`
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} ngày trước`
    } else {
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  }

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment
    isReply?: boolean
  }) => (
    <Card className={isReply ? 'ml-8 mt-3' : ''}>
      <CardContent className='p-4'>
        <div className='flex items-start gap-3'>
          <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0'>
            <User className='w-4 h-4 text-muted-foreground' />
          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <span className='font-medium text-sm'>{comment.username}</span>
              <span className='text-xs text-muted-foreground'>
                {formatDate(comment.date)}
              </span>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap'>
              {comment.content}
            </p>
            {!isReply && (
              <div className='mt-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                  className='text-xs text-muted-foreground hover:text-foreground'
                >
                  <Reply className='w-3 h-3 mr-1' />
                  Phản hồi
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Reply Form */}
        {replyingTo === comment.id && (
          <div className='mt-4 ml-11 space-y-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div>
                <Label htmlFor='reply-username' className='text-xs'>
                  Tên của bạn
                </Label>
                <Input
                  id='reply-username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Nhập tên của bạn'
                  className='h-8'
                />
              </div>
            </div>
            <div>
              <Label htmlFor='reply-content' className='text-xs'>
                Phản hồi
              </Label>
              <Textarea
                id='reply-content'
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder='Viết phản hồi của bạn...'
                className='min-h-[80px]'
              />
            </div>
            <div className='flex gap-2'>
              <Button
                onClick={() => handleSubmitReply(comment.id)}
                disabled={isSubmitting || !replyText.trim() || !username.trim()}
                size='sm'
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi'}
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setReplyingTo(null)
                  setReplyText('')
                }}
                size='sm'
              >
                Hủy
              </Button>
            </div>
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className='mt-4'>
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className='space-y-6'>
      {/* Comment Form */}
      <Card>
        <CardContent className='p-4'>
          <h3 className='font-semibold mb-4 flex items-center gap-2'>
            <MessageCircle className='w-4 h-4' />
            Viết bình luận
          </h3>
          <form onSubmit={handleSubmitComment} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='username'>Tên của bạn *</Label>
                <Input
                  id='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Nhập tên của bạn'
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor='comment'>Bình luận *</Label>
              <Textarea
                id='comment'
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder='Chia sẻ trải nghiệm của bạn về sản phẩm này...'
                className='min-h-[100px]'
                required
              />
            </div>
            <Button
              type='submit'
              disabled={isSubmitting || !newComment.trim() || !username.trim()}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className='space-y-4'>
        <h3 className='font-semibold flex items-center gap-2'>
          <MessageCircle className='w-4 h-4' />
          Bình luận ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <div className='text-center py-12'>
            <MessageCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <p className='text-muted-foreground'>Chưa có bình luận nào</p>
            <p className='text-sm text-muted-foreground'>
              Hãy là người đầu tiên chia sẻ trải nghiệm!
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

