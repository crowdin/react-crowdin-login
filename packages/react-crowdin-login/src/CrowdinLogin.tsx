import React, { useEffect, useState, useCallback } from "react";
import { openWindow, observeWindow } from "./services/window";
import CrowdinLoginButton from "./CrowdinLoginButton";
import { CrowdinLoginProps } from "../";

const CrowdinLoginComponent: React.FC<CrowdinLoginProps> = ({
  clientId,
  redirectUri,
  scope,
  authCallback,
  buttonTheme,
  className,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [popup, setPopup] = useState<Window | null>(null);

  useEffect(() => {
    const initializeProcess = () => {
      if (window.opener) {
        const [match, code] =
        window.location.search.match(/.*code=([^&|\n|\t\s]+)/) || [];
        window.opener.postMessage(
          {
            type: "code",
            data: code,
          },
          window.origin
        );
      } else {
        const messageHandler = ({ data }: MessageEvent) => {
          const { type, data: code } = data;
          if (type === "code") {
            sendTokenRequest(code)
              .then((res) => res.json())
              .then((data) => {
                setIsCompleted(true);
                authCallback?.(undefined, data);
                popup?.close();
              });
          }
        };

        window.onmessage = messageHandler;

        return () => {
          window.removeEventListener("message", messageHandler);
        };
      }
    };

    initializeProcess();
  }, [popup, authCallback]);

  const buildCodeRequestURL = useCallback(() => {
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://accounts.crowdin.com/oauth/authorize?client_id=${clientId}&redirect_uri=${uri}&response_type=code&scope=${scope}`;
  }, [clientId, redirectUri, scope]);

  const sendTokenRequest = useCallback((code: string) => {
    const client_id = clientId;
    const client_secret = ""; // Assuming client secret is being passed as prop or retrieved from secure storage
    const redirect_uri = redirectUri || window.location.href;

    return fetch(
      `https://corsanywhere.herokuapp.com/https://accounts.crowdin.com/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          redirect_uri,
          grant_type: "authorization_code",
          code,
        }),
      }
    );
  }, [clientId, redirectUri]);

  const handleLoginClick = () => {
    const newPopup = openWindow({
      url: buildCodeRequestURL(),
      name: "Log in with Crowdin",
    });

    if (newPopup) {
      observeWindow({ popup: newPopup, onClose: handleClosingPopup });
      setPopup(newPopup);
    }
  };

  const handleClosingPopup = () => {
    if (!isCompleted) {
      authCallback?.("User closed OAuth popup");
    }
  };

  return (
    <CrowdinLoginButton
      buttonTheme={buttonTheme || "light"}
      buttonClassName={className}
      onClick={handleLoginClick}
    />
  );
};

export default CrowdinLoginComponent;
