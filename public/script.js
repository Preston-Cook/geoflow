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
        const visitedTimestamp = localStorage.getItem('visitedTimestamp');
        if (visitedTimestamp &&
            Math.abs(Date.now() - Date.parse(visitedTimestamp)) / 36e5 < 1) {
            return;
        }
        localStorage.setItem('visitedTimestamp', new Date().toUTCString());
        const res = yield fetch('https://api.ipify.org/?format=json');
        const data = yield res.json();
        const { ip } = data;
        yield fetch('http://localhost:3000/api/geoflow', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip }),
        });
    });
})();
