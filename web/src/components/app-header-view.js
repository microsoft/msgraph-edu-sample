  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const BaseViewElement = require("./base-view");

class AppHeaderViewElement extends BaseViewElement {
  static tagName = "app-header-view";

  constructor() {
      super(AppHeaderViewElement.tagName);

      let hamburgerButton = this.shadowRoot.querySelector(".hamburger-button");
      hamburgerButton.addEventListener(
          "click",
          this.handleHamburgerClick.bind(this)
      );
  }



  /**
   * Redirect to origin landing page.
   *
   * @memberof AppHeaderViewElement
   */
  handleHamburgerClick() {
      window.location.href = "./";
  }
}

customElements.define(AppHeaderViewElement.tagName, AppHeaderViewElement);
module.exports = AppHeaderViewElement;
