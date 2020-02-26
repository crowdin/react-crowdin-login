import * as React from "react";

import { CrowdinLoginProps, CrowdinLoginState } from "../";
import CrowdinLoginButton from "./CrowdinLoginButton";
import { openWindow, observeWindow } from "./services/window";

export default class CrowdinLoginComponent extends React.Component<
  CrowdinLoginProps,
  CrowdinLoginState
> {
  constructor(props: CrowdinLoginProps) {
    super(props);

    this.state = {
      isCompleted: false
    };
  }

  componentDidMount() {
    this.initializeProcess();
  }

  initializeProcess = () => {
    if (window.opener) {
      const [match, code] =
        window.location.search.match(/.*code=([^&|\n|\t\s]+)/) || [];
      window.opener.postMessage(
        {
          type: "code",
          data: code
        },
        window.origin
      );
    } else {
      const { authCallback } = this.props;
      window.onmessage = ({ data: { type, data } }: any) => {
        if (type === "code") {
          this.sendTokenRequest(data)
            .then(res => res.json())
            .then(data => {
              const { popup } = this.state;
              this.setState(
                {
                  isCompleted: true
                },
                () => {
                  authCallback && authCallback(undefined, data);
                  popup && popup.close();
                }
              );
            });
        }
      };
    }
  };

  buildCodeRequestURL = () => {
    const { clientId, redirectUri, scope } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://accounts.crowdin.com/oauth/authorize?client_id=${clientId}&redirect_uri=${uri}&response_type=code&scope=${scope}`;
  };

  sendTokenRequest = (code: string) => {
    const {
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri
    } = this.props;
    const redirect_uri = redirectUri || window.location.href;
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://accounts.crowdin.com/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          redirect_uri,
          grant_type: "authorization_code",
          code
        })
      }
    );
  };

  handleLoginClick = () => {
    const popup = openWindow({
      url: this.buildCodeRequestURL(),
      name: "Log in with Crowdin"
    });

    if (popup) {
      observeWindow({ popup, onClose: this.handleClosingPopup });
      this.setState({
        popup
      });
    }
  };

  handleClosingPopup = () => {
    const { authCallback } = this.props;
    const { isCompleted } = this.state;
    if (!isCompleted) {
      authCallback && authCallback("User closed OAuth popup");
    }
  };

  render() {
    const { buttonTheme, className } = this.props;

    return (
      <>
        <CrowdinLoginButton
          buttonTheme={buttonTheme || "light"}
          buttonClassName={className}
          onClick={this.handleLoginClick}
        />
      </>
    );
  }
}
