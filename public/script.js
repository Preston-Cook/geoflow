"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const { hostname } = window.location;
        const [subDomain, domain] = hostname.split(/\.(.*)/s);
        // if (domain !== 'azurewebsites.net') {
        //   return;
        // }
        const visitedTimestamp = localStorage.getItem('visitedTimestamp');
        if (visitedTimestamp &&
            Math.abs(Date.now() - Date.parse(visitedTimestamp)) / 36e5 < 1) {
            return;
        }
        localStorage.setItem('visitedTimestamp', new Date().toUTCString());
        for (let i = 0; i < 3; i++) {
            const res = yield fetch('http://localhost:3000/script.js');
            const data = yield res.text();
            console.log(data);
            if (res.ok) {
                return;
            }
        }
    });
})();
