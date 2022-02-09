import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
const Popup = () => {
  const [api, setApi] = useState("");
  useEffect(() => {
    console.log(api);
  }, [api]);

  const sendToContents = (apiKey: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      for (const tab of tabs) {
        if (tab.id != null) {
          chrome.tabs.sendMessage(
            tab.id,
            JSON.stringify({ api: apiKey }),
            function (response) {}
          );
        }
      }
    });
  };

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-4">Github Storypoints Tool</p>

      <input
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        id="github-access-token"
        autoComplete="github-access-token"
        placeholder="Github PersonalAccessToken"
        value={api}
        onChange={(e) => {
          setApi(e.target.value);
        }}
      />
      <p className="mb-4">
        https://github.com/projectId/repoId/milestonesページで各マイルストーンのストーリーポイントを確認できます(PersonalAccessTokenはローカルのストレージに保存されません)
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => {
          sendToContents(api);
        }}
      >
        マイルストーンを更新
      </button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
