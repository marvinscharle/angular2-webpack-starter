import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

export class ComponentLoader {

    /**
     * Uncaught Error: Cannot find module '/app/Component1/Component1'.
     *
     * ComponentLoader.loadComponent1 = function (componentName) {
	        var path = "/app/" + componentName + "/" + componentName;
	        return Observable_1.Observable.create(function (observer) {
	            __webpack_require__.e(1, function (require) {
                var response = __webpack_require__(366)(path);
                console.log(response);
            });
         });
      };
     *
     * ==> Not supported
     */
    public static loadComponent1(componentName:string):Observable<Function> {
        var path = `/app/${componentName}/${componentName}`;

        return Observable.create((observer:Subscriber<Function>) => {
            require.ensure([], (require) => {
                var response = require(path);
                console.log(response);
            })
        });
    }


    /**
     * Uncaught Error: Cannot find module '../Component1/Component1'.
     *
     */
    public static loadComponent2(componentName:string):Observable<Function> {
        var path = `../${componentName}/${componentName}`;

        return Observable.create((observer:Subscriber<Function>) => {
            require.ensure([], (require) => {
                var response = require(path);
                console.log(response);
            })
        });
    }

    /**
     * TypeError: __webpack_require__(...).ensure is not a function
     *
     */
    public static loadComponent3(componentName:string):Observable<Function> {
        var path = `../${componentName}/${componentName}`;

        return Observable.create((observer:Subscriber<Function>) => {
            require.ensure([path], (require) => {
                var response = require(path);
                console.log(response);
            })
        });
    }

    /**
     * Works
     */
    public static loadComponent4(componentName:string):Observable<Function> {
        var path = `../${componentName}/${componentName}`;

        return Observable.create((observer:Subscriber<Function>) => {
            require.ensure([], (require) => {
                var response = require("../Component1/Component1");
                console.log(response);
            })
        });
    }

    /**
     * Suggestion of taurose: Putting var path directly into require(..)
     *
     * => Crashes with a warning:
     *      Critical dependencies:
     *      50:12-19 require function is used in a way in which dependencies cannot be statically extracted
     *      @ ./src/app/ComponentLoader/ComponentLoader.ts 50:12-19
     */
    public static loadComponent5(componentName:string):Observable<Function> {
        console.log("loadComponent5");
        return Observable.create((observer:Subscriber<Function>) => {
            require.ensure([], (require) => {
                var response = require(`../${componentName}/${componentName}`);
                console.log(response);
            })
        });
    }

    /**
     * Suggestion of taurose: Putting components to load in a subdirectory
     *
     * => Works
     */
    public static loadComponent6(componentName:string):Observable<Function> {
        console.log("loadComponent6");
        return Observable.create((observer:Subscriber<Function>) => {
            require.ensure([], (require) => {
                var response = require(`../components/${componentName}/${componentName}`);
                console.log(response);
            })
        });
    }
}