import { OrganizationDetails } from '@/components/forms/OrganizationDetails'

const Page = async ({
  // searchParams,
}: {
  // searchParams: { plan: Plan; state: string; code: string }
}) => {
  
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] p-4 rounded-xl">
        <h1 className="text-4xl mb-8"> Create An Organization</h1>
        <OrganizationDetails
          // data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
          title='Create An Organization'
          description='Create an organization to get started with creating your event. You can edit organization settings
          later.'
        />
      </div>
    </div>
  )
}

export default Page