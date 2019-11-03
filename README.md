# Domio Task

### Solution

I use rxjs to create a stream of events every 5 seconds and then pipe that into a map that calls the api, the response in then emitted into the stream and mapped inott the desired shape. The mapped response is tapped to generate alerts is required, and then saved to the database.

### Alerts
The alerts functionality is kept in the alerts directory. Different kinds of alerts can be defined in an alertConfig and added to the alertConfig array. An alertConfig has two properties, test, and getAlertMessage, both accept a property, defined in index.js, test returns a boolean, whether or not to fire an alert, and getAlertMessage returns a string, to serve as the alert message.

### Next steps
In order to increase the reliability of the app i would use some kind of message queue like rabbitmq, I would send a message with the information required to save to the db and trust the try again functionality of the queue service. The order of messages themselves do not affect the final state of the db so the data could simply be reconstructed from the list of events. If a fetch cycle is missed, currently the app does nothing, to enabled logging on the information I would add another stream on a timer to logg a failur that gets overwritten by the stream of fetch calls. Again, currently api failures are ignore, if recording this information is required then piping to a catchError handler would be straightforward.
