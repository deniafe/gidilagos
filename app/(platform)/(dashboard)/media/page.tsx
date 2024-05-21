import { getAllMedia } from '@/actions/media.action'
import MediaComponent from '@/components/media'
import { Media } from '@/lib/types'
import { currentUser } from '@clerk/nextjs/server'

type Props = {
  params: { subaccountId: string }
}

const MediaPage = async ({ params }: Props) => { 

  const user = currentUser()

  // const data = await getAllMedia(user.id)
  const data: Media[] = await getAllMedia()

  return (
    <MediaComponent
      data={data}
      userId={'a'}
    />
  )
}

export default MediaPage