import * as React from "react";
//@ts-ignore
import Popout from "react-popout";

import { CrowdinLoginProps, CrowdinLoginState } from "../";
import CrowdinLoginButton from "./CrowdinLoginButton";

export default class CrowdinLoginComponent extends React.Component<
  CrowdinLoginProps,
  CrowdinLoginState | any
> {
  state = {
    openModal: false
  };

  handleLoginClick = () => {
    // window.open("https://accounts.crowdin.com/oauth/authorize", "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
    this.setState({
      openModal: true
    });
  };

  render() {
    const { buttonTheme, className, children } = this.props;
    const { openModal } = this.state;

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
            url="https://accounts.crowdin.com/oauth/authorize"
            title="Sign in to CrowdIn"
            onClosing={console.log}
            options={{ height: "470px" }}
          />
        )}
      </>
    );
  }
}
