import { Component } from "./component";

export abstract class Flyout extends Component {


    
    /**
     * Show modal at x y coordinate of a screen.
     *
     * @param {*} x axis position of screen
     * @param {*} y axis position of screen
     * @memberof CreateStudyGroupViewElement
     */
    showAt(x, y) {
        document.body.appendChild(this);

        let screenWidth = document.documentElement.scrollWidth;
        x = Math.min(x, screenWidth - this.flyoutPanel.clientWidth);

        this.flyoutPanel.style.marginLeft = `${x}px`;
        this.flyoutPanel.style.marginTop = `${y}px`;
    }

    /**
     * Dismiss modal if mouse clicks another element
     *
     * @param {*} e
     * @memberof CreateStudyGroupViewElement
     */
    handleRootClick(e: any) {
        if (e.srcElement == this._lightDismissPanel) {
            this.remove();
        }
    }
}