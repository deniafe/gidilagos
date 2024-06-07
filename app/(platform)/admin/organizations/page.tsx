import { getAdminOrganizations } from "@/actions/organization.actions";
import { OrganizationList } from "../_components/OrganizationList";

export default async function Organization() {

  const organizations = await getAdminOrganizations();

  return (
    <div className="flex flex-1 justify-center">
        <OrganizationList organizations={organizations} />
    </div>
  );
}
