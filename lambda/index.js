const events = require("events");
exports.handler = async(event) => {

    console.log(event);
    const ip = event.headers['X-Forwarded-For'];

    const response = {
        body: {
            message:`Hello ${ip} from Lambda!`,
            receivedHeaders: event.headers
        }
    };

    return response;
};
