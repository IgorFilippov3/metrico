import { ElementRef } from "@angular/core";

/**
 * Interface for Google's reCAPTCHA JavaScript API.
 *
 * Display API
 * @see {@link https://developers.google.com/recaptcha/docs/display}
 *
 * Invisible API
 * @see {@link https://developers.google.com/recaptcha/docs/invisible}
 */
export interface ReCAPTCHA {

  /**
   * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div
   * instead of a button.
   *
   * @param {string} opt_widget_id Optional widget ID, defaults to the first widget created if
   *     unspecified.
   */
  execute(opt_widget_id?: string): void;

  /**
   * Renders the container as a reCAPTCHA widget and returns the ID of the newly created widget.
   *
   * @param {ElementRef|string} container The HTML element to render the reCAPTCHA widget.  Specify
   *    either the ID of the container (string) or the DOM element itself.
   * @param {Object} parameters An object containing parameters as key=value pairs, for example,
   *    {"sitekey": "your_site_key", "theme": "light"}.
   */
  render(container: ElementRef|string, parameters: {
    sitekey: string;
    callback: (captchaVerifyValue: string) => void;
    theme: string
  }): number;

  /**
   * Resets the reCAPTCHA widget.
   *
   * @param {string} opt_widget_id Optional widget ID, defaults to the first widget created if
   *     unspecified.
   */
  reset(opt_widget_id?: string): void;

  /**
   * Gets the response for the reCAPTCHA widget. Returns a null if reCaptcha is not validated.
   *
   * @param {string} opt_widget_id Optional widget ID, defaults to the first widget created if
   *     unspecified.
   */
  getResponse(opt_widget_id?: string): string;
}