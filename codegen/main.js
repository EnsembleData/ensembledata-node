import nunjucks from "nunjucks";
import fs from "fs";

nunjucks.configure("codegen/templates", {
    autoescape: true,
    trimBlocks: true,
    lstripBlocks: true,
});

function openapiTypeToJSType(type) {
    switch (type) {
        case "string":
            return "string";
        case "integer":
            return "number";
        case "boolean":
            return "boolean";
        default:
            throw new Error(`Unknown type: ${type}`);
    }
}

function titleCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function toCamelCase(str) {
    return str
        .split("_")
        .map((x, i) => (i === 0 ? x : titleCase(x)))
        .join("");
}

function parseEndpointByTag(openapi) {
    const tags = {};
    for (const path in openapi.paths) {
        const endpoint = openapi.paths[path].get;
        const operationId = endpoint.operationId;
        const functionName = toCamelCase(
            operationId.split("_").slice(1).join("_"),
        );
        const tag = endpoint.tags[0];
        const params = [];
        for (const param of endpoint.parameters) {
            if (param.name === "token") {
                continue;
            }

            let type = undefined;
            let transform = undefined;
            if ("type" in param.schema) {
                type = openapiTypeToJSType(param.schema.type);
                if ("retype" in param.schema) {
                    if (
                        param.schema.retype ===
                        "semicolon-separated-string-to-list"
                    ) {
                        type = "string[]";
                        transform = "join_with_semicolon";
                    }
                }
            } else if ("allOf" in param.schema) {
                const ref = param.schema.allOf[0].$ref;
                const ref_name = ref.split("/").pop();
                type = openapi.components.schemas[ref_name].enum
                    .map(JSON.stringify)
                    .join(" | ");
            } else {
                throw new Error(`Unknown param type for: ${param}`);
            }

            params.push({
                // Name of the function param
                name: toCamelCase(param.schema.rename || param.name),
                // Name of the param to send in the request payload
                param: param.name,
                type,
                transform,
                required: param.required,
            });
        }

        if (!tags[tag]) {
            tags[tag] = [];
        }
        tags[tag].push({
            functionName,
            path,
            params,
            returnTopLevelData: [
                "tiktok_user_posts_from_username",
                "tiktok_user_posts_from_secuid",
            ].includes(operationId),
        });
    }
    return tags;
}

const openapi = await fetch("https://ensembledata.com/apis/openapi.json").then(
    (res) => res.json(),
);
const tags = parseEndpointByTag(openapi);
const client_content = nunjucks.render("client.jinja", { tags });
fs.writeFileSync("src/client.js", client_content);
