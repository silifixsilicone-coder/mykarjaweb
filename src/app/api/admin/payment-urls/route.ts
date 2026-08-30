import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings, getEditions, saveEdition } from "@/lib/firestoreDb";
import { validateUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const editions = await getEditions();

    const marathiEdition = editions.find((e) => e.language === "MARATHI");
    const hindiEdition = editions.find((e) => e.language === "HINDI");
    const englishEdition = editions.find((e) => e.language === "ENGLISH");

    return NextResponse.json({
      navbarCtaText: settings.navbarCtaText || "eBook घ्या",
      navbarPaymentUrl: settings.navbarPaymentUrl || "",
      heroCtaText: settings.heroCta || "आता eBook घ्या",
      heroPaymentUrl: settings.heroPaymentUrl || "",
      marathiPaymentUrl: marathiEdition?.paymentUrl || "",
      hindiPaymentUrl: hindiEdition?.paymentUrl || "",
      englishPaymentUrl: englishEdition?.paymentUrl || "",
    });
  } catch (error) {
    return NextResponse.json({
      navbarCtaText: "eBook घ्या",
      navbarPaymentUrl: "",
      heroCtaText: "आता eBook घ्या",
      heroPaymentUrl: "",
      marathiPaymentUrl: "",
      hindiPaymentUrl: "",
      englishPaymentUrl: "",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      navbarCtaText,
      navbarPaymentUrl,
      heroCtaText,
      heroPaymentUrl,
      marathiPaymentUrl,
      hindiPaymentUrl,
      englishPaymentUrl,
    } = body;

    const urlsToValidate = [
      { name: "Navbar", url: navbarPaymentUrl },
      { name: "Hero", url: heroPaymentUrl },
      { name: "Marathi", url: marathiPaymentUrl },
      { name: "Hindi", url: hindiPaymentUrl },
      { name: "English", url: englishPaymentUrl },
    ];

    for (const item of urlsToValidate) {
      if (item.url && item.url.trim() !== "" && !validateUrl(item.url)) {
        return NextResponse.json(
          { error: `Invalid ${item.name} Payment URL. Must start with http:// or https://` },
          { status: 400 }
        );
      }
    }

    // Update Firestore SiteSettings
    await updateSiteSettings({
      navbarCtaText: navbarCtaText ?? "eBook घ्या",
      navbarPaymentUrl: navbarPaymentUrl ?? "",
      heroCta: heroCtaText ?? "आता eBook घ्या",
      heroPaymentUrl: heroPaymentUrl ?? "",
    });

    // Update Firestore Edition URLs
    const editions = await getEditions();
    const marathiEdition = editions.find((e) => e.language === "MARATHI");
    const hindiEdition = editions.find((e) => e.language === "HINDI");
    const englishEdition = editions.find((e) => e.language === "ENGLISH");

    if (marathiPaymentUrl !== undefined && marathiEdition) {
      await saveEdition({ ...marathiEdition, paymentUrl: marathiPaymentUrl });
    }

    if (hindiPaymentUrl !== undefined && hindiEdition) {
      await saveEdition({ ...hindiEdition, paymentUrl: hindiPaymentUrl });
    }

    if (englishPaymentUrl !== undefined && englishEdition) {
      await saveEdition({ ...englishEdition, paymentUrl: englishPaymentUrl });
    }

    return NextResponse.json({ success: true, message: "Purchase links & payment URLs updated successfully in Firestore" });
  } catch (error) {
    console.error("Failed to update purchase links:", error);
    return NextResponse.json({ error: "Failed to update purchase links" }, { status: 500 });
  }
}
