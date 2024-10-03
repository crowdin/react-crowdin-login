import React, { useEffect, useState, useCallback } from "react";
import pkceChallenge from "pkce-challenge";
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
  const [codeVerifier, setCodeVerifier] = useState<string>("");

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
        window.onmessage = (event) => {
          const { type, data: code } = event.data;
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
      }
    };

    initializeProcess();
  }, [popup, authCallback, codeVerifier]);

  const buildCodeRequestURL = useCallback(async () => {
    const uri = encodeURIComponent(redirectUri || window.location.href);
    const {code_verifier, code_challenge} = await pkceChallenge();
    setCodeVerifier(code_verifier);

    return `https://accounts.crowdin.com/oauth/authorize?client_id=${clientId}&redirect_uri=${uri}&response_type=code&scope=${scope}&code_challenge=${code_challenge}&code_challenge_method=S256`;
  }, [clientId, redirectUri, scope]);

  const sendTokenRequest = useCallback(
  (code: string) => {
    const client_id = clientId;
    const redirect_uri = redirectUri || window.location.href;

    return fetch(
      `https://cors-anywhere.herokuapp.com/https://accounts.crowdin.com/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id,
          redirect_uri,
          grant_type: "authorization_code",
          code,
          code_verifier: codeVerifier,
        }),
      }
    );
  }, [clientId, redirectUri, codeVerifier]);

  const handleLoginClick = async () => {
    const url = await buildCodeRequestURL();
    const newPopup = openWindow({
      url,
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
