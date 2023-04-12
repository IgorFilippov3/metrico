import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { InjectionStatus } from "@app/_core/models/injection-status.enum";
import { InjectorServiceParams } from "@app/_core/models/injector-service-params.model";
import { Observable } from "rxjs";
import { InjectorServiceResult } from "@app/_core/models/injector-service-result.model";

@Injectable()
export class ScriptInjectorService {

  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public inject<T>(params: InjectorServiceParams): Observable<InjectorServiceResult<T>> {
    const { src, globalVarName, globalVarNameMethods, async, defer, requestTimeout } = params;

    return new Observable(observer => {
      const head: HTMLHeadElement | null = document.querySelector("head");

      if (head === null) {
        observer.error(InjectorServiceResult.error(
          InjectionStatus.ERROR, "Unable to find <head> element on page"));
        observer.complete();
      }

      const scripts: HTMLScriptElement[] = Array.from(head.querySelectorAll("script"));
      const isScriptToInjectAlreadyAppended: boolean = scripts.some(script => script.src === src);

      if (!isScriptToInjectAlreadyAppended) {
        const INTERVAL: number = 100;
        const REQUEST_TIMEOUT: number = requestTimeout && requestTimeout > 0 ? requestTimeout : 3000;

        const script: HTMLScriptElement = this.renderer.createElement("script");
        script.src = src;
        script.async = Boolean(async);
        script.defer = Boolean(defer);
        this.renderer.appendChild(head, script);

        let timeoutTimer: number = 0;

        const onloadTimer = setInterval(() => {
          let loaded: boolean = false;
          timeoutTimer += INTERVAL;

          if (typeof (<any>window)[globalVarName] !== "undefined") {

            if (globalVarNameMethods && globalVarNameMethods.length) {

              const isAllMethodsLoaded: boolean = globalVarNameMethods.every((method: string) => {
                return typeof (<any>window)[globalVarName][method] !== "undefined";
              });

              if (isAllMethodsLoaded) {
                loaded = true;
              }
            } else {
              loaded = true;
            }
          }

          if (loaded) {
            clearInterval(onloadTimer);
            observer.next(
              InjectorServiceResult.success<T>(
                InjectionStatus.LOADED,
                (<any>window)[globalVarName] as T
              )
            );
            observer.complete();
          }

          if (timeoutTimer >= REQUEST_TIMEOUT) {
            clearInterval(onloadTimer);
            this.renderer.removeChild(head, script);
            observer.error(
              InjectorServiceResult.error(
                InjectionStatus.REQUEST_TIMED_OUT,
                "Unable to fetch data"
              )
            );
            observer.complete();
          }
        }, INTERVAL);
      } else {
        observer.next(
          InjectorServiceResult.success(
            InjectionStatus.ALREADY_ADDED, 
            (<any>window)[globalVarName] as T
          )
        );
        observer.complete();
      }
    });
  }
}