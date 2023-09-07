import React, { useState } from "react";
import { Octokit } from "@octokit/rest";
import { getTestUrl} from "../../services/storage.service";

const AddonDetails = () => {
  const [repoInfo, setRepoInfo] = useState(null);

  const accessToken = "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";


  const fetchRepoInfo = async () => {
    const octokit = new Octokit({
      auth: accessToken,
    });

    try {
      const response = await octokit.request("GET /repos/{owner}/{repo}", {
          owner: 'alexa',
          repo: 'amazon-voice-conversion-voicy',
          headers: {
            accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
        });
        console.log(response.data)
      setRepoInfo(response.data);
    } catch (error) {
      console.error("Error fetching repository information:", error);
    }
    const url = await getTestUrl()
    window.open(url, '_blank')
    console.log(url)
  };



  return (
    <div>
      <button onClick={fetchRepoInfo}>Fetch Repository Info</button>
      {repoInfo && (
        <div>
          <h1>{repoInfo.name}</h1>
          <p>{repoInfo.description}</p>
          {/* Other repository info */}
        </div>
      )}
    </div>
  );
};

export default AddonDetails;
