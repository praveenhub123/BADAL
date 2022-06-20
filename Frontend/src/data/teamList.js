import { v4 as uuid } from "uuid";

export const teamList = [
  {
    organisation_Id: uuid(),
    name: "Samurais",
    description:
      "Close the gaps that entrepreneurs focused on new web/mobile app develppment encounter in developing their products, creating a customer base and acquiring the capital needed to launch and grow their ventures",
    moduleID: "221",
    participantsID: [],
    skillsetID: "",
    tags: ["Tag 1", "Tag 2"],

    //not in schema fetched using ids
    skill: ["frontend", "backend"],
    teamid: "1112",
    org_name: "Org Name",
    memb: ["Aditya", "Ayush"],
    company: ["TCS", "core-team"],
  },
  {
    organisation_Id: uuid(),
    name: "Renegades",
    description:
      "We can provide you a professional and effective solution in a timely manner.",
    moduleID: "725",
    participantsID: [],
    skillsetID: "",
    tags: ["Tag 1"],

    //not in schema fetched uding ids
    skill: ["Software dev."],
    teamid: "1113",
    org_name: "Org Name",
    memb: ["Anurag", "Chandan"],
    company: ["IBM", "core-team"],
  },
  {
    organisation_Id: uuid(),
    name: "Hypertext Assassins",
    description: "Web Dev. team",
    moduleID: "726",
    participantsID: [],
    skillsetID: "",
    tags: ["Tag 1"],

    //not in schema fetched uding ids
    skill: ["Software dev."],
    teamid: "1113",
    org_name: "Org Name",
    memb: ["Ayushman", "Rajat"],
    company: ["IBM", "core-team"],
  },
];
