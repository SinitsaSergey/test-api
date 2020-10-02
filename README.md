* execute "npm install" before using

* use "npm run start" to start application 
* use "npm run test" to start unit tests

options to connect to database are stored in src/resources

# API protocol
<b>POST host:port/session</b><br/>
create new session<br/>
```
{
    id: number,
    players: [
    {id: number, email: string}
    ]
}
```

<b>POST host:port/round</b><br/>
create new round<br/>
```
{
    id: number,
    sessionId: number,
    players: [
    {id: number, type: string}
    ]
}
```
<b>GET host:port/round</b><br/>
get all rounds<br/>

<b>GET host:port/statistics/player?{params}</b><br/>
get statistics for player filtered by params<br/>

<b>GET host:port/statistics/activities/{id: number}</b><br/>
count all activities for player with specific id<br/>
