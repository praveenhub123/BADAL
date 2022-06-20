import { v4 as uuid } from 'uuid';

export const breakdown = [
    {
        project_Id: uuid(),
        name: "Project 1 ",
        brief: 'Org1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dashOrg1 works in dash and dash. It aims at dash and dash... we are looking for dash and dash',
        problem_statement: "Problem statement Problem statement Problem statement Problem statement ",
        status: "Accepted",
        featuresTasksTeams: [
            {
                name: "Feature 1",
                tasks: [
                    {
                        task_name: "Task1",
                        teams: ["Team12", "Team10"]
                    },
                    {
                        task_name: "Task2",
                        teams: ["Team2", "Team1"]
                    },
                    {
                        task_name: "Task3",
                        teams: ["Team22", "Team11"]
                    },
                ]
            },
            {
                name: "Feature 2",
                tasks: [
                    {
                        task_name: "Task1",
                        teams: ["Team12", "Team10"]
                    },
                    {
                        task_name: "F2T2",
                        teams: ["Team2", "Team1"]
                    },
                    {
                        task_name: "Task3",
                        teams: ["Team22", "Team11"]
                    },
                ]
            },
            {
                name: "Feature 3",
                tasks: [
                    {
                        task_name: "Task1",
                        teams: ["Team12", "Team10"]
                    },
                    {
                        task_name: "Task2",
                        teams: ["Team2", "Team1"]
                    },
                    {
                        task_name: "Task3",
                        teams: ["Team22", "Team11"]
                    },
                ]
            },
        ],
    },
    {
        project_Id: uuid(),
        name: "Project 2",
        brief: 'Org1 works in dash and dash. It aims at dash and dash... we are looking for dash and dash',
        problem_statement: "Problem statement Problem statement Problem statement Problem statement ",
        status: "Accepted",
        featuresTasksTeams: [
            {
                name: "Feature 1",
                tasks: [
                    {
                        task_name: "Task1",
                        teams: ["Team12", "Team10"]
                    },
                    {
                        task_name: "Task2",
                        teams: ["Team2", "Team1"]
                    },
                    {
                        task_name: "Task3",
                        teams: ["Team22", "Team11"]
                    },
                ]
            },
            {
                name: "Feature 2",
                tasks: [
                    {
                        task_name: "Task1",
                        teams: ["Team12", "Team10"]
                    },
                    {
                        task_name: "Task2",
                        teams: ["Team2", "Team1"]
                    },
                    {
                        task_name: "Task3",
                        teams: ["Team22", "Team11"]
                    },
                ]
            },
            {
                name: "Feature 3",
                tasks: [
                    {
                        task_name: "Task1",
                        teams: ["Team12", "Team10"]
                    },
                    {
                        task_name: "Task2",
                        teams: ["Team2", "Team1"]
                    },
                    {
                        task_name: "Task3",
                        teams: ["Team22", "Team11"]
                    },
                ]
            },
        ],
    }
]