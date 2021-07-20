# Task

Janusz, a hardworking DevOps, would like to see the statuses of all the servers currently maintains. He would like to manually turn them on or off and sometimes reboot if neccessary.

Your task is to provide such a functionality.

### Tasks

1.  List all the servers.
2.  Add a clickable dropdown on the right with 2 options :
    1. Turn on (or Turn off) - depending on the status (You can't display Turn on with Turn Off dropdown option at the same time)
    2. Reboot (When server is rebooting please pay attention to how the dropdown looks like)
3.  When the server is in a `REBOOTING` status you should be pinging single server API endpoint `/servers/:serverId ` (e.g. every 1s) until the status changes.
4.  Allow the user to locally search for a server ( Pay attention to how your application behaves when you put something in search input)
5.  Add unit tests at least for rebooting functionality and if you want and you have time please add more tests.

### Tips
- You can use any libraries but for the main things like request handling dom manipulation please use jQuery
- Don't leave unneccesary code!!!

### Requirements

UI was created using Node.js v10.6.0. Other versions may or may not work correctly.

### Installation

In `./ui` run:

```shell
npm install
```

### Run

In `./ui` run:

```shell
npm dev
```

## API

To remotely administer the servers we have a REST API located in `./src` directory.
The API provides an interface listed in the table below:

| Method | Endpoint                  | Response                  | Description                    |
| ------ | ------------------------- | ------------------------- | ------------------------------ |
| GET    | /servers                  | Array\<[Server](#types)\> | Returns a list of all servers. |
| GET    | /servers/:serverId        | [Server](#types)          | Returns a server.              |
| PUT    | /servers/:serverId/on     | [Server](#types)          | Turns on a server              |
| PUT    | /servers/:serverId/off    | [Server](#types)          | Turns off a server             |
| PUT    | /servers/:serverId/reboot | [Server](#types)          | Reboots a server               |

#### Types

```typescript
interface Server {
  id: number;
  name: string;
  status: "ONLINE" | "OFFLINE" | "REBOOTING";
}
```

### Requirements

Our API was created using Node.js v10.6.0. Other versions may or may not work correctly.

### Installation

In `./api` run:

```shell
npm install
```

### Run

In `./api` run:

```shell
npm start
```