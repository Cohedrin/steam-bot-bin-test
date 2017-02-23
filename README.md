Repro script for https://github.com/DoctorMcKay/node-binarykvparser/issues/2
### Running
- `npm install`
- Make a file called `secrets.json` with the contents
```json
{
  "shared_secret": "YOUR_SHARED_SECRET",
  "password": "YOUR_PASSWORD",
  "username": "YOUR_USERNAME"
}

```
- `node index.js`
