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
}