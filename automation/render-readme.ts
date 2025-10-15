import fs from "fs";
import path from "path";
import Mustache from "mustache";

import { Tool, Prompt } from "./types";

const toolsRaw = fs.readFileSync(path.join(__dirname, "tools.json"), "utf8");
const toolsJson: { tools: Tool[] } = JSON.parse(toolsRaw);

const promptsRaw = fs.readFileSync(path.join(__dirname, "prompts.json"), "utf8");
const promptsJson: { prompts: Prompt[] } = JSON.parse(promptsRaw);

const toolsMarkdown = toolsJson.tools.map((tool) => {

    const toolInputs = Object.entries(tool.inputSchema.properties).map(([propertyName, propertyDetails]) => {
        return `  - ${propertyName}: ${propertyDetails.description} (${propertyDetails.type}, required)`;
    });

    return `
- **${tool.name}** - ${tool.description}

${toolInputs.join("\n")}

`;
});

const promptsMarkdown = promptsJson.prompts.map((prompt) => {

    const promptArgs = prompt.arguments.map((arg) => {
        return `  - ${arg.name}: ${arg.description} (${arg.required ? "required" : "optional"})`;
    })

    return `
- **${prompt.name}** - ${prompt.description}

${promptArgs.join("\n")}

`;
});

const template = fs.readFileSync(path.resolve(__dirname, "README.mustache"), "utf8");

const readme = Mustache.render(template, {
    toolsMarkdown: toolsMarkdown.join("\n"),
    promptsMarkdown: promptsMarkdown.join("\n"),
});

fs.writeFileSync(path.resolve(__dirname, "../README-MCP.md"), readme);
