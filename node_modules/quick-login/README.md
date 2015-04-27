# quick-login

Quick login for express, basic-auth only

## Usage

With your `findUser` callback:

```js
app.use(require('quick-login')(function checkAuth(data, next){
  findUser({
    username: data.name,
    password: data.pass
  }, function(e, user){
    next(e, !!user)
  })
}))
```

Or just with inline code:

```js
app.use(require('quick-login')(function checkAuth(data, next){
  next(null, data.name === 'fritx' &&
    data.pass === 'momo')
}))
```

## Todo

- onVisit/onFail page display
- beautiful dialog and ajax
- even passwordless support
