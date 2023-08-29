import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import AddonCards from "../AddonCards/AddonCards";
import { useAllExtensionsFromDb } from "../../services/extension.service";

const AddonsList = () => {
  const [addons, setAddons] = useState([]);
  const { error, extensions } = useAllExtensionsFromDb();

  console.log(error);
  console.log(extensions);
  useEffect(() => {
    async function fetchAddons() {
      const accessToken =
        "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";
      const octokit = new Octokit({ auth: accessToken });

      try {
        // Fetch data from GitHub for each add-on repository
        const repos = ["owner/repo1", "owner/repo2", "owner/repo3"]; // Replace with your repository names
        const fetchedAddons = await Promise.all(
          repos.map(async (repo) => {
            const response = await octokit.repos.get({ owner: "owner", repo });
            return response.data;
          })
        );
        setAddons(fetchedAddons);
      } catch (error) {
        console.error("Error fetching addons:", error);
      }
    }

    fetchAddons();
  }, []);

  return (
    <div>
      {addons.map((addon) => (
        <AddonCards
          key={addon.id}
          title={addon.name}
          description={addon.description}
          imageUrl={addon.avatar_url} // Replace with the appropriate property from GitHub response
          author={0}
          date={addon.updated_at}
          rating={0}
        />
      ))}
    </div>
  );
};

export default AddonsList;
