import { Provider } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationsService } from "@app/_core/services/notifications.service";
import { PageResolver } from "../resolvers/page.resolver";
import { PageIdResolver } from "../resolvers/pageId.resolver";
import { PagesApiService } from "../services/pages-api.service";

export function secondsToMiliseconds(seconds: number): number {
  return Math.round(seconds * 1000);
}

export function createPageIdResolver(errorText: string, redirectRoute: string): Provider {
  return {
    provide: "pageIdResolver",
    deps: [NotificationsService, Router],
    useFactory: (n: NotificationsService, r: Router) => {
      return new PageIdResolver(n, r, errorText, redirectRoute);
    }
  }
}

export function createPageResolver(redirectRoute: string): Provider {
  return {
    provide: "pageResolver",
    deps: [NotificationsService, PagesApiService, Router],
    useFactory: (n: NotificationsService, p: PagesApiService, r: Router) => {
      return new PageResolver(n, p, r, redirectRoute);
    }
  }
}

export const isValidURL = (value: string): boolean => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(value);
};

export async function copyToClipboard(value: string): Promise<void> {
  const txtArea = document.createElement("textarea");
    txtArea.value = value;
    txtArea.style.top = "0";
    txtArea.style.left = "0";
    txtArea.style.position = "fixed";

    document.body.append(txtArea);
    txtArea.focus();
    txtArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error(err);
      document.body.removeChild(txtArea);
    }
    document.body.removeChild(txtArea);
}

export function isEmailValid(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function currentYear(): number {
  return new Date().getFullYear();
}