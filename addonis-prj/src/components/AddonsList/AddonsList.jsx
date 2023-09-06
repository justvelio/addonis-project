import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import AddonCards from "../AddonCards/AddonCards";
import { useAllExtensionsFromDb } from "../../services/extension.service";

const AddonsList = () => {
  const [addons, setAddons] = useState([]);
  const { error, extensions, loading } = useAllExtensionsFromDb();

  useEffect(() => {
    const accessToken =
      "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";
    const octokit = new Octokit({
      auth: accessToken,
    });
    if (loading || !extensions) {
      return;
    }
    const formatData = Object.values(extensions).map(
      async ({ repoOwner: owner, repoName: repo, extensionName, date, authorName, imageUrl, rating, downloadUrl }) => {
        const response = await octokit.request("GET /repos/{owner}/{repo}", {
          owner,
          repo,
          headers: {
            accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        return {
            title: extensionName,
            description: response.data.description, // from db
            imageUrl,
            rating,
            date,
            authorName,
            issuesCount: response.data.open_issues,
            downloadUrl,
        };
      }
    );
    Promise.all(formatData)
    .then((result) => {
    //   console.log(result);
      setAddons(result)
    });
    // console.log(formatData);
  }, [extensions, loading]);
  
// console.log(addons)

  return (
    <div>
      {addons.map((addon) => (
        <AddonCards
          key={addon.title}
          {...addon}
        />
      ))}
    </div>
  );
};

export default AddonsList;
