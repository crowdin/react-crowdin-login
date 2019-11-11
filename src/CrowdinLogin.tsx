import * as React from "react";
import { parse } from "query-string";
//@ts-ignore
import Popout from "react-popout";

import { CrowdinLoginProps, CrowdinLoginState } from "../";
import CrowdinLoginButton from "./CrowdinLoginButton";

export default class CrowdinLoginComponent extends React.Component<
  CrowdinLoginProps,
  CrowdinLoginState
> {
  constructor(props: CrowdinLoginProps) {
    super(props);

    this.state = {
      openModal: false,
      code: ""
    };
  }

  componentDidMount() {
    if (window.opener) {
      const { code } = parse(window.location.search);
      window.opener.postMessage(
        {
          type: "code",
          data: code
        },
        window.origin
      );
    } else {
      window.onmessage = ({ data: { type, data } }: any) => {
        if (type === "code") {
          this.sendTokenRequest(data).then(data => {
            console.log(data);
            this.setState({
              openModal: false
            });
          });
        }
      };
    }
  }

  buildCodeRequestURL = () => {
    const { clientId, redirectUri, scope, domain } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://accounts.crowdin.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${uri}&response_type=code&scope=${scope}&domain=${domain}`;
  };

  buildTokenRequestURL = code => {
    const { clientId, clientSecret, redirectUri, domain } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://accounts.crowdin.com/oauth/token/?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${uri}&grant_type=authorization_code&domain=${domain}&code=${code}`;
  };

  sendTokenRequest = code =>
    fetch(this.buildTokenRequestURL(code), { method: "POST" });

  handleLoginClick = () => {
    this.setState({
      openModal: true
    });
  };

  render() {
    const { buttonTheme, className, children } = this.props;
    const { openModal } = this.state;

    console.log(this.state);

    const button = children ? (
      <div onClick={console.log}>{children}</div>
    ) : (
      <CrowdinLoginButton
        buttonTheme={buttonTheme || "light"}
        buttonClassName={className}
        onClick={this.handleLoginClick}
      />
    );

    return (
      <>
        {button}
        {openModal && (
          <Popout
            url={this.buildCodeRequestURL()}
            title="Sign in to CrowdIn"
            onClosing={console.log}
            options={{ height: "470px" }}
          />
        )}
      </>
    );
  }
}
