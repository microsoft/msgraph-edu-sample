const BaseViewElement = require("./base-view");

class SignInViewElement extends BaseViewElement {

  static tagName = "sign-in-view";

  constructor() {

    super(SignInViewElement.tagName);

    let studentButton = this.shadowRoot.querySelector(".student-button");
    studentButton.addEventListener("click", this.handleStudentClick.bind(this));

    let teacherButton = this.shadowRoot.querySelector(".teacher-button");
    teacherButton.addEventListener("click", this.handleTeacherClick.bind(this));
  }

  initialize(parameter) {}

  unload() {}

  handleStudentClick() {

    window.location.href = "/";
  }

  handleTeacherClick() {
    
    console.log("You're a teacher.");
  }
}

customElements.define(SignInViewElement.tagName, SignInViewElement);
module.exports = SignInViewElement;
