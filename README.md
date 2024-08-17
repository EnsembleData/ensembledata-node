# EnsembleData Node.js API

[![Version](https://img.shields.io/npm/v/ensembledata.svg?color=blue)](https://www.npmjs.org/package/ensembledata)

## Documentation

Check out the [API docs](https://ensembledata.com/apis/docs) to see which endpoints are available for each social media and for detailed descriptions of their parameters and functionality.

## Installation

Install the package with npm, pnpm or yarn.

```bash
npm install ensembledata
```

```bash
yarn add ensembledata
```

```bash
pnpm add ensembledata
```

### Requirements

-   The package requires Node 18 or higher.

## Usage

[Register](https://dashboard.ensembledata.com/register) to get your free API token.

```javascript
import { EDClient } from "ensembledata";

const client = EDClient({ token: "API-TOKEN" });
const result = await client.tiktok.userInfoFromUsername({
    username: "daviddobrik",
});

console.log("Data: ", result.data);
console.log("Units charged:", result.unitsCharged);

// Other Examples:
// const result = await client.instagram.userInfo({ username: "daviddobrik" })
// const result = await client.youtube.channel_subscribers({ channelId: "UCnQghMm3Z164JFhScQYFTBw" })
```

<br>
<br>

### Missing Endpoints / Parameters

If you find that one of the endpoints from our [API docs](https://ensembledata.com/apis/docs) is not yet available in this package, you can use the `EDClient.request` method to specify the endpoint manually in the meantime.

```javascript
import { EDClient } from "ensembledata";

const client = EDClient({ token: "API-TOKEN" });
const result = await client.request("/instagram/example", {
    foo: "...",
    bar: "...",
});
```

If you find that one the parameters to an existing endpoint is missing, you can still send this parameter via the `extraParams` object which is available on all endpoint methods as the second parameter. See the example below:

```javascript
import { EDClient } from "ensembledata";

const client = EDClient({ token: "API-TOKEN" });
const result = await client.instagram.userInfo(
    { username: "..." },
    { baz: "..." },
);
```

<br>
<br>

### Handling Errors

In the [API docs](https://ensembledata.com/apis/docs), each endpoint lists a handful of possible errors the API may respond with. You can handle these errors by catching the `EDError` exception.

```javascript
import { EDClient } from "ensembledata";

const client = EDClient({ token: "API-TOKEN" });
try {
    const result = await client.tiktok.userInfoFromUsername({
        username: "daviddobrik",
    });
} catch (error) {
    switch (error.status_code) {
        // Rate limit exceeded...
        case 429:
            console.log(error.detail);
            break;

        // Subscription expired...
        case 493:
            console.log(error.detail);
            break;

        // Some other error occurred, unrelated to the EnsembleData API
        default:
            break;
    }
}
```

<br>
<br>

### Using Promises

Every endpoint method returns a promise. You can use the `.then()` and `.catch()` methods to handle the result and errors respectively.

```javascript
import { EDClient } from "ensembledata";

const client = EDClient({ token: "API-TOKEN" });
client.tiktok
    .userInfoFromUsername({ username: "daviddobrik" })
    .then((result) => {
        console.log("Data: ", result.data);
        console.log("Units charged:", result.unitsCharged);
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
```

### Types

This package provides TypeScript types for all the endpoints and their parameters. You can use these types to get autocompletion and type checking in your IDE.
Internally the package uses JSDoc comments to provide these types. If you experience any typing problems, please let us know by creating an issue.
