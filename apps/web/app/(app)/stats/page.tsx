import { Stats } from "./Stats";
import { checkAndRedirectForUpgrade } from "@/utils/premium/check-and-redirect-for-upgrade";

export default async function StatsPage() {
  await checkAndRedirectForUpgrade();
  return <Stats />;
}
