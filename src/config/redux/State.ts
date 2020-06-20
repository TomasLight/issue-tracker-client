import { RouterState } from "connected-react-router";

import { IAppState } from "@utils/redux/IAppState";
import { NotifierStore } from "@app/Notifier/redux/Notifier.store";
import { HistoryStore } from "@utils/redux/history/History.store";
import { AppProviderStore } from "@shared/templates/AppProvider/redux/AppProvider.store";

import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { UsersStore } from "@app/Users/redux/Users.store";

export class State implements IAppState {
    public router: RouterState;
    public historyStore: HistoryStore;
    public appProviderStore: AppProviderStore;
    public notifierStore: NotifierStore;

    public issuesStore: IssuesStore;
    public usersStore: UsersStore;
}
