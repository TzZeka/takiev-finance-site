import { getTeamMembers } from "@/lib/sanity/queries";
import { getImageUrl } from "@/lib/sanity/client";
import { AboutPageClient } from "./AboutPageClient";
import type { TeamMemberDisplay } from "./AboutPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За Нас | Takiev Finance - Счетоводна Кантора",
  description: "Запознайте се с екипа и ценностите на Takiev Finance. Предлагаме първокласни счетоводни услуги и данъчни консултации с лично отношение и професионален подход.",
  alternates: {
    canonical: "https://takiev.bg/za-nas",
  },
  openGraph: {
    title: "За Нас | Takiev Finance",
    description: "Запознайте се с екипа и ценностите на Takiev Finance.",
    url: "https://takiev.bg/za-nas",
  },
};

// Revalidate every 60 seconds so updates appear without rebuilding
export const revalidate = 60;

export default async function AboutPage() {
  let teamMembers: TeamMemberDisplay[] | undefined;

  try {
    const sanityMembers = await getTeamMembers();
    if (sanityMembers && sanityMembers.length > 0) {
      teamMembers = sanityMembers.map((m) => ({
        name: m.name,
        role: m.role,
        education: m.education,
        image: getImageUrl(m.image),
        bio: m.bio,
        isLeader: m.roleType === "leader",
      }));
    }
  } catch {
    // Fallback to hardcoded data inside AboutPageClient
  }

  return <AboutPageClient teamMembers={teamMembers} />;
}
