# Need to install the required packages:
- body-parser: To parse the incoming requests
- cors: To handle cross-origin requests between frontend and backend
- morgan: HTTP request logger
- mongoose: Object modeling for MongoDB
# HTTP Status codes

| 2xx | 4xx | 5xx |
| ------ | ------ | ------ |
| Level 200 (Success) | Level 400 | Level 500|
| 200: OK | 400: Bad Request | 500: Internal Server Error|
| 201: Created | 401: Unauthorized | 503: Service Unavailable|
| 203: Non-Authoritative Information | 403: Forbidden | 501: Not Implemented|
| 204: No Content | 404: Not Found | 504: Gateway Timeout|
| | 409: Conflict | 599: Network timeout|
| |  | 502: Bad Gateway|

## 2XX codes
The 200 range status code is the success range for any request in the API. Within the 200
range, there is a lot of code that represents different forms of success. Explained here are a
few of the many status codes that are available:
1. 200 OK: This response is the standard one. It is just a representation of the
request being successful. This status code also returns the resource on which the
request was executed.
2. 201 Created: This represents the successful creation of a resource.
204 No Content: This status code executes the request successfully, but does not
return anything.

## 4XX codes
The 400 range status codes appear when there is an error on the client side:
1. 400 Bad Request: When the request parameters are not well formatted, or the
syntax is broken, then a 400 status code is returned by the server.
2. 401 Unauthorized: This status code is returned when an unauthorized party tries
to send the API request. This basically checks the authentication part.
3. 403 Forbidden: This is somewhat similar to 401. This checks the authorization of
the party performing the API request. This is basically done when there are
different permission settings for different users performing the API.
4. 404 Not Found: This is returned when the resource that we are trying to perform
some action on is not found by the server in the database.

## 5XX codes
The 500 range status code informs us that there is something wrong with the execution of
the action performed in the given resource:
1. 500 Internal Server Error: This status code is displayed when the action is not
executed successfully. Like the 200 status code, this is a generic code returned by
the server when something goes wrong.
2. 503 Service Unavailable: This status code is displayed when our server is not
running.
3. 504 Gateway Timeout: This indicates that the request was sent to the server, but
it did not get any response in the given time.