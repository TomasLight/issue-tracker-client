import { put, takeEvery, takeLatest, throttle } from "@redux-saga/core/effects";
import { AppAction } from "app-redux-utils";
import { IWatcher } from "./IWatcher";
import { WatchFunction } from "./WatchFunction";

export abstract class WatcherBase implements IWatcher {
    public watchFunctions: WatchFunction[];

    protected constructor() {
        this.watchFunctions = [];
    }

    private getSagaWithCallbackAction(saga: (action: AppAction) => void): (action: AppAction) => void {
        return function* (action: AppAction) {
            yield saga(action);

            if (typeof action.callbackAction === "function") {
                yield put(action.callbackAction());
            }
        };
    }

    protected watchLatest(actionType: string, saga: (action: AppAction) => void) {
        const sagaWithCallbackAction = this.getSagaWithCallbackAction(saga);
        this.watchFunctions.push(
            function* () {
                yield takeLatest(actionType, sagaWithCallbackAction);
            }
        );
    }

    protected watchEvery(actionType: string, saga: (action: AppAction) => void) {
        const sagaWithCallbackAction = this.getSagaWithCallbackAction(saga);
        this.watchFunctions.push(
            function* () {
                yield takeEvery(actionType, sagaWithCallbackAction);
            }
        );
    }

    protected watchThrottle(
        actionType: string,
        saga: (action: AppAction) => void,
        throttleInMilliseconds: number = 1000) {

        const sagaWithCallbackAction = this.getSagaWithCallbackAction(saga);
        this.watchFunctions.push(
            function* () {
                yield throttle(throttleInMilliseconds, actionType, sagaWithCallbackAction);
            }
        );
    }
}
