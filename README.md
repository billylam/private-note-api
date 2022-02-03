## private-note-api

REST API for privnote-like site.

## Usage: 

```
POST https://private-note-api.herokuapp.com/encrypt

JSON Body: 
{
  "message": "Your message to encrypt."
}

Returns: a private decryption key.

{
    "key": "XU3T2/BRpcquVxsX57GH1LBZrjyyBTsecqhusd/EH4="
}
```

```
POST https://private-note-api.herokuapp.com/decrypt

JSON Body:
{
  "key": "{private key from encrypt endpoint}"
}

Returns: Decrypted message.
{
    "message": "I'll have a double double with peppers."
}

Returns an error if already read or if invalid key.
{
    "error": "This message was already read by a user on Thu Feb 03 2022 00:00:00 GMT-0800 (Pacific Standard Time)"
}
Also clears out encrypted message from postgres and sets isread flag to true.
```


## Explanation

https://pablohoffman.com/how-privnote-really-works

tl;dr The service creates a key that is NOT stored in database.

The key is one way encrypted to create an identifier (primary key) in the database for it instead.

The key is also used to two-way encrypt the message.

When the user gives us back the key, it is one way encrypted again and if a match is found, THEN we decrypt the message and clear it.