import { getAllOrganizations } from "@/actions/organization.actions";
import { OrganizationList } from "./_components/OrganizationList";

export default async function Organization() {

  const organizations = await getAllOrganizations();

  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-muted/40">
      <div className="flex flex-col w-3/4 lg:w-1/2 sm:gap-4 sm:py-4 sm:pl-14">
        <OrganizationList organizations={organizations} />
      </div>
    </div>
  );
}
