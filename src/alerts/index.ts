import mailer from "../mailer";
import apartment from "./apartment";
import home from "./home";

import {IProperty} from "../index";

interface IAlertConfig {
    test: (property: IProperty) => boolean;
    getAlertMessage: (property: IProperty) => string;
}

const sendEmail = (message) => {
    // tslint:disable-next-line:no-console
    mailer(message).catch(console.error);
};

const alertConfigs: IAlertConfig[] = [
    apartment,
    home,
];

export default (properties) => {
    for (const property of properties) {
        for (const alertConfig of alertConfigs) {
            if (alertConfig.test(property)) {
                sendEmail(alertConfig.getAlertMessage(property));
            }
        }
    }
};
