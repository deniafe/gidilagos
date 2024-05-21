import { OrganizationDetails } from '@/components/forms/OrganizationDetails'
// import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
// import { currentUser } from '@clerk/nextjs'
// import { Plan } from '@prisma/client'
// import { redirect } from 'next/navigation'
// import React from 'react'

const Page = async ({
  // searchParams,
}: {
  // searchParams: { plan: Plan; state: string; code: string }
}) => {
  // const agencyId = await verifyAndAcceptInvitation()
  // console.log('This is the agency Id', agencyId)

  // //get the users details
  // const user = await getAuthUserDetails()

  // if (agencyId) {
  //   if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') {
  //     return redirect('/subaccount')
  //   } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
  //     if (searchParams.plan) {
  //       return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
  //     }
  //     if (searchParams.state) {
  //       const statePath = searchParams.state.split('___')[0]
  //       const stateAgencyId = searchParams.state.split('___')[1]
  //       if (!stateAgencyId) return <div>Not authorized</div>
  //       return redirect(
  //         `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
  //       )
  //     } else return redirect(`/agency/${agencyId}`)
  //   } else {
  //     return <div>Not authorized</div>
  //   }
  // }

  // const authUser = await currentUser()
  
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl mb-8"> Create An Organization</h1>
        <OrganizationDetails
          // data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
          title='Organization Information'
          description='Lets create an organization for you business. You can edit organization settings
          later from the organization settings tab.'
        />
      </div>
    </div>
  )
}

export default Page