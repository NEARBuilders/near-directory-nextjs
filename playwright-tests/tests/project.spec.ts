import { test, expect } from "@playwright/test";

test.describe("Project Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/project/ref-finance");
  });

  test("should have title", async ({ page }) => {
    await page.goto("/project/ref-finance");

    // Expect a heading to be visible
    await expect(
      page.getByRole("heading", { name: "Ref Finance", exact: true }),
    ).toBeVisible();
  });

  test("tags should redirect to category page", async ({ page }) => {
    const tag = page.getByRole("link", { name: "Aurora", exact: true });
    await expect(tag).toBeVisible();
    await tag.click();
    const categoryPageHeading = page.locator("h2").first();
    await expect(categoryPageHeading).toContainText("Aurora");
  });

  test("related projects should redirect to project page", async ({ page }) => {
    const relatedProjects = page.locator("div.discover-more");
    await expect(relatedProjects).toBeVisible();

    const firstProjectLink = relatedProjects.locator("a").first();
    await expect(firstProjectLink).toBeVisible();

    await firstProjectLink.click();
    const projectPageHeading = page.locator("h2").first();
    await expect(projectPageHeading).toBeVisible();
  });
});
