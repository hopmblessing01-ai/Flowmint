export type Tool = {
  name: string;
  /** File in public/images/tools/ (e.g. hubspot.png) */
  icon: string;
};

/** Add matching PNG/SVG files under public/images/tools/ */
export const tools: Tool[] = [
  { name: "HubSpot", icon: "/images/tools/hubspot.png" },
  { name: "GoHighLevel", icon: "/images/tools/gohighlevel.png" },
  { name: "Zoho CRM", icon: "/images/tools/zoho.png" },
  { name: "n8n", icon: "/images/tools/n8n.png" },
  { name: "Zapier", icon: "/images/tools/zapier.png" },
  { name: "Make", icon: "/images/tools/make.png" },
  { name: "Power Automate", icon: "/images/tools/power-automate.png" },
  { name: "Pipedrive", icon: "/images/tools/pipedrive.png" },
  { name: "Salesforce", icon: "/images/tools/salesforce.png" },
  { name: "Monday.com", icon: "/images/tools/monday.png" },
  { name: "Airtable", icon: "/images/tools/airtable.png" },
  { name: "ClickUp", icon: "/images/tools/clickup.png" },
  { name: "Asana", icon: "/images/tools/asana.png" },
  { name: "Notion", icon: "/images/tools/notion.png" },
  { name: "Twilio", icon: "/images/tools/twilio.png" },
  { name: "Vapi", icon: "/images/tools/vapi.png" },
  { name: "Retell", icon: "/images/tools/retell.png" },
  { name: "Meta", icon: "/images/tools/meta.png" },
];
